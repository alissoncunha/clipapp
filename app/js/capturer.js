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
        width: screenSize.width * window.devicePixelRatio,
        height: screenSize.height * window.devicePixelRatio
    };
}

screenshot.onSelected = (areaSize) => {
    const opts = {
        sourceOpts: { types: ['screen'], thumbnailSize: screenShotArea(display) },
        crop: areaSize
    };

    takeSnapshot(opts, (path) => {
        shell.openExternal(`file://${path}`);
    });
};

function takeSnapshot(opts, cb) {
    const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');

    desktopCapturer.getSources(opts.sourceOpts, (error, sources) => {
        if (error) throw error;
        
        let source = sources[0],
            image = source.thumbnail;

        if (opts.crop) {
            image = source.thumbnail.crop(opts.crop);
        } 
    
        fs.writeFile(screenshotPath, image.toPNG(), (err) => {
            if (err) return console.log(err.message);
            cb(screenshotPath);
        });
    });
}

screenshot.start();

