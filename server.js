const express = require('express') // uso require para importar express
const cors = require('cors') // USO CORS PARA PERMITIR ORIGEN CRUZADO
require('dotenv').config() // USO DOTENV PARA TENER VARIABLES DE ENTORNO
const router = require('./routes/index')// IMPORTO MIS RUTAS
require('./config/database')
require('./config/passport')
const path = require('path')
const app = express()  // creo una instancia de Express (createApplication())
// dentro de app, vive el resultado de ejecutar el createApplication de express, me da un servidor listo para levantar
// FILTRO MIDDLEWARE, antes de usar mi aplicación, uso el filtro. Para que pueda responder de origen cruzado
app.use(cors())
app.use(express.json())


// verificar path de produccion
app.use('/api', router) // cuando haga cualquier pedido a la /api, ejecuto el router
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname + "/client/build/index.html"))
    })
}
const PORT = process.env.PORT || 4000
const HOST = process.env.MYHOST || '0.0.0.0'
app.listen(PORT,HOST, () => console.log(`Server listening on ${PORT} at ${HOST}!`)) // que comienze a escuchar en puerto 4000, una vez escuchado ejecutar función