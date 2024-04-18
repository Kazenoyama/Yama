import { BoundingInfo, Camera, Color3, Color4, DefaultRenderingPipeline, FollowCamera, FreeCamera, HemisphericLight, KeyboardEventTypes, MeshBuilder, MotionBlurPostProcess, Scalar, Scene, SceneLoader, Sound, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";

import Player from "./player.js";
import FirstLevel from "./FirstLevel.js";
import Scenary from "./Scenary.js";
import Platform from "./platform.js";


class Game {
    scene;
    engine;
    canvas;

    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
    }

    init(){
        this.engine.displayLoadingUI();
        this.createScene().then(() => {
            
        });
        this.engine.hideLoadingUI();

    }

    start(){
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    async createScene(){
        this.scene = new Scene(this.engine);
        this.Scenary = new Scenary();

        //Add light to the scene
        this.Scenary.addlight(this.scene);
        
        //Add a camera to the scene to render the scene
        this.createrCamera();

        //Test platform
        var platform = new Platform(this.scene, {width: 10, height: 10}, new Vector3(0, 0, 0), "ground", Math.PI/8);
        await platform.createPlatform();

        var platform2 = new Platform(this.scene, {width: 10, height: 10}, new Vector3(0, 0, 10), "ground", 0);
        await platform2.createPlatform();

    }

    createrCamera(){
        const freeCamera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), this.scene);
        freeCamera.setTarget(Vector3.Zero());
        freeCamera.attachControl(this.canvas, true);
    }
}

export default Game;