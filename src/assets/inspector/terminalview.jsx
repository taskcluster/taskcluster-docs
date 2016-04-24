/** @jsx React.DOM */
(function(exports) {

/** Display a log file */
exports.TerminalView = React.createClass({
  getDefaultProps: function() {
    return {
      url:            undefined,  // No URL to display at this point
      options: {
        cols:         120,
        rows:         40,
        cursorBlink:  true,
        visualBell:   false,
        popOnBell:    false,
        screenKeys:   false,
        scrollback:   50000,
        debug:        false,
        useStyle:     true
      }
    };
  },

  propTypes: {
    url:      React.PropTypes.string,
    options:  React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(props) {
    if (this.props.url !== props.url) {
      this.reopen(props.url);
    }
  },

  // Refresh the currently displayed file
  refresh: function() {
    this.reopen(this.props.url);
  },

  componentDidMount: function() {
    if (!this.props.url) {
      this.term = new Terminal(this.props.options);
      this.term.open(this.refs.term.getDOMNode());
    } else {
      this.reopen(this.props.url);
    }
  },

  reopen: function(url) {
    if (this.term) {
      this.term.destroy();
      this.term = null;
    }
    this.term = new Terminal(this.props.options);
    this.term.open(this.refs.term.getDOMNode());
    this.dataOffset = 0;
    if (this.request) {
      this.abortRequest();
    }
    this.request = new XMLHttpRequest();
    this.request.open('get', url, true);
    this.request.addEventListener('progress', this.onData);
    this.request.addEventListener('load', this.onData);
    this.request.send();
  },

  onData: function() {
    // Write data to term if there is any data
    if (this.request.responseText !== null ||
        this.request.responseText !== undefined) {
      // Check if we have new data
      var length = this.request.responseText.length;
      if (length > this.dataOffset) {
        // Find new data
        var data = this.request.responseText.slice(this.dataOffset, length);
        // Update dataOffset
        this.dataOffset = length;
        // Write to term
        this.term.write(data);
      }
    }
    // When request is done
    if (this.request.readyState === this.request.DONE) {
      // Stop cursor from blinking
      this.term.cursorBlink = false;
      if (this.term._blink) {
        clearInterval(this.term._blink);
      }
      this.term.showCursor();

      // Write an error, if request failed
      if (this.request.status !== 200) {
        this.term.write("[task-inspector] Failed to fetch log!\r\n");
      }
    }
  },

  abortRequest: function() {
    this.request.removeEventListener('progress', this.onData);
    this.request.removeEventListener('load', this.onData);
    this.request.abort();
    this.request = null;
  },

  componentWillUnmount: function() {
    if (this.request) {
      this.abortRequest();
    }
    this.term.destroy();
    this.term = null;
  },

  render: function() {
    return <div className="terminal" ref="term"></div>;
  }
});


// End of module
})(this);