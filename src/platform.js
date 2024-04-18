import { ActionManager, ExecuteCodeAction, HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

import groundMesh from "../assets/textures/snow.jpg";

class Platform{
    constructor(scene, dimensions, position, material, angle){
        this.scene = scene;
        this.dimensions = dimensions;
        this.position = position;
        this.material = material;
        this.angle = angle;
    }

    async createPlatform(){
        let platform = MeshBuilder.CreateGround("platform" + this.material, 
        {width: this.dimensions.width, 
            height: this.dimensions.height},
             this.scene);

        platform.material = new StandardMaterial("platform" + this.material, this.scene);
        platform.material.diffuseTexture = new Texture(this.getMaterial(), this.scene);
        platform.position = this.position;
        platform.position.y = -platform.scaling.y / 2;
        platform.rotation.y = -this.angle;
        platform.checkCollisions = true;

        console.log("Platform created")
        
        
    }

    getMaterial(){
        switch(this.material){
            case "ground":
                return groundMesh;
            default:
                return groundMesh;
        }
    }

}

export default Platform;