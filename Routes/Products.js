const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req,file, cb) {
cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const {
     getAllProducts,
      getSingleProduct, 
      addProducts,
      uploadImage,
      updateProducts,
      deleteProduct,
    } = require('../Controllers/Products')

router.route('/').post(upload.single('image'),addProducts).get(getAllProducts)
router.route('/uploadImage').post(uploadImage)

router.route('/:id').get(getSingleProduct).patch(updateProducts).delete(deleteProduct)

module.exports = router;