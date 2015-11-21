function CreateFood(scene, position) {
	var food = new BABYLON.Mesh.CreateSphere('food', 16, 0.3, scene);
	food.position = position;
	
	return food;
}

function UpdateFood(food, player) {
	if (food.intersectsMesh(player, false)) {
		food.position.y = -100;
		food.dispose();
	}
}