class player01 extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player01');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(4);
        this.body.setBounce(0.2);

        this.move = 0;
        this.scene.registry.events.on('left_botom', () => {
        this.move = 1;
        });
        this.scene.registry.events.on('right_botom', () => {
            this.move = 2;
            });
            this.scene.registry.events.on('up_botom', () => {
                this.move = 0;
                });

        this.anims.play('player01_static');
        this.prevMov = 'player01_static';
        this.woundedMov = 'player01_static';
        this.hitDelay = false;
        this.hitDelay2 = false;
        this.player_wounded = 1;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 2;
        this.cambio = 1;
        this.finalOver = 1;

        this.scene.registry.events.on('finalOver', () => {
            this.finalOver = 2;
            this.body.setVelocityX(0);
            this.anims.play('player01_wounded');
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                    if (this.flipX == true) {
                        this.body.setVelocityX(-100);
                    }
                    if (this.flipX == false) {
                        this.body.setVelocityX(100);
                        this.anims.play('player01_death');
                    }
                    this.scene.time.addEvent({
                        delay: 200,
                        callback: () => {
                            this.body.setVelocityX(0);
                            this.scene.time.addEvent({
                                delay: 1500,
                                callback: () => {
                                    this.scene.registry.events.emit('game_over');
                                }
                            });
                        }
                    });
                }
            });
        });

    }
    update() {
        if (this.life == 3) {
            this.life--;
        }
        if (this.player_wounded === 2) {
            this.body.setVelocityX(0);
            this.anims.play('player01_wounded');
            this.player_wounded = 1;
            this.scene.time.addEvent({
                delay: 400,
                callback: () => {
                    if (this.cambio === 1) {
                        this.anims.play('player01_static_wounded')
                    }
                    if (this.cambio === 2) {
                        this.anims.play('player_run_wounded')
                    }
                    this.woundedMov = 'player01_wounded';
                }
            });
        }
        if (this.move == 1) {
            if (this.player_wounded == 1) {
                if (this.finalOver == 1) {
                    this.body.setVelocityX(-250);
                    this.flipX = true;
                }
            }
            this.cambio = 2;
            if (this.finalOver == 1) {
                if (this.prevMov !== 'left') {
                    this.prevMov = 'left';
                    if (this.woundedMov !== 'player01_wounded') {
                        this.anims.play('player_run');
                    } if (this.woundedMov !== 'player01_static') {
                        this.anims.play('player_run_wounded');
                    }
                }
            }
        } else if (this.move == 2) {
            if (this.player_wounded == 1) {
                if (this.finalOver == 1) {
                    this.body.setVelocityX(250);
                    this.flipX = false;
                }
            }
            this.cambio = 2;
            if (this.finalOver == 1) {
                if (this.prevMov !== 'right') {
                    this.prevMov = 'right';
                    if (this.woundedMov !== 'player01_wounded') {
                        this.anims.play('player_run');
                    } if (this.woundedMov !== 'player01_static') {
                        this.anims.play('player_run_wounded');
                    }
                }
            }

        }
        else {
            if (this.player_wounded == 1) {
                if (this.finalOver == 1) {
                    this.body.setVelocityX(-70);
                }
            }
            this.cambio = 1;
            if (this.finalOver == 1) {
                if (this.prevMov !== 'player01_static') {
                    this.prevMov = 'player01_static';
                    if (this.woundedMov !== 'player01_wounded') {
                        this.anims.play('player01_static');
                    } if (this.woundedMov !== 'player01_static') {
                        this.anims.play('player01_static_wounded');
                    }
                }
            }
        }
    }
    vidaCollision() {
        if (!this.hitDelay2) {
            this.hitDelay2 = true;
        this.life++;
        this.scene.registry.events.emit('aument_life');
        this.scene.registry.events.emit('aument_life_anim');
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.hitDelay2 = false;
            
            }
        });
    }
}
    bombCollision() {
        if (!this.hitDelay) {
            this.hitDelay = true;
            this.life--;
            this.scene.registry.events.emit('remove_life');

            if (this.life === 0) {
                this.scene.registry.events.emit('finalOver');
            }
            if (this.life === 1) {
                this.player_wounded = 2;
            }

            this.scene.time.addEvent({
                delay: 3500,
                callback: () => {
                    this.hitDelay = false;
                    this.woundedMov = 'player01_static';
                    if (this.cambio === 1) {
                        this.anims.play('player01_static')
                    }
                    if (this.cambio === 2) {
                        this.anims.play('player_run')
                    }
                }
            });
        }

    }

}

export default player01;