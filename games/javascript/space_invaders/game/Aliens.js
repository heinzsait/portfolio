function c_Aliens(l_x, l_y, l_type)
{
    this.x = l_x;
    this.y = l_y;
    this.color;
    this.pixelSize = 5;
    this.Type = l_type;
    this.dead = false;
    this.canShoot = false;
    this.shoot = false;
    this.bullet;
    var frame = 1; this.animationTimer = alienSpeedTimer;

    if(this.Type == 1)
        {
            var bitmapFrame1 = [[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                                [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]];

            var bitmapFrame2 = [[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                                [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0]];
            this.color = "#0c6db1";
        }
    else if(this.Type == 2)
        {
            var bitmapFrame1 = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                                [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
                                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                                [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]];

            var bitmapFrame2 = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                                [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
                                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                                [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0]];
            this.color = "#8dc73f";
        }
    else if(this.Type == 3)
        {
            var bitmapFrame1 = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                                [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                                [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                                [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
                                [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
                                [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0]];

            var bitmapFrame2 = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                                [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                                [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                                [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
                                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                                [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]];
            this.color = "#982493";
        }

    function c_Bullets(l_x, l_y)
    {
        this.x = l_x;
        this.y = l_y;
        this.size = 10
        this.dead = false;
        var speed = 5;

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
        if(this.animationTimer > 0)
            {                            
                this.animationTimer--;
            }
        else
            {
                if(frame == 1)
                    frame = 2;
                else
                    frame = 1;
                this.animationTimer = alienSpeedTimer;
            }
        if(frame == 1)
            var bitmap = bitmapFrame1;
        else
            var bitmap = bitmapFrame2;
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
        if(this.shoot)
            {
                this.bullet = new c_Bullets(this.x+30, this.y+60);
                this.shoot = false;
            }                          
    }
}