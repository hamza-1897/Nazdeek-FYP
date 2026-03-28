const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookies());



const config = require('../config/envConfig');
const connectDB = require('../Config/dbConnection');
const adminRoutes = require('../routes/adminRoutes');
connectDB();

app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});

app.use('/api/admin', adminRoutes);


const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
