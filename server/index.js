const express = require("express")
const cors = require("cors")
const app = express()
const ServerPort = 3001


app.use(express.json())

app.post("/test", (req, res) => {
    console.log(req.body)
    res.send("Called Test API")
})

app.listen(ServerPort, () => {
    console.log(`[SUCCESS] Server Listening On Port: ${ServerPort}`)
})