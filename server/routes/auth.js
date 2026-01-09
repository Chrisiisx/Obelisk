// server/src/routes/auth.js
const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router();
const { query } = require("../db")
const jwt = require("jsonwebtoken")
router.use(express.json())

//Password Hashing Confs
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const JWT_SECRET = process.env.JWT_SECRET


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password obbligatorie' });
  }

  try {
    // Cerca l'utente nel database includendo la password hash
    const userResult = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const user = userResult.rows[0];
    let isPasswordValid;

    // Controlliamo sia la password, se l'account è il master, e se è il primo accesso del master
    if(email == "admin@admin.com"){  //&& user.firstAccess == true
      if(password == user.password_hash){
        isPasswordValid = true
      }
    }else{
      isPasswordValid = await bcrypt.compare(password, user.password_hash);
    }

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Genera il token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Rimuovi la password hash dalla risposta per sicurezza
    const { password_hash, ...userWithoutPassword } = user;

    console.log("[INFO] Utente " + email + " ha effettuato il login");

    res.status(200).json({
      success: true,
      message: "Login effettuato con successo",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("[ERROR] Errore durante il login:", error);
    res.status(500).json({
      success: false,
      error: "Errore interno del server durante il login"
    });
  }
});


// Endpoint
router.post('/register', async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password obbligatorie' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password deve essere almeno 8 caratteri' });
  }

  try {

    // Check if user alredy exists in db
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )


    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email già registrata' });
    }

    //Hashing Password
    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)


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
      success: true,
      message: "Utente registrato con successo",
      token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email
      }
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Errore interno del server." })
  }
});

router.post('/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.replace("Bearer ", "")
  console.log(token)

  const { userId } = req.body;
  
  if (!token) return res.status(401).json({ valid: false });

  try {
    console.log(`===DEBUG INFO===`)
    console.log(`[TOKEN] ${token}`)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`[USER ID] ${decoded.userId}`)


    if (decoded.userId !== userId) {
      return res.status(403).json({ valid: false });
    }

    
    // Verifica che l'utente esista ancora nel DB
    const user = await query(
      'SELECT id, email FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ valid: false });
    }

    res.json({ 
      valid: true, 
      user: user.rows[0] 
    });
  } catch (error) {
    res.status(403).json({ valid: false });
  }
});

module.exports = router;