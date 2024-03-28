import { HemisphericLight, MeshBuilder, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

import groundMesh from "../assets/textures/snow.jpg";

const MAXPLATFORM = 50;
var VELOCITY = 0;
const SPEED = 10;

class FirstLevel{
    constructor(scene, width, height, depth){
        this.name = 'FirstLevel';
        this.listPlatform = [];
        this.listAngle = [];
        this.dimension = {width: width, height: height, depth: depth};
        
        this.angle = Math.PI/8;
        this.init(scene);
    }
    getName(){
        return this.name;
    }

    init(scene){
        this.createPlatform(scene);

    }

    async createPlatform(scene){
        let platform = MeshBuilder.CreateBox("platform", {width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth}, scene);
        platform.material = new StandardMaterial("platformMat", scene);
        platform.material.diffuseTexture = new Texture(groundMesh, scene);
        platform.position.y = -platform.scaling.y/2;
        platform.rotation.x =  -(this.angle);
        platform.checkCollisions = true;

        this.listPlatform.push(platform);
        this.listAngle.push(this.angle);

        return this.listPlatform;
    }

    createStraightLine(scene){
        
        for(var i =0; i < MAXPLATFORM; i++){
            this.createPlatform(scene);
        }
        
        for(i =0; i  < this.listPlatform.length -1; i++){
            this.listPlatform[i+1].position.z = this.listPlatform[i].position.z - this.dimension.depth/1.5;
            this.listPlatform[i+1].position.y = this.listPlatform[i].position.y - this.findOtherSideLength(this.dimension.depth, this.angle) / 3.63;
            
        }

        //this.createPlatform(scene);
        //this.createPlatform(scene);
    }

    findOtherSideLength(hypotenuse, angleDegrees) {
        // Convert angle from degrees to radians
        var angleRadians = angleDegrees * (Math.PI / 180);
    
        // Calculate the length of the other side using trigonometry (cosine function)
        var otherSideLength = hypotenuse * Math.cos(angleRadians);
    
        return otherSideLength;
    }

    movePlatform(delta){
        VELOCITY += this.angle * 0.3;
        for(var i = 0; i < this.listPlatform.length; i++){
            this.listPlatform[i].position.z += VELOCITY * delta;
        }
    }

    


}

export default FirstLevel;