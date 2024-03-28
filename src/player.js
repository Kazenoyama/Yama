import { MeshBuilder, SceneLoader, Vector3 } from "@babylonjs/core";

import playerMesh  from "../assets/models/player.glb";

const SPEEDX = 10;
const SPEEDZ = 10;
const GRAVITY = -9.81;

class Player {
  constructor(name) {
    this.name = name;
    this.playerBox;
    this.player;
    this.inputMap = {};
    this.actions = {};

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
    if(this.inputMap['KeyA']){
      this.player.position.x -= SPEEDX * delta;
      this.playerBox.position.x -= SPEEDX * delta;
      if(this.player.position.x < -3.75){
        this.player.position.x = -3.75;
        this.playerBox.position.x = -3.75;
      }
    }
    else if(this.inputMap['KeyD']){
      this.player.position.x += SPEEDX * delta;
      this.playerBox.position.x += SPEEDX * delta;
      if(this.player.position.x > 3.75){
        this.player.position.x = 3.75;
        this.playerBox.position.x = 3.75;
      }
    }

    /*
    else if(this.inputMap['KeyW']){
      this.player.position.z -= SPEEDZ * delta;
      this.playerBox.position.z -= SPEEDZ * delta;
      if(this.player.position.z < -3.75){
        this.player.position.z = -3.75;
        this.playerBox.position.z = -3.75;
      }
    }

    else if(this.inputMap['KeyS']){
      this.player.position.z += SPEEDZ * delta;
      this.playerBox.position.z += SPEEDZ * delta;
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
    }*/
  }
}

export default Player;