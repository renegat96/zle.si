var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { setTimeout (callback, 1000 / 30); };

var rilizvamLi=false;
var kartinka=new Image();
kartinka.src="primernakartinka.png";
var canvas = document.getElementById("canvas-id");
canvas.width = 600;
canvas.height = 400;
var context = canvas.getContext("2d");
///NE BARAITE REDOVETE NAGORE!

var myX, myY,mishkaX,mishkaY;  //Suzdadohme promenliva! Tipa i e kakufto i dadete :)

var audio=new Audio();
audio.src="tsundere.mp3";

myY = 100;
myX = 300;  //Davame i na4alna stoinost. Qko.
//Redove kod napisani izvun koq da e funkcia (kakvito bqha tez) se izpulnqvat pri startiraneto.

function zele(){//koda napisan vuv va6a vunkcia puk se izpulnqva 4ak kato q izvikame otnqkude
  //console.log("zle.si"); //printva v console-a. natisnete   F12 da q vidite
  
  //NIKAKVI log-ove, shtoto ne raboti v Internet Explorer
}

var natisnatLiESpace = false;
var gravity = true;

window.addEventListener("keydown", function (args) {  //Vika se pri natiskane na kopche
    if(!rilizvamLi){console.log(args.keyCode);}     //pechatame koda na natisnatoto kopche
  //nikakvi logove
    if (args.keyCode == 37) {
      gravity = !gravity;
    }
    if (args.keyCode == 32) {
        natisnatLiESpace = !natisnatLiESpace;
    }

    //audio.play();//FIREFOX FEYLZ!!!
}, false);

window.addEventListener("keyup", function (args) {  //vika se pri puskane na kopche natiskano do sega
    //tova e po- dobroto mqsto da sluchvate deistvia s natiskanoto kopche
    if (args.keyCode == 32) {
        natisnatLiESpace = false;
    }
}, false);

window.addEventListener("mousemove", function (args) {
  //console.log(args.clientX, args.clientY);  //kude e premestena mishkata
  //Nikakvi log-ove
    mishkaX=args.clientX-canvas.offsetLeft;
    mishkaY=args.clientY-canvas.offsetTop;
    //audio.currentTime=args.clientX;
}, false);

var prepqdstvieX = [];
var prepqdstvieY = [];

prepqdstvieX[0] = 600;
prepqdstvieY[0] = 200;

prepqdstvieX[1] = 800;
prepqdstvieY[1] = 100;

prepqdstvieX[2] = 1000;
prepqdstvieY[2] = 300;
var broiPrepqdstvie = 3;
var prepqdstvieShirina = 20;
var prepqdstvieVisochina = 50;

var monetaX = [500];
var monetaY = [250];
var broiMoneti = 10;
for (i = 0; i < broiMoneti; ++i) {
  monetaX[i] = 600 + 60 * i;
  monetaY[i] = Math.floor(Math.random() * 350);
}
var kolkoMonetiSmeSubrali = 0;
var score = 0;

function vPrepqdstvieLiSme(x, y) {
    for (i = 0; i < broiPrepqdstvie; i++) {
        if (prepqdstvieX[i] <= x &&
                x <= prepqdstvieX[i] + prepqdstvieShirina &&
            prepqdstvieY[i] <= y &&
                y <= prepqdstvieY[i] + prepqdstvieVisochina) {
                return true;
        }
    }
    return false;
}

function imaLiParichkaVMen(tekushtaMonetaX, tekushtaMonetaY) {
    if (myX <= tekushtaMonetaX && tekushtaMonetaX <= myX + 30 &&
        myY <= tekushtaMonetaY && tekushtaMonetaY <= myY + 30) {
      return true;
    }
    return false;
}
function update() { //specialna funkcia vikashta se periodichno. V neq shte pishem vsqkuf kod za dvijenie
  //myX=myX+5;//dvijim se postoqnno nadesno
    score = score + 0.05;
    for (i = 0; i < broiPrepqdstvie; ++i) {
        prepqdstvieX[i] = prepqdstvieX[i] - 3;
        if (prepqdstvieX[i] < 0) {
            prepqdstvieX[i] = 600;
            prepqdstvieY[i] = Math.floor(Math.random() * 350);
        }
    }
    
    for (i = 0; i < broiMoneti; i++) {
      if (imaLiParichkaVMen(monetaX[i], monetaY[i]) ||
          imaLiParichkaVMen(monetaX[i] + 10, monetaY[i]) ||
          imaLiParichkaVMen(monetaX[i] + 10, monetaY[i] + 10)||
          imaLiParichkaVMen(monetaX[i], monetaY[i] + 10)) {
        kolkoMonetiSmeSubrali++;
        score = score + 50;
        monetaX[i] = 600;
        monetaY[i] = Math.floor(Math.random() * 350);
      }
      monetaX[i] = monetaX[i] - 3;
      if (monetaX[i] < 0) {
        monetaX[i] = 600;
        monetaY[i] = Math.floor(Math.random() * 350);
      }
    }
    
    if (vPrepqdstvieLiSme(myX, myY) ||
        vPrepqdstvieLiSme(myX + 30, myY) ||
        vPrepqdstvieLiSme(myX, myY + 30) ||
        vPrepqdstvieLiSme(myX + 30, myY + 30))
    {
        alert("game over, LOOOOOSEEEEERVVVVVVFASDASD!");
        
        score = 0;
        kolkoMonetiSmeSubrali = 0;
        prepqdstvieX[0] = 600;
        prepqdstvieY[0] = 200;
        prepqdstvieX[1] = 800;
        prepqdstvieY[1] = 100;
        prepqdstvieX[2] = 1000;
        prepqdstvieY[2] = 300;
        broiPrepqdstvie = 3;
    }
    if (natisnatLiESpace) {
      if (gravity) {
        myY = myY - 4;
      } else {
        myY = myY + 4;
      }
    } else {
      if (gravity) {
        myY = myY + 2;
      } else {
        myY = myY - 2;
      }
    }
    if (myY > canvas.height - 30) {
        myY = canvas.height - 30;
    }
    if (myY < 0) {
        myY = 0;
    }
  setTimeout(update, 10); //kolko chesto da se dviji
}

function draw() { //specialna funkcia v koqto shte pishem koda za risuvane. Shte bude vikana, kogato ni se risuva
    context.clearRect(0, 0, canvas.width, canvas.height); //NEBAR!
    context.globalAlpha = 1;            //NEBAR!

    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#00FF00";
    for (i = 0; i < broiPrepqdstvie; ++i) {
        context.fillRect(prepqdstvieX[i], prepqdstvieY[i],
          prepqdstvieShirina, prepqdstvieVisochina);
    }

    context.fillStyle = "#FF0000";//izbor na cvqt
    context.fillRect(myX, myY, 30, 30); //risuvane na zapulnen kvadrat s izbrania cvqt
    //purvite 2 argumenta sa koordinati za goren lqv ugul, a sled tva- razmerite po x i y!
    
    context.drawImage(kartinka,myX, myY, 30, 30);

    context.fillStyle = "#FFFF00";
    for (i = 0; i < broiMoneti; ++i) {
      context.fillRect(monetaX[i], monetaY[i], 10, 10);
    }

    context.fillStyle = "#0000FF";
    context.font = "20px Arial";
    context.fillText("Score: " + Math.floor(score), 10, 20);

    requestAnimationFrame(draw);  //NEBAR!
    
    context.strokeStyle = "red";
    context.beginPath();
    context.arc(mishkaX,mishkaY,10,0,2*Math.PI);
    context.closePath();
    context.stroke();
}
update(); //purvo vikane. ne go zatrivai!
draw(); //purvo vikane. ne go zatrivai!
