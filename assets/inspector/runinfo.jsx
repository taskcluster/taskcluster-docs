/** @jsx React.DOM */
(function(exports) {

/** Displays information about a run in a tab page */
exports.RunInfo = React.createClass({
  mixins: [Utils.LoadStateMixin],

  // Get initial state
  getInitialState: function() {
    return {
      artifactsResult:  false     // Artifact response from queue
    };
  },

  // Validate properties
  propTypes: {
    status:   React.PropTypes.object.isRequired,
    run:      React.PropTypes.object.isRequired,
    queue:    React.PropTypes.instanceOf(taskcluster.Queue).isRequired
  },

  // Load artifacts when loading
  componentDidMount: function() {
    this.loadState('artifactsResult', this.props.queue.listArtifacts(
      this.props.status.taskId,
      this.props.run.runId
    ));
  },

  // Handle property changes
  componentWillReceiveProps: function(props) {
    if (this.props.status.taskId !== props.status.taskId ||
        this.props.run.runId     !== props.run.runId) {
      this.loadState('artifactsResult', props.queue.listArtifacts(
        props.status.taskId,
        props.run.runId
      ));
    }
  },

  // Render run
  render: function() {
    var queue           = this.props.queue;
    var run             = this.props.run;
    var status          = this.props.status;
    var artifactsResult = this.state.artifactsResult;

    // Construct artifact view
    var artifactView;
    if (!artifactsResult) {
      artifactView = <Format.Loading subject="artifacts"
                                     state={artifactsResult}/>;
    } else if (artifactsResult.artifacts.length === 0) {
      artifactView = '-';
    } else {
      artifactView = (
        <ul>
        {
          artifactsResult.artifacts.map(function(artifact) {
            var url = queue.buildUrl(
              queue.getArtifact,
              status.taskId,
              run.runId,
              artifact.name
            );
            return (
                <li key={artifact.name}>
                  <a href={url} target="_blank">
                    {artifact.name}
                  </a>
                </li>
            );
          }, this)
        }
        </ul>
      );
    }

    // Create log view
    var logView;
    if (!artifactsResult) {
      logView = <Format.Loading subject="logs" state={artifactsResult}/>;
    } else {
      var logs = artifactsResult.artifacts.filter(function(artifact) {
        return /^public\/logs\//.test(artifact.name);
      });
      if (logs.length !== 0) {
        logView = <LogView logs={logs}
                           taskId={status.taskId}
                           runId={run.runId}
                           queue={queue}/>;
      }
    }

    var stateLabelMap = {
      pending:    'default',
      running:    'primary',
      completed:  'success',
      failed:     'danger'
    };
    return (
      <span>
        <dl className="dl-horizontal">
          <dt>State</dt>
          <dd>
            <span className={"label label-" + stateLabelMap[run.state]}>
              {run.state}
            </span>
          </dd>
          <dt>Reason Created</dt>
          <dd><code>{run.reasonCreated}</code></dd>
        </dl>
        <dl className="dl-horizontal">
          <dt>Reason Resolved</dt>
          <dd>
            {run.reasonResolved ? <code>{run.reasonResolved}</code> : '-'}
          </dd>
          <dt>Successful</dt>
          <dd>
            {
              run.success === undefined || run.success === null
              ? '-'
              : (
                  run.success
                  ? <span className="label label-primary">yes</span>
                  : <span className="label label-primary">no</span>
                )
            }
          </dd>
        </dl>
        <dl className="dl-horizontal">
          <dt>Artifacts</dt>
          <dd>{artifactView}</dd>
        </dl>
        <dl className="dl-horizontal">
          <dt>Scheduled</dt>
          <dd>
            <Format.Date date={run.scheduled}/>
          </dd>
          <dt>Started</dt>
          <dd>
            {
              run.started
              ? <Format.Date date={run.started} since={run.scheduled}/>
              : '-'
            }
          </dd>
          <dt>Resolved</dt>
          <dd>
            {
              run.resolved
              ? <Format.Date date={run.resolved} since={run.started}/>
              : '-'
            }
          </dd>
        </dl>
        <dl className="dl-horizontal">
          <dt>WorkerGroup</dt>
          <dd>
            {run.workerGroup ? <code>{run.workerGroup}</code> : '-'}
          </dd>
          <dt>WorkerId</dt>
          <dd>
            {run.workerId ? <code>{run.workerId}</code> : '-'}
          </dd>
          <dt>TakenUntil</dt>
          <dd>
            {run.takenUntil ? <Format.Date date={run.takenUntil}/> : '-'}
          </dd>
        </dl>
        {logView}
      </span>
    );
  }
});


// End of module
})(this);
