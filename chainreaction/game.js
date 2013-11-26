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
var currentPlayer = 0;
var mishkaX, mishkaY;
///NE BARAITE REDOVETE NAGORE!

var cvetove = ["red", "green"];

function create2d(n, m) {
    var array = [];
    for (var i = 0; i < n; ++i) {
        array[i] = [];
        for (var j = 0; j < m; ++j) {
            array[i][j] = 0;
        }
    }
    return array;
}

var map = create2d(10, 10);
var whoseBallsAreThese = create2d(10, 10);
var neighbors = create2d(10, 10);
var oldmap = create2d(10, 10);
var oldWhoseBalls = create2d(10, 10);

for (var i = 1; i < 9; ++i) {
    for (var j = 1; j < 9; j++) {
        neighbors[i][j] = 4;
    }
}
for (var i = 0; i < 10; ++i) {
    neighbors[0][i] = 3;
    neighbors[9][i] = 3;
    neighbors[i][0] = 3;
    neighbors[i][9] = 3;
}
neighbors[0][0] = 2;
neighbors[9][0] = 2;
neighbors[0][9] = 2;
neighbors[9][9] = 2;

var napravilLiSumUndo = false;
function undo() {
    if (!napravilLiSumUndo) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                map[i][j] = oldmap[i][j];
                whoseBallsAreThese[i][j] = oldWhoseBalls[i][j];
            }
        }
        currentPlayer = 1 - currentPlayer;
        napravilLiSumUndo = true;
    }
}

window.addEventListener("keydown", function (args) {	//Vika se pri natiskane na kopche
    if(!rilizvamLi){console.log(args.keyCode);}  		//pechatame koda na natisnatoto kopche
    if (args.keyCode == 85) { // 'u'
        undo();
    }
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

function explode(i, j) {
    map[i][j] = map[i][j] - neighbors[i][j];
    if (0 <= i-1) {
        map[i-1][j]++;
        whoseBallsAreThese[i-1][j] = whoseBallsAreThese[i][j];
    }
    if (j+1 <= 9) {
        map[i][j+1]++;
        whoseBallsAreThese[i][j+1] = whoseBallsAreThese[i][j];
    }
    if (0 <= j - 1) {
        map[i][j - 1]++;
        whoseBallsAreThese[i][j-1] = whoseBallsAreThese[i][j];
    }
    if (i+1 <= 9) {
        map[i+1][j]++;
        whoseBallsAreThese[i+1][j] = whoseBallsAreThese[i][j];
    }
    if (0 <= i - 1 && map[i-1][j] >= neighbors[i-1][j]) {
        explode(i-1, j);
    }
    if (j+1 <= 9 && map[i][j+1] >= neighbors[i][j+1]) {
        explode(i, j+1);
    }
    if (0 <= j-1 && map[i][j-1] >= neighbors[i][j-1]) {
        explode(i, j-1);
    }
    if (i+1 <= 9 && map[i+1][j] >= neighbors[i+1][j]) {
        explode(i+1, j);
    }
}
window.addEventListener("mousedown", function (args) {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (isThisPointInTheSquare(mishkaX, mishkaY, 40 * j, 40 * i, 40, 40)) {
                if (map[i][j] == 0 || (whoseBallsAreThese[i][j] == currentPlayer)) {
                    for (var k = 0; k < 10; k++) {
                        for (var l = 0;l < 10; l++) {
                            oldmap[k][l] = map[k][l];
                            oldWhoseBalls[k][l] = whoseBallsAreThese[k][l];
                        }
                    }
                    napravilLiSumUndo = false;
                    map[i][j]++;
                    whoseBallsAreThese[i][j] = currentPlayer;
                    if (map[i][j] == neighbors[i][j]) {
                        explode(i, j);
                    }
                    currentPlayer = 1 - currentPlayer;
                }
            }
        }
    }
}, false);

function drawCell(i, j, color) {
    var x = 40 * j;
    var y = 40 * i;
    context.fillStyle = color;
    context.fillRect(x, y, 40, 40);
    context.fillStyle = "black";
    context.fillRect(x + 2, y + 2, 36, 36);

    for (var k = 0; k < map[i][j]; ++k) {
        if (whoseBallsAreThese[i][j] == 0) {
            context.fillStyle = cvetove[0];
        } else {
            context.fillStyle = cvetove[1];
        }
        context.beginPath();
        var ballx = x + 10 + (k % 2) * 15;
        var bally = y + 10 + Math.floor(k / 2) * 15;
        context.arc(ballx, bally, 5, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    }
}

function draw() {	//specialna funkcia v koqto shte pishem koda za risuvane. Shte bude vikana, kogato ni se risuva
    context.clearRect(0, 0, canvas.width, canvas.height);	//NEBAR!
    context.globalAlpha = 1;    				//NEBAR!
    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; ++j) {
            drawCell(i, j, cvetove[currentPlayer]);
        }
    }
    
    requestAnimationFrame(draw);	//NEBAR!
    
    context.strokeStyle = "white";
    context.beginPath();
    context.arc(mishkaX,mishkaY,10,0,2*Math.PI);
    context.closePath();
    context.stroke();
}

draw();
