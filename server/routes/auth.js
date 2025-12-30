// server/src/routes/auth.js
const express = require('express');
const router = express.Router();
router.use(express.json())

router.post('/register', async (req, res) => {
  console.log(req.body.username)
  res.sendStatus(200)
});

module.exports = router;