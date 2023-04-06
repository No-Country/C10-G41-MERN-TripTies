const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile_photo/photos')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const multerProfilePhotos = multer({
  storage: storage,
  limits: { fileSize: 1048576 }, // 1 MB in bytes
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('Only .png, .jpg and .jpeg files are allowed.'))
  }
}).single('photo')


module.exports = {
  multerProfilePhotos
}