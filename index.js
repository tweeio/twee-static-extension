/**
 * Setting Static Files handling and serving
 * In development mode all the static files are served right from modules folders
 * In production mode all the static files should be collected and compressed.
 * So they will be collected in application/public/moduleName folder
 *
 * If in production S3 storage or any other CDN should be used - then it does not matter if
 * static serving is ON here. Because anyway compiled assets urls in CDN will be placed into HTML
 */
module.exports.extension = function() {
    "use strict";

    var express = require('express')
        , path = require('path');

    twee.emit('twee.setupStaticFilesServing.Start');
    var application = twee.getApplication()
        , assetsFolders = twee.getModulesAssetsFolders();

    // In development serving files in application/modules/moduleName/assets => site.com/assets/moduleName
    if (application.get('env') == 'development') {
        for (var moduleName in assetsFolders) {
            application.use('/assets/' + moduleName, express.static(assetsFolders[moduleName]));
        }
    }

    // ALWAYS serving files also in application/public => site.com/assets/
    application.use('/assets/', express.static(path.join(
        twee.getBaseDirectory(),
        twee.getConfig('twee:options:staticFiles:directory', 'public')
    )));
    twee.emit('twee.setupStaticFilesServing.End');
};
