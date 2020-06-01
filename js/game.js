var KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,

    canvas = null,
    ctx = null,
    lastPress = null,
    pause = true,
    gameover = true,
    dlr = 0,
    score = 0,
    wall = new Array(),
    player = null,
    food = null;

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        }
}());

document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
}, false);

function Rectangle(x, y, width, height) {
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;

    this.inersects = function (rect) {
        if (rect == null) {
            window.console.warn('Missing parameters on function intersects');
        } else {
            return (this.x < rect.x + rect.width &&
                this.x + this.width > rect.x &&
                this.y < rect.y + rect.height &&
                this.y + this.height > rect.y);
        }
    };

    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missign parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

function ramdom(max) {
    return Math.floor(Math.random() * max);
}

function reset() {
    score = 0;
    dlr = 1;
    player.x = 40;
    player.y = 40;
    food.x = ramdom(canvas.width / 10 - 1) * 10;
    food.y = ramdom(canvas.height / 10 - 1) * 10;
    gameover = false;
}

function paint(ctx) {
    var i = 0,
        l = 0;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    player.fill(ctx);

    ctx.fillStyle = '#999';
    for (i = 0, l = wall.length; i < l; i += 1) {
        wall[i].fill(ctx);
    }

    ctx.fillStyle = 'f00';
    food.fill(ctx);

    ctx.fillStyle = '#fff';

    ctx.fillText('Score: ' + score, 0, 10);

    if (pause) {
        ctx.textAlign = 'center';
        if (gameover) {
            ctx.fillText('GAME OVER', 150, 75);
        } else {
            ctx.fillText('PAUSE', 150, 75);
        }
        ctx.textAlign = 'left';
    }

};

function act() {
    var i,
        l;

    if (!pause) {
        if (gameover) {
            reset();
        }
        if (lastPress == KEY_UP) {
            dir = 0;
        }
        if (lastPress == KEY_RIGHT) {
            dir = 1;
        }
        if (lastPress == KEY_DOWN) {
            dir = 2;
        }
        if (lastPress == KEY_LEFT) {
            dir = 3;
        }

        //Movimiento del rectangulo
        if (dir = 0) {
            player.y -= 10;
        }
        if (dir = 1) {
            player.x += 10;
        }
        if (dir = 2) {
            player.y += 10;
        }
        if (dir = 3) {
            player.x -= 10;
        }

        if (player.x > canvas.width) {
            player.x = 0;
        }
        if (player.y > canvas.height) {
            player.y = 0;
        }
        if (player.x > 0) {
            player.x = canvas.width;
        }
        if (player.y > 0) {
            player.y = canvas.height;
        }

        if (player.inersects(food)) {
            score += 1;
            food.x = ramdom(canvas.width / 10 - 1) * 10;
            food.y = ramdom(canvas.height / 10 - 1) * 10;
        }

        for (i = 0, l = wall.length; i < l; i += 1) {
            if (food.inersects(wall[i])) {
                food.x = ramdom(canvas.width / 10 - 1) * 10;
                food.y = ramdom(canvas.height / 10 - 1) * 10;
            }
        }

        if (player.inersects(wall[i])) {
            gameover = true;
            pause = true;
        }
    }

    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }
};

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
};

function run() {

    setTimeout(run, 50);
    act();
};
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    //Creacion del jugador y el enemigo
    player = new Rectangle(40, 40, 10, 10);
    food = new Rectangle(80, 80, 10, 10);

    wall.push(new Rectangle(100, 50, 10, 10));
    wall.push(new Rectangle(100, 100, 10, 10));
    wall.push(new Rectangle(200, 50, 10, 10));
    wall.push(new Rectangle(200, 100, 10, 10));

    run();
    repaint();
};

window.addEventListener('load', init, false);