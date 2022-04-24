const mongo = require('mongoose');

mongo.connect('mongodb://mongo-database:27017/pokemon', { 
    auth: 
    {
        username: "george",
        password: "secret",
    },
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(e => {
    console.error('Connection error:', e.message);
});

const database = mongoose.connection;

module.exports = database;