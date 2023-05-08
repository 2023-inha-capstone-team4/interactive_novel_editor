import { Layer, ImageLayer, TextLayer } from "./Layer";

export class Scene{

    constructor(){
        this.layerList=[];
        this.soundList=[];

        this.name="new scene";
        this.selectedLayerIndex=0;
    }

    getLayerByIndex(index)
    {
        if(this.layerList.length==0 || this.layerList.length-1<index || index<0)
        {
            return null;
        }

        return this.layerList[index];
    }

    getCurrentSelectedLayer()
    {
        if(this.layerList.length==0)
        {
            return null;
        }

        return this.layerList[this.selectedLayerIndex];
    }

    /** 
     * data : imageLayer일 경우, image_path이고 textLayer일 경우는 text_string
     * 
     * 
     * **/
    addLayer(layer)
    {
        this.layerList.push(layer);
        this.selectedLayerIndex=this.layerList.length-1;
    }



    /**
     * 사운드를 추가한다.
     * 
     * 
     * 
     */
    addSound(soundEvent)
    {
        this.soundList.push(soundEvent);
    }

    removeSelectedLayer()
    {
        this.layerList=this.layerList.filter((layer,index, arr)=>{
            return this.selectedLayerIndex!==index;
        });

        if(this.layerList.length<=1)
        {
            this.selectedLayerIndex=0;
        }
        else
        {
            this.selectedLayerIndex-=1;
        }
    }


    /*** 
     * 현재 선택된 레이어가
     * after_index에 있는 layer 다음에 오도록 만든다.
     * 
    */
    changeLayerOrder(after_index)
    {
        if(after_index===this.selectedLayerIndex || after_index+1===this.selectedLayerIndex)
            return;
        
        let selectedLayer=this.layerList.at(this.selectedLayerIndex);
        
        if(this.selectedLayerIndex<after_index)
        {

            //insert at after_index+1
            this.layerList.splice(after_index+1, selectedLayer);

            this.layerList=this.layerList.filter(function(layer, index, arr){
                return index!==this.selectedLayerIndex;
            });

            this.selectedLayerIndex=after_index;
        }
        else // after_index+1 < this.selectedLayerIndex
        {
            this.layerList=this.layerList.filter(function(layer, index, arr){
                return index!==this.selectedLayerIndex;
            });

            //insert at after_index+1
            this.layerList.splice(after_index+1, selectedLayer);

            this.selectedLayerIndex=after_index+1;
        }
        
    }


    getLayers()
    {
        return this.layerList;
    }
}