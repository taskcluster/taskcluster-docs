/** @jsx React.DOM */
(function(exports) {

// Import If and Else from Utils
var If = Utils.If;
var Else = Utils.Else;

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
  mixins: [Utils.LoadState],


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

  // Parse window location hash
  parseHash: function() {
    var hash = window.location.hash.substr(1).split('/')
    return {
      taskId:     hash[0],
      currentTab: hash[1] || ''
    };
  },

  // Render window location hash
  renderHash: function() {
    if (this.state.currentTab === '') {
      return this.state.taskId;
    }
    return [this.state.taskId, this.state.currentTab].join('/');
  },

  // Load state from window.location.hash
  componentWillMount: function() {
    this.setState(this.parseHash());
  },

  // When hash changes update state if there is a new taskId
  onHashChange: function() {
    var state = this.parseHash();
    if (this.state.taskId != state.taskId) {
      this.loadState('statusResult', this.props.queue.status(state.taskId));
    }
    this.setState(state);
  },

  // Listen for changes to window.location.hash
  componentDidMount: function() {
    window.addEventListener('hashchange', this.onHashChange);
    this.loadState('statusResult', this.props.queue.status(
      this.state.taskId
    ));
    // Set initial taskId
    this.refs.taskId.getDOMNode().value = this.state.taskId;
  },

  // Stop listening for changes to window.location.hash
  componentWillUnmount: function() {
    window.removeEventListener('hashchange', this.onHashChange);
  },

  // Handle form submission
  onSubmit: function() {
    var taskId = this.refs.taskId.getDOMNode().value.trim();
    this.loadState('statusResult', this.props.queue.status(taskId));
    return false;
  },

  // Handle tab changes from child
  onTabChange: function(tab) {
    this.setState({currentTab: tab});
  },

  // Render a task-inspector
  render: function() {
    // Update hash if not matching current state
    var hash = window.location.hash.substr(1);
    if (hash !== this.renderHash()) {
      window.removeEventListener('hashchange', this.onHashChange);
      window.location.hash = this.renderHash();
      window.addEventListener('hashchange', this.onHashChange);
    }

    var display;
    if (!this.state.statusResult) {
      display = <Format.Loading subject="task status"
                                state={this.state.statusResult}/>;
    } else {
      display = <TaskView onTabChange={this.onTabChange}
                          status={this.state.statusResult.status}
                          queue={this.props.queue}
                          currentTab={this.state.currentTab}/>;
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
