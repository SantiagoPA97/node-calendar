const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_CNN);
    console.log('Database online.');
  } catch (error) {
    console.log(error);
    throw new Error('Error trying to initialize the database');
  }
}

module.exports = { dbConnection };