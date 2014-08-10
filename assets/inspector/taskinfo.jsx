/** @jsx React.DOM */
(function(exports) {

// Import If and Else from Utils
var If = Utils.If;
var Else = Utils.Else;

/** Displays information about a task in a tab page */
exports.TaskInfo = React.createClass({
  mixins: [Utils.LoadStateMixin],

  getInitialState: function() {
    return {
      task:     false,  // task definition w. false -> loading, null -> error
    };
  },

  // Initial properties with Queue instance
  getDefaultProps: function() {
    return {
      status: {},
      queue:  new taskcluster.Queue()
    };
  },

  // Validate properties
  propTypes: {
    status:   React.PropTypes.object.isRequired,
    queue:    React.PropTypes.instanceOf(taskcluster.Queue).isRequired
  },

  componentDidMount: function() {
    this.loadState('task', this.props.queue.getTask(this.props.status.taskId));
  },

  // Handle property changes
  componentWillReceiveProps: function(props) {
    if (this.props.status.taskId !== props.status.taskId) {
      this.loadState('task', props.queue.getTask(props.status.taskId));
    }
  },

  render: function() {
    // Easy references to values
    var status  = this.props.status;
    var task    = this.state.task;

    // If loading show that
    if (!task) {
      return <Format.Loading subject="task definition" state={task}/>;
    }

    return (
      <span>
      <dl className="dl-horizontal">
        <dt>Name</dt>
        <dd>
          <Format.Markdown>
            {task.metadata.name}
          </Format.Markdown>
        </dd>
        <dt>Description</dt>
        <dd>
          <Format.Markdown>
            {task.metadata.description}
          </Format.Markdown>
        </dd>
        <dt>Owner</dt>
        <dd><code>{task.metadata.owner}</code></dd>
        <dt>Source</dt>
        <dd>
          <a href={task.metadata.source}>
            <If condition={task.metadata.source.length > 90}>
                ...{task.metadata.source.substr(8 - 90)}
              <Else/>
                {task.metadata.source}
            </If>
          </a>
        </dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>Created</dt>
        <dd>
          <Format.Date date={task.created}/>
        </dd>
        <dt>Deadline</dt>
        <dd>
          <Format.Date date={task.deadline} since={task.created}/>
        </dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>ProvisionerId</dt>
        <dd><code>{task.provisionerId}</code></dd>
        <dt>WorkerType</dt>
        <dd><code>{task.workerType}</code></dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>SchedulerId</dt>
        <dd><code>{task.schedulerId}</code></dd>
        <dt>TaskGroupId</dt>
        <dd><code>{task.taskGroupId}</code></dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>Scopes</dt>
        <dd>
          <If condition={task.scopes.length > 0}>
              <ul>
                {task.scopes.map(function(scope) {
                  return (
                    <li><code>{scope}</code></li>
                  );
                })}
              </ul>
            <Else/>
              -
          </If>
        </dd>
        <dt>Routing</dt>
        <dd>
          <If condition={task.routing !== ''}>
              <code>{task.routing}</code>
            <Else/>
              -
          </If>
        </dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>Payload</dt>
        <dd>
          <Format.Code language='javascript'>
            {JSON.stringify(task.payload, undefined, 2)}
          </Format.Code>
        </dd>
        <dt>Task Definition</dt>
        <dd>
          <a href={'https://queue.taskcluster.net/v1/task/' + status.taskId}>
            {status.taskId}
          </a>
        </dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>Task Priority</dt>
        <dd><span className="badge">{task.priority}</span></dd>
        <dt>Retries Left</dt>
        <dd>{status.retriesLeft} of {task.retries}</dd>
      </dl>
      <dl className="dl-horizontal">
        <dt>Tags</dt>
        <dd>
          <Format.Code language='javascript'>
            {JSON.stringify(task.tags, undefined, 2)}
          </Format.Code>
        </dd>
      </dl>
      </span>
    );
  }
});

// End of module
})(this);
