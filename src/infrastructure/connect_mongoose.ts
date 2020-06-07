import * as mongoose from 'mongoose'
const { connection, connect } = mongoose;

// 'mongodb+srv://test:test1234@cluster0-gajqu.mongodb.net/test?retryWrites=true&w=majority'
const connectionURL = 'localhost:27017';
// const connectionURL = 'mongodb+srv://test:test1234@cluster0-gajqu.mongodb.net/test?retryWrites=true&w=majority';

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const dbConnection = connect(connectionURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);