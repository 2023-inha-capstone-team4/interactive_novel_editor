

/**
 * MasterUI 에서의 Scroll Button
 * @param type
 * horizontal, vertical 2가지를 지정할 수 있다.
 * 
 * @param value
 * position의 경우, -2~2 사이의 float값을 가짐
 * scale의 경우, 무한대로 스크롤이 가능하며, 0~1 사이의 값만 UI로 표시함
 * rotation의 경우, 무한대로 스크롤이 가능하며, 0~1 사이의 값만 UI로 표시함
 */
export class ScrollEditor{

    constructor(type,position)
    {
        this.type=type;
        this.value=0;
        this.buttonSize=20;
        this.position=position; //Vector2D
        this.isHover=false;
        this.isMouseDragging=false;
    }

    setValue(value)
    {
        this.value=value;
    }

}