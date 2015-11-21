var keyStates = new Array();
var mouseWheelDelta = 0;

function isDown(key) {
	return keyStates[key];
}

var settings = {
	rotationSpeed: Math.PI / 64,
	movingSpeed: 4,
	gravity: 0.2,
	camera: {
		minRadius: 8,
		maxRadius: 20
	},
	startValues: {
		energie: 500,
		food: 10	
	},
	food: 5
};

var values = {
	food: 0,
	energie: 0
};

var sounds = {
	sheep: null
};

window.addEventListener('DOMContentLoaded', function() {
		// get the canvas DOM element
		var canvas = document.getElementById('renderCanvas');
	
		// load the 3D engine
		var engine = new BABYLON.Engine(canvas, true);
		
		// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
		var camera;
		var world;
		var player;
		var foods;
		
		// createScene function that creates and return the scene
		var createScene = function(){
			// create a basic BJS Scene object
			var scene = new BABYLON.Scene(engine);
			
			// init player
			if (player != null) {
				player.dispose();
				player = null;
			}
			player = CreatePlayer(scene);
			
			// camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
			if (camera != null) {
				camera.dispose();
				camera = null;
			}
			camera = CreateCamera(scene, player, canvas);
	
			// create a basic light, aiming 0,1,0 - meaning, to the sky
			var light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0,-1,0), scene);
	
			// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
			// world = new BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
			if (world != null) {
				world.dispose();
				world = null;
			}
			world = CreateWorld(scene);
			world.checkCollisions = true;
			world.position.y = -2;
			
				
			// load sounds;
			if (sounds.sheep != null) {
				sounds.sheep.dispose();
				sounds.sheep = null;
			}
			sounds.sheep = new BABYLON.Sound("sheep", "music/sheep.wav", scene);
		
			// create food;
			foods = new Array();
			foods.push(CreateFood(scene, new BABYLON.Vector3(-80, 5, -50)));
			foods.push(CreateFood(scene, new BABYLON.Vector3(20, 3, 2)));
			
			// init values;
			values.energie = settings.startValues.energie;
			values.food = settings.startValues.food;
	
			// return the created scene
			return scene;
		}
	
		// call the createScene function
		var scene;
	
		// run the render loop
		engine.runRenderLoop(function(){
			
			if (state == STATES.startGame) {
				scene = createScene();
				state = STATES.inGame;
			}
			else if (state == STATES.inGame) {
				scene.render();
				
				UpdatePlayer(player);
				UpdateCamera(camera);
				
				for (var i = 0; i < foods.length; i++) { 
					if (!UpdateFood(foods[i], player, scene)) {
						foods[i].dispose();
						foods.splice(i, 1);
					}
				}
				
				if (isDown('M') && !sounds.sheep.isPlaying) {
					sounds.sheep.play();
				}
				
				values.energie--;
				if (values.energie <= 0) {
					values.food--;
					values.energie = settings.startValues.energie;
				}
				
				if (values.food <= 0) {
					state = STATES.gameOver;
					sounds.sheep.play();
				}
			}		
				
			UpdateUI();
				
			mouseWheelDelta = 0;	
		});
	
		// the canvas/window resize event handler
		window.addEventListener('resize', function(){
			engine.resize();
		});
		
		window.addEventListener('keypress', function(e) {
			keyStates[String.fromCharCode(e.keyCode).toUpperCase()] = true;
		});
		
		window.addEventListener('keyup', function(e) {
			keyStates[String.fromCharCode(e.keyCode).toUpperCase()] = false;
		});
		
		window.addEventListener('mousewheel', function (e) {
			mouseWheelDelta = e.wheelDelta;
		})
	});
