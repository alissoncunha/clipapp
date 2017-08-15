const {BrowserWindow, ipcMain} = require('electron');

const capturer = {
    url: `file://${process.cwd()}/app/capturer.html`
};

let window = null;

function init() {
    const { screen } = require('electron'),
        pointer = screen.getCursorScreenPoint(),
        display = screen.getDisplayNearestPoint(pointer),
        {width, height} = display.size,
        {x, y} = display.bounds;

    if (window) return;
    
    window = new BrowserWindow({
        x,
        y,
        width,
        height,
        transparent: true,
        frame: false,
        minWidth: width,
        minHeight: height,
        enableLargerThanScreen: true
    });

    window.loadURL(capturer.url);
    window.show();
}

ipcMain.on('finished-message', (ev) => {
    window = null;
    console.log('finished', ev);
});

module.exports = init;