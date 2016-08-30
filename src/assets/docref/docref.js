/** Document Reference Utility for TaskCluster */

var _renderLoadError = new EJS({
  url: '/assets/docref/load-error.ejs'
});

var _renderReference = new EJS({
  url: '/assets/docref/reference.ejs'
});

$(function() {
  $('.api-reference').each(function() {
    var container = $(this);

    try {
      container.html(_renderReference.render(referenceData));
      $('[data-toggle="tooltip"]').tooltip();
      if (window.renderSchemas) {
        renderSchemas();
      }
      // Wait 250ms and scroll to anchor after loading
      setTimeout(function() {
        var hash = (window.location.hash || "").substr(1);
        // be a little careful about what gets interpolated into the jQuery here
        if(hash && hash.match(/^[a-zA-Z0-9_ -]+$/)) {
          var anchor = $("a[name='"+ hash +"']");
          if (anchor.size() != 0) {
            $('html,body').scrollTop(anchor.offset().top);
          }
        }
      }, 250);
    } catch(e) {
      container.html(_renderLoadError.render(e));
    };
  });
});
