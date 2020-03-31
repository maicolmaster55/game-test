import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/scene_play.js";
import Scene_stard from "./scenes/scene_stard.js";
import Scene_personajes from "./scenes/scene_personajes.js";
import Scene_background from "./scenes/scene_background.js";
import Datos from "./scenes/datos.js";
const config = {
	width: 640,
	height: 360,
	parent: "contenedor",
	pixelArt: true,
	type: Phaser.AUTO,
	backgroundColor: "#00000",
	scene: [
		Bootloader,
		Scene_background,
		Datos,
		Scene_play,
		Scene_personajes,
		Scene_stard,
	],
	physics: {
		default: "arcade",
	}
}

new Phaser.Game(config);