var foodDiv;
var mainMenu;
var inGame;
var gameOver;
var btnStart;
var btnBack;

var state;

var STATES = {
	mainMenu: "mainMenu",
	startGame: "startGame",
	inGame: "inGame",
	gameOver: "gameOver"
};

window.addEventListener('DOMContentLoaded', function(){
		// get the canvas DOM element
		foodDiv = document.getElementById('foodDiv');
		mainMenu = document.getElementById('mainMenu');
		inGame = document.getElementById('inGame');
		gameOver = document.getElementById('gameOver');
		btnStart = document.getElementById('btnStart');
		btnBack = document.getElementById('btnBack');
		
		state = STATES.mainMenu;
		
		btnStart.addEventListener('click', function () {
			state = STATES.startGame;
		});
		
		btnBack.addEventListener('click', function () {
			state = STATES.mainMenu;
		});
});

function UpdateUI() {
	mainMenu.style.display = (state == STATES.mainMenu ? "block" : "none");
	inGame.style.display = (state == STATES.inGame ? "block" : "none");
	gameOver.style.display = (state == STATES.gameOver ? "block" : "none");
	
	foodDiv.innerText = values.food.toString();
}