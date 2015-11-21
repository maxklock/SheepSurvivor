window.addEventListener('DOMContentLoaded', function(){
		// get the canvas DOM element
		var canvas = document.getElementById('renderCanvas');
		
		var settings = {
			rotationSpeed: Math.PI / 64,
			movingSpeed: 4,
			gravity: 0.2
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
			
			// init player
			player = new BABYLON.Mesh.CreateSphere('sphere2', 16, 1, scene);
			player.position.y += 3;
			player.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
			
			// camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
			camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 50, 0), scene);
			camera.target = player;

			// attach the camera to the canvas
			camera.attachControl(canvas, false);

			// create a basic light, aiming 0,1,0 - meaning, to the sky
			var light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0,-1,0), scene);

			// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
			// world = new BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
			world = CreateWorld(scene);
			world.checkCollisions = true;
			world.position.y = -2;

			// return the created scene
			return scene;
		}

		// call the createScene function
		var scene = createScene();

		// run the render loop
		engine.runRenderLoop(function(){
			scene.render();
			
			var forwards = new BABYLON.Vector3.Zero();
			
			if (isDown('A')) {
				player.rotation.y -= settings.rotationSpeed;
			}
			if (isDown('D')) {
				player.rotation.y += settings.rotationSpeed;
			}
			if (isDown('W')) {
				forwards.x = -parseFloat(Math.sin(player.rotation.y)) / settings.movingSpeed;
				forwards.z = -parseFloat(Math.cos(player.rotation.y)) / settings.movingSpeed;
				forwards.y = -settings.gravity;
			}
			if (isDown('S')) {
				forwards.x = parseFloat(Math.sin(player.rotation.y)) / settings.movingSpeed;
				forwards.z = parseFloat(Math.cos(player.rotation.y)) / settings.movingSpeed;
				forwards.y = -settings.gravity;
			}
			
			if (player.position.y < 0.6) {
				player.position.y = 0.6;
			}

			player.moveWithCollisions(forwards);
		});

		// the canvas/window resize event handler
		window.addEventListener('resize', function(){
			engine.resize();
		});
		
		window.addEventListener('keypress', function(e) {
			keyStates[e.char.toUpperCase()] = true;
		});
		
		window.addEventListener('keyup', function(e) {
			keyStates[e.char.toUpperCase()] = false;
		});
	});
