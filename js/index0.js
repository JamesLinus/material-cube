$('#score').text('Record: ' + localStorage.getItem('record'));
$('#infobutton').click(
  function () {
    $('#info').toggle('slow');
  }
);
// 		Definisce la velocita'
var speed = 0.8;
var tubi;
var firstColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
$('body').css('background', firstColor);
// 		Definisce i movimenti
function goMove(sign, x, y) {
    return sign + x * speed + y;
}
// 		Definisce flappy
var bird = $('#flappy');
//  Definisce il battito di ali
var flappyFly = function() {
    bird.animate({
        'bottom': '+=15vh'
    }, 50, 'linear');
};
// 		Crea la gravita'
function worldGravity() {
    if (bird.css('bottom') <= '0vw') {
        bird.css('bottom', '0vh');
        // console.log(bird.attr('style').indexOf('bottom: -1px'))
    } else {
        bird.css('bottom', goMove('-=', 0.5, 'vh'));
    }
}
// 		Spawna i tubi
function tubesSpawn() {
    var randomHeight = (Math.random() * 70) + 10;
    $('#tubi').append('<div style="height: ' + randomHeight + 'vh' + '"></div>');
    // 	 Definisce i tubi
    tubi = $('#tubi div');

}

// 		Muove i tubi
function tubesMove() {
    tubi = $('#tubi div');

    tubi.each(function() {
        TweenMax.to($(this), 0.1, {
            x: goMove('-=', 10, 'vw')
        });
    });

}
// 	Elimina i tubi eccessivi
function removeTubes() {

    if (tubi.first().offset() !== undefined && tubi.first().offset().left < -10) {

        tubi.first().remove();


    }
}
var points = -1;
// 		Imposta il punteggio
function setScores() {

    points++;
    $('#score').text(points);


}

// 		Ammazza flappy quando si scontra
function flappyHit() {
    if (curPipe().length > 0 && curPipe().offset().top < bird.offset().top || curPipe().length > 0 && bird.offset().top < 0 || curPipe().length > 0 && curPipe().offset().top < (bird.offset().top + bird.height())) {
        flappyDie();
    }
}
// Random selector
function curPipe() {
    var left = bird.offset().left;
    return $('body')
        .find('#tubi div')
        .filter(function() {
            return $(this).offset().left < (left + 50) && $(this).offset().left > (left - 50);

        });
}
// 			Checking
function checking() {
    if (curPipe(464).length > 0 && curPipe(464).offset().top < (bird.offset().top + 50)) {
        console.log('working');
    }
}
// 		Deinisce l'avio del gioco
var refresh1;
var refresh2;
var worldGame = function() {

  speed = 0.8;
  points = -1;
    var firstColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    $('body').css('background', firstColor);
    TweenMax.to($('#score'), 1, {
        width: '10%',
        'border-bottom-right-radius': '5px'
    });
    TweenMax.to(bird, 0.3, {
        width: '10vh',
        height: '10vh'
    });
    TweenMax.to(bird, 0.7, {
        bottom: '50vh',
        rotation: 0,
        'border-radius': '0px',
        x: 0
    });
    refresh1 =
        setInterval(function() {
            tubesMove();
            curPipe();
            worldGravity();
            //checking();
            removeTubes();
            flappyHit();

            speed += 0.001;
        }, 16.8);
    refresh2 =
        setInterval(function() {
            setScores();
            tubesSpawn();

        }, 1000);
    $('#interface').toggle();
};

function worldRecord() {
    if (typeof(Storage) !== "undefined" && points > localStorage.getItem('record')) {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("record", points);
    } else {
        // Sorry! No Web Storage support..
    }
    TweenMax.to($('#score'), 1, {
				width: '100%',
        'border-bottom-right-radius': 0
    });
    $('#score').text('Record: ' + localStorage.getItem('record'));
}
// 		Come flappy dovrebbe morire
function flappyDie() {
    worldRecord();
    clearInterval(refresh1);
    clearInterval(refresh2);
    TweenMax.to(bird, 0.7, {
        bottom: 0,
        'border-radius': '50px',
        ease: Bounce.easeOut
    });
    TweenMax.to(bird, 0.7, {
        rotation: '-=180',
        x: goMove('-', 40, 'vw'),
        ease: Power0.easeOut
    });
    $('#interface').toggle();
    TweenMax.to(tubi, 0.5, {y: '+=1000'});
    setTimeout( function () {
      tubi.remove();
    }, 500);
    // 	 aggiorna cache dei tubi
    tubi = $('#tubi div');

}

// 		fa iniziare il gioco
$('#play').click(
    function() {
        worldGame();
    }
);

// 		Fa sbattere le ali a flappy
$('body').click(
    function() {
        flappyFly();
    }
);
$('body').keypress(
    function() {
        flappyFly();
    }
);
