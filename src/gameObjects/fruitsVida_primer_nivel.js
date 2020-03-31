class FruitsVida_primer_nivel extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addFruitsVida_primer_nivel();
        this.prevMov = 'left';
        this.finalMov = 0;
        this.destroyMov = 1;
        this.brillo = 1;
        this.choque = 1;
    }

    addFruitsVida_primer_nivel() {
        if (localStorage.getItem("vida")) {
            this.Gold = 0;
        this.create(620, -28, 'fruit_vida')
            .setScale(4)
            .setDepth(2)
            .setBounce(0)
            .setVelocityY(50)
    }
    if (localStorage.getItem("vidaGold")) {
        this.Gold = 1;
        this.create(620, -28, 'fruit_vida_Gold')
            .setScale(4)
            .setDepth(2)
            .setBounce(0)
            .setVelocityY(50)
    }
}


    update() {
        this.children.iterate(fruit04 => {
            if (this.fruit01_Init == 0) {
                fruit04.x = 10000;
            }
            if (this.brillo == 2) {
                this.brillo = 1;
                if (this.Gold == 0) {
                fruit04.anims.play('fruit04_static');
            }
            if (this.Gold == 1) {
                fruit04.anims.play('fruit04Gold_static');
            }
        }

            if (fruit04.y <= 2) {
                this.brillo = 2;
                fruit04.setVelocityY(50);
                this.finalMov = 0;
            }

            if (fruit04.y > 2) {
                fruit04.setVelocityY(0);
                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.finalMov = 1;
                    }
                });
            }
            if (this.destroyMov == 2) {
                this.finalMov = 0;
                fruit04.setVelocityY(0);
                if (this.prevMov !== 'fruit01_destruit') {
                    this.prevMov = 'fruit01_destruit';
                         if (this.Gold == 0) {
                            fruit04.anims.play('fruit04_destruit');
                    }
                    if (this.Gold == 1) {
                    fruit04.anims.play('fruit04Gold_destruit');
                    }
                    this.scene.time.addEvent({
                        delay: 500,
                        callback: () => {
                            this.destroyMov = 1;
                            this.children.entries[0].destroy();
                        }
                    });

                }
            } if (this.destroyMov == 1) {
                if (this.finalMov == 1) {
                    fruit04.setVelocityY(500);
                }
            }
            if (this.destroyMov == 1) {
                if (fruit04.y <= 297) {
                    this.prevMov = 'left';
                }
            }
            if (fruit04.y >= 287) {
                if (this.choque == 1) {
                this.choque = 2;
                fruit04.anims.play('fruit04_rodation');
            }
                this.finalMov = 0;
                fruit04.y = 296;
                fruit04.setVelocityY(0);
                fruit04.setVelocityX(-200);
                }
        });
    }
    vidaCollision() {
        this.destroyMov = 2;
    }
}

export default FruitsVida_primer_nivel;