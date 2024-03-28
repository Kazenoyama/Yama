import { HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";

import groundMesh from "../assets/textures/snow.jpg";

class FirstLevel{
    constructor(scene, width, height, depth){
        this.name = 'FirstLevel';
        this.listPlatform = [];
        this.dimension = {width: width, height: height, depth: depth};
        this.init(scene);
    }
    getName(){
        return this.name;
    }

    init(scene){
        let platform = MeshBuilder.CreateBox("platform", {width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth}, scene);
        platform.material = new StandardMaterial("platformMat", scene);
        platform.material.diffuseTexture = new Texture(groundMesh, scene);
        platform.position.y = -platform.scaling.y/2;
        platform.rotation.x = Math.PI/8 * -1;
        platform.checkCollisions = true;

        this.listPlatform.push(platform);

    }

    async createPlatform(scene){
        let platform2 = MeshBuilder.CreateBox("platform2", {width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth}, scene);
        platform2.material = new StandardMaterial("platformMat", scene);
        platform2.material.diffuseTexture = new Texture(groundMesh, scene);
        platform2.position.y = -(this.findOtherSideLength(this.dimension.width, Math.PI/8)/3 + platform2.scaling.y/2 );
        platform2.position.z = -(this.listPlatform[this.listPlatform.length - 1].position.z + this.dimension.depth -2);
        platform2.rotation.x = Math.PI/8 * -1;
        platform2.checkCollisions = true;

        this.listPlatform.push(platform2);
        console.log(this.listPlatform);


        return this.listPlatform;
    }

    findOtherSideLength(hypotenuse, angleDegrees) {
        // Convert angle from degrees to radians
        var angleRadians = angleDegrees * (Math.PI / 180);
    
        // Calculate the length of the other side using trigonometry (cosine function)
        var otherSideLength = hypotenuse * Math.cos(angleRadians);
    
        return otherSideLength;
    }


}

export default FirstLevel;