// server/src/routes/auth.js
const express = require('express');
const router = express.Router();
const { query } = require("../db")
router.use(express.json())

router.post('/register', async (req, res) => {
  const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password obbligatorie' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password deve essere almeno 8 caratteri' });
    }
    try{

      const newUser = await query(
        `INSERT INTO users (email, password_hash) 
        VALUES ($1, $2) 
        RETURNING id, email, created_at`,
        [email, password]
      );
      res.status(201).json({
        message: "Utente registrato con successo"
      })
    }catch(error){
      console.log(error)
      res.status(500).json({ error: "Errore interno del server." })
    }
});

module.exports = router;