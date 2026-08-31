const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');
const http = require('http');


const app = express();
app.use(express.json());
app.use(cors({
    origin: [
      'https://nazdeek-admin.vercel.app', 
      'http://localhost:5173'
    ],
    credentials: true
}));
app.use(cookies());
app.use(cookieParser());



const config = require('../config/envConfig');
const connectDB = require('../config/dbConnection');
const adminAuthRoutes = require('../routes/admin-AuthRoutes');
const providerRoutes = require('../routes/providerRoutes');
const userAuthRoutes = require('../routes/users-AuthRoutes');
const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const chatRoutes = require('../routes/chatRoutes');
const notificationRoutes = require('../routes/notificationRoutes');
const { authMiddleware, checkRole } = require('../middleware/authMiddleware');
const initSocket = require('../config/socket');

connectDB();
const server = http.createServer(app);
 initSocket(server);

app.get('/', (req, res) => {
    res.send('Nazdeek server is Running...');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Nazdeek FYP Backend is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime() // Server running time in seconds
  });
});

app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/admin', authMiddleware, checkRole(['admin']), adminRoutes);
//app.use('/api/admin',  adminRoutes);
app.use('/api/user-auth', userAuthRoutes);
app.use('/api/customer',authMiddleware, userRoutes);
app.use('/api/provider',authMiddleware, providerRoutes);   
app.use('/api/chat',authMiddleware, chatRoutes);
app.use('/api/notifications',authMiddleware, notificationRoutes);

const PORT = config.PORT;

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
