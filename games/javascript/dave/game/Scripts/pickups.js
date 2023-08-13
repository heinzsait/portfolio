function c_PickUps(l_x, l_y, l_width, l_height, l_type)
{
    this.x = l_x;
    this.y = l_y;
    this.width = l_width;
    this.height = l_height;
    this.type = l_type; 
    var img = new Image();
    var animationTimer = 0, frameIndex = 0, frameRate, rowIndex, yOffset = 0;
    switch(this.type)
        {
            case 6 : //Diamond
            rowIndex = 5;
            frameIndex = 0;
            break;

            case 7 : //Ruby
            rowIndex = 5;
            frameIndex = 1;
            break;      

            case 8 : //Ball thingy
            rowIndex = 5;
            frameIndex = 2;
            break; 

            case 9 : //Gun
            rowIndex = 5;
            frameIndex = 3;
            break; 

            case 10 : //Throphy
            rowIndex = 7;
            frameRate = 15;
            break;

            case 11 : //Door
            rowIndex = 6;
            frameIndex = 2;
            break;
        } 
    img.src = "Assets/spritesheet.png";
    var numFrames = fps/frameRate;

    this.draw = function()
    {
        if(animationTimer > frameRate)
            {
                animationTimer = 0;
                if(frameIndex < numFrames-1)
                    frameIndex++;
                else
                    frameIndex = 0;
            }
        animationTimer += 2;
        ctx.drawImage(img, frameIndex*64, rowIndex*64, 64, 64, this.x - xView, this.y - yOffset, this.width, this.height);
    }
}