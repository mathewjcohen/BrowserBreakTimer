const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(8003);