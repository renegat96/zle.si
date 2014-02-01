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

function vector(x, y) {
    this.x = x;
    this.y = y;
    this.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    this.add = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }
    this.multiply = function(num) {
        this.x *= num;
        this.y *= num;
    }
}

var balls;

function dist(a,b) {
    var x = a.x - b.x;
    var y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
}
function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y;
}

function ball(x, y, radius, color) {
    if(color == undefined){color = "black";}
    this.pos = new vector(x, y);
    this.force = new vector(0, 0);
    this.radius = radius;
    this.color = color;
    this.draw = function() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    }
    this.move = function() {
        this.pos.add(this.force);
        if (this.pos.x < this.radius ||
            this.pos.x > canvas.width - this.radius) {
            this.force.x *= -0.99;
        }
        if (this.pos.y < this.radius ||
            this.pos.y > canvas.height - this.radius) {
            this.force.y *= -0.99;
        }
        this.force.multiply(0.994);
        if (this.force.len() < 0.000001) {
            this.force.x = 0;
            this.force.y = 0;
            return;
        }
        for (var i = 0; i < balls.length; ++i) {
            if (this == balls[i]) continue;
            if (dist(this.pos, balls[i].pos) <=
                    this.radius + balls[i].radius) {
                var hit = new vector(balls[i].pos.x - this.pos.x,
                        balls[i].pos.y - this.pos.y);
                hit.multiply(1.0/hit.len());
                this.force.multiply(0.999);
                var cos = dotProduct(hit, this.force);
                cos /= this.force.len();
                console.log(cos, this.force.len());
                hit.multiply(cos * this.force.len());
                balls[i].force.add(hit);
                hit.multiply(-1);
                this.force.add(hit);
            }
        }
    }
}

balls = [new ball(10, 100, 10, "white")];
for (var i = 1; i <= 20; ++i) {
    balls[i] = new ball(Math.random() * 590 + 10, Math.random() * 390 + 10, 10);
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
    mishkaX=args.clientX-canvas.offsetLeft;
    mishkaY=args.clientY-canvas.offsetTop;
    /***************** do tuk moje da pipash ***********************/
}, false);


balls[0].force = new vector(5, 1.5);

function update() {
    /***************** pishete ot tuk *****************/
   
    for (var i = 0; i < balls.length; ++i) {
        balls[i].move();
    }

    /***************** do tuk moje da pipash *****************/
	setTimeout(update, 5);
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
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < balls.length; ++i) {
        balls[i].draw();
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
