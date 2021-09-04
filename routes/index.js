const express = require('express')
const passport = require('passport')
const validatorControllers = require('../controllers/validatorControllers')
const cityControllers = require('../controllers/cityControllers')
const userControllers = require('../controllers/userControllers')
const propertyControllers = require('../controllers/propertyControllers')
const agentControllers = require('../controllers/agentControllers')

const router = express.Router()

// USERS ROUTES
router.route('/users') // BORRAR ANTES DE DEPLOY
.get(userControllers.getAllUsers)
router.route('/user/register')
.post(
    validatorControllers.validatorSignUp,
    userControllers.registerUser
)
router.route('/user/login')
.post(userControllers.logUser)
router.route('/user/validate')
.get(
    passport.authenticate('jwt', {session: false}),
    userControllers.isValidUser
)
router.route('/user/wishlist')
.get(
    passport.authenticate('jwt', {session: false}),
    userControllers.getWishList
)

// CITY ROUTES
router.route('/cities')
.get(cityControllers.getAllCities)
router.route('/city/:id')
.get(cityControllers.getACity)
router.route('/city')
.post(
    passport.authenticate('jwt', {session: false}),
    cityControllers.postACity
)
.delete(
    passport.authenticate('jwt', {session: false}),
    cityControllers.removeACity
)
.put(
    passport.authenticate('jwt', {session: false}),
    cityControllers.modifyACity
)

// AGENT ROUTES
router.route('/agents')
.get(agentControllers.getAllAgents)
router.route('/agent')
.get(agentControllers.getAnAgent)
.post(
    passport.authenticate('jwt', {session: false}),
    agentControllers.addAnAgent
)
.put(
    passport.authenticate('jwt', {session: false}),
    agentControllers.modifyAnAgent
)
.delete(
    passport.authenticate('jwt', {session: false}),
    agentControllers.removeAnAgent
)

// PROPERTY ROUTES
router.route('/property/:id')
.get(propertyControllers.getAProperty)
router.route('/properties')
.get(propertyControllers.getProperties)
router.route('/property')
.post(
    passport.authenticate('jwt', {session: false}),
    propertyControllers.addAProperty
)
.put(
    passport.authenticate('jwt', {session: false}),
    propertyControllers.modifyAProperty
)
.delete(
    passport.authenticate('jwt', {session: false}),
    propertyControllers.removeAProperty
)

module.exports = router