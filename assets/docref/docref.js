/** Document Reference Utility for TaskCluster */

var _renderLoadError = new EJS({
  url: '/assets/docref/load-error.ejs'
});

var _renderReference = new EJS({
  url: '/assets/docref/reference.ejs'
});

$(function() {
  $('*[data-doc-ref]').each(function() {
    var container = $(this);
    var reference = container.data('doc-ref');
    request.get(reference).end().then(function(res) {
      console.log(res.body);
      container.html(_renderReference.render(res.body));
      renderSchemas();
    }, function() {
      container.html(_renderLoadError.render({reference: reference}));
    });
  });
});







