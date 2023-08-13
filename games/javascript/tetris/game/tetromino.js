function c_tetromino(l_x, l_y, l_type, l_color)
{
    this.x = l_x;
    this.y = l_y;
    this.type = l_type;
    this.color = l_color;
    this.rotations = [];
    this.orientation = 0;
    this.landed = false;
    this.dead = false;
    if(this.type == "I")
        {
            this.rotations = [[[0,0,0,0],
                               [1,1,1,1],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,0,1,0],
                               [0,0,1,0],
                               [0,0,1,0],
                               [0,0,1,0]],

                              [[0,0,0,0],
                               [0,0,0,0],
                               [1,1,1,1],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [0,1,0,0],
                               [0,1,0,0],
                               [0,1,0,0]]];                                          
        }
    else if(this.type == "J")
        {
            this.rotations = [[[1,0,0,0],
                               [1,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,1,0],
                               [0,1,0,0],
                               [0,1,0,0],
                               [0,0,0,0]],

                              [[0,0,0,0],
                               [1,1,1,0],
                               [0,0,1,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [0,1,0,0],
                               [1,1,0,0],
                               [0,0,0,0]]];                                          
        }
    else if(this.type == "L")
        {
            this.rotations = [[[0,0,1,0],
                               [1,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [0,1,0,0],
                               [0,1,1,0],
                               [0,0,0,0]],

                              [[0,0,0,0],
                               [1,1,1,0],
                               [1,0,0,0],
                               [0,0,0,0]],

                              [[1,1,0,0],
                               [0,1,0,0],
                               [0,1,0,0],
                               [0,0,0,0]]];                                          
        }
    else if(this.type == "O")
        {
            this.rotations = [[[0,1,1,0],
                               [0,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,1,0],
                               [0,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,1,0],
                               [0,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,1,0],
                               [0,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]]];                                          
        }
    else if(this.type == "S")
        {
            this.rotations = [[[0,1,1,0],
                               [1,1,0,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [0,1,1,0],
                               [0,0,1,0],
                               [0,0,0,0]],

                              [[0,0,0,0],
                               [0,1,1,0],
                               [1,1,0,0],
                               [0,0,0,0]],

                              [[1,0,0,0],
                               [1,1,0,0],
                               [0,1,0,0],
                               [0,0,0,0]]];                                          
        }
    else if(this.type == "Z")
        {
            this.rotations = [[[1,1,0,0],
                               [0,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,0,1,0],
                               [0,1,1,0],
                               [0,1,0,0],
                               [0,0,0,0]],

                              [[0,0,0,0],
                               [1,1,0,0],
                               [0,1,1,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [1,1,0,0],
                               [1,0,0,0],
                               [0,0,0,0]]];                                          
        }
    else if(this.type == "T")
        {
            this.rotations = [[[0,1,0,0],
                               [1,1,1,0],
                               [0,0,0,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [0,1,1,0],
                               [0,1,0,0],
                               [0,0,0,0]],

                              [[0,0,0,0],
                               [1,1,1,0],
                               [0,1,0,0],
                               [0,0,0,0]],

                              [[0,1,0,0],
                               [1,1,0,0],
                               [0,1,0,0],
                               [0,0,0,0]]];                                          
        }

    var moveTimer = 0, moveFlag = true, canMove = true, gravityTimer = 0, gravity = 45, spinTimer = 0, spin = true, stuckTimer = 0;
    this.shape = this.rotations[this.orientation];
    this.move = function()
    {
        var row = Math.floor(this.y/blockSize);
        var col = Math.floor(this.x/blockSize);
        this.landed = false;  
        for(var i = 0; i < 4; i++)
            {
                for(var j = 0; j < 4; j++)
                    {
                        if(this.shape[j][i] == 1)
                            {
                                if((j+1+row < 17) && (i+col < 12))
                                if(stuckArray[j+1+row][i+col] != 0)
                                {
                                    this.landed = true;
                                }
                            }
                    }
            }

        if(KEYCODES[37])
            {
                if(canMove)
                    {
                        moveFlag = true;
                        for(var i = 0; i < 4; i++)
                            {
                                for(var j = 0; j < 4; j++)
                                    {
                                        if(this.shape[j][i] == 1)
                                            {
                                                if(stuckArray[j+row][i-1+col] != 0)
                                                {
                                                    moveFlag = false;
                                                }
                                            }
                                    }
                            }
                        if(moveFlag)
                            this.x -= blockSize;
                        canMove = false;
                        moveTimer = 0;
                    }
                if(this.landed)
                    stuckTimer--;
            }

        if(KEYCODES[39])
            {
                if(canMove)
                    {
                        moveFlag = true;
                        for(var i = 0; i < 4; i++)
                            {
                                for(var j = 0; j < 4; j++)
                                    {
                                        if(this.shape[j][i] == 1)
                                            {
                                                if(stuckArray[j+row][i+1+col] != 0)
                                                {
                                                    moveFlag = false;
                                                }
                                            }
                                    }
                            }
                        if(moveFlag)
                            this.x += blockSize;
                        canMove = false;
                        moveTimer = 0;
                    }
                if(this.landed)
                    stuckTimer--;
            }

        if(!canMove)
            {
                moveTimer++;
                if(moveTimer > 10)
                    {
                        canMove = true;
                        moveTimer = 0;
                    }
            }

        if(KEYCODES[32])
            {
                if(spin)
                    {
                        var temp = this.orientation;
                        if(this.orientation < 3)
                            this.orientation++;
                        else
                            this.orientation = 0;
                        this.shape = this.rotations[this.orientation];

                        ///////WALL KICK//////
                        {
                        var flag = false;
                        var row = Math.floor(this.y/blockSize);
                        var col = Math.floor(this.x/blockSize);
                        for(var i = 0; i < 4; i++)
                            {
                                for(var j = 0; j < 4; j++)
                                    {
                                        if(this.shape[j][i] == 1)
                                            {
                                                if((j+row < 17) && (i+col < 12))
                                                if(stuckArray[j+row][i+col] != 0)
                                                {
                                                    flag = true;
                                                }
                                            }
                                    }
                            }                                    
                        if(flag)
                        {
                            var flag2 = false;
                            var row = Math.floor(this.y/blockSize);
                            var col = Math.floor(this.x/blockSize);
                            for(var i = 0; i < 4; i++)
                                {
                                    for(var j = 0; j < 4; j++)
                                        {
                                            if(this.shape[j][i] == 1)
                                                {
                                                    if((j+row < 17) && (i+col-1 < 12))
                                                    if(stuckArray[j+row][i+col-1] != 0)
                                                    {
                                                        flag2 = true;
                                                    }
                                                }
                                        }
                                }
                            if(flag2)
                            {
                                var flag3 = false;
                                var row = Math.floor(this.y/blockSize);
                                var col = Math.floor(this.x/blockSize);
                                for(var i = 0; i < 4; i++)
                                    {
                                        for(var j = 0; j < 4; j++)
                                            {
                                                if(this.shape[j][i] == 1)
                                                    {
                                                        if((j-1+row < 17) && (i+col-1 < 12))
                                                        if(stuckArray[j+row-1][i+col-1] != 0)
                                                        {
                                                            flag3 = true;
                                                        }
                                                    }
                                            }
                                    }
                                if(flag3)
                                {
                                    var flag4 = false;
                                    var row = Math.floor(this.y/blockSize);
                                    var col = Math.floor(this.x/blockSize);
                                    for(var i = 0; i < 4; i++)
                                        {
                                            for(var j = 0; j < 4; j++)
                                                {
                                                    if(this.shape[j][i] == 1)
                                                        {
                                                            if((j+2+row < 17) && (i+col < 12))
                                                            if(stuckArray[j+row+2][i+col] != 0)
                                                            {
                                                                flag4 = true;
                                                            }
                                                        }
                                                }
                                        }
                                    if(flag4)
                                    {
                                        var flag5 = false;
                                        var row = Math.floor(this.y/blockSize);
                                        var col = Math.floor(this.x/blockSize);
                                        for(var i = 0; i < 4; i++)
                                            {
                                                for(var j = 0; j < 4; j++)
                                                    {
                                                        if(this.shape[j][i] == 1)
                                                            {
                                                                if((j+2+row < 17) && (i+col-1 < 12))
                                                                if(stuckArray[j+row+2][i+col-1] != 0)
                                                                {
                                                                    flag5 = true;
                                                                }
                                                            }
                                                    }
                                            }
                                        if(flag5)
                                        {
                                            var flag6 = false;
                                            var row = Math.floor(this.y/blockSize);
                                            var col = Math.floor(this.x/blockSize);
                                            for(var i = 0; i < 4; i++)
                                                {
                                                    for(var j = 0; j < 4; j++)
                                                        {
                                                            if(this.shape[j][i] == 1)
                                                                {
                                                                    if((j+row < 17) && (i+col+1 < 12))
                                                                    if(stuckArray[j+row][i+col+1] != 0)
                                                                    {
                                                                        flag6 = true;
                                                                    }
                                                                }
                                                        }
                                                }
                                            if(flag6)
                                            {
                                                var flag7 = false;
                                                var row = Math.floor(this.y/blockSize);
                                                var col = Math.floor(this.x/blockSize);
                                                for(var i = 0; i < 4; i++)
                                                    {
                                                        for(var j = 0; j < 4; j++)
                                                            {
                                                                if(this.shape[j][i] == 1)
                                                                    {
                                                                        if((j+1+row < 17) && (i+col+1 < 12))
                                                                        if(stuckArray[j+row+1][i+col+1] != 0)
                                                                        {
                                                                            flag7 = true;
                                                                        }
                                                                    }
                                                            }
                                                    }
                                                if(flag7)
                                                {
                                                    var flag8 = false;
                                                    var row = Math.floor(this.y/blockSize);
                                                    var col = Math.floor(this.x/blockSize);
                                                    for(var i = 0; i < 4; i++)
                                                        {
                                                            for(var j = 0; j < 4; j++)
                                                                {
                                                                    if(this.shape[j][i] == 1)
                                                                        {
                                                                            if((j-2+row < 17) && (i+col < 12))
                                                                            if(stuckArray[j+row-2][i+col] != 0)
                                                                            {
                                                                                flag8 = true;
                                                                            }
                                                                        }
                                                                }
                                                        }
                                                    if(flag8)
                                                    {
                                                        var flag9 = false;
                                                        var row = Math.floor(this.y/blockSize);
                                                        var col = Math.floor(this.x/blockSize);
                                                        for(var i = 0; i < 4; i++)
                                                        {
                                                            for(var j = 0; j < 4; j++)
                                                            {
                                                                if(this.shape[j][i] == 1)
                                                                {
                                                                    if((j-2+row < 17) && (i+col+1 < 12))
                                                                    if(stuckArray[j+row-2][i+col+1] != 0)
                                                                    {
                                                                        flag9 = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if(flag9)
                                                        {
                                                            this.orientation = temp;
                                                            this.shape = this.rotations[this.orientation];
                                                        }
                                                        else
                                                        {
                                                            this.x += blockSize;
                                                            this.y -= blockSize*2;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        this.y -= blockSize*2;
                                                    }
                                                }
                                                else
                                                {
                                                    this.x += blockSize;
                                                    this.y += blockSize;
                                                }
                                            }
                                            else
                                            {
                                                this.x += blockSize;
                                            }
                                        }
                                        else
                                        {
                                            this.x -= blockSize;
                                            this.y += blockSize*2;
                                        }
                                    }
                                    else
                                    {
                                        this.y += blockSize*2;
                                    }
                                }
                                else
                                {
                                    this.x -= blockSize;
                                    this.y -= blockSize;
                                }
                            }
                            else
                            {
                                this.x -= blockSize;
                            }
                          }
                        }
                        
                        spinTimer = 0;
                        spin = false;
                    }
                if(this.landed)
                    stuckTimer--;
            }
        else
            spin = true;

        if(!spin)
            {
                spinTimer++;
                if(spinTimer > 15)
                {
                    spin = true;
                    spinTimer = 0;
                }
            }
        
        if(KEYCODES[40])
            {
                var row = Math.floor(this.y/blockSize);
                var col = Math.floor(this.x/blockSize);
                var flagGrounded = false;  
                for(var i = 0; i < 4; i++)
                    {
                        for(var j = 0; j < 4; j++)
                            {
                                if(this.shape[j][i] == 1)
                                    {
                                        if((j+1+row < 17) && (i+col < 12))
                                        if(stuckArray[j+1+row][i+col] != 0)
                                        {
                                            flagGrounded = true;
                                        }
                                    }
                            }
                    }
                if(!flagGrounded)
                    this.y += blockSize;
            }
        
        gravityTimer++;
        if(gravityTimer > gravity)
            {
                var row = Math.floor(this.y/blockSize);
                var col = Math.floor(this.x/blockSize);
                var flagGrounded = false;  
                for(var i = 0; i < 4; i++)
                    {
                        for(var j = 0; j < 4; j++)
                            {
                                if(this.shape[j][i] == 1)
                                    {
                                        if((j+1+row < 17) && (i+col < 12))
                                        if(stuckArray[j+1+row][i+col] != 0)
                                        {
                                            flagGrounded = true;
                                        }
                                    }
                            }
                    }
                if(!flagGrounded)
                    this.y += blockSize;
                gravityTimer = 0;
            }
        
        if(this.landed)
            stuckTimer+=2;
        
        if(stuckTimer > 120)
            {
                this.dead = true;
                for(var i = 0; i < 4; i++)
                    {
                        for(var j = 0; j < 4; j++)
                            {
                                if(this.shape[j][i] == 1)
                                    {
                                        if(stuckArray[j+row][i+col] != null)
                                        if(stuckArray[j+row][i+col] == 0)
                                        {
                                            stuckArray[j+row][i+col] = this.color + 1;

                                        }
                                    }
                            }
                    }
            }
        
        if(score > 500)
            gravity = 40;
        if(score > 1500)
            gravity = 35;
        if(score > 2000)
            gravity = 30;
        if(score > 2500)
            gravity = 25;
        if(score > 3000)
            gravity = 20;
        if(score > 3500)
            gravity = 15;
        if(score > 4000)
            gravity = 10;
        if(score > 5000)
            gravity = 5;
        if(score > 10000)
            gravity = 1;
    }

    this.draw = function()
    {
        for(var i = 0; i < 4; i++)
            {
                for(var j = 0; j < 4; j++)
                    {
                        if(this.shape[j][i] == 1)
                            {
                                ctx.fillStyle = colors[this.color];
                                ctx.fillRect(this.x + (i*blockSize), this.y + (j*blockSize), blockSize, blockSize);
                            }
                    }
            }
    }
}