const Property = require('../models/Property')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
const propertyControllers = {
    getProperties:(req, res) =>{
        // necesito que me manden de frontend todos los filtros dentro de body en {filter:{filtros...}} OJO dentro de filtros tener greater and lower
        console.log("Received Get Properties Petition:" + Date())
        if (req.body.filter){
            if (Object.keys(req.body.filter).length === 0){
                Property.find()
                .then(properties => res.json({success: true, response: properties }))
                .catch(err => handleError(res,err))
            }else{
                Property.find({...req.body.filter, price: {$gte: req.body.filter.greater || 0, $lte: req.body.filter.lower || Number.MAX_VALUE}})
                .then(properties => res.json({success: true, response: properties }))
                .catch(err => handleError(res, err))
            }     
        }else{
            res.json({sucess: false, response: "Body can't be blank, have to put something"})
        }   
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