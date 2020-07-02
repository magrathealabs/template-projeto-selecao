import nextConnect from 'next-connect'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function database(req, res, next) {
  if (!client.isConnected()) {
    await client.connect()
  }

  req.db = client.db(process.env.DATABASE)
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
