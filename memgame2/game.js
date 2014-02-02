var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) { setTimeout (callback, 1000 / 30); };
var canvas = document.getElementById("canvas-id");
canvas.width = 600;
canvas.height = 400;
var context = canvas.getContext("2d");


/**************************/
///NE BARAITE REDOVETE NAGORE!
/**************************/


var mishkaX = 0, mishkaY = 0;
var cvetove = ["red", "blue", "yellow", "pink", "purple", "green"];
var kletki = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
var kliknatoLiE = [false, false, false, false,
                   false, false, false, false,
                   false, false, false, false];
var kliknati = [];
var broiKliknati = 0;
for (var i = 11; i >= 0; --i) {
    var random = Math.floor(Math.random() * (1 + i));
    var swap = kletki[random];
    kletki[random] = kletki[i];
    kletki[i] = swap;
}

window.addEventListener("keydown", function (args) {
    /*
     * Tazi funkcia se vika kogato se natisne kopche.
     * args.keyCode e numerut na kopcheto.
     */
    /***************** pishete ot tuk ******************************/

    console.log(args.keyCode);

    /***************** do tuk moje da pipash ***********************/
}, false);

window.addEventListener("keyup", function (args) {
    /***************** pishete ot tuk ******************************/

    /***************** do tuk moje da pipash ***********************/
}, false);

window.addEventListener("mousemove", function (args) {
    /*
     * Tazi funkcia se vika kogato se premesti mishkata.
     * Dolnite dva reda ni zapisvat koordinatite i 
     * mishkaX i mishkaY.
     */
    /***************** pishete ot tuk ******************************/
    mishkaX = args.clientX - canvas.offsetLeft;
    mishkaY = args.clientY - canvas.offsetTop;
    /***************** do tuk moje da pipash ***********************/
}, false);

var miliseconds = 0;
window.addEventListener("mousedown", function(args) {
    for (var k = 0; k < 12; ++k) {
        var i = Math.floor(k / 4);
        var j = k % 4;
        var x = 10 + 40 * j;
        var y = 10 + 40 * i;
        if (x <= mishkaX && mishkaX <= x + 30 &&
            y <= mishkaY && mishkaY <= y + 30) {
            if (broiKliknati < 2 && !kliknatoLiE[k]) {
                kliknatoLiE[k] = true;
                kliknati[broiKliknati] = k;
                broiKliknati++;
                console.log(broiKliknati);
            }
            if (broiKliknati == 2) {
                miliseconds = 1000;
            }
        }
    }
}, false);

function update() {
    /***************** pishete ot tuk *****************/
    if (miliseconds > 0) {
        miliseconds = miliseconds - 10;
        if (miliseconds < 0)
            miliseconds = 0;
        if (miliseconds == 0) {
            if (cvetove[kletki[kliknati[0]]] ==
                    cvetove[kletki[kliknati[1]]]) {
                broiKliknati = 0;
            } else {
                kliknatoLiE[kliknati[0]] = false;
                kliknatoLiE[kliknati[1]] = false;
                broiKliknati = 0;
            }
        }
    }
    /***************** do tuk moje da pipash *****************/
	setTimeout(update, 10);
}

function draw() {
    /*
     * Specialna funkcia v koqto shte pishem koda za risuvane.
     * Shte bude vikana, kogato ni se risuvane
     */
    context.clearRect(0, 0, canvas.width, canvas.height);	//NEBAR!
    context.globalAlpha = 1;    				//NEBAR!
    /**************************/
    /***************** pishete ot tuk *****************/

    for (var k = 0; k < 12; ++k) {
        //k == i * 4 + j
        var i = Math.floor(k / 4);
        var j = k % 4;
        if (kliknatoLiE[k]) {
            context.fillStyle = cvetove[kletki[k]];
        } else {
            context.fillStyle = "black";
        }
        context.fillRect(10 + 40 * j, 10 + 40 * i, 30, 30);
    }
    
    //context.fillStyle = "green"; // цвят за запълване
    //context.strokeStyle = "red"; // цвят за очертаване
    //context.beginPath(); // рисуваме кръгче
    //context.arc(mishkaX,mishkaY,10,0,2*Math.PI); //x, y, radius, 0, 2*Math.PI
    //context.closePath(); // рисуваме кръгче
    //context.stroke(); // очертай кръгчето
    //context.fill(); // запълни кръгчето

    /***************** do tuk moje da pipash *****************/
    requestAnimationFrame(draw);	//NEBAR!
}
update();	//purvo vikane. ne go zatrivai!
draw();	//purvo vikane. ne go zatrivai!
 //   0 1 2 3
 // 0
 // 1   
 // 2       
