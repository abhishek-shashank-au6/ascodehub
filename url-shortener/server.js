const express = require('express')
const hbs = require('hbs')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
require('./db')

const apiRoutes = require('./routes/apiRoutes')
const normalRoutes = require('./routes/normalRoutes')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views', 'pages'))
app.set('view options', {layout: 'layout'})

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

app.use(
    session({
        secret: 'urlShortenerSecret',
        resave: false,
        name: 'urlShortenerSession',
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        }
    })
)

app.use(apiRoutes)
app.use(normalRoutes)

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'Home page',
        userId: req.session.userId
      })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Started')
    
})