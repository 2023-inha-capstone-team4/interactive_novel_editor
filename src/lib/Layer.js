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

        //forward 정방향 재생 중
        //reverse 역방향 재생 중
        this.playDirection="forward";

        //키프레임 목록을 timeLabel(timestamp)에 따라 순차적으로 저장.
        this.keyframeList=[];
    }


    addKeyframe(keyframe)
    {
        //for each keyframe i in keyframeList
            // if keyframe.timeLabel < keyframeList[i].timeLabel
                // insert forward of keyframeList[i]
                // return
        
        //insert keyframe last of  keyframeList (가장 큰 timeLabel 값일 때)
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