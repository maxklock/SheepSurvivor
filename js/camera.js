function CreateCamera(scene, player, canvas) {
	var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 50, 0), scene);
	camera.target = player;
	camera.radius = settings.camera.minRadius;
	camera.attachControl(canvas, false);
	
	return camera;
}

function UpdateCamera(camera, light, shadowGenerator) {
	camera.radius -= mouseWheelDelta * 0.025;
	
	if (camera.radius < settings.camera.minRadius) {
		camera.radius = settings.camera.minRadius;
	} else if (camera.radius > settings.camera.maxRadius) {
		camera.radius = settings.camera.maxRadius;
	}
}