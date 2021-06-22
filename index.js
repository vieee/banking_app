const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// this environment variable is added by heroku
if (process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}

// console.log(path.join(__dirname, 'client', 'build'))
app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(profileRoute);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
