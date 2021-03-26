const express = require('express');
const app = express();
const port = 3030;

app.get('/', (req, res) => {
  return res.json({message: 'Hello World!'});
})

app.listen(port);