const express = require('express');
const open = require('open');
const app = express();
app.use(express.static('public'));
app.listen(3000, function () {
console.log('App started on port 3000');
open('http://localhost:3000');
});