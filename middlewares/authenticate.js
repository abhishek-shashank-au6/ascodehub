const User = require('../models/User')

module.exports = async (req, res, next) => {
  if (req.session.userId) {
    try{
        const user = await User.findById(req.session.userId)
        req.user = user
        next()
    }
    catch(err){
        console.log(err.message)
        res.redirect('/login')
    }
  } else { 
      res.redirect('/login')
  } 
      
}
