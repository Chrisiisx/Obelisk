// server/src/routes/auth.js
const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router();
const { query } = require("../db")
const jwt = require("jsonwebtoken")
router.use(express.json())

//Password Hashing Confs
const SALT_ROUNDS = process.env.SALT_ROUNDS
const JWT_SECRET = process.env.JWT_SECRET


// Endpoint
router.post('/register', async (req, res) => {

  const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password obbligatorie' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password deve essere almeno 8 caratteri' });
    }

    try{

      // Check if user alredy exists in db
      const existingUser = await query(
          'SELECT id FROM users WHERE email = $1',
          [email]
      )

      
      if (existingUser.rows.length > 0) {
          return res.status(409).json({ error: 'Email già registrata' });
      }

      //Hashing Password
      const passwordHash = bcrypt.hash(password, SALT_ROUNDS);


      const user = await query(
        `INSERT INTO users (email, password_hash) 
        VALUES ($1, $2) 
        RETURNING id, email, created_at`,
        [email, passwordHash]
      )

      const token = jwt.sign(
          { userId: user.rows[0].id, email: user.rows[0].email },
          JWT_SECRET,
          { expiresIn: '7d' }
      );

      console.log("[DEBUG] " + email, password, passwordHash)


      res.status(201).json({
        message: "Utente registrato con successo",
        token,
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email
        }
      })


    }catch(error){
      console.log(error)
      res.status(500).json({ error: "Errore interno del server." })
    }
});

module.exports = router;