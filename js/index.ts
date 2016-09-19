
// Set primary color
var $pcolor = 'rgb(0, 73, 249)';
// Set secondary color
var $scolor = '#333';
var randomNumber = Math.random() * 1;

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
var objects = {
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
                console.log(this.height);
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
        style: function() {
            ctx.fillStyle = '#fcfcfc';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#111';
            ctx.font = '20px Georgia'
        },
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
            if (this.posX < 0) {
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
function setRecord() {
    if (objects.points.value > localStorage.getItem('record')) {
        localStorage.setItem('record', objects.points.value);
    }
    interface.elements.score.innerHTML = 'Record: ' + localStorage.getItem('record');
}
setRecord();
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
                    console.log(this.height);
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
            style: function() {
                ctx.fillStyle = '#fcfcfc';
                ctx.shadowBlur = 7;
                ctx.shadowOffsetY = 2;
                ctx.shadowColor = '#111';
                ctx.font = '20px Georgia'
            },
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
                if (this.posX < 0) {
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
    }

    function drawStuff() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    canvas.addEventListener('mousedown', function(e) {
        birdFlapStart();
        e.preventDefault()
    }, false);
    canvas.addEventListener('touchstart', function(e) {
        birdFlapStart();
        e.preventDefault()
    }, false);

    /**
     * Your drawings need to be inside this function otherwise they will be reset when
     * you resize the browser window and the canvas goes will be cleared.
     */
    //  interface.tab.onClick = function switchTab(event) {
    //
    //    console.log('ciao');
    //    event.preventDefault();
    //  }

    interface.elements.play.onclick = function() {
        drawStuff();
        hide(interface.all)
    }
    interface.elements.info.onclick = function() {
        show(interface.tabs.infotab, 'block')
    }
}

window.onload = function() {

    show(interface.elements.all, 'block');
    resizeCanvas();

};