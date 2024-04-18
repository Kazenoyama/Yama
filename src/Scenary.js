import {Color3, DefaultRenderingPipeline, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

import tree1 from "../assets/models/fur_tree.glb";

class Scenary{
    constructor(){
    }

    addlight(scene){
        scene.clearColor = new Color3(0.7, 0.7, 0.95);
        scene.ambientColor = new Color3(0.8, 0.8, 1);
        scene.collisionsEnabled = true;
        scene.gravity = new Vector3(0, -0.15, 0);
        var pipeline = new DefaultRenderingPipeline("default", true, scene, [this.camera]);

        pipeline.glowLayerEnabled = true;
        pipeline.glowLayer.intensity = 0.35;
        pipeline.glowLayer.blurKernelSize = 16;
        pipeline.glowLayer.ldrMerge = true;
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        console.log("light added");
    }
}

export default Scenary;