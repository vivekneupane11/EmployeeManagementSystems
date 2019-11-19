import mongodb from 'mongodb';

export default async function makeDb() {
    const MongoClient = mongodb.MongoClient;
    const url = "mongodb://localhost:27017/user";
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    const db = await client.db('user');
    db.makeId = makeIdFromString;
    return db;
}

async function makeIdFromString(id) {
    return (await mongodb.ObjectID(id));
}