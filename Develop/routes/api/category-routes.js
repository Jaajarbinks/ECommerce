const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categoryData = await Category.findAll({})
  // be sure to include its associated Products
  res.send(categoryData)
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const categoryData = await Category.findByPK(req.params.id)
  // be sure to include its associated Products
  res.send(categoryData)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  // create a new category
  try {
    const result = await Category.create({
      category_name: req.body.category_name,
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.send({ error: err.message || err.toString() })
  }
})

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    },
  )
})

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!categoryData) {
      res.status(404).json({ message: 'Nothing found with this id!' })
      return
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
