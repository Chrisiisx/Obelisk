const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
// const dotenv = require("dotenv");
// dotenv.config({
//     path: '../.env'
// })
// Middleware per parsare JSON
app.use(express.json());

// Monta le route di autenticazione sotto /api/auth
app.use('/api/auth', authRoutes);
app.get('/api/debug/env', (req, res) => {
  res.json({
    serverPort: process.env.SERVER_PORT,
    allEnv: Object.keys(process.env)
  });
});
// Altri endpoint potranno essere:
// app.use('/api/passwords', passwordRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server in ascolto su ${process.env.SERVER_PORT}`);
});