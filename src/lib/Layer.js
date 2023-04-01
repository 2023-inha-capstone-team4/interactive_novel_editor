import {Vector2D} from './Vector2D';

export class Layer
{
    constructor()
    {
        this.name="new layer";

        //none : 반복하지 않음
        //forward : 정방향 반복
        //reverse : 역재생 반복
        this.repeatType="none";

        //키프레임 목록을 timeLabel(timestamp)에 따라 순차적으로 저장.
        this.keyframeList=[];
    }

    setRepeatType(type)
    {
        switch(type)
        {
        case "none":
            this.repeatType="none";
            break;
        case "forward":
            this.repeatType="forward";
            break;
        case "reverse":
            this.repeatType="reverse";
            break;
        default:
            return;
        }
    }


    /**
     * 
     * @todo
     * 테스트용 코드로 작성됨. 수정해야함
     * 
     */
    addKeyframe(keyframe)
    {
        this.keyframeList.push(keyframe);
        this.sortKeyframes();
    }

    //keyframe들을 timeLabel 순서대로 정렬시킨다.
    sortKeyframes()
    {
        this.keyframeList.sort(function(k1,k2){
            return k1.timeLabel-k2.timeLabel;
        });
    }

    //해당 index의 keyframe의 timeLabel을 toTime으로 이동시킨다.
    moveKeyframe(keyframe_index, toTime)
    {
        this.keyframeList[keyframe_index].timeLabel=toTime;
        this.sortKeyframes();
    }

    //index 위치의 keyframe을 제거한다.
    removeKeyframe(index)
    {
        this.keyframeList.filter((keyframe)=>{
            return keyframe!==this.keyframeList[index];
        });

        this.sortKeyframes();
    }

    getKeyframes()
    {
        return this.keyframeList;
    }


}



export class ImageLayer extends Layer
{
    constructor(image_path)
    {
        super();
        this.image=new Image();
        this.image.src=image_path;

        this.layerType="image";
    }
}


export class TextLayer extends Layer
{
    constructor()
    {
        super();
        this.fontType='네이버나눔고딕';
        this.fontSize=15;
        this.text="";
        
    }
}