const { default: mongoose } = require('mongoose')
const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  user: { type: Object,  },
  content: { type: String,  },
  privacity: { type: String, enum: ['Public', 'Private'],   },
  photo: [{ type: String }],
  video: { type: [Object],  },
  rate: { type: Number, min: 1, max: 5,  },
  name: { type: String,  },
  clasification: { type: String, },
  reported: { type: Number, default: 0 },
  liked: { type: mongoose.Schema.Types.ObjectId, ref: 'Like' },
  comments: { type: Number, default: 0 },
})


module.exports = model('Post', postSchema)
