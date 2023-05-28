import { Scene } from "./Scene";

export class SceneManager
{
    constructor()
    {
        this.sceneList=[];
        this.sceneList.push(new Scene());

        this.curSceneIdx=0;

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
        this.sceneList=this.sceneList.filter((item, index) => 
         {return index!==this.curSceneIdx; }
        );

        if(this.curSceneIdx<=1)
          this.curSceneIdx=0;
        else
          this.curSceneIdx=this.curSceneIdx-1;
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