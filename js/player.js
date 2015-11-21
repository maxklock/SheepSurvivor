function CreatePlayer(scene) {
	var player = new BABYLON.Mesh.CreateSphere('player', 16, 1, scene);
	player.scaling.z = 2;
	player.position.y += 3;
	player.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
	
	var playerMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
	playerMaterial.diffuseTexture = new BABYLON.Texture("images/sheep.png", scene);
	playerMaterial.specularPower = Number.MAX_VALUE;
	
	player.material = playerMaterial;
	
	var playerHead = new BABYLON.Mesh.CreateSphere('playerHead', 16, 0.5, scene);
	playerHead.parent = player;
	playerHead.scaling.z = 0.5;
	playerHead.position = new BABYLON.Vector3(0, 0.4, -0.4);

	var playerHeadMaterial = new BABYLON.StandardMaterial("playerHeadMaterial", scene);
	playerHeadMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	playerHeadMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	
	playerHead.material = playerHeadMaterial;
	
	return player;
}

function UpdatePlayer(player) {
	var forwards = new BABYLON.Vector3.Zero();
	var direction = (isDown('W') ? 1 : (isDown('S') ? -1 : 0));
	
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
	if (direction == -1) {
		forwards.x = parseFloat(Math.sin(player.rotation.y)) / settings.movingSpeed;
		forwards.z = parseFloat(Math.cos(player.rotation.y)) / settings.movingSpeed;
		forwards.y = -settings.gravity;
	}
	
	if (player.position.y < 0.6) {
		player.position.y = 0.6;
	}

	player.moveWithCollisions(forwards);
}