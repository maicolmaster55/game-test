class Scene_personajes extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_personajes" });
    }
    init() {
        this.restarVidas = 1;
    }
    create() {
        this.data.set("personajes", 1);
        if (localStorage.getItem("contenedor_0")) {
            this.data.setValue("personajes", 0);
        }
        if (localStorage.getItem("contenedor_1")) {
            this.data.setValue("personajes", 1);
        }
        if (localStorage.getItem("contenedor_2")) {
            this.data.setValue("personajes", 2);
        }
        this.menu_personajes = this.add.image(this.sys.game.config.width / 2, 140, "menu_personajes").setScale(4);
        const botom_return = this.add.sprite(44, 316, "botom_return").setInteractive().setScale(4);
        const botom_compartir = this.add.sprite(600, 316, "botom_compartir").setInteractive().setScale(4);
        this.botom_aceptar = this.add.sprite(this.sys.game.config.width / 2, 316, "botom_aceptar").setInteractive().setScale(4);
        var player00 = this.player00 = this.add.sprite(212, 176, "maicol").setScale(4);
        var player01 = this.player01 = this.add.sprite(320, 180, "player01").setScale(4);
        var player = this.physics.add.sprite(428, 196, "player").setScale(4);
        //anims
        this.anims.create({
            key: "botom_return_down",
            frames: this.anims.generateFrameNumbers("botom_return", {
                frames: [2]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "botom_aceptar_down",
            frames: this.anims.generateFrameNumbers("botom_aceptar", {
                frames: [2]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "botom_compartir_down",
            frames: this.anims.generateFrameNumbers("botom_compartir", {
                frames: [2]
            }),
            repeat: 0,
            frameRate: 10
        });
        this.anims.create({
            key: "player01_static1",
            frames: this.anims.generateFrameNumbers("player01", {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: "maicol_static1",
            frames: this.anims.generateFrameNumbers("maicol", {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: -1,
            frameRate: 10
        });
        if (localStorage.getItem("contenedor_1")) {
            this.player01.anims.play("player01_static1");
        }
        if (localStorage.getItem("contenedor_0")) {
            this.player00.anims.play("maicol_static1");
        }
        this.contenedor = this.add.container(0, 0);
        this.contenedor.add([player00, player01, player]);

        botom_return.on(Phaser.Input.Events.POINTER_DOWN, () => {
            botom_return.anims.play("botom_return_down");
        }, this);
        botom_return.on(Phaser.Input.Events.POINTER_UP, () => {
            this.scene.start("Scene_stard");
        }, this);
        this.input.keyboard.on("keyup_RIGHT", () => {
            if ((this.data.get("personajes") + this.restarVidas) <= 2) {
                this.data.set("personajes", this.data.get("personajes") + this.restarVidas);
            } this.registry.events.emit("players", this.data.get("personajes"));
        });
        this.input.keyboard.on("keyup_LEFT", () => {
            if ((this.data.get("personajes") - this.restarVidas) >= 0) {
                this.data.set("personajes", this.data.get("personajes") - this.restarVidas);
            } this.registry.events.emit("players", this.data.get("personajes"));
        });
    }
    update(time, delta) {
        this.botom_aceptar.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.botom_aceptar.anims.play("botom_aceptar_down");
        }, this);
        this.botom_aceptar.on(Phaser.Input.Events.POINTER_UP, () => {
            if ((this.data.get("personajes") == 0)) {
                localStorage.setItem("contenedor_0", "num");
                localStorage.removeItem("contenedor_2");
                localStorage.removeItem("contenedor_1");
                this.player00.anims.play("maicol_static1");
                localStorage.setItem("player00", "num");
                localStorage.setItem("vidaGold", "num");
                localStorage.removeItem("vida");
                localStorage.removeItem("player");
                localStorage.removeItem("player01");
            }
            if ((this.data.get("personajes") == 1)) {
                localStorage.setItem("contenedor_1", "num");
                localStorage.removeItem("contenedor_2");
                localStorage.removeItem("contenedor_0");
                this.player01.anims.play("player01_static1");
                localStorage.setItem("player01", "num");
                localStorage.setItem("vida", "num");
                localStorage.removeItem("player");
                localStorage.removeItem("vidaGold");
                localStorage.removeItem("player00");
            }
            if ((this.data.get("personajes") == 2)) {
                localStorage.setItem("contenedor_2", "num");
                localStorage.removeItem("contenedor_1");
                localStorage.removeItem("contenedor_0");
                localStorage.setItem("vida", "num");
                localStorage.setItem("player", "num");
                localStorage.removeItem("player01");
                localStorage.removeItem("vidaGold");
                localStorage.removeItem("player00");
            }
            this.scene.start("Scene_stard");
        }, this);
        if ((this.data.get("personajes") == 0)) {
            this.contenedor.x = 108;
            this.player01.anims.play("player01_static1");
        }
        if ((this.data.get("personajes") == 1)) {
            this.contenedor.x = 0;
            this.player00.anims.play("maicol_static1");
        }
        if ((this.data.get("personajes") == 2)) {
            this.contenedor.x = -108;
            this.player01.anims.play("player01_static1");
            this.player00.anims.play("maicol_static1");
        }

    }
}
export default Scene_personajes;