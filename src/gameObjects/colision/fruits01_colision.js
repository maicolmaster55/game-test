class Fruits01_colision extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addFruits01_colision();
        this.prevMov = 'left';
        this.finalMov = 0;
        this.fruit01_Init = 0;
        this.fruit01_Numbers2 = 500;
        this.scene.registry.events.on('numbers_fruit', (fruit01_Numbers) => {
            this.fruit01_Numbers2 = fruit01_Numbers;
        });
    }

    addFruits01_colision() {
        this.fruit01_Init ++;
            this.create(this.fruit01_Numbers2, -28, 'fruit01_colision')
                .setScale(4)
                .setDepth(2)
                .setBounce(0)
                .setVelocityY(50)        
        
    }
  
    update() {
     this.children.iterate( fruit01_colision => {
        if(this.fruit01_Init == 0){
            fruit01_colision.x = 200;
        } 
        this.location = fruit01_colision.x;
        if(fruit01_colision.y <= 2) {
            fruit01_colision.setVelocityY(50);
            this.finalMov = 0;
            }
        if(fruit01_colision.y > 2) {
            fruit01_colision.setVelocityY(0);
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                this.finalMov = 1;
                }
            });
            }
            if(this.finalMov == 1) {
                fruit01_colision.setVelocityY(500);
                }
        if(fruit01_colision.y <= 297) {
            //fruit01.setVelocityY(100)
            this.finalMov = 0;
            }
          if(fruit01_colision.y >= 298) {
            this.finalMov = 0;
            fruit01_colision.setVelocityY(0);
            this.children.entries[0].destroy();
            }
       });
    }
}

export default Fruits01_colision;