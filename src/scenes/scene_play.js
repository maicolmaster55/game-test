import player00 from '../Player/player00.js';
import player01 from '../Player/player01.js';
import player01_colision from '../Player/colision/player01_colision.js';
import Fruits01 from '../gameObjects/Fruits01.js';
import Fruits01_colision from '../gameObjects/colision/Fruits01_colision.js';
import FruitsVida from '../gameObjects/FruitsVida.js';
import FruitsVida_colision from '../gameObjects/colision/FruitsVida_colision.js';
import FruitsVida_primer_nivel from '../gameObjects/FruitsVida_primer_nivel.js';
import FruitsVida_colision_primer_nivel from '../gameObjects/colision/fruitsVida_colision_primer_nivel.js';
class Scene_play extends Phaser.Scene {
	constructor() {
		super({ key: "Scene_play" });
	}
	init() {
		this.scene.launch('Datos');
		this.scene.launch('Scene_background');
	}
	create() {
		this.data.set("life", 1);
		this.data.set("second", 2);
		this.data.set("fruit01_Numbers", 200);
		this.data.set("fruitVida_Numbers", 500);
		this.number = 0;
		this.prevMov = 'player01_static';
		this.flases = ["COMIENZA\n   LA\nAVENTURA","   A\nEXPLORAR\n  SIN\n PARAR",""];
		this.num = Math.round(Math.random()*2);
		this.primera = 1;
		//this.botom_stard = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "botom_stard").setInteractive().setScale(4);
		//this.flasesgroup = this.add.bitmapText(200, 148, 'pixelFont', this.flases[this.num]).setScale(4);
		//this.time.addEvent({
		//	delay: 700,
		//	callback: () => {
		//		this.flasesgroup.setAlpha(0)
		//		this.time.addEvent({
		//			delay: 700,
		//			callback: () => {
		//				this.flasesgroup.setAlpha(1)
		//		this.time.addEvent({
		//			delay: 700,
		//			callback: () => {
		//				this.flasesgroup.setAlpha(0)
		//		this.time.addEvent({
		//			delay: 700,
		//			callback: () => {
		//				this.flasesgroup.setAlpha(1)
		//		this.time.addEvent({
		//			delay: 700,
		//			callback: () => {
		//				this.flasesgroup.setAlpha(0)
		//			}
		//		});
		//			}
		//		});
		//			}
		//		});
		//			}
		//		});
		//	}
		//});
		//fruits01
		this.Fruits01Group = new Fruits01({
			physicsWorld: this.physics.world,
			scene: this,
		});
		this.Fruits01Group_colision = new Fruits01_colision({
			physicsWorld: this.physics.world,
			scene: this,
		});
		//fruits vida
		this.FruitsVidaGroup = new FruitsVida({
			physicsWorld: this.physics.world,
			scene: this,
		});
		this.FruitsVidaGroup_colision = new FruitsVida_colision({
			physicsWorld: this.physics.world,
			scene: this,
		});
		//player
		if (localStorage.getItem("player00")) {
			// Personaje
			this.player01 = new player00({
				scene: this,
				x: 319,
				y: 272,
			});
			this.player01_colision = new player01_colision({
				scene: this,
				x: 319,
				y: 272,
			});
		}
		if (localStorage.getItem("player01")) {
			// Personaje
			this.player01 = new player01({
				scene: this,
				x: 319,
				y: 276,
			});
			this.localization = this.physics.add.sprite(140, 276, "player01").setScale(4).setAlpha(0);
			this.player = this.physics.add.sprite(140, 800, "player01").setScale(4);
			this.player2 = this.physics.add.sprite(140, 800, "player01").setScale(4);
			this.player.anims.play('player01_static');
			this.player2.anims.play('player_run');
			this.cure = this.physics.add.sprite(140, 800, "cura").setScale(4);
			this.player01_colision = new player01_colision({
				scene: this,
				x: 319,
				y: 288,
			});
		} this.physics.add.collider([this.player01_colision, this.Fruits01Group_colision], this.wall_floor);
		this.physics.add.overlap(this.player01_colision, this.Fruits01Group_colision, () => {
			this.player01.bombCollision();
			this.player01_colision.bombCollision();
			this.Fruits01Group.bombCollision();
		});
		this.physics.add.collider([this.player01_colision, this.FruitsVidaGroup_colision], this.wall_floor);
		this.physics.add.overlap(this.player01_colision, this.FruitsVidaGroup_colision, () => {
			this.FruitsVidaGroup.vidaCollision();
			this.player01.vidaCollision();
		});
		if (localStorage.getItem("player")) {
			this.player = this.physics.add.sprite(140, 288, "player").setScale(4);
		}
		//piso
		this.piso = this.physics.add.image(960, 344, "piso").setScale(4);
		this.piso.setVelocity(-70, 0);
		this.piso.setImmovable(true);
		this.piso2 = this.physics.add.image(2880, 344, "piso").setScale(4);
		this.piso2.setVelocity(-70, 0);
		this.piso2.setImmovable(true);
		//atacks
		const timeline = this.tweens.createTimeline();
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1000,
			duration: 800,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.primera = 2;
				this.FruitsVida_primer_nivel = new FruitsVida_primer_nivel({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.FruitsVida_colision_primer_nivel = new FruitsVida_colision_primer_nivel({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.FruitsVida_colision_primer_nivel], this.wall_floor);
		this.physics.add.overlap(this.player01_colision, this.FruitsVida_colision_primer_nivel, () => {
			this.FruitsVida_primer_nivel.vidaCollision();
			this.FruitsVida_colision_primer_nivel.vidaCollision();
			this.player01.vidaCollision();
		});
				
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 3000,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

			//	this.data.setValue("fruitVida_Numbers", 200);
			//	this.registry.events.emit('numbers_fruitVida', this.data.get("fruitVida_Numbers"));

			//	this.FruitsVidaGroup.addFruitsVida();
			//	this.FruitsVidaGroup_colision.addFruitsVida_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.primera = 3;

			//	this.data.setValue("fruitVida_Numbers", 200);
			//	this.registry.events.emit('numbers_fruitVida', this.data.get("fruitVida_Numbers"));

			//	this.FruitsVidaGroup.addFruitsVida();
			//	this.FruitsVidaGroup_colision.addFruitsVida_colision();
				this.Fruits02Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits02Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits02Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits02Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits02Group.bombCollision();
				});
				this.Fruits03Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits03Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits03Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits03Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits03Group.bombCollision();
				});
				this.Fruits04Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits04Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits04Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits04Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits04Group.bombCollision();
				});
				this.Fruits05Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits05Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits05Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits05Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits05Group.bombCollision();
				});
				this.Fruits06Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits06Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits06Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits06Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits06Group.bombCollision();
				});
				this.Fruits07Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits07Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits07Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits07Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits07Group.bombCollision();
				});
				this.Fruits08Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits08Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits08Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits08Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits08Group.bombCollision();
				});
				this.Fruits09Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits09Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits09Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits09Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits09Group.bombCollision();
				});
				this.Fruits10Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits10Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits10Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits10Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits10Group.bombCollision();
				});
				this.Fruits11Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits11Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits11Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits11Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits11Group.bombCollision();
				});
				this.Fruits12Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits12Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits12Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits12Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits12Group.bombCollision();
				});
				this.Fruits13Group = new Fruits01({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.Fruits13Group_colision = new Fruits01_colision({
					physicsWorld: this.physics.world,
					scene: this,
				});
				this.physics.add.collider([this.player01_colision, this.Fruits13Group_colision], this.wall_floor);
				this.physics.add.overlap(this.player01_colision, this.Fruits13Group_colision, () => {
					this.player01.bombCollision();
					this.player01_colision.bombCollision();
					this.Fruits13Group.bombCollision();
				});
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 372);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 84);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 133 );
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 516 );
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits13Group.addFruits01();
				this.Fruits13Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 420);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 420);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 84);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();
					
			}
			
		});

		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 420);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits10Group.addFruits01();
				this.Fruits10Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 564);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 516);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 133);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 420);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits08Group.addFruits01();
				this.Fruits08Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits09Group.addFruits01();
				this.Fruits09Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits10Group.addFruits01();
				this.Fruits10Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 133);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 516);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1400,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 208);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 440);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits08Group.addFruits01();
				this.Fruits08Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits09Group.addFruits01();
				this.Fruits09Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1300,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');

			//	this.data.setValue("fruitVida_Numbers", 200);
			//	this.registry.events.emit('numbers_fruitVida', this.data.get("fruitVida_Numbers"));

			//	this.FruitsVidaGroup.addFruitsVida();
			//	this.FruitsVidaGroup_colision.addFruitsVida_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1300,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 516);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 372);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 228);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();
					
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1300,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
					
				
				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits09Group.addFruits01();
				this.Fruits09Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits08Group.addFruits01();
				this.Fruits08Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits10Group.addFruits01();
				this.Fruits10Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();
			}
		});
			timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();
			}
		});
		
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits08Group.addFruits01();
				this.Fruits08Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 324);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits01Group.addFruits01();
				this.Fruits01Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				this.data.setValue("fruit01_Numbers", 250);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits05Group.addFruits01();
				this.Fruits05Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 400);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits04Group.addFruits01();
				this.Fruits04Group_colision.addFruits01_colision();
			}
		});
		timeline.add({
			targets: this.Fruits01Group,
			alpha: 1,
			delay: 1200,
			duration: 100,
			onComplete: () => {
				this.registry.events.emit('update_points');
				
				this.data.setValue("fruit01_Numbers", 36);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits02Group.addFruits01();
				this.Fruits02Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 84);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits03Group.addFruits01();
				this.Fruits03Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 133);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits06Group.addFruits01();
				this.Fruits06Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 180);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits09Group.addFruits01();
				this.Fruits09Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 320);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits07Group.addFruits01();
				this.Fruits07Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 468);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits10Group.addFruits01();
				this.Fruits10Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 516);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits11Group.addFruits01();
				this.Fruits11Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 564);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits12Group.addFruits01();
				this.Fruits12Group_colision.addFruits01_colision();

				this.data.setValue("fruit01_Numbers", 612);
				this.registry.events.emit('numbers_fruit', this.data.get("fruit01_Numbers"));

				this.Fruits13Group.addFruits01();
				this.Fruits13Group_colision.addFruits01_colision();

				
			}
		});
		timeline.play();
		//fisicas
		//fruits anims
		this.anims.create({
			key: "fruit04_rodation",
			frames: this.anims.generateFrameNumbers("fruit_vida_rodation", {
				frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			}),
			repeat: -1,
			frameRate: 8
		});
		this.anims.create({
			key: "fruit01_destruit",
			frames: this.anims.generateFrameNumbers("fruit01", {
				frames: [1, 2, 3, 4]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "fruit04_destruit",
			frames: this.anims.generateFrameNumbers("fruit_vida", {
				frames: [16, 17, 18, 19]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "fruit04_static",
			frames: this.anims.generateFrameNumbers("fruit_vida", {
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			}),
			repeat: -1,
			frameRate: 10
		});
		this.anims.create({
			key: "fruit04Gold_destruit",
			frames: this.anims.generateFrameNumbers("fruit_vida_Gold", {
				frames: [16, 17, 18, 19]
			}),
			repeat: 0,
			frameRate: 10
		});
		this.anims.create({
			key: "fruit04Gold_static",
			frames: this.anims.generateFrameNumbers("fruit_vida_Gold", {
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			}),
			repeat: -1,
			frameRate: 10
		});
		this.anims.create({
			key: "curas",
			frames: this.anims.generateFrameNumbers("cura", {
				frames: [1, 2, 3, 4, 5, 6, 7, 0]
			}),
			repeat: 0,
			frameRate: 8
		});
		this.on = 1
		this.cursor = this.input.keyboard.createCursorKeys();
		this.registry.events.on('aument_life_anim', () => {
			this.cure.anims.play('curas');
			this.time.addEvent({
				delay: 1100,
				callback: () => {
					this.on = 2;
					this.player.y = this.player01.y;
					this.player01.y = 800;
					this.player.anims.play('player_static_regeneration');
					this.player2.anims.play('player_run_regeneration');
					this.time.addEvent({
						delay: 900,
						callback: () => {
							this.on = 1;
							this.player01.y = this.localization.y;	
							this.player.y = 800;
							this.player2.y = 800;
						}
					});
				}
			});
		});

		this.registry.events.on('finalOver', () => {
			this.piso.setVelocity(0, 0);
			this.piso2.setVelocity(0, 0);
			timeline.stop();
		});
		this.left_botom = this.add.sprite(160, this.sys.game.config.height / 2, "left_botom").setInteractive().setScale(4);
		this.right_botom = this.add.sprite(480, this.sys.game.config.height / 2, "right_botom").setInteractive().setScale(4);

		this.left_botom.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.registry.events.emit('left_botom');
			this.player.flipX = true;
			this.player2.flipX = true;
			if (this.on == 2) {
				this.option = 1;
			this.player2.y = this.localization.y;
			this.player.y = 800;
		}
		}, this);
		this.left_botom.on(Phaser.Input.Events.POINTER_UP, () => {
			this.registry.events.emit('up_botom');
			if (this.on == 2) {
				this.player.y = this.localization.y;
				this.player2.y = 800;
		}
		}, this);

		this.right_botom.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.registry.events.emit('right_botom');
			this.player.flipX = false;
			this.player2.flipX = false;
			if (this.on == 2) {
			this.option = 1;
			this.player2.y = this.localization.y;
			this.player.y = 800;
		}
		}, this);
		this.right_botom.on(Phaser.Input.Events.POINTER_UP, () => {
			this.registry.events.emit('up_botom');
			if (this.on == 2) {
				this.player.y = this.localization.y;
				this.player2.y = 800;
		}
		}, this);
	}
	update(time, delta) {
		this.player01.update();
		this.player01_colision.update();
		this.Fruits01Group.update();
		this.Fruits01Group_colision.update();
		this.FruitsVidaGroup.update();
		this.FruitsVidaGroup_colision.update();
		this.player01_colision.x = this.player01.x;
		this.player.x = this.player01.x;
		this.player2.x = this.player01.x;
		this.cure.x = this.player01.x;
		this.cure.y = this.localization.y;

		this.left_botom.x = this.player01.x - 320;
		this.right_botom.x = this.player01.x + 320;

		if (this.primera == 2) {
			this.FruitsVida_primer_nivel.update();
			this.FruitsVida_colision_primer_nivel.update();
		}
		if (this.primera == 3) {
			this.Fruits02Group.update();
			this.Fruits02Group_colision.update();
			this.Fruits03Group.update();
			this.Fruits03Group_colision.update();
			this.Fruits04Group.update();
			this.Fruits04Group_colision.update();
			this.Fruits05Group.update();
			this.Fruits05Group_colision.update();
			this.Fruits06Group.update();
			this.Fruits06Group_colision.update();
			this.Fruits07Group.update();
			this.Fruits07Group_colision.update();
			this.Fruits08Group.update();
			this.Fruits08Group_colision.update();
			this.Fruits09Group.update();
			this.Fruits09Group_colision.update();
			this.Fruits10Group.update();
			this.Fruits10Group_colision.update();
			this.Fruits11Group.update();
			this.Fruits11Group_colision.update();
			this.Fruits12Group.update();
			this.Fruits12Group_colision.update();
			this.Fruits13Group.update();
			this.Fruits13Group_colision.update();
		}
		//if (this.num == 1) {
		//	this.flasesgroup.setPosition(184, 56);
		//}
		//if (this.num == 0) {
		//	this.flasesgroup.setPosition(184, 100);
		//}

		if (localStorage.getItem("overfinal")) {
			this.scene.start("Scene_stard");
		}

		if (this.player01.x >= 612 | !this.player01.x > this.sys.game.config.width) {
			this.player01.x = 612;
			this.player.x = 612;
			this.player2.x = 612;
		}

	}
}
export default Scene_play;