const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require("cors")
const app = express();
// const dotenv = require("dotenv");
// dotenv.config({
//     path: '../.env'
// })
// Middleware per parsare JSON
app.use(express.json());
app.use(cors())

// Monta le route di autenticazione sotto /api/auth
app.use('/api/auth', authRoutes);




app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`Server in ascolto su ${process.env.SERVER_PORT || 3001}`);
});