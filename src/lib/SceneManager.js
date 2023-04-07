import { Scene } from "./Scene";

export class SceneManager
{
    constructor()
    {
        this.sceneList=[];
        this.currentScene= new Scene();
        this.sceneList.push(this.currentScene);

        this.curSceneIdx=0;


        //manage scene layers
        this.currentLayerIndex=0;
    }


    getCurrentScene()
    {
        if(this.sceneList.length===0) return null;

        return this.currentScene;
    }


    getScenes()
    {
        return this.sceneList;
    }

    createNewScene()
    {
        let newScene=new Scene();
        this.sceneList=[...this.sceneList,newScene];
        
        this.selectScene(this.sceneList.length-1);
        this.currentScene=newScene;
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
          this.currentScene=null;
        }
        else
        {
          this.curSceneIdx-=1;
          this.currentScene=this.sceneList[this.curSceneIdx];
        }
      }

    selectScene(sceneIndex)
    {
        this.curSceneIndex=sceneIndex;
        this.sceneList=[...this.sceneList];
        this.currentScene=this.sceneList[this.curSceneIdx];
    }


    //functions to manage scene layers

    getCurrentSelectedLayer()
    {
        if(this.currentScene.layerList.length===0)
        {
            return null;
        }

        return this.currentScene.layerList[this.selectedLayerIndex];
    }











}