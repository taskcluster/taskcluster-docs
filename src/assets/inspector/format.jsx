/** @jsx React.DOM */
(function(exports) {

// Create format namespace
var Format = exports.Format = {};

/** Render Markdown and handle all the particularities */
Format.Markdown = React.createClass({
  // Validate properties
  propTypes: {
    children:   React.PropTypes.string
  },

  // Render Markdown
  render: function() {
    var html = marked(this.props.children || '-');
    return <span className="markdown-view"
                 dangerouslySetInnerHTML={{__html: html}}></span>
  }
});


/** Highlight code */
Format.Code = React.createClass({
  // Validate properties
  propTypes: {
    children:  React.PropTypes.string.isRequired,
    language: function(props, propName) {
      var language = props[propName];
      if (!Prism.languages[language]) {
        return new Error("Language '" + language + "' not supported by Prism");
      }
    }
  },

  // Render code
  render: function() {
    var html = Prism.highlight(
      this.props.children,
      Prism.languages[this.props.language],
      this.props.language
    );
    return (
      <pre className="language-{this.props.language}">
        <code dangerouslySetInnerHTML={{__html: html}}></code>
      </pre>
    );
  }
});

/** Display a date object with optional since property */
Format.Date = React.createClass({
  getDefaultProps: function() {
    return {
      format:   'Do of MMMM YYYY, H:mm:ss'
    };
  },

  // Validate properties
  propTypes: {
    date:   React.PropTypes.oneOfType([
              React.PropTypes.instanceOf(Date),
              React.PropTypes.string
            ]).isRequired,
    since:  React.PropTypes.oneOfType([
              React.PropTypes.instanceOf(Date),
              React.PropTypes.string
            ]),
    format: React.PropTypes.string.isRequired
  },

  // Render date display
  render: function() {
    // Create since object if
    var since;
    if (this.props.since) {
      since = moment(this.props.date).from(this.props.since, true);
      since = "(" + since + " later)";
    }

    return (
      <Utils.Tooltip title={moment(this.props.date).format(this.props.format)}>
        {moment(this.props.date).fromNow()}&nbsp;
        {since}
      </Utils.Tooltip>
    );
  }
});

/**
 * Loading display
 * If state is null will display loading,
 * If state is false will display failed, and
 * If state is truth y will display loaded
 */
Format.Loading = React.createClass({
  getDefaultProps: function() {
    return {
      state:    false,    // null implies loading, false implies error
      subject:  "data"    // name for the thing we're loading
    }
  },

  // Validate properties, state can be null, false, or anything, so we don't
  // bother with it.
  propTypes: {
    subject:    React.PropTypes.string.isRequired
  },

  // Render a loading, error or loaded box
  render: function() {
    var title, text, style;
    if (this.props.state === false) {
      style = 'danger';
      title = 'Error!';
      text  = "Failed to load " + this.props.subject + "...";
    } else if (this.props.state === null) {
      style = 'info';
      title = 'Loading,';
      text  = "Loading " + this.props.subject + "...";
      return (
        <span>
          <i className="glyphicon glyphicon-refresh loading"></i>
          &nbsp;
          {text}
        </span>
      );
    } else {
      style = 'success';
      title = 'Loaded,';
      text  = "Successfully loaded " + this.props.subject + "...";
    }

    // Return parameterized loader
    return (
      <div className={"alert alert-" + style}>
        <strong>{title}</strong>&nbsp;
        {text}
      </div>
    );
  }
});

/** Render bootstrap-select */
Format.Select = React.createClass({
  // Validate properties
  propTypes: {
    entries:  React.PropTypes.arrayOf(React.PropTypes.shape({
      text:   React.PropTypes.string.isRequired,
      value:  React.PropTypes.string.isRequired
    })).isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  // Construct selector
  componentDidMount: function() {
    $(this.refs.select.getDOMNode()).selectpicker();
    $(this.refs.select.getDOMNode()).change(function() {
      var value = $(this.refs.select.getDOMNode()).val();
      this.props.onChange(value);
    }.bind(this));
    $(this.refs.select.getDOMNode()).change();
  },

  // Destroy selector
  componentWillUnmount: function() {
    $(this.refs.select.getDOMNode()).selectpicker('destroy');
  },

  // Render selector
  render: function() {
    var options = this.props.entries.map(function(entry) {
      return <option key={entry.value}
                     value={entry.value}>{entry.text}</option>;
    }, this)
    return <select ref="select">{options}</select>;
  }
});


// End of module
})(this);
