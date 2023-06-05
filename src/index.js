// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const router = require("./rotas");
router.init(app, '/');

app.get('/', (req, res) => {
    res.send("Teste Shawn and Partners")
})

app.listen(5000, () => {
  console.log('API server is running on http://localhost:5000');
});
