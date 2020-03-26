const {generateKeys, encrypt_data, decrypt_data,
    convertStringToArrayBufferView, convertArrayBufferViewtoString} = require('./haszowanie.js');
    const crypto = require('crypto');

test('Should encrypt and decrypt message', async (done) => {  
    var vector = crypto.getRandomValues(new Uint8Array(16));

    let message = "witam";

    let keys = await generateKeys();
    let encrypted_data = await encrypt_data(keys.publicKey,vector, message);
    let decrypted_data = await decrypt_data(keys.privateKey,vector, encrypted_data)
    
    expect(decrypted_data).toEqual(message);
});