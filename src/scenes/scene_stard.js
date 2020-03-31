class Scene_stard extends Phaser.Scene {
	constructor() {
		super({ key: "Scene_stard" });
	}
	init() {
		this.restarVidas = 1;
	}
	create() {
		localStorage.removeItem("overfinal");
		this.data.set("move", 3);
		//background
		this.map = this.physics.add.image(1280, 180, "map").setScale(4);
		this.arboles = this.physics.add.image(1280, 180, "arboles").setScale(4);
		if (localStorage.getItem("player00")) {
			this.player = this.physics.add.sprite(140, 272, "maicol").setScale(4);
			this.player.anims.play("maicol_static");
		}
		if (localStorage.getItem("player01")) {
			this.player = this.physics.add.sprite(140, 276, "player01").setScale(4);
			this.player.anims.play("player01_static");
		}
		if (localStorage.getItem("player")) {
			this.player = this.physics.add.sprite(140, 288, "player").setScale(4);
		}
		this.piso = this.add.image(960, 344, "piso").setScale(4);
		this.botom_personajes = this.add.sprite(44, 316, "botom_personajes").setInteractive().setScale(4);
		this.botom_opciones = this.add.sprite(600, 316, "botom_opciones").setInteractive().setScale(4);
		this.botom_stard = this.add.sprite(this.sys.game.config.width / 2, 316, "botom_stard").setInteractive().setScale(4);
		this.botom_online = this.add.sprite(10000, 316, "botom_online").setInteractive().setScale(4);
		this.flechas = this.add.sprite(320, 276, "flechas").setInteractive().setScale(4).setAlpha(0);
		//anims
		this.anims.create({
			key: "botom_online",
			frames: this.anims.generateFrameNumbers("botom_online", {
				frames: [0]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_opciones",
			frames: this.anims.generateFrameNumbers("botom_opciones", {
				frames: [0]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_personajes",
			frames: this.anims.generateFrameNumbers("botom_personajes", {
				frames: [0]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_stard",
			frames: this.anims.generateFrameNumbers("botom_stard", {
				frames: [0]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_online_up",
			frames: this.anims.generateFrameNumbers("botom_online", {
				frames: [3, 4]
			}),
			repeat: -1,
			frameRate: 5
		});
		this.anims.create({
			key: "botom_opciones_up",
			frames: this.anims.generateFrameNumbers("botom_opciones", {
				frames: [3, 4]
			}),
			repeat: -1,
			frameRate: 5
		});
		this.anims.create({
			key: "botom_personajes_up",
			frames: this.anims.generateFrameNumbers("botom_personajes", {
				frames: [3, 4]
			}),
			repeat: -1,
			frameRate: 5
		});
		this.anims.create({
			key: "botom_stard_up",
			frames: this.anims.generateFrameNumbers("botom_stard", {
				frames: [3, 4]
			}),
			repeat: -1,
			frameRate: 5
		});
		this.anims.create({
			key: "botom_online_down",
			frames: this.anims.generateFrameNumbers("botom_online", {
				frames: [5]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_opciones_down",
			frames: this.anims.generateFrameNumbers("botom_opciones", {
				frames: [5]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_personajes_down",
			frames: this.anims.generateFrameNumbers("botom_personajes", {
				frames: [5]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "botom_stard_down",
			frames: this.anims.generateFrameNumbers("botom_stard", {
				frames: [5]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "flechas_move",
			frames: this.anims.generateFrameNumbers("flechas", {
				frames: [1, 0]
			}),
			repeat: -1,
			frameRate: 5
		});
		this.move = 2;
		this.on = 2;
		this.time.addEvent({
			delay: 100,
			repeat: 1,
			callback: () => {
				this.on = 1;
			}
		});
		this.botom_stard.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.botom_stard.anims.play("botom_stard_down");
		}, this);
		this.botom_stard.on(Phaser.Input.Events.POINTER_UP, () => {
			this.scene.start("Scene_play");
		}, this);

		this.botom_personajes.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.botom_personajes.anims.play("botom_personajes_down");
		}, this);
		this.botom_personajes.on(Phaser.Input.Events.POINTER_UP, () => {
			this.scene.start("Scene_personajes");
		}, this);
		this.botom_stard.anims.play("botom_stard_up");
		this.prevMov = 'stard';
		this.moment = 1;
		this.cur = 1;

		this.cursor = this.input.keyboard.createCursorKeys();
		const keyCodes = Phaser.Input.Keyboard.KeyCodes;
		this.teclaZ = this.input.keyboard.addKey(keyCodes.Z);
		this.uno = 1;
	}
	update(time, delta) {
		if (Phaser.Input.Keyboard.JustDown(this.teclaZ)) {
			this.uno = 2;
			this.botom_stard.anims.play("botom_stard_down");
		}
		if (this.uno == 2) {
		if (Phaser.Input.Keyboard.JustUp(this.teclaZ)) {
			this.move = 6;
			this.on = 3;
			this.botom_personajes.x = 10000;
			this.botom_stard.x = 10000;
			this.botom_opciones.x = 10000;
			this.botom_online.x = 10000;
			this.player.anims.play("player_run");
			this.player.setVelocityX(250);
		}
	}
		if (this.player.x >= 319 | !this.player.x > this.sys.game.config.width) {
			if (this.on == 3) {
				this.on = 4;
				this.player.x = 320;
				this.player.setVelocityX(0);
				this.player.anims.play("player01_static");
				this.flechas.setAlpha(1);
				this.flechas.anims.play("flechas_move");
			}
		}


		if (this.moment == 2) {
			this.moment = 1;
			this.scene.start("Scene_play");
		}
		if (this.on == 4) {
			if (this.cursor.left.isDown) {
				this.on = 2;
				this.moment = 2;
			} else if (this.cursor.right.isDown) {
				this.on = 2;
				this.moment = 2;
			}
		}
		if (this.cursor.left.isDown) {
			if (this.on == 1) {
				this.on = 2;
				this.move--;
			}
		} else if (this.cursor.right.isDown) {
			if (this.on == 1) {
				this.on = 2;
				this.move++;
			}
		}
		if (this.move == 5) {
			this.move = 1
		}
		if (this.move == 0) {
			this.move = 4
		}
		if (this.on == 2) {
			this.time.addEvent({
				delay: 100,
				duration: 200,
				callback: () => {
					this.on = 1;
				}
			});
		}
		if (this.move == 3) {
			if (this.prevMov !== 'online') {
				this.prevMov = 'online';
				this.botom_online.anims.play("botom_online_up");
				this.botom_opciones.anims.play("botom_opciones");
				this.botom_stard.anims.play("botom_stard");
				this.botom_personajes.anims.play("botom_personajes");
			}
			this.botom_personajes.x = 10000;
			this.botom_online.x = this.sys.game.config.width / 2;
			this.botom_online.y = 308;
			this.botom_opciones.y = 316;
			this.botom_stard.x = 44;
			this.botom_stard.y = 316;
			this.botom_personajes.y = 316;
			this.botom_opciones.x = 600;

		}
		if (this.move == 4) {
			if (this.prevMov !== 'opciones') {
				this.prevMov = 'opciones';
				this.botom_opciones.anims.play("botom_opciones_up");
				this.botom_stard.anims.play("botom_stard");
				this.botom_online.anims.play("botom_online");
				this.botom_personajes.anims.play("botom_personajes");
			}
			this.botom_online.x = 44;
			this.botom_opciones.x = this.sys.game.config.width / 2;
			this.botom_opciones.y = 308;
			this.botom_personajes.x = 600;
			this.botom_online.y = 316;
			this.botom_stard.y = 316;
			this.botom_personajes.y = 316;
			this.botom_stard.x = 10000;

		}
		if (this.move == 2) {
			if (this.prevMov !== 'stard') {
				this.prevMov = 'stard';
				this.botom_stard.anims.play("botom_stard_up");
				this.botom_online.anims.play("botom_online");
				this.botom_personajes.anims.play("botom_personajes");
				this.botom_opciones.anims.play("botom_opciones");
			}
			this.botom_personajes.x = 44;
			this.botom_stard.x = this.sys.game.config.width / 2;
			this.botom_stard.y = 308;
			this.botom_opciones.x = 10000;
			this.botom_opciones.y = 316;
			this.botom_personajes.y = 316;
			this.botom_online.x = 600;
			this.botom_online.y = 316;
			this.play = 2;
		}
		if (this.move == 1) {
			if (this.prevMov !== 'personajes') {
				this.prevMov = 'personajes';
				this.botom_personajes.anims.play("botom_personajes_up");
				this.botom_online.anims.play("botom_online");
				this.botom_stard.anims.play("botom_stard");
				this.botom_opciones.anims.play("botom_opciones");
			}
			this.botom_stard.x = 600;
			this.botom_personajes.x = this.sys.game.config.width / 2;
			this.botom_online.x = 10000;
			this.botom_opciones.x = 44;
			this.botom_personajes.y = 308;
			this.botom_online.y = 316;
			this.botom_stard.y = 316;
			this.botom_opciones.y = 316;

		}

	}
}
export default Scene_stard;