const mongoose = require('mongoose');
const signale = require('signale');

const connectionString = 'mongodb+srv://usainbolt:usainbolt124@cluster0.mjessw5.mongodb.net/test'

try {
    mongoose.connect(connectionString)
    signale.success('MongoDb:Connect: success')
} catch (err) {
    signale.error('MongoDb: error while connection: ', err)
}