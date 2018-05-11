let Morse = {
    getLetter : function(seq)
    {
        seq = seq.split("T");
        let current = "";
        for(let i = 0; i < seq.length; i++)
        {
            if(seq[i].length <= 0)
                continue;
            if(seq[i] == "i")
            {
                switch(current)
                {
                    case "":
                        current = "E";
                        break;
                    case "E":
                        current = "I";
                        break;
                    case "I":
                        current = "S";
                        break;
                    case "S":
                        current = "H";
                        break;
                    case "U":
                        current = "F";
                        break;
                    case "R":
                        current = "L";
                        break;
                    case "W":
                        current = "P";
                        break;
                    case "T":
                        current = "N";
                        break;
                    case "N":
                        current = "D";
                        break;
                    case "D":
                        current = "B";
                        break;
                    case "K":
                        current = "C";
                        break;
                    case "M":
                        current = "G";
                        break;
                    case "G":
                        current = "Z";
                        break;
                }
            }
            else 
            {
                switch(current)
                {
                    case "":
                        current = "T";
                        break;
                    case "T":
                        current = "M";
                        break;
                    case "M":
                        current = "O";
                        break;
                    case "G":
                        current = "Q";
                        break;
                    case "K":
                        current = "Y";
                        break;
                    case "D":
                        current = "X";
                        break;
                    case "N":
                        current = "K";
                        break;
                    case "W":
                        current = "J";
                        break;
                    case "A":
                        current = "W";
                        break;
                    case "S":
                        current = "V";
                        break;
                    case "I":
                        current = "U";
                        break;
                    case "E":
                        current = "A";
                        break;
                }
            }
        }
        return current;
    }
};