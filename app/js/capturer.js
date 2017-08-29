const { ipcRenderer, desktopCapturer, screen, clipboard } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { AreaSelector } = require(path.resolve(`${__dirname}/js/areaselector`));

const canvas = document.querySelector('canvas'),
    pointer = screen.getCursorScreenPoint(),
    display = screen.getDisplayNearestPoint(pointer),
    screenshot = new AreaSelector(
        canvas, display.size.width, display.size.height
    );

function screenShotArea(display) {
    const screenSize = display.size;

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

    const notify = new Notification('Upload', { 
        body: 'Realizando upload no imgr',
        icon: `${__dirname}/assets/upload.png`,
        silent: true
    });

    takeSnapshot(opts, (path) => {
        ipcRenderer.send('finish-snapshot', path);
    });
};

function takeSnapshot(opts, cb) {
    const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');

    desktopCapturer.getSources(opts.sourceOpts, (error, sources) => {
        if (error) throw error;

        let source = sources.find(f => f.id.match(/(\d+)/)[0] == display.id),
            image = source.thumbnail;

        if (opts.crop) {
            image = source.thumbnail.crop(opts.crop);
        };
    
        fs.writeFile(screenshotPath, image.toPNG(), (err) => {
            if (err) return console.log(err.message);
            cb(screenshotPath);
        });
    });
}

ipcRenderer.on('success', (ev, link) => {
    let notify = new Notification('Upload realizado no imgrl', {
        body: link,
        icon: `${__dirname}/assets/download.png`
    });

    notify.onclick = () => {
        clipboard.writeText(link);
    };
});

screenshot.start();

