const { MongoClient } = require('mongodb')

class connectMongo {
    client = new MongoClient('mongodb+srv://perelad797:Pereladdenis8980@warehouse-cluster.iya4c.mongodb.net')

    constructor(dbName, collectionName) {
        this.dbName = dbName,
        this.collectionName = collectionName
    }

    async connectDB () {
        await this.client.connect()
        const db = this.client.db(this.dbName)
        const collection = db.collection(this.collectionName)
        return collection
    }

    disconnectDB () {
        this.client.close()
    }
}
// const connectMongo = (dbName, collectionName) => {
//     const client = new MongoClient('mongodb+srv://perelad797:Pereladdenis8980@warehouse-cluster.iya4c.mongodb.net')
//     await client.connect()

//     return {
//         connectDB: async () => {
//             const db = client.db(dbName)
//             const collection = db.collection(collectionName)
//             return {
//                 collection,
//                 closeClientConnection: client.close()
//             }
//         },
//         closeConnectDB: client.close()
//     }
// }


module.exports = connectMongo