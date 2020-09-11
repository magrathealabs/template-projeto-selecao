
const {
    DB_URL
} = process.env;



const {MongoClient} = require("mongodb");

let conn = new MongoClient(DB_URL, {useUnifiedTopology: true});

module.exports = {
    /**
     * Singleton-like Database Object that connects to the mongodb database
     */
    async getDbo(){
        if(!conn.isConnected())
            await conn.connect();
        return conn.db();
    }
}
