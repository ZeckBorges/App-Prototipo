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

const corsOptions = {
  origin: ['http://localhost:19006', 'exp://192.168.3.34:19000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

const router = require("./rotas");
router.init(app, '/');

app.get('/', (req, res) => {
    res.send();
});

app.listen(5000, () => {
  console.log('API server is running on http://localhost:5000');
});
