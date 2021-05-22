const express = require('express');
const router = require('./routes/index')
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/', router)
app.options('*', cors());


app.listen(port, () => {
  console.log(`Boodle is running on port ${port}.`);
});
 
