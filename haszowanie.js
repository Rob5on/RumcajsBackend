(async()=>{
    var vector = window.crypto.getRandomValues(new Uint8Array(16));

    let message = "witam";

    let keys = await generateKeys();
    let encrypted_data = await encrypt_data(keys.publicKey,vector, message);
    let decrypted_data = await decrypt_data(keys.privateKey,vector, encrypted_data)
    
    console.log(decrypted_data);
})();

function generateKeys(){
    return new Promise((resolve, reject) =>{
        try{
            let prom = window.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-256"}}, false, ["encrypt", "decrypt"]);
            prom.then((keys) => resolve(keys));
        }catch(e){
            console.log(e.message);
            reject(e.message);
        }
    });
}
function encrypt_data(public_key_object, vector, message)
{
    return new Promise((resolve, reject) =>{
        try{ 
            let prom = window.crypto.subtle.encrypt({name: "RSA-OAEP", iv: vector}, public_key_object, convertStringToArrayBufferView(message));
            prom.then((result) => {
                let encrypted_data = new Uint8Array(result);
                resolve(encrypted_data);
            })
        }catch(e){
            console.log(e.message);
            reject(e.message);
        }
    });
}
function decrypt_data(private_key_object, vector, encrypted_data)
{
    return new Promise((resolve, reject) =>{
        try{
            let prom = window.crypto.subtle.decrypt({name: "RSA-OAEP", iv: vector}, private_key_object, encrypted_data);
            prom.then((result) =>{
                let decrypted_raw_data = new Uint8Array(result);
                let decrypted_data = convertArrayBufferViewtoString(decrypted_raw_data);
                resolve(decrypted_data);
            })
        }catch(e){
            console.log(e.message);
            reject(e.message);
        }
    });
}
function convertStringToArrayBufferView(str)
{
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++)
    {
        bytes[iii] = str.charCodeAt(iii);
    }

    return bytes;
}
function convertArrayBufferViewtoString(buffer)
{
    var str = "";
    for (var iii = 0; iii < buffer.byteLength; iii++)
    {
        str += String.fromCharCode(buffer[iii]);
    }

    return str;
}
module.exports = {
    generateKeys,
    encrypt_data,
    decrypt_data,
    convertStringToArrayBufferView,
    convertArrayBufferViewtoString
}
