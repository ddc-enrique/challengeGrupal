const express = require("express")
const cors = require("cors")
const passport = require("passport")
require("dotenv").config()
// first commit mi branch
const app = express()

//Middleware  
app.use(cors()) 
app.use(express.json())

app.use("/api", router)

app.listen(4000, () => console.log("Hello, the server is listening on port 4000"))