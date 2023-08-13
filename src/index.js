const express = require('express');
const router = require('../src/routes/index.js');
const cors = require('cors');

const app = express();
  
app.use(cors());

app.use(express.json());
app.use(router);

const port = 4001;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
