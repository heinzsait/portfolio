function c_Platform(l_x, l_y, l_width, l_height, l_type)
{
    this.x = l_x;
    this.y = l_y;
    this.width = l_width;
    this.height = l_height;
    this.type = l_type; 
    var img = new Image();
    img.src = "Assets/spritesheet.png";

    this.draw = function()
    {
        switch(this.type)
        {
            case 1 :
            ctx.drawImage(img, 0, 384, 64, 64, this.x - xView, this.y, this.width, this.height); 
            break;

            case 2 :
            ctx.drawImage(img, 64, 384, 64, 64, this.x - xView, this.y, this.width, this.height); 
            break;                
        } 
    }
}