const express = require('express');

const app = express();



app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});


const PORT =  5000;

app.listen(PORT,(req, res) => {
   console.log(`server is running on port: ${PORT}`);
})
