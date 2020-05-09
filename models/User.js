const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    urls: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShortUrl"
      }
    ]
  },
  { timestamps: true }
)

userSchema.statics.findByEmailAndPassword = async (email, password) => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error('Incorrect Credentials')
      const isMatched = await bcrypt.compare(password, user.password)
      if (!isMatched) throw new Error('Incorrect Credentials')
      return user
    } catch (err) {
      res.send(err.message)
    }
}

userSchema.pre('save', async function(next) {
    const user = this
    try {
      if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        next()
      }
    } catch (err) {
      res.send(err.message)
      next(err)
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User
