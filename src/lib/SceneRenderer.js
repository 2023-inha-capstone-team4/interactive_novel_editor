import { Keyframe, TextKeyframe } from "./Keyframe";
import { Layer } from "./Layer";


export class SceneRenderer
{
    constructor()
    {
        this.targetLayers=[];
    }

    //최초의 키프레임이 playtime시간 이후인 layer만 렌더링 대상으로 설정한다.
    processLayer(layer, playTime)
    {
        //keyframe이 없으면 렌더 대상에서 제외.
        if(layer.getKeyframes().length===0) return;

        let firstKeyframeTime=layer.getKeyframes().at(0).getTimeLabel();

         //최초의 키프레임이 playtime시간 이후인 layer만 렌더링 대상으로 설정한다.
        if(firstKeyframeTime<playTime)
        {
            this.targetLayers.push(layer);
        }

    }

    //render by keyframe data
    renderLayerByKeyframe(targetCanvas, layer, keyframe)
    {
       switch(layer.layerType)
       {
        case "image":
            this.renderImageLayer(targetCanvas, layer, keyframe);
            break;
        case "text":
            this.renderTextLayer(targetCanvas, layer, keyframe);
            break;
        case "effect":
            this.renderEffectLayer(targetCanvas, layer, keyframe);
            break;
        default:
            break;
       }
    }

    renderImageLayer(targetCanvas, layer, keyframe)
    {
        let context=targetCanvas.getContext("2d");



        let image=layer.image;

        context.save();

        context.globalAlpha=keyframe.image_fade_alpha;

        context.translate(keyframe.position.x, keyframe.position.y);
        context.scale(keyframe.scale.x, keyframe.scale.y);
        context.rotate(keyframe.rotation*Math.PI/180.0);
        context.drawImage(image,-image.width/2,-image.height/2, image.width, image.height);
        
        context.restore();
    }

    renderTextLayer(targetCanvas, layer, keyframe)
    {
        let context=targetCanvas.getContext("2d");

        context.save();
        //setFont
        context.font=layer.fontSize+"px "+layer.fontType;
        context.fillStyle="rgba("+keyframe.color.red+","+keyframe.color.green+","+keyframe.color.blue+",1)";
        context.globalAlpha=keyframe.image_fade_alpha;
        context.fontWeight=900;

        context.translate(keyframe.position.x, keyframe.position.y);
        context.scale(keyframe.scale.x, keyframe.scale.y);
        context.rotate(keyframe.rotation*Math.PI/180.0);

        let textWidth=context.measureText(layer.getText()).width;
        let textHeight=layer.fontSize;

        context.fillText(layer.getText(),-textWidth/2, textHeight/2);
    
        context.restore();
    }


    /**
     * 아직 구현되지 않음.
     * 
     * **/
    renderEffectLayer(targetCanvas, layer, keyframe)
    {

    }




    renderTargetScene(targetCanvas, targetScene, playTime)
    {

        if(targetScene==null) return;


        //렌더 타겟인 레이어들을 선별한다.
        targetScene.getLayers().forEach(layer => {
            this.processLayer(layer,playTime);          
        });


        // for each targetLayer[i] in targetLayers
        for(var i=0; i<this.targetLayers.length; i++)
        {
            let targetLayer=this.targetLayers[i];

            let keyframes=targetLayer.getKeyframes();

            let firstKeyframe=keyframes.at(0);
            let lastKeyframe=keyframes.at(keyframes.length-1);



            if(keyframes.length===1) //1개의 키프레임만 있을때, 해당 키프레임으로 렌더링한다.
            {
                this.renderLayerByKeyframe(targetCanvas, targetLayer, firstKeyframe);
            } //마지막 키프레임 시간을 지났고, 반복하지 않을 때, 마지막 키프레임으로 렌더링한다.
            else if(lastKeyframe.getTimeLabel()<playTime && targetLayer.repeatType==="none")
            {
                this.renderLayerByKeyframe(targetCanvas, targetLayer, lastKeyframe);
                console.log(targetLayer);
            }
            else //if layer animation is repeatable
            {
                let keyframeLastTime=lastKeyframe.getTimeLabel();
                let repeatCount= parseInt((playTime)/keyframeLastTime);

                

                if(targetLayer.repeatType==="forward")
                {
                    playTime= playTime-repeatCount*keyframeLastTime;
                }
                else if(targetLayer.repeatType==="reverse")
                {


                    if(repeatCount%2===1)
                    {
                        //역방향 재생.
                        let backTime = playTime-repeatCount*keyframeLastTime;
                        playTime = keyframeLastTime-backTime;

                    }
                    else //repeatCount가 짝수
                    {
                        //forward의 경우와 동일하게 처리.
                        playTime= playTime-repeatCount*keyframeLastTime;
                    }
                }

                //Linear Interpolation을 적용하여 중간 프레임을 구하고 렌더링한다.
                for(var j=0; j<keyframes.length-1;j++)
                {
                    if(keyframes.at(j).timeLabel <= playTime && playTime < keyframes.at(j+1).timeLabel)
                    {
                        let interpolatedKeyframe=null;

                        if(targetLayer.layerType==="image")
                        {
                            interpolatedKeyframe=Keyframe.interpolate(keyframes[j], keyframes[j+1], playTime);
                        }
                        else if(targetLayer.layerType==="text")
                        {
                            interpolatedKeyframe=TextKeyframe.interpolate(keyframes[j], keyframes[j+1], playTime);
                        }


                        this.renderLayerByKeyframe(targetCanvas, targetLayer,interpolatedKeyframe);
                        break;
                    }
                }

            }
        }

        this.cleanUp();
    }

    
    cleanUp()
    {
        this.targetLayers=[];
    }
}