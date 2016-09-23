var sheet = document.createElement('style')
// Set primary color
var pcolor = localStorage.getItem('pcolor');
var scolor = localStorage.getItem('scolor');

var randomNumber = Math.random() * 1;
function speedMeter() {

  objects.tube.speedX *= 1.001;
  if (objects.tube.speedX > canvas.width/50) {
    objects.tube.speedX *= 0.5
  }

}
// Set The basic variables
var w = window.innerWidth;
var h = window.innerHeight;

function show(element, type = 'flex') {
    element.style.display = type
}
function hide(element) {
    element.style.display = 'none'
}
function sItem(itemtoset, value) {
    localStorage.setItem(itemtoset, value)
}
function gItem(itemtoset) {
    localStorage.getItem(itemtoset)
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

    }

var canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

var startGame;
var randomHeight = function() {
    return Math.random() * (canvas.height - 200)
}
var randomWidth = function() {
    return Math.random() * canvas.width
}
var objects;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = scolor;
    ctx.shadowBlur = 7;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = '#111';
    ctx.font = '20px Georgia'
    objects = {
        world: {
            gravity: 0.35
        },
        bird: {
            height: canvas.height / 10,
            width: canvas.height / 10,
            speedX: 0,
            speedY: 1,
            posX: function() {
                return canvas.width / 2 - this.width / 2
            },
            posY: 5,
            check: function() {
                return this.posX
            },
            bounce: function() {
                if (this.posY + this.height > canvas.height) {
                    this.posY += -4;
                    this.speedY *= -.8;
                } else if (this.posY < 0) {
                    this.posY += 4;
                    this.speedY *= -.8;
                }
            },
            draw: function() {
                this.bounce();
                ctx.fillRect(this.posX(), this.posY += this.speedY += objects.world.gravity, this.width, this.height);
            },
            die: function() {
                if (((this.posX() > objects.tube.posX || (this.posX() + this.width) > objects.tube.posX) && this.posX() < (objects.tube.posX + objects.tube.width)) && ((this.posY > objects.tube.posY() || (this.posY + this.height) > objects.tube.posY()) && this.posY < (objects.tube.posY() + objects.tube.height))) {
                    setRecord();
                    window.cancelAnimationFrame(startGame);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    objects.tube.posX = canvas.width;
                    objects.points.value = 0;
                    this.posY = 0;
                    show(interface.all)
                }
            }

        },
        tube: {
            height: randomHeight(),
            width: 40,
            speedX: canvas.width / 100,
            speedY: 0,
            posX: canvas.width * 2,
            posY: function() {
                if (randomNumber > 0.5) {
                    return canvas.height - this.height;
                } else {
                    return 0
                }
            },
            check: function() {
                return this.posX
            },
            draw: function() {
                ctx.fillRect(this.posX -= this.speedX, this.posY(), this.width, this.height);

                  if (this.posX < 0 || this.posX > canvas.width) {
                      this.posX = canvas.width;
                      objects.points.value += 1;
                      var randomHeight = function() {
                          return Math.random() * (canvas.height - 200)
                      }
                      this.height = randomHeight();
                      randomNumber = Math.random() * 1;

                  }



            }
        },
        points: {
            value: 0,
            style: function() {
                ctx.font = '30px Verdana'
            },
            draw: function() {
                this.style();
                ctx.fillText(this.value, canvas.height / 25, canvas.height - canvas.height / 25)
            }
        }
    };
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
function birdFlap() {
    objects.bird.speedY = -10;
}

canvas.addEventListener('mousedown', function(e) {
    birdFlap();
    e.preventDefault()
}, false);
canvas.addEventListener('touchstart', function(e) {
    birdFlap();
    e.preventDefault()
}, false);

interface.play.onclick = function() {
    drawStuff();
    resizeCanvas();
    hide(interface.all)
}
interface.info.open.onclick = function() {
    show(interface.info.tab, 'block')
}
interface.info.close.onclick = function() {
  hide(interface.info.tab)
}
interface.settings.open.onclick = function() {
  show(interface.settings.tab, 'block')
}
interface.settings.close.onclick = function() {
  hide(interface.settings.tab)
}
interface.settings.apply.onclick = function() {
  pcolor = (<HTMLInputElement>document.getElementById('pcolor')).value;
  scolor = (<HTMLInputElement>document.getElementById('scolor')).value;
  localStorage.setItem('pcolor', pcolor);
  localStorage.setItem('scolor', scolor);
  refreshStyle();
}
function refreshStyle() {
  (<HTMLMetaElement>document.getElementById('chrome-color')).content = pcolor;
  sheet.innerHTML = `body {
    background-color: ${pcolor}
  }
  .btn-icon {
    background-color: ${scolor} !important;
    color: ${pcolor} !important
  }
  .btn {
    color: ${pcolor}
  }`;
}
document.body.appendChild(sheet);
window.onload = function() {

    show(interface.all);
    resizeCanvas();
    refreshStyle()
};
