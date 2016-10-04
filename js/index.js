var sounds = {
    music: new Howl({
        src: ['audio/music.mp3'],
        volume: 0.6,
        rate: 0.7,
        onload: function () {
          refreshStyle();
          document.getElementById('loader').className += ' finished';
          setTimeout(function () {
              hide(document.getElementById('loader'));
          }, 2000);
          show(interface.all);
          resizeCanvas();
          sounds.music.play();
        }

    })
};
var sheet = document.createElement('style');
var pcolor = localStorage.getItem('pcolor') || 'black';
var scolor = localStorage.getItem('scolor') || 'orange';
var randomNumber = Math.random() * 1;
function speedMeter() {
    objects.tube.speedX *= 1.001;
    if (objects.tube.speedX > canvas.width / 45) {
        objects.tube.speedX *= 0.5;
    }
}
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
    info: {
        tab: document.getElementById('infotab'),
        open: document.getElementById('info'),
        close: document.getElementById('closeinfo'),
    },
    play: document.getElementById('play'),
    settings: {
        tab: document.getElementById('settingstab'),
        apply: document.getElementById('applysettings'),
        open: document.getElementById('settings'),
        close: document.getElementById('closesettings')
    },
    score: document.getElementById('score')
};
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var startGame;
var randomHeight = function () {
    return Math.random() * ((canvas.height/3)*2);
};
var randomWidth = function () {
    return Math.random() * canvas.width;
};
var objects;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = scolor;
    ctx.shadowBlur = 7;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = '#111';
    ctx.font = '20px Georgia';
    objects = {
        world: {
            gravity: canvas.height / 1000
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
                    this.posY += -10;
                    this.speedY *= -0.8;
                }
                else if (this.posY < 0) {
                    this.posY += 10;
                    this.speedY *= -0.8;
                }
            },
            draw: function () {
                this.bounce();
                ctx.fillRect(this.posX(), this.posY += this.speedY += objects.world.gravity, this.width, this.height);
            },
            die: function () {
                if (((this.posX() > objects.tube.posX || (this.posX() + this.width) > objects.tube.posX) && this.posX() < (objects.tube.posX + objects.tube.width)) && ((this.posY > objects.tube.posY() || (this.posY + this.height) > objects.tube.posY()) && this.posY < (objects.tube.posY() + objects.tube.height))) {
                    setRecord();
                    sounds.music.rate(0.7);
                    sounds.music.seek(0);
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
            width: canvas.width / 10,
            speedX: canvas.width / 150,
            speedY: 0,
            posX: (canvas.width/2)*3,
            posY: function () {
                if (randomNumber > 0.5) {
                    return canvas.height - this.height;
                }
                else {
                    return 0;
                }
            },
            check: function () {
                console.log(this.speedX);
            },
            draw: function () {
                ctx.fillRect(this.posX -= this.speedX, this.posY(), this.width, this.height);
                if (this.posX < -this.width) {
                    this.posX = canvas.width;
                    objects.points.value += 1;
                    randomHeight = function () {
                        return Math.random() * ((canvas.height/3)*2);
                    };
                    this.height = randomHeight();
                    randomNumber = Math.random() * 1;
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
    function birdFlap() {
        objects.bird.speedY = -canvas.height / 70;

    }
    canvas.addEventListener('mousedown', function (e) {
        birdFlap();

        e.preventDefault();
    }, false);
    canvas.addEventListener('touchstart', function (e) {
        birdFlap();
        e.preventDefault();
    }, false);
    window.addEventListener('keydown', function () {
        birdFlap();
    });

}
resizeCanvas();
function setRecord() {
    if (objects.points.value > localStorage.getItem('record')) {
        localStorage.setItem('record', objects.points.value);
    }
    interface.score.innerHTML = 'Record: ' + localStorage.getItem('record');
}
setRecord();
function drawStuff() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    speedMeter();
    objects.bird.draw();
    objects.tube.draw();
    objects.points.draw();
    startGame = window.requestAnimationFrame(drawStuff);
    objects.bird.die();
}
interface.play.onclick = function () {
    drawStuff();
    resizeCanvas();
    hide(interface.all);
    sounds.music.rate(1);
    sounds.music.seek(13.5);
};
interface.info.open.onclick = function () {
    show(interface.info.tab, 'block');
};
interface.info.close.onclick = function () {
    hide(interface.info.tab);
};
interface.settings.open.onclick = function () {
    show(interface.settings.tab, 'block');
};
interface.settings.close.onclick = function () {
    hide(interface.settings.tab);
};
interface.settings.apply.onclick = function () {
    pcolor = document.getElementById('pcolor').value;
    scolor = document.getElementById('scolor').value;
    localStorage.setItem('pcolor', pcolor);
    localStorage.setItem('scolor', scolor);
    refreshStyle();
};
function refreshStyle() {
    document.getElementById('chrome-color').content = pcolor;
    sheet.innerHTML = "body, .box {    background-color: " + pcolor + " !important  }  .btn-icon, .obstacles, .cube {    background-color: " + scolor + " !important;    color: " + pcolor + " !important  }  .btn {    color: " + pcolor + "  }  ";
}
document.body.appendChild(sheet);
