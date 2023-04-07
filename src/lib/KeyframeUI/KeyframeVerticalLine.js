
export class KeyframeVerticalLine
{
    constructor()
    {
        this.color={red:255, green:0, blue:0};
        this.focusTime=0;
        this.xLength=2;
        this.yLength=150;

        this.startXoffset=20;
        this.startYoffset=5;
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