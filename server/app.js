const express = require('express');
const router = require('./routes/index')
const app = express();
const port = 5000;

app.use(express.json());

app.use('/', router)

app.listen(port, () => {
  console.log(`Boodle is running on port ${port}.`);
});
 
