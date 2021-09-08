const { MongoClient } = require('mongodb')

const connectMongo = (dbName, collectionName) => {
    const client = new MongoClient('mongodb+srv://perelad797:Pereladdenis8980@warehouse-cluster.iya4c.mongodb.net')

    return {
        connectDB: async () => {
            await client.connect()
            const db = client.db(dbName)
            const collection = db.collection(collectionName)
            return collection
        },
        closeConnectDB: client.close()
    }
}

module.exports = connectMongo