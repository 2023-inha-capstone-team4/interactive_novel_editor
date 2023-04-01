
export class SceneTimer
{
    constructor()
    {
        this.currentPlayTime=0;    
    }


    updateTimer(deltaTime)
    {
        this.currentPlayTime+=deltaTime;
    }

    setPlayTime(targetTime)
    {
        this.currentPlayTime=targetTime;
    }

    getPlayTime()
    {
        return this.currentPlayTime;
    }

    stop()
    {
        this.currentPlayTime=0;
    }
}
