class Sparckle extends Entity
{
    constructor(x, y, width, height, targetX, targetY)
    {
        super(x,y,width,height, true);
        this.targetX = targetX;
        this.targetY = targetY;
    }
    draw(ctx)
    {

        if(this.y < this.targetY)
            this.y ++;
        else if(this.y > this.targetY)
            this.y--;
        else if(this.x < this.targetX)
            this.x++;
        else if(this.x > this.targetX)
            this.x--;

        this.frame += 0.3;

        ctx.fillStyle = "yellow";
        ctx.lineCap = "round";
        let width = this.width + Math.abs(Math.sin(this.frame*0.5) * 4);
        let height = this.height + Math.abs(Math.sin(this.frame*0.5) * 4);
        ctx.fillRect(this.x - width/2, this.y-height/2,width, height);
        ctx.stroke();
    }
}