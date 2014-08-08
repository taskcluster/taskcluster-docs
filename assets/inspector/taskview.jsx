/** @jsx React.DOM */
(function(exports) {

/** Takes a task status structure and renders tabs for taskInfo and runInfo */
exports.TaskView = React.createClass({
  // Get initial state
  getInitialState: function() {
    return {
      currentTab:   ''      // Empty string is the task view
    };
  },

  // Create default properties
  getDefaultProps: function() {
    return {
      onTabChange:  function() {},
      status:       {runs: []},
      queue:        new taskcluster.Queue()
    };
  },

  // Validate properties
  propTypes: {
    onTabChange:  React.PropTypes.func.isRequired,
    status:       React.PropTypes.object.isRequired,
    queue:        React.PropTypes.instanceOf(taskcluster.Queue).isRequired
  },

  // Set currentTab
  setCurrentTab: function(tab) {
    // Update state
    this.setState({
      currentTab:     tab
    });
    // Notify parent
    this.props.onTabChange(tab);
  },

  // Render tabs and current tab
  render: function() {

    // Show tabs for the first 6 runs
    var tabs = this.props.status.runs.slice(0, 6).map(function(run) {
      return (
        <li key={run.runId}
            className={this.state.currentTab === run.runId ? 'active' : ''}>
          <a className="tab"
             onClick={this.setCurrentTab.bind(this, run.runId)}>
             Run {run.runId}
          </a>
        </li>
      );
    }, this);

    // Show a dropdown menu for the remaining runs
    var remainingRuns;
    if (this.props.status.runs.slice(6).length > 0) {
      remainingRuns = (
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown">
            More runs <span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu">
            {
              this.props.status.runs.slice(6).map(function(run) {
                return (
                  <li key={run.runId}>
                    <a onClick={this.setCurrentTab.bind(this, run.runId)}>
                       Run {run.runId}
                    </a>
                  </li>
                );
              }, this)
            }
          </ul>
        </li>
      );
    }

    // Render current tab
    var currentTab;
    if (this.state.currentTab === '') {
      currentTab = <TaskInfo queue={this.props.queue}
                             status={this.props.status}/>
    } else {
      var run = this.props.status.runs[this.state.currentTab];
      if (run) {
        currentTab = <RunInfo queue={this.props.queue}
                              status={this.props.status}
                              run={run}/>
      } else {
        currentTab = (
          <div className="alert alert-danger">
            <strong>Run Not Found!</strong>&nbsp;
            The task does not seem to have the requested run...
          </div>
        );
      }
    }
    return (
      <div id="task-info">
        <ul className="nav nav-tabs" role="tablist">
          <li className={this.state.currentTab === '' ? 'active' : ''}>
            <a className="tab"
               onClick={this.setCurrentTab.bind(this, '')}>Task</a>
          </li>
          {tabs}
          {remainingRuns}
        </ul>
        <div className="tab-content">
          <div className="tab-pane active">
            {currentTab}
          </div>
        </div>
      </div>
    );
  }
});

// End of module
})(this);