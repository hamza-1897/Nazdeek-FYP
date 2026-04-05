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
const providerRoutes = require('../routes/providerRouts');
const userAuthRoutes = require('../routes/users-AuthRoutes');
const userRoutes = require('../routes/userRoutes');

connectDB();


app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});

app.use('/api/admin', adminRoutes);
app.use('/api/user-auth', userAuthRoutes);
app.use('/api/user', userRoutes);
app.use('/api/provider', providerRoutes);   


const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
