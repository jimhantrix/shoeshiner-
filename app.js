const express = reqiure('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', res, next) => {
  res.send('Hello World!');
}
app.listen(3000);
