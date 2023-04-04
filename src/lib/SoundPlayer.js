import { SoundEvent } from "./SoundEvent";

export class SoundPlayer
{
    constructor()
    {
        this.playTargetSoundList=[];
        this.stopTargetSoundList=[]
    }

    /**
     * startTime 이후이고,
     * 반복 횟수에 포함이 되어 재생을 해야하는 사운드만
     * 재생의 대상에 포함한다.
     * 
     * 이미 재생중인 사운드는 재생 대상에 포함하지 않는다.
     * 
     * **/
    processSound(sounds,playTime)
    {
        //playTime에 맞게 audio.currentTime을 갱신하여 play target sound list에 삽입한다.

        sounds.forEach((sound)=>{


            if(!sound.isLoaded)
            {
                //사운드가 아직 로딩되지 않았다면, 리턴한다.
                console.log('not loaded');
                return;
            }

            if(!sound.isPlaying && playTime<=sound.startTime)
            {
                 let currentRepeatCount =parseInt((playTime-sound.startTime)/sound.duration);
                 let updatedCurrentTime= playTime-currentRepeatCount*sound.duration;
                 sound.currentTime=updatedCurrentTime;

                if(sound.repeatCount==="infinity")
                {
                    //반복 횟수가 무한이면, currentTime만 올바르게 갱신하고 재생 대상으로 결정한다.
                    this.playTargetSoundList.push(sound);
                }
                //else if(currentRepeatCount<sound.repeatCount)
                    /***
                     * {
                     *      playTargetSoundList.push(sound);
                     * 
                     * 
                     * } 
                     */
                //else repeatCount 횟수를 이미 다 채운 경우
                //  플레이를 멈춰야 하는 대상 사운드로 설정한다.
                //  {
                //      stopTargetSoundList.push(sound);    
                //  }
            }

        });
    }

    stopAllSoundToTargetScene(targetScene)
    {
        this.targetScene.getSounds().forEach((sound)=>{
            sound.pause();
            sound.isPlaying=false;
        });
    }


    /**
     * 지속적인 play 상태를 가정하고 작성되었음
     * 
     * 
     * 
     * * */
    playSoundToTargetScene(targetScene,playTime)
    {
        if(targetScene==null) return;

        this.processSound(targetScene.soundList, playTime);

        this.playTargetSoundList.forEach((sound)=>{
            sound.play();
            sound.isPlaying=true;
        });

        this.stopTargetSoundList.forEach((sound)=>{
            sound.pause();
            sound.isPlaying=false;
        });

        this.cleanUp();
    }
    
    cleanUp()
    {
        this.playTargetSoundList=[];
        this.stopTargetSoundList=[];
    }
}