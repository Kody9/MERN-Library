const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/Books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
