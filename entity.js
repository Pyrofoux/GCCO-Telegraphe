class Entity{

    constructor(x, y, width, height, animated = true)
    {
        this.animated = animated;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = null;
        this.frames = [];
        this.frame = 0.0;
        this.ready = false;
    }

    addSprite(image)
    {
        let tmp = new Image();
        tmp.src = image;
        this.ready = false;
        tmp.onload = () => {
            this.ready = true;
        }
        this.frames.push(image);

        if(this.sprite == null)
            this.sprite = tmp;
    }

    draw(context)
    {
        if(this.ready == false || this.frames.length <= 0 || this.sprite == null)
            return;
        if(this.animated)
            this.frame = (this.frame + 0.3)%this.frames.length;
        
        if(this.frames[Math.floor(this.frame)] != this.sprite.src)
            this.sprite.src = this.frames[Math.floor(this.frame)];
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

}