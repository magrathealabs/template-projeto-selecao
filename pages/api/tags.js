import nextConnect from 'next-connect'
import middleware from '../../middlewares/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const owner = req.query.user

  const results = await req.db.collection('tags').find({ owner })
  const tags = await results.toArray()

  res.statusCode(200)
  res.json(tags)
})

handler.post(async (req, res) => {
  const { owner, rid, tags } = JSON.parse(req.body)

  const response = await req.db.collection('tags').updateOne(
    { owner, rid },
    { $set: { owner, rid }, $addToSet: { tags: { $each: tags } } },
    {
      upsert: true,
    }
  )

  res.statusCode(201)
  res.json(response)
})

export default handler
