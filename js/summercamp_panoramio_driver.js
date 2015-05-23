(function ($) {
  Drupal.behaviors.summercamp_panoramio_driver = {
    attach : function (context, settings) {
      var gistsJsonUrl = 'https://api.github.com/gists/public';

      $.getJSON(gistsJsonUrl, function(gistsJson) {
        // The limit of the Gists that will be displayed.
        var latestGists = 3;

        for (var i = 0; i < latestGists; i++) {
          var gistTitle = gistsJson[i].description;
          var gistUrl = gistsJson[i].html_url;

          // Find the link item to be adjusted.
          var targetLinkIndex = i + 1;
          var targetLink = $('#block-summercamp-summercamp-panoramio-dynamic .latest-gist li:nth-child(' + targetLinkIndex + ') a');

          // Set the title and URL of the gist.
          if (gistTitle != '') {
            $(targetLink).text(gistTitle);
          }

          $(targetLink).attr('href', gistUrl);
        }
      });
    }
  };
})(jQuery);
