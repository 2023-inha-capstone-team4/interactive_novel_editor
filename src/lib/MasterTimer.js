class MasterTimer{
    constructor()
    {
        this.currentTime= Date.now();
        this.startTime=this.currentTime;
        this.deltaTime=0.0;
    }

    updateTimer()
    {
        const prevTime=this.currentTime;
        this.currentTime=Date.now();
        this.deltaTime = parseFloat(this.currentTime-prevTime)/1000.0;
    }

    getDeltaTime()
    {
        return this.deltaTime;
    }

    getTimeFromStart()
    {
        return (this.currentTime-this.startTime)/1000.0;
    }
}

export default MasterTimer;