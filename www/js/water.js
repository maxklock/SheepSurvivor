function CreateWater(scene) {
	
	var settings = {
		width: 512,
		height: 512,
		levelOfDetail: 32
	};
	
	var water = BABYLON.Mesh.CreateGround("water", settings.width, settings.height, settings.levelOfDetail, scene, false);

	var waterMaterial = new BABYLON.WaterMaterial("water_material", scene);
	waterMaterial.bumpTexture = new BABYLON.Texture("images/waterbump.png", scene); // Set the bump texture
	
	water.material = waterMaterial;
	
	return water;
}