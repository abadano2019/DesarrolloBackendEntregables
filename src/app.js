// Desafio entregable Nro 5, Programación Backend
// Tema: WebSocket
// Titular: Ariel Badano
// CoderHouse
// Servidor express

import { Server } from 'socket.io'
import { __dirname } from '../src/utils.js'
import cartsRouters from './routes/carts.router.js'
import express from 'express'
import handlebars from 'express-handlebars'
import productsRouters from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productsRouters)
app.use('/api/carts',cartsRouters)
app.use('/views', viewsRouter)

// archivos estaticos
app.use(express.static(__dirname + '/public'))

// handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

const httpServer = app.listen(8080,()=>{
    console.log('******* Ejecutando servidor *******')
    console.log('**** Escuchando al puerto 8080 ****')
})

export const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log('Uusario desconectado');
    })

})