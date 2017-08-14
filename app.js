const { app, BrowserWindow } = require('electron');
// const reload = require('electron-reload')(__dirname);
const menubar = require('menubar');

const { onReady } = require('./core/events');

const options = {
    index: `file://${__dirname}/app.html`
};

const mb = menubar(options);

mb.on('ready', onReady);
