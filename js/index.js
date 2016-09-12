var $randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
var $normalColor = 'rgb(63,81,181)';
var $black = '#111';
var $white = '#fcfcfc';
var $pcolor = localStorage.getItem('objectColor');
var $scolor = localStorage.getItem('backgroundColor');
var $acolor = localStorage.getItem('accentColor');
$('#score').text('Record: ' + localStorage.getItem('record'));
TweenMax.from($('.game'), 1, {
    opacity: 0
});
$('#infobutton').click(
    function() {
        $('#info').toggle('fast');
    }
);
// 		Definisce la velocita'
var speed = 0.8;
var tubi;

// 		Definisce i movimenti
function goMove(sign, x, y) {
    return sign + x * speed + y;
}
// 		Definisce flappy
var bird = $('#flappy');
//  Definisce il battito di ali
var flappyFly = function() {
    bird.animate({
        'bottom': '+=14vh'
    }, 100, 'linear');
};
// 		Crea la gravita'
function worldGravity() {
    if (bird.css('bottom') <= '0vw') {
        bird.css('bottom', '0vh');
        // console.log(bird.attr('style').indexOf('bottom: -1px'))
    } else {
        bird.css('bottom', '-=0.4vh');
    }
}
// 		Spawna i tubi
function tubesSpawn() {

    var randomHeight = (Math.random() * 75);
    $('#tubi').append('<div class="mdl-shadow--4dp" style="height: ' + randomHeight + 'vh;' + 'background-color:' + $pcolor + '"></div>');
    // 	 Definisce i tubi
    tubi = $('#tubi div');

}

// 		Muove i tubi
function tubesMove() {
    tubi = $('#tubi div');

    tubi.each(function() {
        TweenMax.to($(this), 0.1, {
            left: goMove('-=', 1, 'vw')
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
    if (curPipe().length > 0 && (curPipe().offset().top < bird.offset().top || bird.offset().top < 0 || curPipe().offset().top < (bird.offset().top + bird.height()))) {
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
    startGame = new TimelineMax();
    startGame.to($('.score'), 0.2, {
        y: '-50px'
    });
    startGame.to($('.score'), 0, {
        y: 0,
        x: '-150px',
        width: '10%'
    });

    startGame.to(bird, 0.2, {
        opacity: 1,
        scale: 1,
        bottom: '50vh',
        'border-radius': 0
    });
    startGame.to($('.score'), 0.2, {
        y: 0,
        x: 0,
        delay: 1,
        'border-bottom-right-radius': '5px'
    });
    refresh1 =
        setInterval(function() {
            tubesMove();
            curPipe();
            worldGravity();
            //checking();
            removeTubes();
            flappyHit();

            speed += 0.005;
        }, 16.8);
    refresh2 =
        setInterval(function() {
            setScores();
            tubesSpawn();

        }, 1000);
    $('.interface').toggle();
};

function worldRecord() {
    if (typeof(Storage) !== "undefined" && points > localStorage.getItem('record')) {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("record", points);
    } else {
        // Sorry! No Web Storage support..
    }

    $('#score').text('Record: ' + localStorage.getItem('record'));
}
// 		Come flappy dovrebbe morire
function flappyDie() {

    clearInterval(refresh1);
    clearInterval(refresh2);
    finishGame = new TimelineMax();
    finishGame.to(bird, 0.2, {
        scale: 5,
        'border-radius': '500px',
        opacity: 0,
        ease: Circ
    });

    finishGame.to($('.score'), 0.2, {
        x: '-150px'
    });


    finishGame.to($('.score'), 0, {
        x: 0,
        y: -40,
        width: '100%',
        'border-radius': '0px'
    });
    finishGame.to($('.score'), 0.2, {
        x: 0,
        y: 0,
        width: '100%'

    });


    $('.interface').toggle();

    tubi.remove();
    // 	 aggiorna cache dei tubi
    tubi = $('#tubi div');
    setTimeout(function() {
        worldRecord();
    }, 400);

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

// Apply settings after they are set
function settingsSet() {
  localStorage.setItem('objectColor', $('#objectColor').val());
  localStorage.setItem('backgroundColor', $('#backgroundColor').val());
  localStorage.setItem('accentColor', $('#accentColor').val());
  settingsApply();
}
function settingsGet() {
  $pcolor = localStorage.getItem('objectColor');
  $scolor = localStorage.getItem('backgroundColor');
  $acolor = localStorage.getItem('accentColor');
}
function settingsApply() {
  settingsGet();
  var sheet = document.createElement('style');
  $('#flappy, button, .score, #tubi div, .mdl-card, .mdl-tabs__tab-bar').css('background-color', $pcolor);
  $('body').css('background-color', $scolor);
  sheet.innerHTML = '.is-active .material-icons, .is-focused, .mdl-button, .mdl-tabs__tab.is-active:after {color:' + $acolor + '!important} .mdl-tabs.is-upgraded .mdl-tabs__tab.is-active:after, is-focused, .mdl-ripple, .mdl-textfield__label:after {background-color:' + $acolor + '!important}';
  document.body.appendChild(sheet);
}

// Apply settings onclick
$('#apply').click(function() {
    settingsSet();
});

// Apply settings on start
(function start() {
    settingsApply();
})();
