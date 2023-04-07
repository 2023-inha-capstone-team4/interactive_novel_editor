import Vector2D from "../Vector2D";


export class CanvasButton
{
    constructor(position, xLength, yLength, imageSrc, onClick)
    {
        this.position=position;
        this.xLength=xLength;
        this.yLength=yLength;
        this.image=new Image();
        this.image.src=imageSrc;
        this.imageSrc=imageSrc;
        this.onClick=onClick;
        this.isLoaded=false;
        this.isHover=false;

        //none, hover, click
        this.status="none";

        this.image.addEventListener('load', () => {
            this.isLoaded = true;
          });
    }
}