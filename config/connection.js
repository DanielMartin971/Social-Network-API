require('dotenv').config();

const { connect, connection } = require('mongoose');

const connectStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social';
connect(connectStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 
module.exports = connection;