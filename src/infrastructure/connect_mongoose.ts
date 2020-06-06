import * as mongoose from 'mongoose'
const { connection, connect } = mongoose;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const dbConnection = connect('mongodb+srv://test:test1234@cluster0-gajqu.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);