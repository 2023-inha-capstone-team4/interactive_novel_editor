import { Scene } from "./Scene";

export class SceneManager
{
    constructor()
    {
        this.sceneList=[];

        let newScene=new Scene();
        this.sceneList.push(newScene);

        let newScene2=new Scene();
        this.sceneList.push(newScene2);

        let newScene3=new Scene();
        this.sceneList.push(newScene3);

        this.curSceneIdx=0;
    }


    getCurrentScene()
    {
        if(this.sceneList.length===0) return null;

        return this.sceneList.at(this.curSceneIndex);
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
    }

    removeSelectedScene() {
        this.sceneList = this.sceneList.filter((scene, index, arr) => {
          return index !== this.curSceneIndex;
        });
      
        if (this.sceneList.length <= 1) {
          this.curSceneIndex = 0;
        } else {
          this.curSceneIndex -= 1;
        }
      }

    selectScene(sceneIndex)
    {
        this.curSceneIndex=sceneIndex;
        this.sceneList=[...this.sceneList];
    }








}