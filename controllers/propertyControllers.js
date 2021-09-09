const Property = require('../models/Property')
const User = require('../models/User')
const nodemailer = require('nodemailer')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
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
const propertyControllers = {
    getProperties: (req, res) => {
        // necesito que me manden de frontend todos los filtros dentro de body en {filter:{filtros...}} OJO dentro de filtros tener greater and lower
        console.log("Received Get Properties Petition:" + Date())
        if (req.body.filter){
            if (Object.keys(req.body.filter).length === 0){
                Property.find()
                .populate({path: "city", select: "cityName"})
                .then(properties => res.json({success: true, response: properties }))
                .catch(err => handleError(res,err))
            }else{
                Property.find({...req.body.filter, price: {$gte: req.body.filter.greater || 0, $lte: req.body.filter.lower || Number.MAX_VALUE}})
                .populate({path: "city", select: "cityName"})
                .then(properties => res.json({success: true, response: properties }))
                .catch(err => handleError(res, err))
            }     
        }else{
            res.json({sucess: false, response: "El body no puede llegar vacio"})
        }   
    },
    getAProperty: (req, res) => {
        console.log("Received Get Property Petition:" + Date())
        Property.findOne({_id: req.params.id})
        .populate({path: "city", select: "cityName"})
        .then(property => res.json({success: true, response: property}))
        .catch(err => handleError(res,err))
    },
    addAProperty: (req, res) => { 
        console.log("Received Post Property Petition:" + Date())
        if(req.user.admin){
            const newProperty = new Property({...req.body})
            console.log(req.body)
            const {isBrandNew, isHouse, forSale, haveGarden, haveGarage, havePool, numberOfBathrooms, numberOfBedrooms, numberOfRooms, roofedArea, totalArea, price} = req.body
            const whatToSearchFor = {
                isBrandNew,
                isHouse,
                forSale,
                haveGarden,
                haveGarage,
                havePool,
            } // hay que acordar QUE COSAS se guardan en el filtro del usuario cuando se agrega al usuario, para buscar ACA
            // console.log(whatToSearchFor)
            newProperty.save()
            .then((property) => {
                User.find({dreamProperty: whatToSearchFor, suscribedToNewsLetter: true})
                .then(async users => {
                    if(users.length > 0){
                        let emailsAccepted = []
                        let emailsRejected = []
                        for ( const user of users){
                            let message = `
                            <h1>Hola ${user.firstName} ${user.lastName}</h1>
                            <p>Queremos informarte que tu casa de ensueño está disponible en nuestra página ahora:</p>
                            <break></break>
                            <a href="https://mardelcasas.herokuapp.com/house/${property._id}">CLICK AQUI!</a>
                            `//reemplazar esta URL por una de frontend, que vaya en params un ID, que en front monte componente y useEffect did mount, haga pedido a esa ruta de api con el req params id
                            let mailOptions = {
                                from: "Mar Del Casas <mardelcasas@gmail.com>",
                                to: `${user.firstName} <${user.eMail}>`,
                                subject: `Tu casa de ensueño ${user.firstName}!`,
                                text: message,
                                html: message
                            }
                            try{
                                let response = await transporter.sendMail(mailOptions)
                                if(response.accepted){
                                    emailsAccepted.push(response.accepted[0])
                                }else{
                                    emailsRejected.push(response.rejected[0])
                                }
                            }catch(err){
                                throw new Error("no se pudo mandar mails")
                            }
                        }                     
                        res.json({success: true, response: `Casa agregada y mail enviado a: ${emailsAccepted.join(', ')} Rechazados: ${emailsRejected.length > 0 ? emailsRejected.join(', ') : 0}`})
                    }else{
                        res.json({success: true, response: "Agregada la casa pero no se encontro usuario al cual se pudiera mandar mail"})
                    }
                })
                .catch(err => handleError(res, err))
            })
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "You don't have permissions"})
        }   
    },
    removeAProperty: (req, res) => {
        console.log("Received Remove Property Petition:" + Date())
        if(req.user.admin){
            Property.findOneAndDelete({_id: req.body._id})
            .then(property => {
                property ? res.json({success: true, response: property}) : res.json({success: false, response: "no se encontro la propiedad"})
            })
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "No tienes permisos"})
        }
    },
    modifyAProperty: (req, res) => {
        console.log("Received Modify Property Petition:" + Date())
        if(req.user.admin){
            Property.findOneAndUpdate({_id: req.body._id}, {...req.body}, {new:true})
            .then(property => {
                property ? res.json({success: true, response: property}) : res.json({success: false, response: "no se encontro la propiedad"})
            })
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "No tienes permisos"})
        }
    },
    updateManyProps: (req, res) => {
        console.log("Received Update Many Properties Petition:" + Date())
        Property.updateMany({}, {...req.body})
        .then(() => res.json({success: true, response: "actualizadas todas las propiedades"}))
        .catch(err => res.json({success: false, response: err}))
    },
    getNumberOfProps: (req, res) => {
        console.log("Received Get Number Of Properties Petition:" + Date())
        Property.countDocuments({city:req.params.id})
        .then(number => res.json({success: true, response: number}))
        .catch(err => handleError(res, err))
    }

}
module.exports = propertyControllers