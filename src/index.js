// index.js
const express = require('express');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const firebaseConfig = require('../firebase_key.json');

// Initialize Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  projectId: "todolist-c6330"
});

const app = express();

app.use(cors());
app.use(express.json());

const router = require("./rotas");
router.init(app, '/');

app.get('/', (req, res) => {
    res.send();
});

app.listen(5000, () => {
  console.log('API server is running on http://localhost:5000');
});
