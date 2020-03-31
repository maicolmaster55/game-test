class Fruits01 extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addFruits01();
        this.prevMov = 'left';
        this.finalMov = 0;
        this.destroyMov = 1;
        this.fruit01_Init = 0;
        this.fruit01_Numbers2 = 500;
                this.scene.registry.events.on('numbers_fruit', (fruit01_Numbers) => {
            this.fruit01_Numbers2 = fruit01_Numbers;
        });
        this.destroy = 1;
    }

    addFruits01() {
        this.fruit01_Init ++;
        this.frut = this.create(this.fruit01_Numbers2, -28, 'fruit01')
            .setScale(4)
            .setDepth(2)
            .setBounce(0)
            .setVelocityY(50)  
}
    update() {
     this.children.iterate( fruit01 => {
        if(this.fruit01_Init == 0){
            fruit01.x = 200;
        }
        if(fruit01.y <= 2) {
            fruit01.setVelocityY(50);
            this.finalMov = 0;
            }

        if(fruit01.y > 2) {
            fruit01.setVelocityY(0);
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                this.finalMov = 1;
                }
            });
            }
            if(this.destroyMov == 2) {
                this.finalMov = 0;
                fruit01.setVelocityY(0);
                if(this.prevMov !== 'fruit01_destruit') {
                    this.prevMov = 'fruit01_destruit';
                    fruit01.anims.play('fruit01_destruit');
                    this.scene.time.addEvent({
                        delay: 500,
                        callback: () => {
                        this.destroyMov = 1;
                        this.children.entries[0].destroy();
                        }
                    });
                }
                
                }  if(this.destroyMov == 1) {
            if(this.finalMov == 1) {
                fruit01.setVelocityY(500);
                }
            }
            if(this.destroyMov == 1) {
        if(fruit01.y <= 297) {
            this.prevMov = 'left';
            }
        }
          if(fruit01.y >= 298) {
            this.finalMov = 0;
            fruit01.setVelocityY(0);
            if(this.prevMov !== 'fruit01_destruit') {
                this.prevMov = 'fruit01_destruit';
                fruit01.anims.play('fruit01_destruit');
                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                    this.children.entries[0].destroy();
                    }
                });
            }
            }
       });
    }
    bombCollision() {
        this.destroyMov = 2;
    }
}

export default Fruits01;