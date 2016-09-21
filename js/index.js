var sheet = document.createElement('style');
var pcolor = localStorage.getItem('pcolor');
var scolor = '#333';
var randomNumber = Math.random() * 1;
var w = window.innerWidth;
var h = window.innerHeight;
function show(element, type) {
    if (type === void 0) { type = 'flex'; }
    element.style.display = type;
}
function hide(element) {
    element.style.display = 'none';
}
function sItem(itemtoset, value) {
    localStorage.setItem(itemtoset, value);
}
function gItem(itemtoset) {
    localStorage.getItem(itemtoset);
}
var interface = {
    all: document.getElementById('interface'),
    elements: {
        all: document.getElementById('buttoncontainer'),
        info: document.getElementById('info'),
        play: document.getElementById('play'),
        settings: document.getElementById('settings'),
        score: document.getElementById('score')
    },
    tabs: {
        infotab: document.getElementById('infotab')
    }
};
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var startGame;
var randomHeight = function () {
    return Math.random() * (canvas.height - 200);
};
var randomWidth = function () {
    return Math.random() * canvas.width;
};
var objects;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    objects = {
        world: {
            gravity: 0.35
        },
        bird: {
            height: canvas.height / 10,
            width: canvas.height / 10,
            speedX: 0,
            speedY: 1,
            posX: function () {
                return canvas.width / 2 - this.width / 2;
            },
            posY: 5,
            check: function () {
                return this.posX;
            },
            bounce: function () {
                if (this.posY + this.height > canvas.height) {
                    this.posY += -4;
                    this.speedY *= -.8;
                }
                else if (this.posY < 0) {
                    this.posY += 4;
                    this.speedY *= -.8;
                }
            },
            draw: function () {
                this.bounce();
                ctx.fillRect(this.posX(), this.posY += this.speedY += objects.world.gravity, this.width, this.height);
            },
            die: function () {
                if (((this.posX() > objects.tube.posX || (this.posX() + this.width) > objects.tube.posX) && this.posX() < (objects.tube.posX + objects.tube.width)) && ((this.posY > objects.tube.posY() || (this.posY + this.height) > objects.tube.posY()) && this.posY < (objects.tube.posY() + objects.tube.height))) {
                    setRecord();
                    window.cancelAnimationFrame(startGame);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    objects.tube.posX = canvas.width;
                    objects.points.value = 0;
                    this.posY = 0;
                    show(interface.all);
                }
            }
        },
        tube: {
            height: randomHeight(),
            width: 40,
            style: function () {
                ctx.fillStyle = '#fcfcfc';
                ctx.shadowBlur = 7;
                ctx.shadowOffsetY = 2;
                ctx.shadowColor = '#111';
                ctx.font = '20px Georgia';
            },
            speedX: canvas.width / 100,
            speedY: 0,
            posX: canvas.width * 2,
            posY: function () {
                if (randomNumber > 0.5) {
                    return canvas.height - this.height;
                }
                else {
                    return 0;
                }
            },
            check: function () {
                return this.posX;
            },
            draw: function () {
                ctx.fillRect(this.posX -= this.speedX, this.posY(), this.width, this.height);
                var points = objects.points.value;
                if (points < 10 || points > 20 && points < 30) {
                    if (this.posX < 0 || this.posX > canvas.width) {
                        this.posX = canvas.width;
                        objects.points.value += 1;
                        var randomHeight = function () {
                            return Math.random() * (canvas.height - 200);
                        };
                        this.height = randomHeight();
                        randomNumber = Math.random() * 1;
                    }
                }
                else {
                    if (this.posX < 0 || this.posX > canvas.width) {
                        this.speedX *= -1;
                        this.posX = 0;
                        objects.points.value += 1;
                        var randomHeight = function () {
                            return Math.random() * (canvas.height - 200);
                        };
                        this.height = randomHeight();
                        randomNumber = Math.random() * 1;
                    }
                }
            }
        },
        points: {
            value: 0,
            style: function () {
                ctx.font = '30px Verdana';
            },
            draw: function () {
                this.style();
                ctx.fillText(this.value, canvas.height / 25, canvas.height - canvas.height / 25);
            }
        }
    };
}
resizeCanvas();
function setRecord() {
    if (objects.points.value > localStorage.getItem('record')) {
        localStorage.setItem('record', objects.points.value);
    }
    interface.elements.score.innerHTML = 'Record: ' + localStorage.getItem('record');
}
setRecord();
function drawStuff() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.tube.speedX += 0.01;
    if (objects.tube.speedX > 20) {
        objects.tube.speedX = 1;
    }
    objects.tube.style();
    objects.bird.draw();
    objects.tube.draw();
    objects.points.draw();
    startGame = window.requestAnimationFrame(drawStuff);
    objects.bird.die();
}
function birdFlapStart() {
    objects.bird.speedY = -10;
}
canvas.addEventListener('mousedown', function (e) {
    birdFlapStart();
    e.preventDefault();
}, false);
canvas.addEventListener('touchstart', function (e) {
    birdFlapStart();
    e.preventDefault();
}, false);
document.getElementById('play').onclick = function () {
    drawStuff();
    resizeCanvas();
    hide(interface.all);
};
document.getElementById('info').onclick = function () {
    show(interface.tabs.infotab, 'block');
};
document.getElementById('closeinfo').onclick = function () {
    hide(interface.tabs.infotab);
};
document.getElementById('settings').onclick = function () {
    show(document.getElementById('settingstab'), 'block');
};
document.getElementById('closesettings').onclick = function () {
    hide(document.getElementById('settingstab'));
};
document.getElementById('applysettings').onclick = function () {
    pcolor = document.getElementById('color').value;
    localStorage.setItem('pcolor', pcolor);
    refreshStyle();
};
function refreshStyle() {
    document.getElementById('chrome-color').content = pcolor;
    sheet.innerHTML = "body {\n    background-color: " + pcolor + "\n  }\n  .btn {\n    color: " + pcolor + "\n  }";
}
document.body.appendChild(sheet);
window.onload = function () {
    show(interface.elements.all, 'block');
    resizeCanvas();
    refreshStyle();
};
