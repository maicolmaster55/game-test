class FruitsVida_colision_primer_nivel extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addFruitsVida_colision_primer_nivel();
        this.prevMov = 'left';
        this.finalMov = 0;
    }

    addFruitsVida_colision_primer_nivel() {
        this.fruit01_Init++;
        this.create(612, -19, 'fruit_Vida_colision')
            .setScale(4)
            .setDepth(2)
            .setBounce(0)
            .setVelocityY(50)

    }

    update() {
        this.children.iterate(fruit01_colision => {
            if (this.fruit01_Init == 0) {
                fruit01_colision.x = 10000;
            }

            if (fruit01_colision.y <= 2) {
                fruit01_colision.setVelocityY(50);
                this.finalMov = 0;
            }
            if (fruit01_colision.y > 11) {
                fruit01_colision.setVelocityY(0);
                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.finalMov = 1;
                    }
                });
            }
            if (this.finalMov == 1) {
                fruit01_colision.setVelocityY(500);
            }
            if (fruit01_colision.y <= 297) {
                //fruit01.setVelocityY(100)
                this.finalMov = 0;
            }
            if (fruit01_colision.y >= 298) {
                this.finalMov = 0;
                fruit01_colision.y = 296;
                fruit01_colision.setVelocityY(0);
                fruit01_colision.setVelocityX(-200);
            }
        });
    }
    vidaCollision() {
        this.children.entries[0].destroy();
    }
}

export default FruitsVida_colision_primer_nivel;