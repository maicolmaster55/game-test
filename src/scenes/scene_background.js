class Scene_background extends Phaser.Scene {
	constructor() {
		super({ key: "Scene_background" });
	}
	init() {
	}
	create() {
		this.map = this.physics.add.image(1280, 180, "map").setScale(4);
		this.map.setVelocity(-70, 0);
		this.arboles = this.physics.add.image(1280, 180, "arboles").setScale(4);
		this.arboles.setVelocity(-70, 0);
		this.registry.events.on('finalOver', () => {
			this.map.setVelocity(0, 0);
			this.arboles.setVelocity(0, 0);
		});
	}
	update(time, delta) {

	}
}
export default Scene_background;