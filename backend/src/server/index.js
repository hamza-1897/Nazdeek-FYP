const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(cookies());



const config = require('../config/envConfig');
const connectDB = require('../Config/dbConnection');
const adminAuthRoutes = require('../routes/admin-AuthRoutes');
const providerRoutes = require('../routes/providerRoutes');
const userAuthRoutes = require('../routes/users-AuthRoutes');
const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');

connectDB();


app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});

app.use('/api/admin-auth', adminAuthRoutes);
//app.use('/api/admin', authMiddleware, checkRole(['admin']), adminRoutes);
app.use('/api/admin',  adminRoutes);
app.use('/api/user-auth', userAuthRoutes);
app.use('/api/customer', userRoutes);
app.use('/api/provider', providerRoutes);   


const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
