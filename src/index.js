// index.js
const express = require('express');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyCYWlBaZAM0qeE0uon8xCK70aYxer_uvaQ",
  authDomain: "todolist-c6330.firebaseapp.com",
  projectId: "todolist-c6330",
  storageBucket: "todolist-c6330.appspot.com",
  messagingSenderId: "329089233545",
  appId: "1:329089233545:web:f95708cb7814496f810c58"
};

// Initialize Firebase
firebaseAdmin.initializeApp(firebaseConfig);

const app = express();

app.use(cors());
app.use(express.json());

const router = require("./rotas");
router.init(app, '/');

app.get('/', (req, res) => {
    res.send("Meu App")
})

app.listen(5000, () => {
  console.log('API server is running on http://localhost:5000');
});
