const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Database connected');
}).catch(() => {
  console.log('Database not connected');
});



module.exports = connect;
