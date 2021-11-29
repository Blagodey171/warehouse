const jwt = require('jsonwebtoken')

const ConnectMongo = require('../../connectMongo')
const { createJWTToken } = require('../createNewToken')

interface request {
    sessionID: string

}
interface response {
    json<T> (data:T): void
}
interface arrayResult {
    length: number,
    session: string
}
interface parseSession {
    user: string,
    token: string
    // возможно нужно сделать единый enum и тут по нему создавать интерфейс
}

export const upgradeJWTTokenInSession = async function <T extends request, R extends response, Y>(request: T, response: R, errorMessage: Y) {
    const cookiesSessionWarehouse = request.sessionID
    let connectMongo = new ConnectMongo(process.env.DATABASE_NAME, process.env.COLLECTION_NAME_SESSIONS)
    let connectMongoDatabaseCollection = await connectMongo.connectDB()
    let findResult: arrayResult[] = await connectMongoDatabaseCollection.find({ id: cookiesSessionWarehouse }).toArray()
    if (findResult.length) {
        const parse: parseSession = JSON.parse(findResult[0].session)
        const newJWTToken: string = createJWTToken(parse.user, process.env.TOKEN_EXPIRES_IN)
        parse.token = newJWTToken

        const newSessionObject = JSON.stringify(parse)
        await connectMongoDatabaseCollection.updateOne(
            { id: cookiesSessionWarehouse },
            {
                $set: { 'session': `${newSessionObject}` },
                $currentDate: { lastModified: true }
            }
        )
        connectMongo.disconnectDB()

        return response.json({
            parseSession: {
                ...parse,
                thisIs: 'test'
            }
        })
    } else {
        return response.json({
            errorMessage,
        })
    }
    


}