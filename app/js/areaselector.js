const path = require('path');
const { getMouse } = require(path.resolve('app/js/mouse'));

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

        this.onSelected(this._get());
    }

    _get() {
        return {
            x: this.x,
            y: this.y,
            width: this.lastx - this.x,
            height: this.lasty - this.y
        };
    }

    _destroy() {
        this._clear();

        this._canvas.removeEventListener('mouseup', this._onmouseup);
        this._canvas.removeEventListener('mousedown', this._onmousedown);
        this._canvas.removeEventListener('mousemove', this._onmousemove);
    }
}

module.exports = {
    AreaSelector
};