function c_Obstacles(l_x, l_y, l_width, l_height, l_type)
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
            case 3 : //Fire
            frameRate = 15;
            rowIndex = 0;
            break;

            case 4 : //Water
            frameRate = 15;
            rowIndex = 1;
            break;      

            case 5 : //Weed
            frameRate = 15;
            rowIndex = 2;
            break; 
        } 
    img.src = "Assets/spritesheet.png";
    var numFrames = fps/frameRate;
    frameIndex = Math.floor(Math.random()*(numFrames));

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
        animationTimer += Math.floor(Math.random()*2) + 1;
        ctx.drawImage(img, frameIndex*64, rowIndex*64, 64, 64, this.x - xView, this.y - yOffset, this.width, this.height + yOffset); 
    }
}