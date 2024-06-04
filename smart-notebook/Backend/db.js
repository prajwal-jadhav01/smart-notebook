const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Prajwal:LGWj5VHh5F1Xes5z@smartnotebook-cluster.gqs4qvj.mongodb.net/smart-notebook?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB!');
        // You can perform additional actions here upon successful connection
    });
};

module.exports = connectToMongo;
