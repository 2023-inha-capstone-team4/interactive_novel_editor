import { Scene } from "./Scene";

export class SceneManager
{
    constructor()
    {
        this.sceneList=[];
        this.sceneList.push(new Scene());

        this.curSceneIdx=0;


        //manage scene layers
        this.currentLayerIndex=0;
    }


    getCurrentScene()
    {
        if(this.sceneList.length===0) return null;

        return this.sceneList[this.curSceneIdx];
    }


    getScenes()
    {
        return this.sceneList;
    }

    createNewScene()
    {
        let newScene=new Scene();
        this.sceneList=[...this.sceneList,newScene];
        
        this.curSceneIdx=this.sceneList.length-1;
        this.selectScene(this.sceneList.length-1);
    }

    removeSelectedScene() {
        this.sceneList = this.sceneList.filter((scene, index, arr) => {
          return index !== this.curSceneIndex;
        });
      
        if (this.sceneList.length ===1) {
          this.currentScene=this.sceneList[0];
          this.curSceneIndex = 0;
        } else if(this.sceneList.length===0){
          this.curSceneIdx=0;
        }
        else
        {
          this.curSceneIdx-=1;
        }
      }

    selectScene(sceneIndex)
    {
        this.curSceneIndex=sceneIndex;
    }


    //functions to manage scene layers

    getCurrentSelectedLayer()
    {
      if(this.sceneList.length===0) return null;
      if(this.sceneList[this.curSceneIdx].layerList.length===0) return null;

        return this.sceneList[this.curSceneIdx].layerList[this.selectedLayerIndex];
    }











}