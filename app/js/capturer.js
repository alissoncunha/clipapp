const { ipcRenderer, desktopCapturer, shell, screen } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { AreaSelector } = require(path.resolve('app/js/areaselector'));

const canvas = document.querySelector('canvas'),
    pointer = screen.getCursorScreenPoint(),
    display = screen.getDisplayNearestPoint(pointer),
    screenshot = new AreaSelector(
        canvas, display.workAreaSize.width, display.workAreaSize.height
    );

function screenShotArea(display) {
    const screenSize = display.workAreaSize,
        dimension = Math.max(screenSize.width, screenSize.height) * window.devicePixelRatio;
        
    return {
        width: dimension,
        height: dimension
    };
}

screenshot.onSelected = (areaSize) => {
    const opts = {
        sourceOpts: { types: ['screen'], thumbnailSize: screenShotArea(display) }
    };

    takeSnapshot(opts, () => {});
};

function takeSnapshot(opts, cb) {
    const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');

    desktopCapturer.getSources(opts.sourceOpts, (error, sources) => {
        if (error) throw error;
    
        const source = sources[0];
    
        fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (err) => {
            if (err) return console.log(err.message);
            // shell.openExternal(`file://${screenshotPath}`);
        });
    });
}

screenshot.start();

