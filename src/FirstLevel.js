import { HemisphericLight, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

import groundMesh from "../assets/textures/snow.jpg";
import cubeModel from "../assets/models/ice_cube.glb";
import tree1 from "../assets/models/fur_tree.glb";
import tree2 from "../assets/models/madrona_invasives.glb";

const MAXPLATFORM = 200;
var VELOCITY = 0;
const SPEED = 10;
const MAXOBSTACLES = 50;

class FirstLevel{
    constructor(scene, width, height, depth){
        this.name = 'FirstLevel';
        this.dimension = {width: width, height: height, depth: depth};
        
        this.listPlatform = [];
        this.listAngle = [];
        this.listObstacle = [];
        this.obstacle;
        this.tree;
        this.treeCouch;

        this.angle = Math.PI/8;
        this.init(scene);
    }
    getName(){
        return this.name;
    }

    init(scene){
        this.createPlatform(scene);
        this.LoadObstacle(scene).then(() => {
            var height, width, depth;
            var platformAttached;
            var placementX, placementY, placementZ;

            for(var i = 0; i < MAXOBSTACLES; i++){
                height = Math.random() * 10 + 1;
                width = Math.random() * 10 + 1;
                depth =0.5;
                placementX = Math.random() * 10 - 5;
                platformAttached = this.listPlatform[Math.floor(Math.random() * this.listPlatform.length)];
                this.createObstacle( width, height, depth, platformAttached, placementX);
            }
                
        });
        this.LoadTree(scene).then(() => {
            for(var i = 0; i < 50; i++){
                this.addTree();
            }
        });

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

    async LoadObstacle(scene){
        this.obstacle = await SceneLoader.ImportMeshAsync("", "", cubeModel, scene);
        this.obstacle.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
        this.obstacle.meshes[0].isVisible = false;
    }

    async LoadTree(scene){
        this.tree = await SceneLoader.ImportMeshAsync("", "", tree1, scene);
        this.tree.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
        this.tree.meshes[0].isVisible = false;
        this.tree.meshes[0].position.z = 10;

        /*
        this.treeCouch = await SceneLoader.ImportMeshAsync("", "", tree2, scene);
        this.treeCouch.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        this.treeCouch.meshes[0].isVisible = false;
        this.treeCouch.meshes[0].position.z = 10;*/

    }

    createObstacle(width, height, depth, platformAttached, placementX){
        const obstacle = this.obstacle.meshes[0].clone("obstacle");
        obstacle.scaling = new Vector3(width, height, depth);
        obstacle.position = platformAttached.position.clone();
        obstacle.position.y = platformAttached.position.y ;
        obstacle.position.z = platformAttached.position.z;
        obstacle.position.x = platformAttached.position.x + placementX;
        obstacle.isVisible = true;
        obstacle.checkCollisions = true;
        this.listObstacle.push(obstacle);
    }

    addTree(){
    const platform = this.listPlatform[Math.floor(Math.random() * this.listPlatform.length)];
    const tree = this.tree.meshes[0].clone("tree");
    tree.position = platform.position.clone();
    tree.scaling = new Vector3(3, 3, 3);
    tree.position.y = platform.position.y;
    tree.position.z = platform.position.z;
    if(Math.floor(Math.random() * 2 - 1 ) >=0)
        tree.position.x = platform.position.x + (this.dimension.width/2 );
    else
        tree.position.x = platform.position.x - (this.dimension.width/2);
    tree.isVisible = true;
    tree.checkCollisions = false;
    }



    


}

export default FirstLevel;