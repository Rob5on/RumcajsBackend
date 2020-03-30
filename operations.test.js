var operations = require("./operations");
it("Send Message", function(){
    var assert = require("assert");
    var expected;
    var result = operations.sendMessage(3, "qwerty");
    assert.equal(result, expected);
});

it("Receive Message", function(){
    var assert = require("assert");
    var expected;
    var result = operations.receiveMessage(5, "qwerty1", true);
    assert.equal(result, expected);
});

it("ConvertFromStrToBytes",function(){
    var assert = require("assert");
    var mess = "qwerty";
    var result = operations.convToArray(mess);
    assert.notEqual(result, mess);
});

it("ConvertFromBytesToStr", function(){
    var assert = require("assert");
    var byteLength = new Array;
    var q = "qwe";
    var result = operations.convToStr(byteLength);
    assert.notEqual(result, q);
});