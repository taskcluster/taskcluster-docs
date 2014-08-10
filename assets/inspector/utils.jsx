/** @jsx React.DOM */
(function(exports) {

var Utils = exports.Utils = {};

/** Conditional show children */
Utils.If = React.createClass({
  // Validate that we have children we can render
  propTypes: {
    children:   React.PropTypes.renderable.isRequired
  },

  // Render either the If or the Else part
  render: function() {
    var Else = <span></span>;
    var If   = this.props.children;

    // Find else statement if there is one
    if (this.props.children instanceof Array) {
      var index = this.props.children.length;
      this.props.children.forEach(function(obj, i) {
        if (obj) {
          if (obj.type) {
            if (obj.type.displayName === 'Else') {
              index = i;
            }
          }
        }
      });

      // If and Else children
      If    = this.props.children.slice(0, index);
      Else  = this.props.children.slice(index + 1);
    }

    // Return If or Else depending on condition
    return <span>{this.props.condition ? If : Else}</span>
  }
});

/** Else for If statement to use */
Utils.Else = React.createClass({
  // Render with a warning in console and print some <Else>
  // people should never render this
  render: function() {
    console.log("You shouldn't be rendering the Else class!");
    return <b>"&lt;Else&gt;"</b>;
  }
});

/** Wrap children in a <span> that holds a tooltip */
Utils.Tooltip = React.createClass({
  // Get default property for placement
  getDefaultProps: function() {
    return {
      placement:    'top'
    };
  },

  // Validate properties
  propTypes: {
    // Need children otherwise you can view the tooltip and it makes no
    // sense to have a tooltip
    children:   React.PropTypes.any.isRequired,
    title:      React.PropTypes.string.isRequired,
    placement:  React.PropTypes.oneOf([
                  'top',
                  'left',
                  'right',
                  'bottom'
                ]).isRequired
  },

  // Initialize tooltip
  componentDidMount: function() {
    jQuery(this.refs.tooltip.getDOMNode()).tooltip();
  },

  // Remove tooltip
  componentWillUnmount: function() {
    jQuery(this.refs.tooltip.getDOMNode()).tooltip('destroy');
  },

  // Render a tooltip
  render: function() {
    return (
      <span ref="tooltip"
            data-placement={this.props.placement}
            title={this.props.title}>
        {this.props.children}
      </span>
    );
  }
});

/** Mixing for loading state from a promise */
Utils.LoadStateMixin = {
  /// Load state for `key` using promise
  loadState: function(key, promise) {
    // Store promise so that we can check to ensure we're loading from it
    this['__'  + key + '_promise'] = promise;

    // Set `key` of state to `value`
    var setState = function(value) {
      // Don't set state if we have started to load state from another
      // promise for this specific key
      if (this['__'  + key + '_promise'] !== promise) {
        return;
      }
      var state = {};
      state[key] = value;
      this.setState(state);
    }.bind(this);

    // If no promise is given we're not waiting for anything
    if (!promise) {
      return setState(false); // false implies error
    }

    // Null implies loading
    setState(null);

    // setState to result if successful and false if unsuccessful
    promise.then(setState, function() {
      setState(false);  // false implies error
    });
  }
};


/** Create a window.location.hash mixing
 *
 * options: {
 *   keys:    [...] // List of keys from string to use in hash
 * }
 */
Utils.LocationHashMixin = function(options) {
  return {
    // Restore initial state from hash
    componentWillMount: function() {
      this.setState(this.parseHash());
    },

    // Listen for hash changes
    componentDidMount: function() {
      window.addEventListener('hashchange', this.onHashChange);
    },

    // Stop listening for hash changes
    componentWillUnmount: function() {
      window.removeEventListener('hashchange', this.onHashChange);
    },

    // Parse state from hash string
    parseHash: function() {
      var state = {};
      var parts = window.location.hash.substr(1).split('/');
      for(var i = 0; i < options.keys.length; i++) {
        var key = options.keys[i];
        if (i + 1 < options.keys.length) {
          state[key] = (parts[i] !== undefined ? parts[i] : '');
        } else {
          state[key] = parts.slice(i).join('/');
        }
      }
      return state;
    },

    // Update state when the hash changes
    onHashChange: function() {
      var state = this.parseHash();
      this.onHashChangedState(state); // And notify parent
      this.setState(state);
    },

    // Render hash-based state to window.location.hash
    renderHash: function() {
      // Make the hash string
      var hash = options.keys.map(function(key) {
        return (this.state[key] !== undefined ? this.state[key] : '');
      }, this).join('/').replace(/\/+$/, '');
      // Check if it's equal
      if (window.location.hash.substr(1) !== hash) {
        // Update it
        window.removeEventListener('hashchange', this.onHashChange);
        window.location.hash = hash;
        window.addEventListener('hashchange', this.onHashChange);
      }
    }
  };
};



// End of module
})(this);
