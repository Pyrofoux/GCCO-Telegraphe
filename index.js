let Game = {

    canvas : null,
    entities : [],
    pick : null,
    tick : null,

    packetLength : 0,
    tiLength : 0,

    currentPacket : "",
    letters : [],
    words : [],

    space : false,

    start : function()
    {
        Game.canvas = document.getElementById("container").getContext("2d");
        Game.pick = new Entity(0,100,194,222, false);
        Game.pick.addSprite("pioche.png");
        Game.pick.addSprite("pioche_bas.png");
        Game.entities.push(Game.pick);
        Game.tick = setInterval(Game.update, 30);

        document.addEventListener("keydown", (evt) => {
            evt.preventDefault();
            Game.input(evt, "down");
        });

        document.addEventListener("keyup", (evt) => {
            evt.preventDefault();
            Game.input(evt, "up");
        });
    },

    input : function(evt, dir)
    {
        if(Game.space == false && dir == "down" && evt.keyCode == 32)
        {
            Game.space = true;
        }
        else if(Game.space && dir == "up" && evt.keyCode == 32)
        {
            Game.space = false;
        }
        
    },

    update : function()
    {
        if(Game.space)
        {
            Game.pick.frame = 1;
            Game.entities.push(new Sparckle(194/2,100,5,5, document.getElementById("container").width, 50 ));
        }
        else 
            Game.pick.frame = 0;

        Game.canvas.clearRect(0, 0, document.getElementById("container").width, document.getElementById("container").height);
        Game.drawWorld();


        let element = null;
        let received = false;
        for(let i = 0; i < Game.entities.length;)
        {
            element = Game.entities[i];
            element.draw(Game.canvas);
            if(element.x >= document.getElementById("container").width)
            {
                received = true;
                Game.entities.splice(i, 1);
            }
            else 
                i++;
        }
        if(received == false)
        {
            if(Game.packetLength < -3*Game.tiLength && Game.currentPacket.length > 0)
            {
                Game.letters.push(Morse.getLetter(Game.currentPacket));
                Game.currentPacket = "";
                Interface.showWord(Game.letters.join(""));
            }

            if(Game.packetLength < -7*Game.tiLength && Game.letters.length > 0)
            {
                Game.words.push(Game.letters.join(""));
                Game.letters = [];
                Interface.showSentence(Game.words.join(" "));
            }
            if(Game.packetLength > 0 && Game.tiLength > 0)
            {
                if(Math.floor(Game.packetLength*1000) >= Math.floor(Game.tiLength*1000) - 20 && Math.floor(Game.packetLength*1000) <= Math.floor(Game.tiLength*1000) + 20)
                {
                    Game.currentPacket+="Ti";
                    Interface.showPacket(Game.currentPacket);
                    Interface.showLetter(Morse.getLetter(Game.currentPacket));
                }
                else if(Math.floor(Game.packetLength*1000) > Math.floor(Game.tiLength*1000) + 20)
                {
                    Game.currentPacket+="Ta";
                    Interface.showPacket(Game.currentPacket);
                    Interface.showLetter(Morse.getLetter(Game.currentPacket));
                }
            }
            if(Game.tiLength == 0 && Game.packetLength > 0)
            {
                Game.tiLength = Game.packetLength;
                Game.taLenght = 3*Game.packetLength;
                //Game.currentPacket+="Ti";
                //Interface.showPacket(Game.currentPacket);
                //Interface.showLetter(Morse.getLetter(Game.currentPacket));
            }
            if(Game.packetLength > 0)
                Game.packetLength = 0;
            if(Game.packetLength <= 0)
                Game.packetLength-=0.003;
        }
        else 
        {
            if(Game.packetLength < 0)
                Game.packetLength = 0;
            Game.packetLength+=0.003;
        }
    },


    drawWorld : function()
    {
        let ctx = Game.canvas;
        ctx.strokeStyle = "darkgrey";
        ctx.setLineDash([10, 5]);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(194/2,100);
        ctx.lineTo(194/2, 50);
        ctx.lineTo(document.getElementById("container").width, 50);
        ctx.stroke();
    }
};

window.addEventListener("load", Game.start);