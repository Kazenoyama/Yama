import { MeshBuilder, SceneLoader, Vector3 } from "@babylonjs/core";

import playerMesh  from "../assets/models/player.glb";

const SPEEDX = 10;
const SPEEDZ = 10;
const GRAVITY = -9.81;
var VELOCITY = 0;

class Player {
  constructor(name) {
    this.name = name;
    this.playerBox;
    this.player;
    this.inputMap = {};
    this.actions = {};

    this.platformsList = [];
    this.angleList = [];

  }

  async createbody(scene){
    let res = await SceneLoader.ImportMeshAsync("", "", playerMesh, scene);
    this.player = res.meshes[0];
    res.meshes.name = "Player";
    res.meshes[0].scaling = new Vector3(1, 1, 1);
    res.animationGroups[0].stop();
    res.animationGroups[1].start(true);

    return res;
  }

  createBox(){
    this.playerBox = MeshBuilder.CreateCapsule("playerCap",{width: 0.4, height:1.8});
    this.playerBox.position.y = 1.8/2;
    this.playerBox.parent = this.player
    this.playerBox.isVisible = true;
    this.playerBox.checkCollisions = true;
  }

  updateMove(delta){
    let numeroPlatform = 0;
    for(var i = 0; i < this.platformsList.length; i++){
      if(this.playerBox.intersectsMesh(this.platformsList[i], false)){
        numeroPlatform = i;
        break;
      }
    }

    if(this.inputMap['KeyD']){
      // on cree un vecteur pour le déplacement du joueur
      let newPosition =  new Vector3(-SPEEDX * delta, 0, 0);
      this.playerBox.moveWithCollisions(newPosition);
      this.player.position = this.playerBox.position;

      /*
      this.player.position.x -= SPEEDX * delta;
      this.playerBox.position.x -= SPEEDX * delta;
      */
      if(this.player.position.x < -3.75){
        this.player.position.x = -3.75;
        this.playerBox.position.x = -3.75;
      }
    }
    else if(this.inputMap['KeyA']){
      let newPosition =  new Vector3(SPEEDX * delta, 0, 0);
      this.playerBox.moveWithCollisions(newPosition);
      this.player.position = this.playerBox.position;
      /*
      this.player.position.x += SPEEDX * delta;
      this.playerBox.position.x += SPEEDX * delta;
      */
      if(this.player.position.x > 3.75){
        this.player.position.x = 3.75;
        this.playerBox.position.x = 3.75;
      }
    }


    else if(this.inputMap['KeyW']){
      VELOCITY += this.angleList[numeroPlatform] *  0.3;
      let newPosition =  new Vector3(0, -VELOCITY, -SPEEDZ * delta);
      this.playerBox.moveWithCollisions(newPosition);
      this.player.position = this.playerBox.position;
      /*
      this.player.position.z -= SPEEDZ * delta;
      this.playerBox.position.z -= SPEEDZ * delta;
      */
     /*
      if(this.player.position.z < -3.75){
        this.player.position.z = -3.75;
        this.playerBox.position.z = -3.75;
      }
      */
    }

    else if(this.inputMap['KeyS']){
       let newPosition =  new Vector3(0, 0, SPEEDZ * delta);
      this.playerBox.moveWithCollisions(newPosition);
      this.player.position = this.playerBox.position;
      /*
      this.player.position.z += SPEEDZ * delta;
      this.playerBox.position.z += SPEEDZ * delta;
      */
      if(this.player.position.z > 3.75){
        this.player.position.z = 3.75;
        this.playerBox.position.z = 3.75;
      }
    }

    else if(this.inputMap['ControlLeft']){
      this.player.position.y += GRAVITY * delta;
      this.playerBox.position.y += GRAVITY * delta;
      if(this.player.position.y < 0){
        this.player.position.y = 0;
        this.playerBox.position.y = 0 + 1.8/2;
      }
    }

    else if(this.inputMap['Space']){
      this.player.position.y -= GRAVITY * delta;
      this.playerBox.position.y -= GRAVITY * delta;
  } else if(this.inputMap['KeyI']){
       // is inspector is displayed hide it otherwise show it
        if(this.scene.debugLayer.isVisible())
          this.scene.debugLayer.hide();
          else this.scene.debugLayer.show();
  }

  else {VELOCITY = 0;}
 }
}

export default Player;