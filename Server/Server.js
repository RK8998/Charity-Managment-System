const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());
app.use(bodyParser.json());


// Connecting MongoDb
// mongodb://localhost:27017/Charity
// mongodb+srv://kushang:kushang123@cluster0.hbrmt.mongodb.net/charity?retryWrites=true&w=majority

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Charity', {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/',(req,res) => {
    res.send('welcome to charity Server');
});

require('./app/routes/admin.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.listen(3001, ()=>{
    console.log('Server is running on port 3001...');
})