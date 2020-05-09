const ShortUrl = require('../models/shortUrl')

module.exports = {
    async renderRegisterPage (req, res) {
      try{
        res.render('register', {
          title: 'Register page'
        })
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    },
  
    async renderLoginPage (req, res) {
      try{
        res.render('login', {
          title: 'Login page'
        })
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    },

    async renderDashboardPage (req,res) {
      try{
        const user = req.user
        const shortUrls = await ShortUrl.find({user: req.user._id})
        res.render('dashboard', {
            title: 'Dashboard',
            userId: user.id,
            name: user.name,
            shortUrls: shortUrls
        })
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    },

    async visitShortenedUrl (req, res) {
      try{
        const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
        if (shortUrl == null) return res.sendStatus(404)
        shortUrl.clicks++
        shortUrl.save()
        res.redirect(shortUrl.full)
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    }
  }