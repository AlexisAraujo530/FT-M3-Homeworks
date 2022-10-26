const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

const sumArray = (array, num) => {
  for(const num1 of array) {
    for(const num2 of array) {
      if(num1 === num2) break;
      if(num1 + num2 === num) return true;
    }
  }
  return false;
}


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'test',
  });
}); 

app.post('/sum', (req, res) => {
  res.status(200).send({
    result: req.body.a + req.body.b,
  });
});


app.post('/product', (req, res) => {
  res.status(200).send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  const result = sumArray(array, num);
  res.status(200).send({result});
});


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
