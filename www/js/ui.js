var foodDiv;
var mainMenu;
var inGame;
var gameOver;
var controlling;
var btnStart;
var btnBackC;
var btnBackG;
var btnHelp;

var state;

var STATES = {
	mainMenu: "mainMenu",
	startGame: "startGame",
	inGame: "inGame",
	gameOver: "gameOver",
	controlling: "controlling"
};

window.addEventListener('DOMContentLoaded', function(){
		// get the canvas DOM element
		foodDiv = document.getElementById('foodDiv');
		mainMenu = document.getElementById('mainMenu');
		inGame = document.getElementById('inGame');
		gameOver = document.getElementById('gameOver');
		controlling = document.getElementById('controlling');
		btnStart = document.getElementById('btnStart');
		btnHelp = document.getElementById('btnHelp');
		btnBackC = document.getElementById('btnBackC');
		btnBackG = document.getElementById('btnBackG');
		
		state = STATES.mainMenu;
		
		btnStart.addEventListener('click', function () {
			state = STATES.startGame;
		});
		
		btnHelp.addEventListener('click', function () {
			state = STATES.controlling;
		});
		
		btnBackC.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
		
		btnBackG.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
});

function UpdateUI() {
	mainMenu.style.display = (state == STATES.mainMenu ? "block" : "none");
	inGame.style.display = (state == STATES.inGame ? "block" : "none");
	gameOver.style.display = (state == STATES.gameOver ? "block" : "none");
	controlling.style.display = (state == STATES.controlling ? "block" : "none");
	
	foodDiv.innerText = values.food.toString();
}