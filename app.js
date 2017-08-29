const { autoUpdater } = require('electron-updater');
const menubar = require('menubar');

const { onReady } = require('./core/events');

const options = {
    index: `file://${__dirname}/app.html`,
    width: 300,
    height: 200,
    icon: `${__dirname}/icon.png`,
    preloadWindow: true,
    windowPosition: 'trayLeft'
};

const mb = menubar(options);

mb.on('ready', onReady);