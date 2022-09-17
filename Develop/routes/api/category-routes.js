const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  const categoryData = Category.findAll({})
  // be sure to include its associated Products
  res.send(categoryData)
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const categoryData = Category.findByPK(req.params.id)
  // be sure to include its associated Products
  res.send(categoryData)
})

router.post('/', (req, res) => {
  // create a new category
  const result = Category.create({ category_name: req.body.category_name })
  res.send(result)
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoryData = Category.update(
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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy({
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
