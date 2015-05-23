(function ($) {
  Drupal.behaviors.summercamp_chart_driver = {
    attach : function (context, settings) {
      var articlesJsonUrl = 'articles/json';
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
            highlight: 'lightblue',
            label: 'Alpha'
          },
          {
            value: beta,
            color: 'gray',
            highlight: 'lightblue',
            label: 'Beta'
          },
        ];

        var options = {};

        options.type = settings.chart.type;

        renderChart(data, options);
      });

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




