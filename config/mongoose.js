const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/habitTracker', {useNewUrlParser: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("Database Connected !!!");
// });

// module.exports= db;



const url = process.env.HABIT_DB_URL; // mongoodb url
mongoose.connect(url); // connecting to db

const db = mongoose.connection; // getting connection of db

db.on('error', console.error.bind(console, 'Error: connecting to db :: MongoDB')); // if error while conecting to db


// once connection is open (started)
db.once('open', (err) => {
    if (err) {
        console.log('Error: while opening db connection', err);
    } else {
        console.log('DB connection successfull :: MongoDB');
    }
})


module.exports = db;