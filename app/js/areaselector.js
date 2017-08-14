const path = require('path');
const getMouse = require(path.resolve('app/js/mouse'));

class AreaSelector {
    constructor(canvas, width, height) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        // this._image = new Image();

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        //privates
        this.selecting = false;

        //publics
        this.onSelected = null;
    }

    start() {
        this._canvas.style.cursor = 'cell';
        this._events();
    }

    _events() {
        this._canvas.addEventListener('mousedown', (e) => this._onmousedown(e));
        this._canvas.addEventListener('mousemove', (e) => this._onmousemove(e));
    }

    _draw() {
        this._context.beginPath();
        this._context.rect(this.x, this.y, this.width, this.height);
        this._context.fillStyle = 'rgba(68, 68, 68, .25)';
        this._context.fill();
    }

    _onmousedown(e) {
        const mouse = getMouse(this._canvas, e);

        this.x = mouse.x;
        this.y = mouse.y;

        this.selecting = true;

        this._draw();
    }

    _onmousemove(e) {
        if (this.selecting) {
            
        }
    }

    _onmouseup() {
        
    }
}

module.exports = {
    AreaSelector
};