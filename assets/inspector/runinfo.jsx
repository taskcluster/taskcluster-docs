/** @jsx React.DOM */
(function(exports) {

// Import If and Else from Utils
var If = Utils.If;
var Else = Utils.Else;

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
    this.loadState('artifactsResult', this.props.queue.getArtifactsFromRun(
      this.props.status.taskId,
      this.props.run.runId
    ));
  },

  // Handle property changes
  componentWillReceiveProps: function(props) {
    if (this.props.status.taskId !== props.status.taskId ||
        this.props.run.runId     !== props.run.runId) {
      this.loadState('artifactsResult', props.queue.getArtifactsFromRun(
        props.status.taskId,
        props.run.runId
      ));
    }
  },

  // Render run
  render: function() {
    var run             = this.props.run;
    var status          = this.props.status;
    var artifactsResult = this.state.artifactsResult;

    var artifactView;
    if (!artifactsResult) {
      artifactView = <Format.Loading subject="artifacts"
                                     state={artifactsResult}/>;
    } else if (artifactsResult.artifacts.length === 0) {
      artifactView = '-';
    } else {
      artifactView = artifactsResult.artifacts.map(function(artifact) {
        var url = [
          "https://queue.taskcluster.net/v1",
          this.state.taskId,
          "runs",
          this.state.runId,
          "artifacts",
          artifact.name
        ].join('/');
        return (
          <ul>
            <li>
              <a href={url} target="_blank">
                {artifact.name}
              </a>
            </li>
          </ul>
        );
      });
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
            <If condition={run.success !== undefined || run.success !== null}>
              <If codntion={run.success}>
                <span className="label label-primary">yes</span>
              <Else/>
                <span className="label label-primary">no</span>
              </If>
            <Else/>
              -
            </If>
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
            <If condition={run.resolved}>
                <Format.Date date={run.started} since={run.scheduled}/>
              <Else/>
                -
            </If>
          </dd>
          <dt>Resolved</dt>
          <dd>
            <If condition={run.resolved}>
                <Format.Date date={run.resolved} since={run.started}/>
              <Else/>
                -
            </If>
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
            <If condition={run.takenUntil}>
                <Format.Date date={run.takenUntil}/>
              <Else/>
                -
            </If>
          </dd>
        </dl>
      </span>
    );
  }
});


// End of module
})(this);
