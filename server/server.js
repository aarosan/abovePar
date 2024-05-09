const express = require('express');
const cors = require('cors');
const path = require('path');
const {authMiddleware} = require("./utils/authMiddleware");
const db = require('./config/connection');
const routes = require('./routes');
require('dotenv').config();

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(authMiddleware);

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API Server running at http://localhost:${PORT}`);
  });
});