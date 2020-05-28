var canvas = null,
    ctx = null;

function point(ctx) {
    ctx.fillStyle = '#0fo';
    ctx.fillReact(50, 50, 100, 60);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

window.addEventListener('load', init, false);