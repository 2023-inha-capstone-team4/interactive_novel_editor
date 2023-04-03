import Vector2D, {Vector2f} from './Vector2D';

export class Keyframe
{
    constructor(timeLabel,position,scale,rotation,image_fade_alpha)
    {
        this.timeLabel=timeLabel;
        this.position=position;
        this.scale=scale;
        this.rotation=rotation;
        this.image_fade_alpha=image_fade_alpha;
    }

    changeTimeLabel(toTime)
    {
        this.timeLabel=toTime;
    }

    getTimeLabel()
    {
        return this.timeLabel;
    }

    getPosition()
    {
        return this.position;
    }

    getScale()
    {
        return this.scale;
    }

    getRotation()
    {
        return this.rotation;
    }

    getFadeAlpha()
    {
        return this.image_fade_alpha;
    }

    setPosition(x,y)
    {
        this.position.x=x;
        this.position.y=y;
    }

    setScale(x_scale,y_scale)
    {
        this.scale.x=x_scale;
        this.scale.y=y_scale;
    }



    static interpolate(k1, k2, time)
    {
        var timeSegmentLength=k2.timeLabel-k1.timeLabel;

        var ratio=parseFloat(time-k1.timeLabel)/timeSegmentLength;

        var newTimeLabel=time;
        var newPosition=new Vector2D((1.0-ratio)*k1.position.x+ratio*k2.position.x,
                                 (1.0-ratio)*k1.position.y+ratio*k2.position.y
                                );
        var newScale=new Vector2D((1.0-ratio)*k1.scale.x+ratio*k2.scale.x,
                                (1.0-ratio)*k1.scale.y+ratio*k2.scale.y
                               );
                               
        var newRotation=(1.0-ratio)*k1.rotation+ratio*k2.rotation;
        var newFadeAlpha=(1.0-ratio)*k1.image_fade_alpha+ratio*k2.image_fade_alpha;

        return new Keyframe(newTimeLabel, newPosition, newScale, newRotation, newFadeAlpha);
    }
}


export class TextKeyframe extends Keyframe
{
    constructor(timeLabel, position, scale,rotation,image_fade_alpha, color)
    {
        super(timeLabel, position, scale,rotation,image_fade_alpha);
        this.color=color;
    }

    setColor(color)
    {
        this.color=color;
    }

    static interpolate(k1,k2, time)
    {
        var ncKeyframe=super.interpolate(k1,k2,time);

        //interpolate color
        var timeSegmentLength=k2.timeLabel-k1.timeLabel;

        var ratio=parseFloat(time-k1.timeLabel)/timeSegmentLength;
        var newColor={red:0, green:0, blue:0};
        newColor.red=(1.0-ratio)*k1.color.red+ratio*k2.color.red;
        newColor.green=(1.0-ratio)*k1.color.green+ratio*k2.color.green;
        newColor.blue=(1.0-ratio)*k1.color.blue+ratio*k2.color.blue;



        return new TextKeyframe(ncKeyframe.timeLabel,ncKeyframe.position,ncKeyframe.scale, ncKeyframe.rotation,ncKeyframe.image_fade_alpha,newColor);
    }
}