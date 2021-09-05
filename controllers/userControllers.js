const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
const userControllers = {
    registerUser: (req, res) =>{
        console.log("Received Register User Petition:" + Date())
        const {firstName, lastName, password, eMail, photoURL, google, facebook} = req.body
        let hashedPass = bcryptjs.hashSync(password)
        const newUser = new User({
            firstName,
            lastName,
            password : hashedPass,
            eMail,
            photoURL,
            google,
            facebook,
        })
        newUser.save()
        .then(user => {
            const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
            res.json({success: true, response: user, token: token})
        })
        .catch(err => {
            res.json({success: false, response: err.message.includes('duplicate key') ? 'eMail already in use' : err.message})
        })
    },
    logUser: (req, res)=>{
        console.log("Received SIGN IN USER Petition:" + Date())
        const errMessage = "Invalid username or pass"
        const {eMail, password, google, facebook} = req.body
        User.exists({eMail: eMail}).then(exists => {
            if(exists){
                User.findOne({eMail: eMail})
                .then(userFound => {
                    if((userFound.google === true && google === false) || (userFound.facebook === true && facebook === false)){
                        throw new Error(`Log in with ${userFound.google ? 'Google' : 'Facebook'}!`)
                    }
                    if(!bcryptjs.compareSync(password, userFound.password))throw new Error(errMessage)
                    const token = jwt.sign({...userFound}, process.env.SECRETORKEY) 
                    res.json({success: true, response: userFound, token})
                })
                .catch(err => handleError(res, err))
            }else{
                throw new Error(errMessage)
            } 
        })
        .catch(err => handleError(res, err))   
    },
}

module.exports = userControllers

