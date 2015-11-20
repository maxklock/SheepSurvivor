function CreateGround(scene) {
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("images/world.jpg", scene);
	
	var settings = {
		width: 200,
		height: 200,
		levelOfDetail: 250,
		minLevel: 0,
		maxLevel: 20
	}
	
	var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/worldHeightMap.jpg", settings.width, settings.height, settings.levelOfDetail, settings.minLevel, settings.maxLevel, scene, false);
	ground.material = groundMaterial;
	
	return ground;
}