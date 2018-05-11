let Interface = {
    showPacket : function(packet)
    {
        document.getElementById("currentPacket").innerText = packet;
    },
    showLetter : function(letter)
    {
        document.getElementById("currentLetter").innerText = letter;
    },
    showWord : function(word)
    {
        document.getElementById("currentWord").innerText = word;
    },
    showSentence : function(sentence)
    {
        document.getElementById("sentence").innerText = sentence;
    }
};