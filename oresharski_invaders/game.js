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

var myX = 20, myY = 20;
var radius = 10;

var keys = [];
var patroniX = [], patroniY = [];
var broiPatroni = 0;

var oresharskiX = [], oresharskiY = [];
var broiOresharski = 0;

function addOresharka() {

}

window.addEventListener("keydown", function (args) {
    /*
     * Tazi funkcia se vika kogato se natisne kopche.
     * args.keyCode e nomerut na kopcheto.
     */
    /***************** pishete ot tuk ******************************/

    console.log(args.keyCode);

    keys[args.keyCode] = true;
    //if (args.keyCode == 37) {
    //    //left
    //    keys[args.keyCode] = true;
    //}
    //if (args.keyCode == 38) {
    //    //up
    //    keys[args.keyCode] = true;
    //}
    //if (args.keyCode == 39) {
    //    //right
    //    keys[args.keyCode] = true;
    //}
    //if (args.keyCode == 40) {
    //    //down
    //    keys[args.keyCode] = true;
    //}


    /***************** do tuk moje da pipash ***********************/
}, false);

window.addEventListener("keyup", function (args) {
    /***************** pishete ot tuk ******************************/
    keys[args.keyCode] = false;
    /***************** do tuk moje da pipash ***********************/
}, false);

window.addEventListener("mousemove", function (args) {
    /*
     * Tazi funkcia se vika kogato se premesti mishkata.
     * Dolnite dva reda ni zapisvat koordinatite i 
     * mishkaX i mishkaY.
     */
    /***************** pishete ot tuk ******************************/
    mishkaX=args.clientX-canvas.offsetLeft;
    mishkaY=args.clientY-canvas.offsetTop;
    /***************** do tuk moje da pipash ***********************/
}, false);

function shoot() {
    patroniX[broiPatroni] = myX;
    patroniY[broiPatroni] = myY;
    broiPatroni++;
}

function update() {
    /***************** pishete ot tuk *****************/

    if (keys[37]) {
        //left
        myX -= 5;
    }
    if (keys[38]) {
        //up
        myY -= 5;
    }
    if (keys[39]) {
        //right
        myX += 5;
    }
    if (keys[40]) {
        //down
        myY += 5;
    }
    if (keys[32]) {
        shoot();
    }
    if (myX - radius < 0)
        myX = radius;
    if (myX + radius > canvas.width)
        myX = canvas.width - radius;
    if (myY - radius < 0)
        myY = radius;
    if (myY + radius > canvas.height)
        myY = canvas.height - radius;
    for (var i = 0; i < broiPatroni; ++i) {
        patroniX[i] += 10;
        if (patroniX[i] > canvas.width) {
            patroniX[i] = patroniX[broiPatroni - 1];
            patroniY[i] = patroniY[broiPatroni - 1];
            broiPatroni--;
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
    /***************** pishete ot tuk ************************/

    context.fillStyle = "#AAAAAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "green";
    context.beginPath();
    context.arc(myX,myY,radius,0,2*Math.PI);
    context.closePath();
    context.fill();
    
    context.fillStyle = "blue";
    context.fillRect(myX, myY - 4, radius + 5, 8);

    for (var i = 0; i < broiPatroni; ++i) {
        context.fillStyle = "black";
        context.fillRect(patroniX[i], patroniY[i], 10, 6);
    }

    context.beginPath();
    context.arc(mishkaX,mishkaY,10,0,2*Math.PI);
    context.closePath();
    context.stroke();

    /***************** do tuk moje da pipash *****************/
    requestAnimationFrame(draw);	//NEBAR!
}
update();	//purvo vikane. ne go zatrivai!
draw();	//purvo vikane. ne go zatrivai!
