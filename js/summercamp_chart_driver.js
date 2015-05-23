(function ($) {
  Drupal.behaviors.summercamp_chart_driver = {
    attach : function (context, settings) {
      var articlesJsonUrl = getBaseUrl() + 'articles/json';
      var alpha = 0;
      var beta = 0;

      $.getJSON(articlesJsonUrl, function(articlesJson) {
        var articles = articlesJson.data;

        for (nid in articles) {
          var article = articles[nid];

          var tag = article.field_tags.und[0].tid;
          var alphaTid = settings.tids.alpha;
          var betaTid = settings.tids.beta;

          switch (tag) {
            case alphaTid:
              alpha++;
              break;

            case betaTid:
              beta++;
              break;
          }
        }

        var data = [
          {
            value: alpha,
            color: 'yellowgreen',
          },
          {
            value: beta,
            color: 'gray',
          },
        ];

        // Check if we need to set the data labels and highlight color.
        for (var i = 0; i < data.length; i++) {
          if (settings.chart.label) {
            if (i == 0) {
              data[i].label = 'Alpha';
            }

            else {
              data[i].label = 'Beta';
            }
          }

          if (settings.chart.highlight_color) {
            data[i].highlight = settings.chart.highlight_color;
          }
        }

        var options = {};

        options.type = settings.chart.type;

        renderChart(data, options);
      });

      // Get the base url of the site to make the chart block correctly fetch
      // the JSON data from 'articles/json' path, whatever path the block
      // is currenlty on. Otherwise, the chart block will only work
      // in the front page.
      function getBaseUrl() {
        // Get all scripts in the page.
        var scripts = document.getElementsByTagName('script');

        var i, len, src, baseUrl;

        // Traverse the scripts.
        for (i = 0, len = scripts.length; i < len; i++) {
          src = scripts[i].src;

          // Include the JS scripts with set src attribute,
          // do not include scripts created on-the-fly.
          // Check if CNN Travel Maps library is found.
          if (src && src.indexOf('summercamp_chart_driver') != -1) {
            // Get the file index. Sample URL:
            // http://www.example.com/sites/all/modules/custom/summercamp/js/summercamp_chart_driver.js?notn34
            var siteIndex = src.indexOf('sites');

            // Build the base path to be used by the 'articles/json' router.
            // Sample base path: http//www.example.com/
            baseUrl = src.substring(0, siteIndex);

            return baseUrl;
          }
        }

        return '';
      }

      function renderChart(data, options) {
        var canvasElement = document.getElementById('chart-canvas');
        var canvasRenderingContext = canvasElement.getContext('2d');

        var chartInitialized = new Chart(canvasRenderingContext);

        switch (options.type) {
          case 'Pie':
            var chart = chartInitialized.Pie(data);
            break;

          case 'Doughnut':
            var chart = chartInitialized.Doughnut(data);
            break;
          }
      }
    }
  };
})(jQuery);
