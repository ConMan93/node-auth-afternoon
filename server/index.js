const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const ac = require('./controllers/authController');
const tc = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');
require('dotenv').config();
const app = express();
const port = 4000;

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('Database is connected')
})

// Authorization
app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register)
app.get('/auth/logout', ac.logout)

// Treasure
app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, tc.getMyTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, tc.getAllTreasure)
app.post('/api/treasure/user', auth.usersOnly, tc.addMyTreasure)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})