import nextConnect from 'next-connect'
import middleware from '../../middlewares/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const owner = req.query.user

  const results = await req.db.collection('tags').find({ owner })
  const tags = await results.toArray()

  res.json(tags)
})

export default handler
