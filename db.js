const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://abhishek_02:maRNJBKHsi97jtB@cluster0-obglj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(function() {
    console.log('Database connected')
  })
  .catch(function(err) {
    console.log(err.message)
  })
