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
      addProducts 
    } = require('../Controllers/Products')

router.route('/').post(upload.single('image'),addProducts).get(getAllProducts)

router.route('/:id').get(getSingleProduct)

module.exports = router;