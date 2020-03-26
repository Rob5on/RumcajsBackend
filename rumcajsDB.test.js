const {setUpDb, addNewUser, addNewFriend, getUser, getFriend} = require('./rumcajsDB');
const {User, Friend, Message} = require('./classes');
require('fake-indexeddb/auto');

// beforeEach(async (done) =>{
//     await setUpDb;

// });

// afterEach(async (done) => {
//     await db.deleteDatabase();
//     done();
//   });

test('Should create indexedbDB with friend and user', async (done) => {
        let user = new User(123, "1.2.3", 321);
        let friend = new Friend("Gosia", 456, "4.5.6");
        let message = new Message(user, friend, "ct");
        friend.messagesList.push(message);
        let db = await setUpDb();
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
test('Should get user from db', async (done) => {
    let user = new User(123, "1.2.3", 321);
    let db = await setUpDb();
    await addNewUser(db, user);
    dbUser = await getUser(db);
    delete dbUser.id;
    expect(dbUser).toEqual(user);
    done();
});
test('Should get friend from db', async (done) => {
    let friend = new Friend("Małgosia", 789, "5.5.5");
    await setUpDb();
    await addNewUser(friend);
    dbFriend = await getFriend(friend.publicKey);
    expect(dbFriend).toEqual(friend);
    done();
});