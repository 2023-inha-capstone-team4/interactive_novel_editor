
export class KeyframeVerticalLine
{
    constructor()
    {
        this.focusTime=0;
        this.xLength=3;
        this.yLength=150;

        this.startXoffset=20;
        this.startYoffset=30;
        this.isHover=false;
    }

    setFocusTime(playTime)
    {
        this.focustTime=playTime;
    }

    getFocustTime()
    {
        return this.focusTime;
    }




}