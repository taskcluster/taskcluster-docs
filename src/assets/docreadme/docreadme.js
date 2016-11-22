/** Document Reference Utility for TaskCluster */
$(function() {
  $('[data-doc-readme]').each(function() {
    var container = $(this);
    var url = container.data('doc-readme');

    request.post('https://cors-proxy.taskcluster.net/request', {url}).end().then(function(res) {
      var markup = marked(res.text);
      container.html(markup);
    })
  });
});
