const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
module.exports.makeDatabase = async function makeDatabase(app) {
    //connect database
    try {
        const url = process.env.DATABASE_CONNECTION + process.env.DATABASE_NAME;
        await mongoClient.connect(url, { useNewUrlParser: true }, async(err, db) => {
            console.log("Database connected sucessfully");
            app.locals.database = await db.db(process.env.DATABASE_NAME);
            app.locals.database.makeID = makeIdfromString;


        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }
}

function makeIdfromString(id) {
    return new mongodb.ObjectID(id);
}