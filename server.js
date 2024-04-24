const app = require('./app'); 
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://kody:o5fnq8BK3SwoHF20@cluster0.oncb53l.mongodb.net/Book-Store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Error connecting to MongoDB', err.message);
});

