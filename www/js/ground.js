function CreateGround(scene) {
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("images/world.jpg", scene);
	
	var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false);
	ground.material = groundMaterial;
	
	return ground;
}