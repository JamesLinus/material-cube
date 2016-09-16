
// Set primary color
var $pcolor = 'rgb(0, 73, 249)';
// Set secondary color
var $scolor = '#333';
var randomNumber = Math.random() * 1;

// Set The basic variables
var w = window.innerWidth;
var h = window.innerHeight;
var canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var startGame;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var randomHeight = function() {
        return Math.random() * (canvas.height - 200)
    }
    var randomWidth = function() {
        return Math.random() * canvas.width
    }
    var objects = {
        bird: {
            height: 100,
            width: 100,
            speedX: 0,
            speedY: 1.015,
            posX: function() {
                return canvas.width / 2 - this.width
            },
            posY: 5,
            check: function() {
                return this.posX
            },
            draw: function() {

                ctx.fillRect(this.posX(), this.posY *= this.speedY, 100, 100);
            },
            die: function() {
                if (((this.posX() > objects.tube.posX || (this.posX() + this.width) > objects.tube.posX) && this.posX() < (objects.tube.posX + objects.tube.width)) && ((this.posY > objects.tube.posY() || (this.posY + this.height) > objects.tube.posY()) && this.posY < (objects.tube.posY() + objects.tube.height)))  {
                    clearInterval(startGame);
                    console.log('dovresti morir')
                }

            }

        },
        tube: {
            height: randomHeight(),
            width: 40,
            style: function() {
                ctx.fillStyle = '#fcfcfc';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#111'
            },
            speedX: canvas.width / 200,
            speedY: 0,
            posX: canvas.width*2,
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
                    var randomHeight = function() {
                        return Math.random() * (canvas.height - 200)
                    }
                    this.height = randomHeight();
                    randomNumber = Math.random() * 1;
                }
            }
        }
    }
    function drawStuff() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        objects.tube.style();
        objects.bird.draw();

        objects.tube.draw();
        objects.bird.die();
    }
    startGame = setInterval(drawStuff, 10);
    function birdFlapStart() {
        objects.bird.speedY = .985;
    }
    function birdFlapStop() {
        objects.bird.speedY = 1.015;
    }
    canvas.addEventListener('mousedown', function(e) {
        birdFlapStart();
        e.preventDefault()
    }, false);
    canvas.addEventListener('touchstart', function(e) {
        birdFlapStart();
        e.preventDefault()
    }, false);
    canvas.addEventListener('mouseup', function(e) {
        birdFlapStop();
        e.preventDefault()
    }, false);
    canvas.addEventListener('touchend', function(e) {
        birdFlapStop();
        e.preventDefault()
    }, false);
    /**
     * Your drawings need to be inside this function otherwise they will be reset when
     * you resize the browser window and the canvas goes will be cleared.
     */
    drawStuff();
}
resizeCanvas();
