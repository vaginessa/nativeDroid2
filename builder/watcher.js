'use strict';

let config = require('./../config.json');
let chokidar = require('chokidar');
let shell = require('shelljs');

const listenedEvents = [
    'add',
    'unlink',
    'change',
];

let watcher = chokidar.watch(config.path.source, {
    ignored: /[\/\\]\./,
    ignoreInitial: true,
}).on(
    'all', (event, path) => {
        if (
            ~listenedEvents.indexOf(event) &&
            !~path.indexOf('___jb_tmp___')
        ) {
            let fileArr = path.split('.');
            let fileType = fileArr[fileArr.length - 1].toLowerCase();
            watchCallback(event, path, fileType);
        }
    }
);

function watchCallback(event, path, type) {

    console.log(new Date());
    console.log(event,path);

    switch(type) {
        case 'js' :
            shell.exec('npm run build:babel && npm run build:browserify');
            break;
        case 'scss' :
            shell.exec('npm run build:sass');
            break;
        default :
            break;
    }
}