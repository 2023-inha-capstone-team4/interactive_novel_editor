import {Vector2f} from './Vector2D';

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

        var interpolationValue=parseFloat(time-k1.timeLabel)/timeSegmentLength;

        var newTimeLabel=time;
        var newPosition=new Vector2f((1.0-interpolationValue)*k1.position.x+interpolationValue*k2.position.x,
                                 (1.0-interpolationValue)*k1.position.y+interpolationValue*k2.position.y
                                );
        var newScale=new Vector2f((1.0-interpolationValue)*k1.scale.x+interpolationValue*k2.scale.x,
                                (1.0-interpolationValue)*k1.scale.y+interpolationValue*k2.scale.y
                               );
                               
        var newRotation=(1.0-interpolationValue)*k1.rotation+interpolationValue*k2.rotation;
        var newFadeAlpha=(1.0-interpolationValue)*k1.image_fade_alpha+interpolationValue*k2.image_fade_alpha;

        return new Keyframe(newTimeLabel, newPosition, newScale, newRotation, newFadeAlpha);
    }
}