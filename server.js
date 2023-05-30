const app = require('./app');
const mongoose = require('mongoose');
const { DB_Host, PORT = 3000 } = process.env;

mongoose
  .connect(DB_Host)
  .then(() => {
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
