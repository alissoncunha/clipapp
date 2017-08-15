const path = require('path');
const { getMouse } = require(path.resolve('app/js/mouse'));
const audio = new Audio(path.resolve('app/assets/camera.mp3'));

class AreaSelector {
    constructor(canvas, width, height) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;

        //privates
        this.selecting = false;

        //publics
        this.onSelected = null;

        this._canvas.width = width;
        this._canvas.height = height;
    }

    start() {
        this._canvas.style.cursor = 'cell';
        this._events();
        this._draw();
    }

    _events() {
        this._canvas.addEventListener('mousedown', (e) => this._onmousedown(e));
        this._canvas.addEventListener('mousemove', (e) => this._onmousemove(e));
        this._canvas.addEventListener('mouseup', (e) => this._onmouseup(e));
    }

    _clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    _draw() {
        this._clear();

        this._context.beginPath();
        this._context.fillStyle = 'rgba(68, 68, 68, .50)';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.closePath();

        this._context.clearRect(this.x, this.y, (this.lastx - this.x), (this.lasty - this.y));
        this._context.beginPath();
        this._context.strokeStyle = '#fff';
        this._context.lineWidth = 2;
        this._context.strokeRect(this.x, this.y, (this.lastx - this.x), (this.lasty - this.y));
        this._context.closePath();
    }

    _onmousedown(e) {
        const mouse = getMouse(this._canvas, e);

        e.preventDefault();

        if (!this.selecting) {
            this.x = mouse.x;
            this.y = mouse.y;
            this.lastx = mouse.x;
            this.lasty = mouse.x;
    
            this.selecting = true;
        }
    }

    _onmousemove(e) {
        const mouse = getMouse(this._canvas, e);

        e.preventDefault();

        if (this.selecting) {
            this.lastx = mouse.x;
            this.lasty = mouse.y;
            this._draw();
        }
    }

    _onmouseup(e) {
        e.preventDefault();

        this.selecting = false;
        this._destroy();

        audio.play();

        setTimeout(() => this.onSelected(this._get()), 50);
    }

    _get() {
        const ratio = window.devicePixelRatio;
        
        const x = Math.min(this.x, this.lastx),
            y = Math.min(this.y, this.lasty),
            lastx = Math.max(this.x, this.lastx),
            lasty = Math.max(this.y, this.lasty);

        return {
            x: parseInt(x) * ratio,
            y: parseInt(y) * ratio,
            width: parseInt(lastx - x) * ratio,
            height: parseInt(lasty - y) * ratio
        };
    }

    _destroy() {
        this._clear();

        this._canvas.style.cursor = 'none';

        this._canvas.removeEventListener('mouseup', this._onmouseup);
        this._canvas.removeEventListener('mousedown', this._onmousedown);
        this._canvas.removeEventListener('mousemove', this._onmousemove);
    }
}

module.exports = {
    AreaSelector
};