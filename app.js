const menubar = require('menubar');

const { onReady } = require('./core/events');

const options = {
    index: `file://${__dirname}/app.html`,
    width: 300,
    height: 200,
    tooltip: ''
};

const mb = menubar(options);

mb.on('ready', onReady);