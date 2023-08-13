function c_Enemies(l_x, l_y, l_width, l_height, l_type)
{
    this.x = l_x;
    this.y = l_y;
    this.width = l_width;
    this.height = l_height;
    this.type = l_type; 
    this.speed = 3;
    this.speedTimer = 0;
    this.dead = false;
    this.delete  = false;
    this.bullets = [];
    var img = new Image();
    var animationTimer = 0, shootRate, frameIndex = 0, frameRate, rowIndex, yOffset = 0, exlopsion = false;
    switch(this.type)
        {
            case 12 : //Spider
            rowIndex = 8;
            frameIndex = 0;
            frameRate = 15;
            this.speed = 3;
            shootRate = 20;
            break;

            case 13 : //Spin
            rowIndex = 10;
            frameIndex = 0;
            frameRate = 15;
            this.speed = 2;
            shootRate = 60;
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
        if(this.dead)
            {
                if(!exlopsion)
                    {
                        rowIndex = 3;
                        frameRate = 20;
                        numFrames = 4;
                        animationTimer = 0;
                        frameIndex = 0;
                        exlopsion = true;
                    }
                else
                    animationTimer += 1;
                if(frameIndex == 3)
                    {
                        if(this.bullets.length == 0)
                            this.delete  = true;
                    }
            }
        animationTimer += 2;
        ctx.drawImage(img, frameIndex*64, rowIndex*64 + 2, 64, 64, this.x - xView, this.y - yOffset, this.width, this.height);
        if(this.speedTimer < 120)
            this.speedTimer++;
        else
            this.speedTimer = 0;
        for(var i = 0; i < this.bullets.length; i++)
            {
                if(this.bullets[i] != null)
                    {                            
                        this.bullets[i].draw();
                        var collide = collisionCheck(player, this.bullets[i]);
                        if(collide)
                            {
                                player.dead = true;
                                this.bullets.splice(i, 1);
                            }
                        for(var j = 0; j < platforms.length; j++)
                            {
                                if(this.bullets[i])
                                    var collideWall = collisionCheck(this.bullets[i], platforms[j]);
                                else
                                    continue;
                                if(collideWall)
                                    this.bullets.splice(i, 1);
                            }
                    }
            }
    }
    
    var angle = 0, shootTimer = 0;
    this.move = function()
    {
        angle += 4*Math.PI/180;                
        if(this.type == 12)
            {
                this.x += 10*Math.cos(angle); 
                this.y += 7*Math.sin(angle); 
            }
        else if(this.type == 13)
            {
                this.x += 15*Math.cos(angle);
            }

        shootTimer++;
        if((shootTimer > shootRate) && (!this.dead))
            {
                var dir = Math.sign(player.x - this.x);
                this.bullets.push(new c_Bullets(this.x, this.y + 10, dir));
                shootTimer = 0;
            }
        var collide = collisionCheck(player, this);
        if(collide)
            {
                player.dead = true;
                this.dead = true;
            }
        for(var i = 0; i < player.bullets.length; i++)
            {
                if((player.bullets[i] != null) && (!player.bullets[i].dead))
                    {
                        var collide = collisionCheck(player.bullets[i], this);
                        if(collide)
                            {
                                player.bullets[i].dead = true;
                                player.bullets.splice(i, 1);
                                this.dead = true;
                            }                            
                    }
            }
    }

    function c_Bullets(l_x, l_y, dir)
    {
        this.x = l_x;
        this.y = l_y;
        this.width = 30;
        this.height = 10;
        this.dead = false;
        var speed = 10;

        this.x = this.x + (40*dir);
        var img = new Image();
        img.src = "Assets/spritesheet.png";

        this.draw = function()
        {
            if(!this.dead)
            {
                if(dir > 0)
                    ctx.drawImage(img, 6, 600, 55, 10, this.x - xView, this.y, this.width, this.height);
                else
                    {
                        ctx.translate(this.x + this.width - xView, this.y);
                        ctx.scale(-1,1);
                        ctx.drawImage(img, 6, 600, 55, 10, 0, 0, this.width, this.height);
                        ctx.setTransform(1,0,0,1,0,0); 
                    }                    
                this.x = this.x + (speed * dir);
            }
        }
    }
}