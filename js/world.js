function CreateWorld(scene) {
	var groundMaterial = new BABYLON.StandardMaterial("world_material", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("images/world.png", scene);
	groundMaterial.specularPower = Number.MAX_VALUE;
	
	var settings = {
		width: 400,
		height: 200,
		levelOfDetail: 250,
		minLevel: 0,
		maxLevel: 20
	}
	
	// Skybox
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox_material", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/TropicalSunnyDay", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;
	
	var world = BABYLON.Mesh.CreateGroundFromHeightMap("world", "images/worldHeightMap.png", settings.width, settings.height, settings.levelOfDetail, settings.minLevel, settings.maxLevel, scene, false);
	world.material = groundMaterial;
	
	var water = BABYLON.Mesh.CreateGround("water", settings.width * 2, settings.height * 2, settings.levelOfDetail, scene, false);

	var waterMaterial = new BABYLON.WaterMaterial("water_material", scene);
	waterMaterial.bumpTexture = new BABYLON.Texture("images/water.png", scene); // Set the bump texture
	waterMaterial.addToRenderList(skybox);
	waterMaterial.waveHeight = 0.05;
	waterMaterial.bumpHeight = 0.1;
	waterMaterial.waveLength = 0.1;
	
	water.material = waterMaterial;
	water.position.y = 0.5;
	
	return world;
}