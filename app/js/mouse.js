module.exports = function getMouse(canvas, e) {
    const rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: parseInt(e.clientX - rect.left) * scaleX,
        y: parseInt(e.clientY - rect.top) * scaleY
    };
}