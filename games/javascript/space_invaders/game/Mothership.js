function c_Mothership(l_x, l_y)
{
    this.x = l_x;
    this.y = l_y;
    this.color = "#ffdb00";
    this.pixelSize = 5;
    this.dead = false;
    this.canShoot = false;
    this.shoot = false;
    this.bullet;
    var frame = 1; this.animationTimer = alienSpeedTimer;

    var bitmap  =  [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]];
    
    function c_Bullets(l_x, l_y)
    {
        this.x = l_x;
        this.y = l_y;
        this.size = 10
        this.dead = false;
        var speed = 8;

        this.draw = function()
        {
            if(!this.dead)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, this.size/2, this.size);
                this.y += speed;
            }
        }
    }

    this.draw = function()
    {
        for(var i = 0; i < 7; i++)
            {
                for(var j = 0; j < 15; j++)
                    {
                        if(bitmap[i][j] == 1)
                            {
                                ctx.fillStyle = this.color;
                                ctx.fillRect(this.x+(this.pixelSize*j), this.y+(this.pixelSize*i), this.pixelSize, this.pixelSize);
                            }
                    }
            }
        if(this.shoot)
            {
                this.bullet = new c_Bullets(this.x+30, this.y+60);
                this.shoot = false;
            }                          
    }
}