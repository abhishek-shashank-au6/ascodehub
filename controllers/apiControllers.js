const User = require('../models/User')
const ShortUrl = require('../models/shortUrl')

module.exports = {
    async registerUser (req, res) {
      try{
        const { email, name, password } = req.body
        if (!email || !name || !password) {
          return res
            .status(400)
            .send({ statusCode: 400, message: 'Bad request' })
        }
        const user = await User.create({
          email,
          name,
          password
        })
        req.session.userId = user._id
        return res.redirect('/dashboard')
      }
      catch(err) {
        if (err.name === 'ValidationError')
          console.log(err.message)
          return res.status(400).send(`Validation Error: ${err.message}`)
        res.redirect('/register')
      }
    },

    async loginUser (req, res) {
      try{
        const email = req.body.email
        const password = req.body.password
        if (!email || !password)
          return res.status(400).send('Incorrect credentials')
        const user = await User.findByEmailAndPassword(email, password)
        req.session.userId = user._id
        res.redirect('/dashboard')
      }
      catch(err) {
        if (err.name === 'ValidationError')
          return res.status(400).send(`Validation Error: ${err.message}`)
        res.redirect('/login')
      }
    },

    async logoutUser (req, res) {
      try{
        req.session.destroy()
        return res.redirect('/')
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    },

    async createShortenedUrl (req,res) {
      try{
        const user = req.user
        await ShortUrl.create({full: req.body.fullUrl, user: user._id})
        await User.findOneAndUpdate({id: user._id}, {$push: {urls: ShortUrl._id}})
        res.redirect('/dashboard')
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    }
  }