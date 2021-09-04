const express = require("express")
const cors = require("cors")
const passport = require("passport")
const router = require ("./routes/index")
require("dotenv").config()

const app = express()

//Middleware  
app.use(cors()) 
app.use(express.json())

app.use("/api", router)

app.listen(4000, () => console.log("Hello, the server is listening on port 4000"))