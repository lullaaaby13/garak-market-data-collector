import * as mongoose from 'mongoose'
import ConfigLoader from "../utils/ConfigLoader";
const { connection, connect } = mongoose;

const { url } = ConfigLoader.load('mongoose.yaml');

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const dbConnection = connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);