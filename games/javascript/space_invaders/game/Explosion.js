function c_Explosion(l_x, l_y)
{
    this.x = l_x;
    this.y = l_y;
    this.color = "#8BCDC4";
    this.pixelSize = 5;
    this.dead = false;
    var frame = 1; this.animationTimer = 5;

    var bitmapFrame1 = [[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
                        [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
                        [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                        [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
                        [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
                        [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]];

    var bitmapFrame2 = [[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
                        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
                        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
                        [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]];

    var bitmapFrame3 = [[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]];

    this.draw = function()
    {
        if(this.animationTimer > 0)
            {                            
                this.animationTimer--;
            }
        else
            {
                if(frame < 3)
                    frame++;
                else
                    this.dead = true;
                this.animationTimer = 5;
            }

        if(frame == 1)
            var bitmap = bitmapFrame1;
        else if(frame == 2)
            var bitmap = bitmapFrame2;
        else if(frame == 3)
            var bitmap = bitmapFrame3;

        for(var i = 0; i < 8; i++)
            {
                for(var j = 0; j < 12; j++)
                    {
                        if(bitmap[i][j] == 1)
                            {
                                ctx.fillStyle = this.color;
                                ctx.fillRect(this.x+(this.pixelSize*j), this.y+(this.pixelSize*i), this.pixelSize, this.pixelSize);
                            }
                    }
            }
    }
}