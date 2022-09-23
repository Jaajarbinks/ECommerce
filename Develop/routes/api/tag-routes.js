const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({})

  // be sure to include its associated Product data
  res.send(tagData)
})

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagData = await Tag.findByPK(req.params.id)

  // be sure to include its associated Product data
  res.send(tagData)
})

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({ tag_name: req.body.tag_name })
    res.send(tagData)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    },
  )
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with this id!' })
      return
    }

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
