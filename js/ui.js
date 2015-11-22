var foodDiv;
var finalPoints;

var mainMenu;
var inGame;
var gameOver;
var controlling;
var win;
var credits;

var btnStart;
var btnBackC;
var btnBackG;
var btnBackW;
var btnBackCr;
var btnHelp;
var btnCredits;

var state;

var STATES = {
	mainMenu: "mainMenu",
	startGame: "startGame",
	inGame: "inGame",
	gameOver: "gameOver",
	controlling: "controlling",
	win: "win",
	credits: "credits"
};

window.addEventListener('DOMContentLoaded', function(){
		// get the canvas DOM element
		foodDiv = document.getElementById('foodDiv');
		finalPoints = document.getElementById('finalPoints');
		
		mainMenu = document.getElementById('mainMenu');
		inGame = document.getElementById('inGame');
		gameOver = document.getElementById('gameOver');
		controlling = document.getElementById('controlling');
		win = document.getElementById('win');
		credits = document.getElementById('credits');
		
		btnStart = document.getElementById('btnStart');
		btnHelp = document.getElementById('btnHelp');
		btnCredits = document.getElementById('btnCredits');
		btnBackC = document.getElementById('btnBackC');
		btnBackG = document.getElementById('btnBackG');
		btnBackCr = document.getElementById('btnBackCr');
		btnBackW = document.getElementById('btnBackW');
		
		state = STATES.mainMenu;
		
		btnStart.addEventListener('click', function () {
			state = STATES.startGame;
		});
		
		btnHelp.addEventListener('click', function () {
			state = STATES.controlling;
		});	
		
		btnCredits.addEventListener('click', function () {
			state = STATES.credits;
		});
		
		btnBackC.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
		
		btnBackG.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
		
		btnBackCr.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
		
		btnBackW.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
});

function UpdateUI() {
	mainMenu.style.display = (state == STATES.mainMenu ? "block" : "none");
	inGame.style.display = (state == STATES.inGame ? "block" : "none");
	gameOver.style.display = (state == STATES.gameOver ? "block" : "none");
	controlling.style.display = (state == STATES.controlling ? "block" : "none");
	win.style.display = (state == STATES.win ? "block" : "none");
	credits.style.display = (state == STATES.credits ? "block" : "none");
	
	foodDiv.innerText = values.food.toString();
	finalPoints.innerText = (values.food * settings.startValues.energie + values.energie) + ' Punkte';
}