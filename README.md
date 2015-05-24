# Some of the Most Useful Drupal Hooks/APIs

This module is a complementary material to my Drupal Summer Camp PH 2015's presentation:
http://www.slideshare.net/ranelpadon/the-synergy-of-drupal-hooksapis-implementing-a-custom-chart-block


### FEATURES/HIGHLIGHTS

1. **hook_install**(): Upon installation, the module will auto-create 2 Tags' terms: *alpha* and *beta*. It will then create 3 articles tagged with these 2 terms.
2. The module will generate **4 blocks**. Block 1 will show a chart in which the input data is a local JSON data consumed from the broadcasted JSON menu of the 3 newly-created articles. The chart also utilizes the 4 **#attached** use cases for JS: inline, setting, internal, and external types. Likewise, it showcases how to implement a custom configuration page using the Form API or to just utilize the **hook_block_configure**().
3. Block 2 features the fetching of external JSON data (i.e. Panoramio API for geolocated photos). The JSON data is processed on the **back-end** using **drupal_http_request**() and the block markup is set-up using a *theme function*.
4. Block 3 features the fetching of external JSON data (i.e. Panoramio API for geolocated photos). The JSON data is processed on the **back-end** using **drupal_http_request**() and the block markup is set-up using a *template file*. It also features the usage of Render API's **#theme** metaproperty. Block 2 and Block 3 are good example of *theme function* vs *template file* implementations.
5. Block 4 features the fetching of external JSON data (i.e. GitHub Gist API). But, the JSON data is processed on the **front-end** using **jQuery.getJSON**() and the block markup is set-up using Render API's built-in **#links** theme. The  block also included a driver file for adjusting the links' **titles** and **hrefs** during block rendering.
6. **hook_uninstall**(): Upon uninstallation, the module will remove all the installed custom **Variables**.


### HOW TO USE

You could conveniently download the [zipped file](https://github.com/ranelpadon/summercamp/archive/master.zip) from [GitHub](https://github.com/ranelpadon/summercamp). Just unzip the module folder and put it in your **sites/all/modules** folder. Sample screenshots are also included in the **screenshots** folder of the downloaded module.

After enabling the module and assuming your site is http://www.example.com:

1. If you're using the default **Bartik** theme, the blocks will automatically show in the Second Sidebar region, otherwise assign the blocks to a region of you choice in the **Blocks** configuration page: http://www.example.com/admin/structure/block
2. You may adjust the chart settings/options (chart type, highlight color, and enabling labels) here:
http://www.example.com/admin/config/custom/chart


### PHP NOTICE
You might encounter this warning notice upon enabling/installation of the module.
"*The block Featured Contents was assigned to the invalid region sidebar_second and has been disabled.*"

This is a known issue:
http://drupal.stackexchange.com/questions/90106/enabling-a-custom-module-generates-errors-for-undefined-regions-when-blocks-are?lq=1

For now just ignore it. If you're using a **Bartik** theme, the blocks will show in the Sidebar Second region. Otherwise, assign the 4 blocks to your preferred regions of your default and/or admin theme.
