function CreateFood(scene, position) {
	var food = new BABYLON.Mesh.CreateSphere('food', 16, 0.3, scene);
	food.position = position;
	
	return food;
}

function UpdateFood(food, player, scene) {
	if (player.intersectsMesh(food, false)) {
		values.food += settings.food;
		sounds.sheep.play();
		return false;
	}
	
	return true;
}