const {BrowserWindow, ipcMain, clipboard} = require('electron');
const imgur = require('./imgur');

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

function copyLink(body) {
    const {data} = JSON.parse(body);
    clipboard.writeText(data.link);
    return data.link;
};

ipcMain.on('finish-snapshot', (ev, file) => {
    window.hide();
    window = null;
    
    imgur(file, (err, req, body) => {
        ev.sender.send('success', copyLink(body));
    });
});

module.exports = init;