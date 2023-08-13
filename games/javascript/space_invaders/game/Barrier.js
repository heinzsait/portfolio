function c_Barrier(l_x, l_y)
{
    this.x = l_x;
    this.y = l_y;

    this.bar = [];
    this.bar.push(new barrier(this.x, this.y));
    this.bar.push(new barrier(this.x+25, this.y));
    this.bar.push(new barrier(this.x+50, this.y));                
    this.bar.push(new barrier(this.x+75, this.y));
    this.bar.push(new barrier(this.x+75, this.y+25));                
    this.bar.push(new barrier(this.x+75, this.y+50));
    this.bar.push(new barrier(this.x, this.y+25));
    this.bar.push(new barrier(this.x, this.y+50));

    function barrier(l_x, l_y)
    {
        this.x = l_x;
        this.y = l_y;
        this.color = "#D9CA9C";
        this.pixelSize = 5;
        this.life = 4;
        var bitmap1 = [[1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1]];

        var bitmap2 = [[0, 1, 0, 1, 1],
                      [1, 1, 1, 1, 1],
                      [1, 0, 1, 1, 1],
                      [1, 1, 1, 0, 1],
                      [1, 0, 1, 1, 1]];

        var bitmap3 = [[0, 0, 0, 1, 1],
                      [1, 1, 1, 1, 1],
                      [0, 0, 1, 0, 1],
                      [0, 1, 1, 0, 0],
                      [1, 0, 1, 1, 1]];

        var bitmap4 = [[0, 0, 0, 1, 1],
                      [1, 0, 1, 0, 0],
                      [0, 0, 1, 0, 1],
                      [0, 1, 0, 0, 0],
                      [1, 0, 1, 0, 1]];

        var bitmap5 = [[0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0]];

        this.draw = function()
        {
            if(this.life == 4)
                var bitmap = bitmap1;
            else if(this.life == 3)
                var bitmap = bitmap2;
            else if(this.life == 2)
                var bitmap = bitmap3;
            else if(this.life == 1)
                var bitmap = bitmap4;
            else 
                var bitmap = bitmap5;

            for(var i = 0; i < 5; i++)
                {
                    for(var j = 0; j < 5; j++)
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
    this.draw = function()
    {
        for(var i = 0; i < this.bar.length; i++)
            {
                this.bar[i].draw();
            }
    }
}