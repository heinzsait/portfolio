function c_Player(l_x, l_y, l_width, l_height, l_color)
{
    this.x = l_x;
    this.y = l_y;
    this.width = l_width;
    this.height = l_height;
    this.facing = "right";
    this.dead = false;
    this.key = false;
    this.gun = false;
    this.life = 3;
    var speed = 10, veloX = 0, veloY = 0, friction = 0.72, gravity = 0.1, jumpForce = -5;
    var jumping = false, grounded = false, canJump = true, jumpTimer = 2;
    var animationTimer = 0, frameIndex = 1, frameRate = 20;
    var collDir = null;
    this.bullets = [];    
    var resetShoot = 60, shootTimer = resetShoot, shoot = true;   
    var img = new Image();
    img.src = "Assets/spritesheet.png";
    var numFrames = fps/frameRate, rowIndex = 4, exlopsion = false;
    
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
                        frameRate = 15;
                        numFrames = 4;
                        animationTimer = 0;
                        frameIndex = 0;
                        exlopsion = true;
                        this.width = 50;
                        this.height = 50;
                    }
                else
                    animationTimer += 1;
                
                if(frameIndex == 3)
                    {
                        if(this.life > 0)
                            this.life--;
                        else
                            gameOver = true;

                        this.x = playerStartX;
                        this.y = playerStartY;
                        this.width = l_width;
                        this.height = l_height;
                        this.facing = "right";
                        veloY = 0; veloX = 0;
                        this.dead = false;
                        exlopsion = false;
                        frameIndex = 1;
                        frameRate = 20;
                        numFrames = 3;
                        rowIndex = 4;
                    }
            }
        
            if(this.facing == "right")
                {
                    if((jumping || (veloY > 1)) && (!exlopsion))
                        ctx.drawImage(img, 3*64, 64*rowIndex, 64, 64, this.x - xView, this.y, this.width+10, this.height);
                    else
                        ctx.drawImage(img, frameIndex*64, 64*rowIndex, 64, 64, this.x - xView, this.y, this.width+10, this.height);
                }                
            else
                {
                    ctx.translate(this.x + this.width - xView, this.y);
                    ctx.scale(-1,1);
                    if((jumping || (veloY > 1)) && (!exlopsion))
                        ctx.drawImage(img, 3*64, 64*rowIndex, 64, 64, 0, 0, this.width+10, this.height);
                    else
                        ctx.drawImage(img, frameIndex*64, 64*rowIndex, 64, 64, 0, 0, this.width+10, this.height);    

                    ctx.setTransform(1,0,0,1,0,0);                    
                }
        
        for(var i = 0; i < this.bullets.length; i++)
            {
                if(this.bullets[i] != null)
                    {
                        this.bullets[i].draw();
                    }
            }
    }

    this.move = function()
    {
        if(leftFlag) 
            {
                if(veloX > -speed)
                    {
                        veloX--;
                        this.facing = "left";                            
                        if(veloX < -1.75)
                            animationTimer += 3;
                    }
            }

        if(rightFlag)
            {
                if(veloX < speed)
                    {
                        veloX++;
                        this.facing = "right";
                        if(veloX > 1.75)
                            animationTimer += 3;
                    }
            }
        if(jumpFlag)
            {
                canJump = false;
                if(jumpTimer > 0)
                    {
                        if(grounded)
                            {
                                veloY += jumpForce;
                                jumping = true;
                            }                             
                    }                                           
            }
        else
            canJump = true;

        if(fireFlag && this.gun)
            {
                if(shoot)
                    {
                        this.bullets.push(new c_Bullets(this.x, this.y + 20, this.facing));
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

        if(!canJump)
            jumpTimer--;
        else
            jumpTimer = 5;            

        grounded = false;
        for(var i = 0; i < platforms.length; i++)
        {
            var dx = (this.x + (this.width / 2)) - (platforms[i].x + (platforms[i].width / 2));
            var dy = (this.y + (this.height / 2)) - (platforms[i].y + (platforms[i].height / 2));
            var distX = (this.width / 2) + (platforms[i].width / 2);
            var distY = (this.height / 2) + (platforms[i].height / 2);                
            collDir = null;
            if (Math.abs(dx) < distX && Math.abs(dy) < distY) 
            {         
                var offsetX = distX - Math.abs(dx), offsetY = distY - Math.abs(dy);         
                if (offsetX >= offsetY) 
                {
                    if (dy > 0) 
                    {
                        collDir = "top";
                        this.y = platforms[i].y + platforms[i].height;
                    } 
                    else 
                    {
                        collDir = "bottom";
                        this.y = platforms[i].y - this.height;
                    }
                } 
                else 
                {
                    if (dx > 0) 
                    {
                        collDir = "left";
                        this.x = platforms[i].x + platforms[i].width;
                    } 
                    else 
                    {
                        collDir = "right";
                        this.x = platforms[i].x - this.width;
                    }
                }
            }

            if (collDir == "left" || collDir == "right") 
            {
                veloX = 0;
            } 
            else if (collDir == "bottom") 
            {
                grounded = true;
                jumping = false;
            } 
            else if (collDir == "top") 
            {
                if(veloY < 0)
                    veloY *= -0.5;
            }

            for(var j = 0; j < this.bullets.length; j++)
                {
                    if(this.bullets[j] != null)
                        {
                            this.bullets[j].dead = collisionCheck(this.bullets[j], platforms[i]);
                            if(this.bullets[j].dead)
                                {
                                    this.bullets.splice(j, 1);
                                }
                        }                            
                }
        }
        
        for(var i = 0; i < obstacles.length; i++)
            {
                var collide = collisionCheck(this, obstacles[i]);
                if(collide)
                    {
                        this.dead = true;
                        break;
                    }
            }
        
        for(var i = 0; i < pickUps.length; i++)
            {
                var collide = collisionCheck(this, pickUps[i]);
                if(collide)
                    {
                        var type = pickUps[i].type
                        switch(type)
                            {
                                case 6 : //Diamond
                                score += 100;
                                break;

                                case 7 : //Ruby
                                score += 200;
                                break;      

                                case 8 : //Ball thingy
                                score += 50;
                                break; 

                                case 9 : //Gun
                                this.gun = true;
                                score += 200;
                                break; 

                                case 10 : //Throphy
                                this.key = true;
                                score += 300;
                                break;

                                case 11 : //Door
                                if(this.key)
                                    win = true;
                                break;
                            } 
                        
                        if(type != 11)
                            pickUps.splice(i, 1);
                    }
            }     
        
        if(grounded)
            veloY = 0;
        else
            veloY += gravity;

        if(veloX < 0.01 && veloX > -0.01)
            veloX = 0;
        else
            veloX *= friction;
        
        this.x += veloX;
        this.y += veloY;
    }      

    function c_Bullets(l_x, l_y, l_dir)
    {
        this.x = l_x;
        this.y = l_y;
        this.width = 30;
        this.height = 10;
        this.dead = false;
        var speed = 10;
        if(l_dir == "right")
            var dir = 1;
        else 
            var dir = -1;
        
        this.x = this.x + (40*dir);
        var img = new Image();
        img.src = "Assets/spritesheet.png";

        this.draw = function()
        {
            if(!this.dead)
            {
                if(dir > 0)
                    ctx.drawImage(img, 208, 599, 34, 13, this.x - xView, this.y, this.width, this.height);
                else
                    {
                        ctx.translate(this.x + this.width - xView, this.y);
                        ctx.scale(-1,1);
                        ctx.drawImage(img, 208, 599, 34, 13, 0, 0, this.width, this.height);
                        ctx.setTransform(1,0,0,1,0,0); 
                    }                    
                this.x = this.x + (speed * dir);
            }
        }
    }
}