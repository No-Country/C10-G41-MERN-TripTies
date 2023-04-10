const multer = require('multer')


const multerUserPhoto = multer({
  dest: 'uploads/user/photos/',
  limits: {
    fileSize: 1048576, // 1 Mb
  },
  fileFilter: (request, file, cb) => {

    request.on('aborted', () => {
      file.stream.on('end', () => {
        cb(new Error('Cancel Photo Upload'), false)
      })
      file.stream.emit('end')
    })
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

const multerPostsPhotos = multer({
  dest: 'uploads/publications/photos/',
  limits: {
    fileSize: 1048576, // 1 Mb
  },
  fileFilter: (request, file, cb) => {

    request.on('aborted', () => {
      file.stream.on('end', () => {
        cb(new Error('Cancel Photo Upload'), false)
      })
      file.stream.emit('end')
    })
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})


const multerPostsVideos = multer({
  dest: 'uploads/publications/videos/',
  limits: {
    fileSize: 52428800, // 50 Mb
  },
  fileFilter: (request, file, cb) => {
    request.on('aborted', () => {
      file.stream.on('end', () => {
        cb(new Error('Cancel Video Upload'), false)
      })
      file.stream.emit('end')
    })
    if (file.mimetype == 'video/mp4' || file.mimetype == 'video/quicktime' || file.mimetype == 'video/x-msvideo') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .mp4, .mov and .avi format allowed!'))
    }
  }
})


module.exports = {
  multerUserPhoto,
  multerPostsPhotos, 
  multerPostsVideos
}