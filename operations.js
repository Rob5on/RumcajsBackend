module.exports.sendMessage = function(peerId, msgText){ 
    var connectedPeers = {};
    if(connectedPeers[peerId]) {
    var conn = connectedPeers[peerId]
    conn.send(msgText)
}}
module.exports.receiveMessage = function appendToHistory(id, message, isSent) {
    var chatHistory = {};
    if(chatHistory[id]) {
        var hist = chatHistory[id];
        var fromTxt = isSent ? 'You' : id
        var msg = $('<li><b>' + fromTxt + ': </b></li>').append('<span>' + message + '</span')
        hist.append(msg).scrollTop(hist[0].scrollHeight);            
}}

module.exports.convToArray = function convertStringToArrayBufferView(str)
{
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++)
    {
        bytes[iii] = str.charCodeAt(iii);
    }
    return bytes;
}

module.exports.convToStr = function convertArrayBufferViewtoString(buffer)
{
    var str = "";
    for (var iii = 0; iii < buffer.byteLength; iii++)
    {
        str += String.fromCharCode(buffer[iii]);
    }
    return str;
}


