const {BrowserWindow, ipcMain} = require('electron');

const capturer = {
    url: `file://${process.cwd()}/app/capturer.html`
};

let window = null;

function init() {
    const { screen } = require('electron'),
        pointer = screen.getCursorScreenPoint(),
        display = screen.getDisplayNearestPoint(pointer),
        {width,height} = display.workArea;

    window = new BrowserWindow({
        width, height,
        transparent: true,
        frame: false,
        minWidth: width,
        minHeight: height
    });

    window.loadURL(capturer.url);
    window.show();
}

ipcMain.on('saveToImgr', (ev) => {
    
});

module.exports = init;