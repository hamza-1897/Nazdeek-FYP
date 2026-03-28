const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookies());

const config = require('../config/envConfig');
const connectDB = require('../Config/dbConnection');
connectDB();

app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});

app.use('/api/users', require('../routes/usersRoute'));
app.use('/api/admin', require('../routes/adminRoute'));

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
