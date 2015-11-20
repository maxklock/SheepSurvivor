window.addEventListener('DOMContentLoaded', function(){
		// get the canvas DOM element
		var canvas = document.getElementById('renderCanvas');
		
		var settings = {
			rotationSpeed: Math.PI / 64,
			movingSpeed: 0.2	
		};

		// load the 3D engine
		var engine = new BABYLON.Engine(canvas, true);
		
		// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
		var camera;
		var world;
		var player;
		
		var keyStates = new Array();
		
		function isDown(key) {
			return keyStates[key];
		}

		// createScene function that creates and return the scene
		var createScene = function(){
			// create a basic BJS Scene object
			var scene = new BABYLON.Scene(engine);
			scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
			scene.collisionsEnabled = true;
			
			// init player
			player = new BABYLON.Mesh.CreateSphere('sphere2', 16, 2, scene);
			player.position.y += 1;
			
			//camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
			camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 50, -100), scene);
			camera.target = player;
			player.applyGravity = true;
			player.checkCollisions = true;
			player.ellipsoid = new BABYLON.Vector3(1, 1, 1);

			// attach the camera to the canvas
			camera.attachControl(canvas, false);

			// create a basic light, aiming 0,1,0 - meaning, to the sky
			var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

			// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
			// world = new BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
			world = CreateGround(scene);
			world.checkCollisions = true;


			// return the created scene
			return scene;
		}

		// call the createScene function
		var scene = createScene();

		// run the render loop
		engine.runRenderLoop(function(){
			scene.render();
			
			if (isDown('W')) {
				player.locallyTranslate(new BABYLON.Vector3(0,0,-settings.movingSpeed));
			}
			if (isDown('S')) {
				player.locallyTranslate(new BABYLON.Vector3(0,0,settings.movingSpeed));
			}
			if (isDown('A')) {
				player.rotation.y -= settings.rotationSpeed;
			}
			if (isDown('D')) {
				player.rotation.y += settings.rotationSpeed;
			}
		});

		// the canvas/window resize event handler
		window.addEventListener('resize', function(){
			engine.resize();
		});
		
		window.addEventListener('keypress', function(e) {
			console.log("keyDown: " + e.char.toUpperCase());
			keyStates[e.char.toUpperCase()] = true;
		});
		
		window.addEventListener('keyup', function(e) {
			console.log("keyUp: " + e.char.toUpperCase());
			keyStates[e.char.toUpperCase()] = false;
		});
	});
