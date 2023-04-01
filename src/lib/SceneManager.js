import { Scene } from "./Scene";

export class SceneManager
{
    constructor()
    {
        this.currentSceneIndex=0;
        this.sceneList=[];

        let newScene=new Scene();
        this.sceneList.push(newScene);
    }


    getCurrentScene()
    {
        if(this.sceneList.length===0) return null;

        return this.sceneList.at(this.currentSceneIndex);
    }


    getScenes()
    {
        return this.sceneList;
    }

    createNewScene()
    {
        let newScene=new Scene();
        this.sceneList.push(newScene);
        this.currentSceneIndex=this.sceneList.length-1;
    }

    removeSelectedScene()
    {
        this.sceneList=this.sceneList.filter(function(scene, index, arr){
            return index!==this.currentSceneIndex;
        });

        if(this.sceneList.length<=1)
        {
            this.currentSceneIndex=0;
        }
        else
        {
            this.currentSceneIndex-=1;
        }
    }

    selectScene(sceneIndex)
    {
        this.currentSceneIndex=sceneIndex;

        return this.sceneList.at(sceneIndex);
    }








}