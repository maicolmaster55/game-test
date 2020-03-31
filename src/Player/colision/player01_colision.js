class player01_colision extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player01_colision');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(4);
        this.body.setBounce(0.2);
        this.hitDelay = false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 2;

        this.colisionPosition = 1;

    }
    update() {
        if(this.cursor.left.isDown) {
            this.body.setVelocityX(-250);
            this.flipX = true;
        } else if(this.cursor.right.isDown) {
            this.body.setVelocityX(250);
            this.flipX = false;
        }
        else {
            this.body.setVelocityX(-70);
        }
       if (this.body.x <= -60 ) {
         this.hitDelay = true;

           this.life = 0;
            this.scene.registry.events.emit('remove_life');
           if(this.life === 0) {
              this.scene.registry.events.emit('game_over');
           }
           }
           if(this.colisionPosition == 1){
            this.body.y = 244;
           }
           if(this.colisionPosition == 2){
            this.body.y = 1000;
           }
    }

    bombCollision() {
        this.colisionPosition = 2;
        this.scene.time.addEvent({
                delay: 3500,
                callback: () => {
					this.colisionPosition = 1;
                }
            });
    }
}

export default player01_colision;