var canvas = document.getElementById('canvas'); // Loading canvas from html
var context = canvas.getContext('2d'); // Loading 2d context

canvas.width = window.innerWidth*0.6;
canvas.height = window.innerHeight*0.6;

// Stress VARIABLES
var stressLevel = 50;
var stressHtml = document.getElementById('stressValue');
stressLevelSystem();

//Activities
const lifeActivities = [
	{text: "Exercising", value: 5},
	{text: "Driving a car", value: 7},
	{text: "Cooking", value: 8},
	{text: "Meditating", value: 18},
	{text: "Working at the food shop", value: 14},
	{text: "Making music", value: 11},
	{text: "Meeting friends", value: 16},
	{text: "Eating dinner with the family", value: 4}
];

const universityActivities = [
	{text: "Graphic design", value: 6},
	{text: "Studying", value: 8},
	{text: "Checking emails", value: 5},
	{text: "Doing projects", value: 30},
	{text: "Preparing for presentation", value: 35},
	{text: "Programming", value: 18},
	{text: "Helping others", value: 12},
	{text: "Brainstorming", value: 20}
];

const PLAYER_HEIGHT = 150; // Paddle height
const PLAYER_WIDTH = 15; // Paddle width

const winningscore = 3; // Simply score that user must achive to win

var result = ""; // Result which is filled only if someone achive winning score


//IMAGES
var universityImg = new Image();
universityImg.src = './images/university.png';

var laptopImg = new Image();
laptopImg.src = './images/laptop.png';

var timeImg = new Image();
timeImg.src = './images/time.png';

var bookImg = new Image();
bookImg.src = './images/book.png';

var universityHidden = [true,true,true,true];


var familyImg = new Image();
familyImg.src = './images/family.png';

var bacteriaImg = new Image();
bacteriaImg.src = './images/bacteria.png';

var covidImg = new Image();
covidImg.src = './images/covid.png';

var loveImg = new Image();
loveImg.src = './images/love.png';

var moneyImg = new Image();
moneyImg.src = './images/money.png';

var sandwichImg = new Image();
sandwichImg.src = './images/sandwich.png';

var lifeHidden = [true,true,true,true,true,true];

var faceBallImg = new Image();
faceBallImg.src = './images/face.png';

// AI object
const AI = {
	x: 0,
	y: canvas.height / 2 - PLAYER_HEIGHT / 2,
	vel: 20,
	points: 0,
	move: function(){
		// THIS IS AI, 0.7 in random offset is a difficulty (0.9 is maximum difficulty)
		let diff = -((this.y + (PLAYER_HEIGHT / 2)) - ball.y);

    if (diff < 0 && diff < -4) {
        diff = -5;
    }
    else if (diff > 0 && diff > 4) {
        diff = 5;
    }

    let randomOffset = Math.random(0.8,1);
    this.y += diff * randomOffset;

		if (this.y < 0) {
        this.y = 0;
    }
    else if (this.y + PLAYER_HEIGHT > canvas.height) {
        this.y = canvas.height - PLAYER_HEIGHT;
    }

		//THIS IS UP AND DOWN, working really weak
		//this.y += this.vel;
	}
};

// Player object
const player = {
	x: canvas.width - PLAYER_WIDTH,
	y: canvas.height / 2 - PLAYER_HEIGHT / 2,
	vel: 0,
	points: 0,
	move: function(){
		this.y += this.vel;
		if(player.y < 0) player.y = 0;
		if(player.y > canvas.height - PLAYER_HEIGHT) player.y = canvas.height - PLAYER_HEIGHT;
	}
};

// Ball object
const ball = {
	x: canvas.width / 2 - this.r/2,
	y: canvas.height / 2 - this.r/2,
	r: 60,
	xvel: 8,
	yvel: 8
}

//Drawing paddles
function drawPaddles(){
	context.fillStyle = 'white';
	context.fillRect(0, AI.y, PLAYER_WIDTH, PLAYER_HEIGHT);
	context.fillStyle = 'black';
	context.fillRect(canvas.width - PLAYER_WIDTH, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
}
//Drawing a ball
function drawBall(){

	context.drawImage(faceBallImg, ball.x, ball.y, ball.r, ball.r);
}
//Drawing a divider
function drawDivider(){
	context.strokeStyle = 'white';
	context.beginPath();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();
}

//Drawing a info that tells user what to do when the game is stopped
function drawInfo(){
	let info;
	if(result=="")
	{
		if(AI.points > 0 || player.points > 0) info = "Move your paddle to continue...";
		else
		{
			info = "Move your paddle to start the game...";

		}
	}
	else
	{
		info = "Move your paddle to play again...";
	}

	document.getElementById('gameInfo').style.color = "black";
	document.getElementById('gameInfo').innerHTML = info;
}
//Drawing the result, who is the winner
function drawResult(){
	context.fillStyle = "green";
  context.font = "60px arcade";
	context.strokeStyle = "green";
	context.lineWidth = 3;
	context.textAlign = "center";
  context.strokeText("WINNER", canvas.width/2, canvas.height/4);
  context.fillText("WINNER", canvas.width/2, canvas.height/4);

	context.fillStyle = "green";
	context.strokeStyle = "green";

	if(result == "-->"){context.textAlign = "start"; stressLevel = 0; stressLevelSystem();}
	else if(result == "<--"){context.textAlign = "end"; stressLevel = 100; stressLevelSystem();}
	else context.textAlign = "center";

	context.strokeText(result, canvas.width/2, canvas.height/4+100);
  context.fillText(result, canvas.width/2, canvas.height/4 + 100);
}
//Drawing background with given design
function drawBackground(){
	context.fillStyle = "#000000";
	context.fillRect(0,0,canvas.width/2, canvas.height);
	context.fillStyle = "#FFFFFF";
	context.fillRect(canvas.width/2,0,canvas.width/2, canvas.height);
	//BASE IMGS
	if(!universityHidden[0])context.drawImage(universityImg, 0, canvas.height-canvas.height/3, canvas.width/3, canvas.height/3);
	if(!lifeHidden[0])context.drawImage(familyImg, canvas.width-canvas.width/4, canvas.height-canvas.height/3, canvas.width/4, canvas.height/3);

	//ADDITIONAL IMGS

	//University
	if(!universityHidden[1])context.drawImage(laptopImg, canvas.width/4, canvas.height/2, canvas.width/6, canvas.height/4);
	if(!universityHidden[2])context.drawImage(bookImg, canvas.width/12, canvas.height/4, canvas.width/6, canvas.height/2.5);
	if(!universityHidden[3])context.drawImage(timeImg, canvas.width/4, canvas.height/8, canvas.width/10, canvas.height/8);

	//Life
	if(!lifeHidden[1])context.drawImage(bacteriaImg, canvas.width-canvas.width/4, canvas.height/6, canvas.width/6, canvas.height/4);
	if(!lifeHidden[2])context.drawImage(loveImg, canvas.width-canvas.width/2.2, canvas.height/4, canvas.width/12, canvas.height/8);
	if(!lifeHidden[3])context.drawImage(moneyImg, canvas.width-canvas.width/2.5, canvas.height-canvas.height/4, canvas.width/12, canvas.height/8);
	if(!lifeHidden[4])context.drawImage(sandwichImg, canvas.width-canvas.width/2.5, canvas.height-canvas.height/2, canvas.width/6, canvas.height/6);
	if(!lifeHidden[5])context.drawImage(covidImg, canvas.width-canvas.width/2.5, canvas.height/8, canvas.width/8, canvas.height/10);


}

//Variable that tells if user started the game or not
var started = false;

//Event listeners, so the game can recognize key input
window.addEventListener('keydown',input, false);
window.addEventListener('keyup',inputrelease, false);

// When key is pressed
function input(e){
	let code = e.keyCode;
	if(code == 38) // Up arrow
	{
		if(!started)
		{
			started = true;
			if(result != "")
			{
				AI.points = 0;
				player.points = 0;
				document.getElementById('computerScore').innerHTML = AI.points;
				document.getElementById('userScore').innerHTML = player.points;
				stressLevel = 50;
				stressLevelSystem();
				for(i = 0; i < universityHidden.length; i++) universityHidden[i] = true;
				for(i = 0; i < lifeHidden.length; i++) lifeHidden[i] = true;
				result = "";
			}
			document.getElementById('gameInfo').style.color = 'rgba(0,0,0,0)';
		}

		player.vel = -10;
	}
	else if(code == 40) // Down arrow
	{
		if(!started)
		{
			started = true;
			if(result != "")
			{
				AI.points = 0;
				player.points = 0;
				document.getElementById('computerScore').innerHTML = AI.points;
				document.getElementById('userScore').innerHTML = player.points;
				stressLevel = 50;
				stressLevelSystem();
				for(i = 0; i < universityHidden.length; i++) universityHidden[i] = true;
				for(i = 0; i < lifeHidden.length; i++) lifeHidden[i] = true;
				result = "";
			}
			document.getElementById('gameInfo').style.color = 'rgba(0,0,0,0)';
		}
		player.vel = 10;
	}
}

//When key is released
function inputrelease(e){
	let code = e.keyCode;
	if(code == 38) // Up arrow
	{
		player.vel = 0;
	}
	else if(code == 40) // Down arrow
	{
		player.vel = 0;
	}
}

// Ball collision
function ballCollision(){
	//With up or down border
	if(ball.y< 0) ball.yvel = Math.abs(ball.yvel);
	if(ball.y + ball.r > canvas.height) ball.yvel = Math.abs(ball.yvel)*(-1);

	//Ball with left border
	if(ball.x <= 0)
	{
		player.points++;
		document.getElementById('userScore').innerHTML = player.points;
		stressLevel -= 25;
		stressLevelSystem();
		started = false;
	}
	//Ball with right border
	if(ball.x + ball.r >= canvas.width)
	{
		AI.points++;
		document.getElementById('computerScore').innerHTML = AI.points;
		stressLevel += 25;
		stressLevelSystem();
		started = false;
	}

	//Ball with paddles, there is also a custom bounce system. Balls yvel depends on a difference between the ball pos and paddle center
	if(ball.x < PLAYER_WIDTH || ball.x + ball.r > canvas.width-PLAYER_WIDTH)
	{
		if(ball.x < canvas.width/2 && ball.y+ball.r > AI.y && ball.y < AI.y + PLAYER_HEIGHT)
		{
			activitySystem('university');
			stressLevelSystem(); //Handling stress level
			let diff = (AI.y+PLAYER_HEIGHT/2) - (ball.y+ball.r);
      if(ball.yvel < -4)
      {
        ball.yvel = -4;
        if(diff < 0) ball.yvel -= diff * canvas.height/10000*4;
      }
      else if(ball.yvel > 4)
      {
        ball.yvel = 4;
        if(diff > 0) ball.yvel -= diff * canvas.height/10000*4;
      }
      else
      {
        ball.yvel -= diff * canvas.height/10000*2;
      }
		  ball.xvel = Math.abs(ball.xvel);

			let bl = false;

			universityHidden.forEach((x) => {
				if(x) bl = true;
			});


			if(bl)
			{
				let rnd = Math.floor(Math.random() * universityHidden.length);
				while(!universityHidden[rnd])
				{
					rnd = Math.floor(Math.random() * universityHidden.length);
				}
				universityHidden[rnd] = false;
			}

		}
		if(ball.x > canvas.width/2 && ball.y+ball.r > player.y && ball.y < player.y + PLAYER_HEIGHT)
		{
			activitySystem('life');
			stressLevelSystem(); //Handling stress level
			let diff = (player.y+PLAYER_HEIGHT/2) - ball.y;
      if(ball.yvel < -4)
      {
        ball.yvel = -4;
        if(diff < 0) ball.yvel -= diff * canvas.height/10000*2;
      }
      else if(ball.yvel > 4)
      {
        ball.yvel = 4;
        if(diff > 0) ball.yvel -= diff * canvas.height/10000*2;
      }
      else
      {
        ball.yvel -= diff * canvas.height/10000*2;
      }
			ball.xvel = Math.abs(ball.xvel)*(-1);

			let bl = false;

			lifeHidden.forEach((x) => {
				if(x) bl = true;
			});

			if(bl)
			{
				let rnd = Math.floor(Math.random() * lifeHidden.length);
				while(!lifeHidden[rnd])
				{
					rnd = Math.floor(Math.random() * lifeHidden.length);
				}
				lifeHidden[rnd] = false;
			}
		}
	}

}

// Updating ball position
function ballMovement(){
	ball.xvel = ball.xvel < 0 ? -stressLevel/10 -5: stressLevel/10 +5;
	ball.x += ball.xvel;
	ball.y += ball.yvel;
}

// Handling score
function scoreSystem(){
	if(AI.points >= winningscore)
	{
		if(AI.points == player.points) result = "<----->"; // Result is a draw
		else result = "<--"; // Result is left wins
	}
	if(player.points >= winningscore)
	{
		if(player.points == AI.points) result = "<----->"; // Result is a draw
		else result = "-->"; // Result is right wins
	}
}

function stressLevelSystem(){
	if(stressLevel > 100) stressLevel = 100;
	if(stressLevel < 0) stressLevel = 0;

	if(stressLevel < 30) stressHtml.style.color = 'green';
	if(stressLevel >= 30 && stressLevel <= 70) stressHtml.style.color = 'orange';
	if(stressLevel > 70) stressHtml.style.color = 'red';
	stressHtml.innerHTML = stressLevel + "%";
}


function activitySystem(name){
	let rnd = Math.floor(Math.random()*8);
	if(name === 'life')
	{
		stressLevel -= lifeActivities[rnd].value;
		document.getElementById('lifeActivity').innerHTML = lifeActivities[rnd].text;
		document.getElementById('lifeActivity').style.opacity = 1;
		document.getElementById('universityActivity').style.opacity = 0;
	}
	if(name === 'university')
	{
		stressLevel += universityActivities[rnd].value;
		document.getElementById('universityActivity').innerHTML = universityActivities[rnd].text;
		document.getElementById('universityActivity').style.opacity = 1;
		document.getElementById('lifeActivity').style.opacity = 0;
	}
}

// Updating positions, physics variables etc
function update() {
	if(started)
	{
		ballCollision(); // Checking every ball collision (X and Y border, paddles)

		ballMovement(); // Updating ball position

		scoreSystem(); // Function that checks the score and gives a particular result in the end

		AI.move(); // Function that is responsible for AI movement

		player.move(); // Function that is responsible for player movement
	}
	else { // In else it is basically a classic reset of all positions and variables (starting over)
		AI.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;

		ball.x = canvas.width/2 - ball.r/2;

		ball.y = canvas.height / 2 - ball.r/2;

		ball.xvel = 8;
		ball.yvel = 8;
	}
}
// Render is a function that call only drawing functions
function render() {
		//Drawing background
    drawBackground();
		//Drawing player paddles
		drawPaddles();
		//Drawing ball
		drawBall();

		//If the game is running
		if(!started)
		{
			drawInfo(); //Drawing information (Move your paddle...)
			document.getElementById('lifeActivity').style.opacity = 0;
			document.getElementById('universityActivity').style.opacity = 0;
			if(result != "")
			{
				for(i = 0; i < universityHidden.length; i++) universityHidden[i] = false;
				for(i = 0; i < lifeHidden.length; i++) lifeHidden[i] = false;
				drawResult(); //Drawing result , who won
			}
		}
}

function resizeCanvas(){
	canvas.width = window.innerWidth*0.6;
	canvas.height = window.innerHeight*0.6;
}

// Function that is looped
function game(){
	update(); // Updating physics, positions and other stuff except shapes
	render(); // Drawing shapes

	requestAnimationFrame(game);
}
game();
