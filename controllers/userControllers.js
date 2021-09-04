const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
const userControllers = {

}
module.exports = userControllers

