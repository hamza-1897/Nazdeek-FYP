const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
