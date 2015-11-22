function CreatePlayer(scene) {
	var player = new BABYLON.Mesh.CreateSphere('player', 16, 1, scene);
	player.scaling.z = 2;
	player.position.y += 3.5;
	player.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
	
	var playerMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
	playerMaterial.diffuseTexture = new BABYLON.Texture("images/sheep.png", scene);
	playerMaterial.specularPower = Number.MAX_VALUE;
	
	player.material = playerMaterial;
		
	function CreateLeg(name, x, y, start) {
		
		var legMovement = new BABYLON.Animation("legMovement", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		legMovement.setKeys([{
				frame: 0,
				value: 0
			},{
				frame: 20,
				value: Math.PI / 8 * start
			},{
				frame: 40,
				value: 0
			},{
				frame: 60,
				value: -Math.PI / 8 * start
			},{
				frame: 80,
				value: 0
			}]);
		
		var leg = new BABYLON.Mesh.CreateBox("playerLeg" + name, 1.0, scene);
		leg.scaling.x = 0.1;
		leg.scaling.z = 0.05;
		leg.scaling.y = 0.5;
		leg.position = new BABYLON.Vector3(0.3 * x, -0.25, 0.3 * y);
		leg.material = playerMaterial;
		leg.parent = player;
		leg.animations.push(legMovement);
		
		return scene.beginAnimation(leg, 0, 80, true, 3);
	}
	
	legFL = CreateLeg("FrontLeft", 1, -1, -1);
	legFR = CreateLeg("FrontRight", -1, -1, 1);
	legBL = CreateLeg("BackLeft", 1, 1, 1);
	legBR = CreateLeg("BackRight", -1, 1, -1);
	
	var head = new BABYLON.Mesh.CreateSphere('playerHead', 16, 0.5, scene);
	head.parent = player;
	head.scaling.z = 0.5;
	head.position = new BABYLON.Vector3(0, 0.4, -0.4);

	var headMaterial = new BABYLON.StandardMaterial("playerHeadMaterial", scene);
	headMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	headMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	
	head.material = headMaterial;
	
	return player;
	
	isSleeping = false;
}

var isSleeping;
var legFL;
var legFR;
var legBL;
var legBR;

function UpdatePlayer(player) {
	var forwards = new BABYLON.Vector3.Zero();
	var direction = (isDown('W') ? 1 : (isDown('S') ? -1 : 0));
	
	legFL.pause();
	legFR.pause();
	legBL.pause();
	legBR.pause();
	
	if (!isSleeping) {
		if (isDown('A')) {
			player.rotation.y -= settings.rotationSpeed * (direction == 0 ? 1 : direction);
		}
		if (isDown('D')) {
			player.rotation.y += settings.rotationSpeed * (direction == 0 ? 1 : direction);
		}
		if (direction == 1) {
			forwards.x = -parseFloat(Math.sin(player.rotation.y)) / settings.movingSpeed;
			forwards.z = -parseFloat(Math.cos(player.rotation.y)) / settings.movingSpeed;
			forwards.y = -settings.gravity;
		}
		else if (direction == -1) {
			forwards.x = parseFloat(Math.sin(player.rotation.y)) / settings.movingSpeed;
			forwards.z = parseFloat(Math.cos(player.rotation.y)) / settings.movingSpeed;
			forwards.y = -settings.gravity;
		}
		
		if (direction != 0) {		
			legFL.restart();
			legFR.restart();
			legBL.restart();
			legBR.restart();
		} else {	
			legFL.reset();
			legFR.reset();
			legBL.reset();
			legBR.reset();
		}
	}
	
	if (player.position.y < 0.6) {
		player.position.y = 0.6;
		forwards.x *= settings.swimmingBreak;
		forwards.z *= settings.swimmingBreak;
		if (!sounds.water.isPlaying) {
			sounds.water.play(1);
		}
	} else if (player.position.y >= 0.8 || isSleeping) {
		if (isDown('Z')) {
			if (isSleeping) {
				player.position.y += 0.7;
			} else {
				player.position.y -= 0.7;
			}
			isSleeping = !isSleeping;
			keyStates['Z'] = false;
		}
	}

	player.moveWithCollisions(forwards);
}