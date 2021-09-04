const Property = require('../models/Property')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
const propertyControllers = {
    getProperties:(req, res) =>{
        // agregar filtro que viene en req.body.filter
        console.log("Received Get Properties Petition:" + Date())
        Property.find()
        .then(properties => res.json({success: true, response: properties}))
        .catch(err => handleError(res,err))
    },
    getAProperty:(req, res) =>{
        console.log("Received Get Property Petition:" + Date())
        Property.findOne({_id: req.params.id})
        .then(property => res.json({success: true, response: property}))
        .catch(err => handleError(res,err))
    },
    addAProperty:(req, res) =>{ 
        console.log("Received Post Property Petition:" + Date())
        if(req.user.admin){
            const newProperty = new Property({...req.body})
            newProperty.save()
            .then(property => res.json({success: true, response: property}))
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "You don't have permissions"})
        }   
    },
    removeAProperty:(req, res) =>{
        console.log("Received Remove Property Petition:" + Date())
        if(req.user.admin){
            Property.findOneAndDelete({_id: req.body._id})
            .then(property => {
                property ? res.json({success: true, response: property}) : res.json({success: false, response: "no property found"})
            })
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "You don't have permissions"})
        }
    },
    modifyAProperty:(req, res)=>{
        console.log("Received Modify Property Petition:" + Date())
        if(req.user.admin){
            Property.findOneAndUpdate({_id: req.body._id}, {...req.body}, {new:true})
            .then(property => {
                property ? res.json({success: true, response: property}) : res.json({success: false, response: "no property found"})
            })
            .catch(err => handleError(res,err))
        }else{
            res.json({success: false, response: "You don't have permissions"})
        }
    }
}
module.exports = propertyControllers