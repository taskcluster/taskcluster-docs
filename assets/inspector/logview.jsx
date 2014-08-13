/** @jsx React.DOM */
(function(exports) {

/** Render a terminal and a dropdown menu to select logs from */
exports.LogView = React.createClass({
  // Get initial state
  getInitialState: function() {
    return {
      url:    undefined   // URL to show
    }
  },

  // Validate properties
  propTypes: {
    logs:     React.PropTypes.array.isRequired,
    taskId:   React.PropTypes.string.isRequired,
    runId:    React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
              ]).isRequired,
    queue:    React.PropTypes.instanceOf(taskcluster.Queue).isRequired
  },

  logChanged: function(url) {
    this.setState({url: url});
  },

  render: function() {
    var entries = this.props.logs.map(function(log) {
      // Create URL for the artifact
      var url = this.props.queue.buildUrl(
        this.props.queue.getArtifact,
        this.props.taskId,
        this.props.runId,
        log.name
      );
      // Create entry for select
      return {
        text:   log.name,
        value:  url
      };
    }, this);

    return (
      <span>
      <hr/>
      <dl className="dl-horizontal log-viewer">
        <dt>Show Log</dt>
        <dd>
          <Format.Select onChange={this.logChanged}
                         entries={entries}/>
        </dd>
      </dl>
      <TerminalView url={this.state.url}/>
      </span>
    );
  }
});

// End of module
})(this);
