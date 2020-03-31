class Datos extends Phaser.Scene {
    constructor() {
        super({ key: 'Datos' });
    }

    init() {
        console.log('Se ha iniciado la escena Datos');
        this.actual_points = 0;
    }

    create() {
        this.menos = 1;
        this.mas = 1;
        this.on = 1;
        this.anims.create({
            key: "Vida1_1",
            frames: this.anims.generateFrameNumbers("Vida1", {
                frames: [0]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida1_0",
            frames: this.anims.generateFrameNumbers("Vida1", {
                frames: [3]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida1_-1",
            frames: this.anims.generateFrameNumbers("Vida1", {
                frames: [1, 2, 3]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida1_+1",
            frames: this.anims.generateFrameNumbers("Vida1", {
                frames: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 8, 19, 20, 21, 22, 23, 24, 25, 26,
                    27, 28, 0]
            }),
            repeat: 0,
            frameRate: 15
        });
        this.anims.create({
            key: "Vida2_1",
            frames: this.anims.generateFrameNumbers("Vida2", {
                frames: [0]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida2_0",
            frames: this.anims.generateFrameNumbers("Vida2", {
                frames: [3]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida2_-1",
            frames: this.anims.generateFrameNumbers("Vida2", {
                frames: [1, 2, 3]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "Vida2_+1",
            frames: this.anims.generateFrameNumbers("Vida2", {
                frames: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 8, 19, 20, 21, 22, 23, 24, 25, 26,
                    27, 28, 0]
            }),
            repeat: 0,
            frameRate: 15
        });

        if (localStorage.getItem("player00")) {
            this.life2 = 3;
            this.limit = 3;
            this.Lifelimit = 2;
            this.cambio = 0;
            this.Vida = this.physics.add.sprite(24, 28, "Vida1").setScale(4);
            this.Vida2 = this.physics.add.sprite(64, 28, "Vida1").setScale(4);
            this.Vida3 = this.physics.add.sprite(104, 28, "Vida1").setScale(4);
        }
        if (localStorage.getItem("player01")) {
            
            this.life2 = 2;
            this.limit = 2;
            this.Lifelimit = 1;
            this.cambio = 1;
            this.Vida = this.physics.add.sprite(24, 28, "Vida2").setScale(4);
            this.Vida2 = this.physics.add.sprite(64, 28, "Vida2").setScale(4);
            this.Vida3 = this.physics.add.sprite(104, 28, "Vida2").setScale(4);
        }
        this.metros = this.add.bitmapText(440, 4, 'pixelFont', "M").setScale(4);
        this.points = this.add.bitmapText(
            this.scale.width - 160,
            4,
            'pixelFont',
            Phaser.Utils.String.Pad('0', 4, '0', 7)
        ).setScale(4);

        // Eventos
        this.registry.events.on('remove_life', () => {
            this.life2--;
            this.menos = 2;
        });
        this.registry.events.on('aument_life', () => {
            if (this.limit === 3) {
                if (this.life2 === 2) {
                    this.Lifelimit = 3;
                }
                if (this.life2 === 3) {
                    this.Lifelimit = 4;
                }
            }
            if (this.limit === 2) {
                if (this.life2 === 1) {
                    this.Lifelimit = 2;
                }
            }
            this.life2++;
            this.mas = 2;
            this.on = 2;
        });
        this.registry.events.on('game_over', () => {
            this.registry.events.removeAllListeners();
            localStorage.setItem("overfinal", "num");
        });
        this.cero2 = this.physics.add.image(580, 28, "cero").setScale(4);
        this.cero3 = this.physics.add.image(540, 28, "cero").setScale(4);
        this.cero4 = this.physics.add.image(500, 28, "cero").setScale(4);
        this.registry.events.on('update_points', () => {
            this.actual_points += 1;
            this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 4, '0', 1));
        });
    }
    update() {
        if (this.actual_points === 10) {
            this.cero2.destroy();
        } 
        if (this.actual_points === 100) {
            this.cero3.destroy();
        } 
        if (this.actual_points === 1000) {
            this.cero4.destroy();
        } 
        if (this.limit === 3) {
           if (this.life2 === 4) {
                this.life2 = 3;
            } 
        }
        if (this.limit === 2) {
            if (this.life2 === 3) {
                this.life2 = 2;
            }
        }
        if (this.limit === 1) {
            if (this.life2 === 2) {
                this.life2 = 1;
            }
        }
        if (this.menos === 1) {
            if (this.life2 === 2) {
                if (this.cambio === 1) {
                this.Vida3.anims.play('Vida2_0');
            }
            if (this.cambio === 0) {
                this.Vida3.anims.play('Vida1_0');
            }
            }
            if (this.life2 === 1) {
                if (this.cambio === 1) {
                    this.Vida3.anims.play('Vida2_0');
                    this.Vida2.anims.play('Vida2_0');
                }
                if (this.cambio === 0) {
                    this.Vida3.anims.play('Vida1_0');
                    this.Vida2.anims.play('Vida1_0');
                }
            }
        }
        if (this.menos === 2) {
            this.menos = 3
            if (this.life2 === 2) {
                if (this.cambio === 1) {
                    this.Vida3.anims.play('Vida2_-1');
                }
                if (this.cambio === 0) {
                    this.Vida3.anims.play('Vida1_-1');
                }
            }
            if (this.life2 === 1) {
                if (this.cambio === 1) {
                    this.Vida2.anims.play('Vida2_-1');
                }
                if (this.cambio === 0) {
                    this.Vida2.anims.play('Vida1_-1');
                }
            }
            if (this.life2 === 0) {
                if (this.cambio === 1) {
                    this.Vida.anims.play('Vida2_-1');
                }
                if (this.cambio === 0) {
                    this.Vida.anims.play('Vida1_-1');
                }
            }
        }
        if (this.mas === 2) {
            this.mas = 3
            if (this.Lifelimit === 3) {
                if (this.on === 2) {
                    this.on = 1;
                    this.Lifelimit = 2;
                    if (this.cambio === 1) {
                        this.Vida3.anims.play('Vida2_+1');
                    }
                    if (this.cambio === 0) {
                        this.Vida3.anims.play('Vida1_+1');
                    }
                }
        }
            if (this.Lifelimit === 2) {
                if (this.on === 2) {
                    this.on = 1;
                    this.Lifelimit = 1;
                    if (this.cambio === 1) {
                        this.Vida2.anims.play('Vida2_+1');
                    }
                    if (this.cambio === 0) {
                        this.Vida2.anims.play('Vida1_+1');
                    }
                }
            }
        }
    }
}

export default Datos;