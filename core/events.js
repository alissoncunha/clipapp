const { globalShortcut } = require('electron');
const capturer = require('./screen');

function onReady() {
    globalShortcut.register('Alt+Shift+2', capturer);
}

module.exports = {
    onReady
};