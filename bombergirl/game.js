var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) { setTimeout (callback, 1000 / 30); };

var n = 19, m = 29;
var rilizvamLi=false;
var canvas = document.getElementById("canvas-id");
canvas.width = m * 30;
canvas.height = n * 30;
var context = canvas.getContext("2d");
///NE BARAITE REDOVETE NAGORE!
var normalExplosion = 3;
var keys = [];

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

var map = create2d(n, m);
var playerAx = 1, playerAy = 1, playerBx = n - 2, playerBy = m - 2;

function restart() {
    playerAx = 1, playerAy = 1, playerBx = n - 2, playerBy = m - 2;
    keys = [];
    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < m; ++j) {
            map[i][j] = 0;
        }
    }
    for (var i = 0; i < 250; ++i) {
        var x = Math.round(Math.random() * (n - 1));
        var y = Math.round(Math.random() * (m - 1));
        map[x][y] = 2;
    }
    map[1][1] = 0;
    map[2][1] = 0;
    map[1][2] = 0;
    map[n - 2][m - 2] = 0;
    map[n - 2][m - 3] = 0;
    map[n - 3][m - 2] = 0;
    for (var i = 0; i < n; i++) {
        map[i][0] = 1;
        map[i][m - 1] = 1;
    }
    for (var i = 0; i < m; i++) {
        map[0][i] = 1;
        map[n - 1][i] = 1;
    }
    for (var i = 2; i < n; i += 2) {
        for (var j = 2; j < m; j += 2) {
            map[i][j] = 1;
        }
    }
//    map[1][1] = 5;
//    map[n - 2][m - 2] = 6;
}
restart();

function checkDeath(x, y) {
    if (map[playerAx][playerAy] == 4) {
        alert("PlayerA dies");
        restart();
    }
    if (map[playerBx][playerBy] == 4) {
        alert("PlayerB dies");
        restart();
    }
}

function fieldExplosion(x, y, player) {
    if (x < 0 || x >= n) return false
    if (y < 0 || y >= m) return false
    if (map[x][y] == 1) return false;
    if (map[x][y] == 2) {
        map[x][y] = 4;
        setTimeout(function () {
            clearExplosion(x, y);
        }, 200);
        return false;
    }
    if (map[x][y] == 0) {
        map[x][y] = 4;
        setTimeout(function () {
            clearExplosion(x, y);
        }, 200);
    }
    if (map[x][y] == 3) {
        explode(x, y, 1 - player);
    }
    return true;
}

function clearExplosion(x, y) {
    map[x][y] = 0;
}

function explode(x, y, player) {
    if (map[x][y] != 3) return;

    map[x][y] = 4;
    setTimeout(function () {
        clearExplosion(x, y);
    }, 200);
    var cont = true;
    for (var i = 1; cont && i <= normalExplosion; ++i) {
        cont = fieldExplosion(x, y + i);
    }
    cont = true;
    for (var i = 1; cont && i <= normalExplosion; ++i) {
        cont = fieldExplosion(x, y - i);
    }
    cont = true;
    for (var i = 1; cont && i <= normalExplosion; ++i) {
        cont = fieldExplosion(x + i, y);
    }
    cont = true;
    for (var i = 1; cont && i <= normalExplosion; ++i) {
        cont = fieldExplosion(x - i, y);
    }
}

function bomb(x, y, player) {
    map[x][y] = 3;
    setTimeout(function() {explode(x, y, player);}, 1800);
}

var transition = [];
transition[0] = [0, 0];
transition[1] = [0, 0];

var inTransit = [false, false];

function transit(player, x, y) {
    if (inTransit[player]) return;
    inTransit[player] = true;
    for (var i = 0; i < 10; ++i) {
        setTimeout(function() {
            transition[player][0] += Math.round(x / 10);
            transition[player][1] += Math.round(y / 10);
        }, 10 * (i + 1));
    }
    setTimeout(function() {
        transition[player][0] = 0;
        transition[player][1] = 0;
        if (player == 0) {
            if (x < 0) playerAx--;
            if (x > 0) playerAx++;
            if (y < 0) playerAy--;
            if (y > 0) playerAy++;
        }
        if (player == 1) {
            if (x < 0) playerBx--;
            if (x > 0) playerBx++;
            if (y < 0) playerBy--;
            if (y > 0) playerBy++;
        }
        inTransit[player] = false;
    }, 100);
}

window.addEventListener("keydown", function (args) {	//Vika se pri natiskane na kopche
    if(!rilizvamLi){console.log(args.keyCode);}  		//pechatame koda na natisnatoto kopche
	//nikakvi logove
    keys[args.keyCode] = true;
}, false);

window.addEventListener("keyup", function (args) {
    keys[args.keyCode] = false;
}, false);

window.addEventListener("mousemove", function (args) {
    mishkaX = args.clientX-canvas.offsetLeft;
    mishkaY = args.clientY-canvas.offsetTop;
}, false);


function update() {	//specialna funkcia vikashta se periodichno. V neq shte pishem vsqkuf kod za dvijenie
    checkDeath(0, 0);
    if (keys[37]) {
        //B left
        if (map[playerBx][playerBy - 1] == 0 || map[playerBx][playerBy - 1] == 4)
            //playerBy--;
            transit(1, 0, -30);
    }
    if (keys[38]) {
        //B up
        if (map[playerBx - 1][playerBy] == 0 || map[playerBx - 1][playerBy] == 4)
            //playerBx--;
            transit(1, -30, 0);
    }
    if (keys[39]) {
        //B right
        if (map[playerBx][playerBy + 1] == 0 || map[playerBx][playerBy + 1] == 4)
            //playerBy++;
            transit(1, 0, 30);
    }
    if (keys[40]) {
        //B down
        if (map[playerBx + 1][playerBy] == 0 || map[playerBx + 1][playerBy] == 4)
            //playerBx++;
            transit(1, 30, 0);
    }
    if (keys[65]) {
        //A left
        if (map[playerAx][playerAy - 1] == 0 || map[playerAx][playerAy - 1] == 4)
            //playerAy--;
            transit(0, 0, -30);
    }
    if (keys[87]) {
        //A up
        if (map[playerAx - 1][playerAy] == 0 || map[playerAx - 1][playerAy] == 4)
            //playerAx--;
            transit(0, -30, 0);
    }
    if (keys[68]) {
        //A right
        if (map[playerAx][playerAy + 1] == 0 || map[playerAx][playerAy + 1] == 4)
            //playerAy++;
            transit(0, 0, 30);
    }
    if (keys[83]) {
        //A down
        if (map[playerAx + 1][playerAy] == 0 || map[playerAx + 1][playerAy] == 4)
            //playerAx++;
            transit(0, 30, 0);
    }
	setTimeout(update, 10);	//kolko chesto da se dviji
}
function bombing() {
    if (keys[81]) {
        //A bomb
        bomb(playerAx, playerAy, 0);
    }
    if (keys[190]) {
        //B bomb
        bomb(playerBx, playerBy, 1);
    }
    setTimeout(bombing, 50);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);	//NEBAR!
    context.globalAlpha = 1;    				//NEBAR!

    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < n; i++) {
        for (var j = 0;j < m; j++) {
            if (map[i][j] == 1) {
                context.fillStyle = "gray";
                context.fillRect(30 * j, 30 * i, 30, 30);
            } else if (map[i][j] == 2) {
                context.fillStyle = "#944200";
                context.fillRect(30 * j, 30 * i, 30, 30);
            } else if (map[i][j] == 3) {
                context.fillStyle = "black";
                context.beginPath();
                context.arc(j * 30 + 15, i * 30 + 15, 14, 0, 2*Math.PI);
                context.closePath();
                context.fill();
            } else if (map[i][j] == 4) {
                context.fillStyle = "red";
                context.fillRect(30 * j, 30 * i, 30, 30);
            }
        }
    }

    context.fillStyle = "red";
    context.beginPath();
    context.arc(playerAy * 30 + 15 + transition[0][1], playerAx * 30 + 15 + transition[0][0], 10, 0, 2*Math.PI);
    context.closePath();
    context.fill();

    context.fillStyle = "blue";
    context.beginPath();
    context.arc(playerBy * 30 + 15 + transition[1][1], playerBx * 30 + 15 + transition[1][0], 10, 0, 2*Math.PI);
    context.closePath();
    context.fill();

    requestAnimationFrame(draw);	//NEBAR!
}
update();	//purvo vikane. ne go zatrivai!
draw();	//purvo vikane. ne go zatrivai!
bombing();
