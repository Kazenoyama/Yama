import { BoundingInfo, Camera, Color3, Color4, DefaultRenderingPipeline, FollowCamera, FreeCamera, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, Scalar, Scene, SceneLoader, Sound, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import Player from "./player.js";
import FirstLevel from "./FirstLevel.js";


class Game {
    engine;
    canvas;
    scene;
    maxPlatform = 4;
    firstLevel;


    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;

        this.player;
        this.inputMap = {};
    }

    init() {
        this.engine.displayLoadingUI();
        console.log("Game is initializing...");
        this.createScene().then(() => {
            this.scene.onKeyboardObservable.add((kbInfo) => {
                switch (kbInfo.type) {
                    case KeyboardEventTypes.KEYDOWN:
                        this.player.inputMap[kbInfo.event.code] = true;
                        this.inputMap[kbInfo.event.code] = true;
                        break;
                    case KeyboardEventTypes.KEYUP:
                        this.player.inputMap[kbInfo.event.code] = false;
                        this.player.actions[kbInfo.event.code] = true;
                        break;
                    case KeyboardEventTypes.KEYPRESS:
                        if(this.input)
                        this.inputMap[kbInfo.event.code] = true;
                }
            });
        });
        this.engine.hideLoadingUI();

    }

    start() {
        this.engine.runRenderLoop(() => {
            let delta = this.engine.getDeltaTime() / 1000.0;
            
            if(this.inputMap['KeyT']) this.addInspector();

            this.player.platformsList = this.firstLevel.listPlatform;
            this.player.angleList = this.firstLevel.listAngle;

            this.player.updateMove(delta);
            // this.player.updateCamera(); 
            this.firstLevel.movePlatform(delta);
            this.scene.render(this.player.camera);
        });

    }

    async sleep(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }

    async createScene() {

        this.scene = new Scene(this.engine);
        this.addLight();

        /**
         * Add Platform to the game
         */
        this.addFirstLevel();

        /**
         * Create the player
         */
        this.player = new Player("Player 1");
        this.player.createCamera(this.scene);
        this.player.createbody(this.scene);
        // this.player.createBox();
        // await this.sleep(500);
        this.player.camera.attachControl(this.canvas, true);
        this.scene.activeCamera = this.camera;
        
        /**
         * Create the camera

        const camera = new FreeCamera("camera", new Vector3(0, 8.5, 8.5), this.scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.player, true);
        */
    
    }

    addFirstLevel() {
        this.firstLevel = new FirstLevel(this.scene, 10, 0.5, 10);
        this.firstLevel.createStraightLine(this.scene);
    }
    
    addLight(){
        this.scene.clearColor = new Color3(0.7, 0.7, 0.95);
        this.scene.ambientColor = new Color3(0.8, 0.8, 1);
        this.scene.collisionsEnabled = true;
        this.scene.gravity = new Vector3(0, -0.15, 0);
        var pipeline = new DefaultRenderingPipeline("default", true, this.scene, [this.camera]);

        pipeline.glowLayerEnabled = true;
        pipeline.glowLayer.intensity = 0.35;
        pipeline.glowLayer.blurKernelSize = 16;
        pipeline.glowLayer.ldrMerge = true;
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

    }

    addInspector() {
        this.scene.debugLayer.show();
    }
}

export default Game;