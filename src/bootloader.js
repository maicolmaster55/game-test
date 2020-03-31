class Bootloader extends Phaser.Scene {
	constructor() {
		super({ key: "Bootloader" });
	}
	preload() {
		this.load.on("complete", () => {
			let center_width = this.sys.game.config.width / 2;
			let center_height = this.sys.game.config.height / 2;
			const font_json = this.cache.json.get('font_json');
			this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, font_json));
			this.anims.create({
				key: "player_run",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [8, 9, 10, 11, 12, 13, 14, 15]
				}),
				repeat: -1,
				frameRate: 10
			});
			this.anims.create({
				key: "player01_static",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [0, 1, 2, 3, 4, 5, 6, 7]
				}),
				repeat: -1,
				frameRate: 8
			});
			this.anims.create({
				key: "player_run_wounded",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [32, 9, 34, 11, 36, 13, 38, 15]
				}),
				repeat: -1,
				frameRate: 10
			});
			this.anims.create({
				key: "player01_static_wounded",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [24, 1, 26, 3, 28, 5, 30, 7]
				}),
				repeat: -1,
				frameRate: 8
			});
			this.anims.create({
				key: "player01_wounded",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [16]
				}),
				repeat: 0,
				frameRate: 10
			});
			this.anims.create({
				key: "player01_death",
				frames: this.anims.generateFrameNumbers("player01_death", {
					frames: [0, 1, 2]
				}),
				repeat: 0,
				frameRate: 12
			});
			this.anims.create({
				key: "player_static_regeneration",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [40, 41, 42, 43, 44, 45, 6, 7]
				}),
				repeat: 0,
				frameRate: 10
			});
			this.anims.create({
				key: "player_run_regeneration",
				frames: this.anims.generateFrameNumbers("player01", {
					frames: [48, 49, 50, 51, 52, 53, 14, 15]
				}),
				repeat: 0,
				frameRate: 10
			});
			this.anims.create({
				key: "maicol_static",
				frames: this.anims.generateFrameNumbers("maicol", {
					frames: [0, 1, 2, 3, 4, 5, 6, 7]
				}),
				repeat: -1,
				frameRate: 8
			});
			this.anims.create({
				key: "maicol_run",
				frames: this.anims.generateFrameNumbers("maicol", {
					frames: [8, 9, 10, 11, 12, 13, 14, 15]
				}),
				repeat: -1,
				frameRate: 10
			});

			this.anims.create({
				key: "maicol_run_wounded",
				frames: this.anims.generateFrameNumbers("maicol", {
					frames: [32, 33, 34, 35, 36, 37, 38, 39]
				}),
				repeat: -1,
				frameRate: 10
			});
			this.anims.create({
				key: "maicol_static_wounded",
				frames: this.anims.generateFrameNumbers("maicol", {
					frames: [24, 25, 26, 27, 28, 29, 30, 31]
				}),
				repeat: -1,
				frameRate: 8
			});
			this.anims.create({
				key: "maicol_wounded",
				frames: this.anims.generateFrameNumbers("maicol", {
					frames: [16]
				}),
				repeat: 0,
				frameRate: 10
			});
			this.anims.create({
				key: "maicol_death",
				frames: this.anims.generateFrameNumbers("maicol_death", {
					frames: [0, 1, 2]
				}),
				repeat: 0,
				frameRate: 12
			});
			this.scene.start("Scene_play");
		});
		this.load.image("font", "../assets/font/font.png");
		this.load.json("font_json", "../assets/font/font.json");
		//background
		this.load.image("arbustos", "../assets/background/arbustos.png");
		this.load.image("arboles", "../assets/background/arbol.png");
		this.load.image("map", "../assets/background/map.png");
		//personajes
		this.load.spritesheet("player01", "../assets/characters/player01.png", { frameWidth: 18, frameHeight: 27 });
		this.load.spritesheet("maicol", "../assets/characters/maicol.png", { frameWidth: 20, frameHeight: 29 });
		this.load.spritesheet("player", "../assets/characters/player.png", { frameWidth: 16, frameHeight: 18 });
		//personajes muerte
		this.load.spritesheet("player01_death", "../assets/characters/player01_death.png", { frameWidth: 24, frameHeight: 25 });
		this.load.spritesheet("maicol_death", "../assets/characters/maicol_death.png", { frameWidth: 24, frameHeight: 27 });
		//personajes colisions
		this.load.image("player01_colision", "../assets/characters/colisions/player01_colision.png");
		//botones
		this.load.spritesheet("botom_personajes", "../assets/menus/botom_personajes.png", { frameWidth: 23, frameHeight: 25 });
		this.load.spritesheet("botom_return", "../assets/menus/botom_return.png", { frameWidth: 19, frameHeight: 21 });
		this.load.spritesheet("botom_compartir", "../assets/menus/botom_compartir.png", { frameWidth: 19, frameHeight: 21 });
		this.load.spritesheet("botom_aceptar", "../assets/menus/botom_aceptar.png", { frameWidth: 100, frameHeight: 21 });
		this.load.spritesheet("botom_stard", "../assets/menus/botom_stard.png", { frameWidth: 23, frameHeight: 25 });
		this.load.spritesheet("botom_opciones", "../assets/menus/botom_opciones.png", { frameWidth: 23, frameHeight: 25 });
		this.load.spritesheet("botom_online", "../assets/menus/botom_online.png", { frameWidth: 23, frameHeight: 25 });

		this.load.image("left_botom", "../assets/objects/left_botom.png");
		this.load.image("right_botom", "../assets/objects/right_botom.png");
		//pisos
		this.load.image("piso", "../assets/pisos/piso.png");
		//menus
		this.load.image("menu_personajes", "../assets/menus/menu_personajes.png");
		this.load.image("cero", "../assets/menus/0.png");
		this.load.spritesheet("flechas", "../assets/menus/flechas.png", { frameWidth: 42, frameHeight: 11 });
		this.load.spritesheet("Vida2", "../assets/menus/Vida.png", { frameWidth: 11, frameHeight: 12 });
		this.load.spritesheet("Vida1", "../assets/menus/Vida2.png", { frameWidth: 11, frameHeight: 12 });
		//vida
		this.load.spritesheet("fruit_vida", "../assets/objects/life/fruit_vida.png", { frameWidth: 15, frameHeight: 16 });
		this.load.spritesheet("fruit_vida_rodation", "../assets/objects/life/fruit_vida_rodation.png", { frameWidth: 20, frameHeight: 16 });
		this.load.spritesheet("fruit_vida_Gold", "../assets/objects/life/fruit_vida2.png", { frameWidth: 15, frameHeight: 16 });
		this.load.spritesheet("cura", "../assets/objects/life/cura.png", { frameWidth: 30, frameHeight: 30 });
		this.load.image("fruit_Vida_colision", "../assets//objects/life/lifeColisions/fruit_vida_colision.png");
		//atacks
		this.load.spritesheet("fruit01", "../assets/objects/atacks/fruit_01.png", { frameWidth: 15, frameHeight: 16 });
		//atacks colision
		this.load.image("fruit01_colision", "../assets/objects/atacks/atacksColisions/fruit_01_colision.png");
	}
}

export default Bootloader;