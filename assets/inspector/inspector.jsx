/** @jsx React.DOM */
(function(exports) {

// Create namespace
var Inspector = exports.Inspector = {};

// Widget we can initialize on load, register these later
Inspector.widgets = {};


// Render widget on load
var renderWidgets = function() {
  // Find list of elements to make into widgets
  var nodes    = document.querySelectorAll('[data-widget]');
  var elements = Array.prototype.slice.call(nodes);

  // Create widgets
  elements.forEach(function(element) {
    // Find widget to create
    var name = element.dataset.widget;
    var Widget = Inspector.widgets[name];

    // Check if widget exists
    if (!Widget) {
      return console.log("No such widget: " + name);
    }

    // Find properties
    var properties = {};
    for(var key in element.dataset) {
      properties[key] = element.dataset[key];
    }

    // Render widget on element
    React.renderComponent(new Widget(properties), element);
  });
};



/** Renders task-inspector with a control to enter `taskId` into */
var TaskInspectorWidget = React.createClass({
  mixins: [
    Utils.LoadStateMixin,
    Utils.LocationHashMixin({
      keys:     ['taskId', 'currentTab']
    })
  ],

  // Create initial state, basically nothing is loading and task doesn't exist
  getInitialState: function() {
    return {
      taskId:         '',
      statusResult:   null,
      currentTab:     ''
    };
  },

  // Create default properties
  getDefaultProps: function() {
    // Create queue and queueEvent clients
    return {
      queue:        new taskcluster.Queue(),
      queueEvents:  new taskcluster.QueueEvents()
    }
  },

  // When hash changes update state
  onHashChangedState: function(state) {
    // Reload status structure of hash changed the taskId
    if (this.state.taskId !== state.taskId) {
      this.loadTaskId(state.taskId);
      if (this.refs.taskId) {
        // Set taskId to what was provided on hash change
        this.refs.taskId.getDOMNode().value = state.taskId;
      }
    }
    if (this.refs.taskView) {
      this.refs.taskView.setCurrentTab(state.currentTab);
    }
  },

  // Load status and update UI to what was fetched from
  componentDidMount: function() {
    this.loadTaskId(this.state.taskId);
    // Set initial taskId
    this.refs.taskId.getDOMNode().value = this.state.taskId;
  },

  // Handle form submission
  onSubmit: function() {
    var taskId = this.refs.taskId.getDOMNode().value.trim();
    this.setState({taskId: taskId});
    this.loadTaskId(taskId);
    return false;
  },

  // Create new listener and load statusResult
  loadTaskId: function(taskId) {
    console.log("loadTaskId: " + taskId);

    // Load new task status structure
    this.loadState('statusResult', this.props.queue.status(taskId));

    if (this.listener) {
      this.listener.close();
      this.listener = null;
    }

    // Create new listener
    this.listener = new Listener();
    // Bind to exchanges when ready
    this.listener.addEventListener('ready', function() {
      // Create common routing key
      var rkey = {taskId: taskId};
      this.listener.bind(this.props.queueEvents.taskDefined(rkey));
      this.listener.bind(this.props.queueEvents.taskPending(rkey));
      this.listener.bind(this.props.queueEvents.taskRunning(rkey));
      this.listener.bind(this.props.queueEvents.artifactCreated(rkey));
      this.listener.bind(this.props.queueEvents.taskFailed(rkey));
      this.listener.bind(this.props.queueEvents.taskCompleted(rkey));
    }.bind(this));
    this.listener.addEventListener('error', function(err) {
      console.log("Listener error:");
      console.log(JSON.stringify(err, null, 2));
    });
    this.listener.addEventListener('bound', function(msg) {
      console.log("Listener bound: " + msg.binding.exchange);
    });
    // Find artifact exchange
    var artifactCreatedExchange = this.props.queueEvents
                                            .artifactCreated()
                                            .exchange;
    // listen for messages
    this.listener.addEventListener('message', function(data) {
      // Update state with new status structure upon getting a message
      this.setState({statusResult: data.message.payload});
      // Tell taskView to reload list of artifacts
      if (data.message.exchange === artifactCreatedExchange) {
        if (this.refs.taskView) {
          this.refs.taskView.reloadArtifacts();
        }
      }
      console.log("Listener message:");
      console.log(JSON.stringify(data, null, 2));
    }.bind(this));
  },

  componentWillUnmount: function() {
    if (this.listener) {
      this.listener.close();
      this.listener = null;
    }
  },

  // Handle tab changes from child
  onTabChange: function(tab) {
    this.setState({currentTab: tab});
  },

  // Render a task-inspector
  render: function() {
    this.renderHash();

    var display;
    if (!this.state.statusResult) {
      display = <Format.Loading subject="task status"
                                state={this.state.statusResult}/>;
    } else {
      display = <TaskView ref="taskView"
                          onTabChange={this.onTabChange}
                          status={this.state.statusResult.status}
                          queue={this.props.queue}
                          initialTab={this.state.currentTab}/>;
    }

    // Render
    return (
    <span>
    <h1>Task Inspector</h1>
    <p>This tool lets you inspect a task given the <code>taskId</code></p>
    <form className="form-horizontal" onSubmit={this.onSubmit}>
      <div className="form-group">
        <label htmlFor="taskId" className="col-sm-4 control-label">
          Enter <code>taskId</code>
        </label>
        <div className="col-sm-8">
          <input type="text"
                 className="form-control"
                 ref="taskId"
                 placeholder="taskId"/>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <input type="submit"
                 className="btn btn-primary"
                 value="Inspect task"/>
        </div>
      </div>
    </form>
    {display}
    </span>
  );}
});


// Declare TaskInspectorWidget
Inspector.widgets['task-inspector'] = TaskInspectorWidget;


// Render widgets when loaded
if (document.readyState !== 'complete') {
  document.addEventListener('readystatechange',function() {
    if (document.readyState === 'complete') {
      renderWidgets();
    }
  });
} else {
  renderWidgets();
}

// End of module
})(this);
