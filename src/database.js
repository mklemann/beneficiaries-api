const mongoose = require('mongoose');
const config = require('./configs/env.config');

mongoose.connect(
  `mongodb+srv://${config.mongodb.USER}:${config.mongodb.PASS}@${config.mongodb.HOST}/${config.mongodb.DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log('Conectado ao db');
  }
);

module.exports = mongoose;
