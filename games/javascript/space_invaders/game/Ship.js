function c_Ship(l_x, l_y, l_color)
{
    this.x = l_x;
    this.y = l_y;
    this.color = l_color;
    this.pixelSize = 5;
    this.life = 3;
    this.dead = false;
    this.bitmap = [[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

    this.bullets = new Array(20);
    var resetShoot = 20, shootTimer = resetShoot, shoot = true;                
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
                ctx.fillStyle = "#3DF2F2";
                ctx.fillRect(this.x, this.y, this.size/2, this.size);
                this.y -= speed;
            }
        }
    }
    this.move = function()
    {
        if(KEYCODES[37])
            {
                if(this.x > 80)
                    {
                        this.x -= 5;
                    }                            
            }
        if(KEYCODES[39])
            {
                if(this.x < can.width-150)
                    {
                        this.x += 5;
                    }
            }
        if(KEYCODES[32])
            {
                if(shoot)
                    {
                        this.bullets.unshift(new c_Bullets(this.x+35, this.y));
                        this.bullets.pop();
                        shoot = false;
                    }
            }
        if(!shoot)
            {
                if(shootTimer > 0)
                    shootTimer--;
                else
                    {
                        shootTimer = resetShoot;
                        shoot = true;
                    }
            }
        if(this.dead)
            {
                this.life--;
                this.x = can.width/2-35;
                this.y = 650;
                this.dead = false;
            }
        if(this.life < 0)
            gameOver = true;
    }

    this.draw = function()
    {
        for(var i = 0; i < 8; i++)
            {
                for(var j = 0; j < 15; j++)
                    {
                        if(this.bitmap[i][j] == 1)
                            {
                                ctx.fillStyle = this.color;
                                ctx.fillRect(this.x+(this.pixelSize*j), this.y+(this.pixelSize*i), this.pixelSize, this.pixelSize);
                            }
                    }
            }
        for(var i = 0; i < this.bullets.length; i++)
            {
                if(this.bullets[i] != null)
                    this.bullets[i].draw();
            }
    }
}