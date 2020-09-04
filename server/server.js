const express = require('express');
const app = express();
const PORT = 8008;

app.listen(PORT, ()=> {
    console.log(`Now listening on port: ${PORT}`);
})