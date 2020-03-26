const {setUpDb, addNewUser, addNewFriend, getUser,
     getFriend, getMessagessWithFriend, updateNick, addMessage} = require('./rumcajsDB');
const {User, Friend, Message} = require('./classes');
require('fake-indexeddb/auto');

let db;
beforeEach(async (done) =>{
    db = await setUpDb();
    done();
});

afterEach(async (done) => {
    db.close();
    let req = window.indexedDB.deleteDatabase('rumcajsDb');
    req.onsuccess = event => done();
    req.onerror = event => done();
  });

test('Should create indexedbDB with friend and user', async (done) => {  
    let user = new User(123, "1.2.3", 321);
    let friend = new Friend("Gosia", 456, "4.5.6");
    let message = new Message(user, friend, "ct");
    friend.messagesList.push(message);
    await addNewUser(db, user);
    await addNewFriend(db, friend);
    dbUser = await getUser(db);
    dbFriend = await getFriend(db, friend.publicKey);
    delete dbUser.id;
    delete dbFriend.id;
    expect(dbUser).toEqual(user);
    expect(dbFriend).toEqual(friend);
    done();
});
test('Should add message to conversation with friend', async (done) => {  
    let user = new User(123, "1.2.3", 321);
    let friend = new Friend("Gosia", 456, "4.5.6");

    await addNewUser(db, user);
    await addNewFriend(db, friend);
    
    let message = new Message(user, friend, "ct");
    friend.messagesList.push(message);
    await addMessage(db, friend, message);

    dbFriend = await getFriend(db, friend.publicKey);

    expect(dbFriend.messagesList[0].message).toEqual(friend.messagesList[0].message);
    done();
});

test('Should get user from db', async (done) => {
    let user = new User(123, "1.2.3", 321);
    await addNewUser(db, user);
    dbUser = await getUser(db);
    delete dbUser.id;
    expect(dbUser).toEqual(user);
    done();
});
test('Should get friend from db', async (done) => {
    let friend = new Friend("Małgosia", 789, "5.5.5");
    await addNewFriend(db, friend);
    let dbFriend = await getFriend(db, friend.publicKey);
    delete dbFriend.id;
    expect(dbFriend).toEqual(friend);
    done();
});
test('Should get messeges with friend', async (done) => {
    let user = new User(123, "1.2.3", 321);
    let friend = new Friend("Gosia", 456, "4.5.6");
    let message = new Message(user, friend, "ct");
    friend.messagesList.push(message);
    await addNewUser(db, user);
    await addNewFriend(db, friend);
    messegesList = await getMessagessWithFriend(db, friend);
    delete messegesList[0].recepient.id;
    expect(messegesList).toEqual(friend.messagesList);
    done();
});

test('Should update users nick', async (done) => {
    let user = new User(123, "1.2.3", 321, 111, 'adam');
    await addNewUser(db, user);
    user.nick = 'Owca';
    await updateNick(db, user.nick);
    let dbUser = await getUser(db);
    delete dbUser.id;
    expect(dbUser).toEqual(user);
    done();
});
