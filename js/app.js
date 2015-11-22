var keyStates = new Array();
var mouseWheelDelta = 0;

function isDown(key) {
	return keyStates[key];
}

var settings = {
	rotationSpeed: Math.PI / 64,
	movingSpeed: 3,
	swimmingBreak: 0.5,
	gravity: 0.2,
	camera: {
		minRadius: 8,
		maxRadius: 20
	},
	startValues: {
		energie: 300,
		food: 10	
	},
	food: 5
};

var values = {
	food: 0,
	energie: 0
};

var sounds = {
	sheep: null,
	background: null,
	water: null
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
		var scene;
		var light;
		var shadowGenerator;
		
		// createScene function that creates and return the scene
		var createScene = function(){
			// create a basic BJS Scene object
			var scene = new BABYLON.Scene(engine);
			
			// init player
			player = CreatePlayer(scene);
			player.receiveShadows = true;
			
			// camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
			camera = CreateCamera(scene, player, canvas);
	
			// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
			// world = new BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
			world = CreateWorld(scene);
			world.checkCollisions = true;
			world.position.y = -2;
			// world.receiveShadows = true;
			
			// light and shadows		
			light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0,-10,0), scene);
			shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
			shadowGenerator.getShadowMap().renderList.push(world);
				
			// load sounds;
			sounds.sheep = new BABYLON.Sound("sheep", "music/sheep.wav", scene);
			sounds.water = new BABYLON.Sound("water", "music/water.wav", scene);
			sounds.background = new BABYLON.Sound("background", "music/background.mp3", scene);
		
			// create food;
			foods = new Array();
			foods.push(CreateFood(scene, new BABYLON.Vector3(-150, 3, 60)));
			foods.push(CreateFood(scene, new BABYLON.Vector3(70, 3, 60)));
			foods.push(CreateFood(scene, new BABYLON.Vector3(-160, 3, -65)));
			foods.push(CreateFood(scene, new BABYLON.Vector3(120, 4, 15)));
			foods.push(CreateFood(scene, new BABYLON.Vector3(-20, 1, -90)));
			
			// init values;
			values.energie = settings.startValues.energie;
			values.food = settings.startValues.food;
	
			// return the created scene
			return scene;
		}
	
		// run the render loop
		engine.runRenderLoop(function(){
			
			if (state == STATES.startGame) {
				scene = createScene();
				state = STATES.inGame;
			}
			else if (state == STATES.inGame) {
				scene.render();
				
				if (!sounds.background.isPlaying) {
					sounds.background.play();
				}
				
				UpdatePlayer(player);
				UpdateCamera(camera, light, shadowGenerator);
				
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
					sounds.background.stop();
				}
				
				if (foods.length <= 0) {
					state = STATES.win;
					sounds.sheep.play();
					sounds.background.stop();
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
