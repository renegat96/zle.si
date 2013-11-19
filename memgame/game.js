var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) { setTimeout (callback, 1000 / 30); };

var rilizvamLi=false;
var canvas = document.getElementById("canvas-id");
canvas.width = 600;
canvas.height = 400;
var context = canvas.getContext("2d");
///NE BARAITE REDOVETE NAGORE!

var myX, myY,mishkaX,mishkaY;  //Suzdadohme promenliva! Tipa i e kakufto i dadete :)
var cvetove = ["red", "blue", "green", "yellow", "pink", "orange"];
var kvadratiCvqt = [1, 2, 3, 0, 4, 5, 5, 4, 3, 2, 1, 0];
var tovaPoznatoLiE =
[false, false, false, false,
 false, false, false, false,
 false, false, false, false]
var broiOtvoreni = 0;
var purviOtvoren, vtoriOtvoren;
var score = 0;
var level = 1;
var broiPoznati = 0;

function start() {
    tovaPoznatoLiE =
    [false, false, false, false,
     false, false, false, false,
     false, false, false, false]
    broiOtvoreni = 0;
    score = 0;
    level = 1;
    broiPoznati = 0;
    for (var i = 11; i > 0; --i) {

        var index = Math.floor(Math.random() * i);

        var swap = kvadratiCvqt[index];
        kvadratiCvqt[index] = kvadratiCvqt[i];
        kvadratiCvqt[i] = swap;
    }
}
start();

window.addEventListener("keydown", function (args) {	//Vika se pri natiskane na kopche
    if(!rilizvamLi){console.log(args.keyCode);}  		//pechatame koda na natisnatoto kopche
}, false);

window.addEventListener("keyup", function (args) {	//vika se pri puskane na kopche natiskano do sega
    //tova e po- dobroto mqsto da sluchvate deistvia s natiskanoto kopche
	if(args.keyCode==37){  //ako e strelka nalevo
		myX=myX-50;  //mestim nalevo
	}
}, false);

window.addEventListener("mousemove", function (args) {
    mishkaX=args.clientX-canvas.offsetLeft;
    mishkaY=args.clientY-canvas.offsetTop;
}, false);

function isThisPointInTheSquare(pointX, pointY,
        squareX, squareY, squareWidth, squareHeight){
    return squareX <= pointX && pointX <= squareX + squareWidth &&
           squareY <= pointY && pointY <= squareY + squareHeight;
}

var msToClosingTheCards;

window.addEventListener("mousedown", function (args) {
    if (broiOtvoreni == 2) return 0;
    var index = -1;
    for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (isThisPointInTheSquare(mishkaX, mishkaY,
                    10 + 40 * j, 10 + 40 * i, 30, 30)){
                index = 4 * i + j;
            }
        }
    }
    if (index != -1) {
        if (tovaPoznatoLiE[index]) {
            return 0;
        }
        if (broiOtvoreni == 0) {
            purviOtvoren = index;
            msToClosingTheCards = 2000;
            broiOtvoreni++;
        } else {
            if (purviOtvoren != index) {
                vtoriOtvoren = index;
                msToClosingTheCards = 1500;
                broiOtvoreni++;
            }
        }
    }
}, false);


function update() {
    if (broiPoznati == 12) {
        start();
    }
    if (msToClosingTheCards == 0) {
        if (broiOtvoreni == 2) {
            if (kvadratiCvqt[purviOtvoren] == kvadratiCvqt[vtoriOtvoren]) {
                tovaPoznatoLiE[purviOtvoren] = true;
                tovaPoznatoLiE[vtoriOtvoren] = true;
                broiPoznati += 2;
                score += level * 10;
            }
        }
        broiOtvoreni = 0;
    } else {
        msToClosingTheCards -= 10;
    }

	setTimeout(update, 10);
}


function draw() {	//specialna funkcia v koqto shte pishem koda za risuvane. Shte bude vikana, kogato ni se risuva
    context.clearRect(0, 0, canvas.width, canvas.height);	//NEBAR!
    context.globalAlpha = 1;    				//NEBAR!
    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 4; ++j) {
            var index = 4 * i + j;
            if (broiOtvoreni == 1) {
                if (index == purviOtvoren) {
                    context.fillStyle = cvetove[kvadratiCvqt[index]];
                } else {
                    context.fillStyle = "black";
                }
            } else if (broiOtvoreni == 2) {
                if (index == purviOtvoren || index == vtoriOtvoren) {
                    context.fillStyle = cvetove[kvadratiCvqt[index]];
                } else {
                    context.fillStyle = "black";
                }
            } else {
                context.fillStyle = "black";
            }
            if (tovaPoznatoLiE[index]) {
                context.fillStyle = "white";
            }
            context.fillRect(10 + 40 * j, 10 + 40 * i, 30, 30);
        }
    }

    context.fillStyle = "#0000FF";
    context.font = "20px Arial";
    context.fillText("Score: " + Math.floor(score), 20, 390);
    
    requestAnimationFrame(draw);	//NEBAR!
    
    context.beginPath();
    context.arc(mishkaX,mishkaY,10,0,2*Math.PI);
    context.closePath();
    context.stroke();
}

update();
draw();
