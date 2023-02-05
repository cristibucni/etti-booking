const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const users = require('./routes/api/users')
const roles = require('./routes/api/roles')
const rooms = require('./routes/api/rooms')
const floors = require('./routes/api/floors')
const buildings = require('./routes/api/buildings')
const bookings = require('./routes/api/bookings')
const app = express()
require('dotenv').config()
/** Body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

/** DB Config */
const db = require('./config/keys').mongoURI

/** Connect to MongoDB */
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Mongo db connected'))

/** Passport middleware*/
app.use(passport.initialize())

/** Passport config */
require('./config/passport')(passport)

/** USE Routes */
app.use('/api/users', users)
app.use('/api/roles', roles)
app.use('/api/rooms', rooms)
app.use('/api/buildings', buildings)
app.use('/api/floors', floors)
app.use('/api/bookings', bookings)

app.get('/hello', (req, res) => res.send('Hello'))
const port = process.env.PORT || 5000
console.log('PORT', process.env.PORT)
app.listen(port, () => console.log('Server running on port ' + port))
