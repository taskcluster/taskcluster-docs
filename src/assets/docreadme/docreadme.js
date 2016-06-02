/** Document Reference Utility for TaskCluster */

$(function() {
  $('*[data-doc-readme]').each(function() {
    var container = $(this);
    var reference = container.data('doc-readme');
    request.get(fixUrlProtocol(reference)).end().then(function(res) {

      // render to html
      var markup = marked(res.text);
      container.html(markup);
    });
  });
});
