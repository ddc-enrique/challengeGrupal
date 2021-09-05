const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
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
    sendMail: (req, res)=>{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        })
        let mailOptions = {
            from: "Mar Del Casas <mardelcasas@gmail.com>",
            to: `${req.user.firstName} <${req.user.eMail}>`,
            subject: `Welcome ${req.user.firstName}!`,
            text: `
                <h1>Hello ${req.user.firstName} ${req.user.lastName}</h1>
                <p>Please to confirm your account continue to this link:</p>
                <break></break>
                <a href="http://localhost:4000/api/user/validatemail/${req.user._id}">CLICK HERE!</a>
            `,
            html: `
                <h1>Hello ${req.user.firstName} ${req.user.lastName}</h1>
                <p>Please to confirm your account continue to this link:</p>
                <break></break>
                <a href="http://localhost:4000/api/user/validatemail/${req.user._id}">CLICK HERE!</a>
            `
        }
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
            console.log("Error " + err);
            res.json({success: false, response: err})
            } else {
            console.log("Email sent successfully")
            res.json({success: true, response: data})
            }
        })
    },
    validateUser: (req, res)=>{
        console.log(req.params.id)
        res.json({success: true, response: req.params.id})
    }
}

module.exports = userControllers

