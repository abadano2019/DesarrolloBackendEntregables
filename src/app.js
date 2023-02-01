// Desafio entregable Nro 4, Programación Backend
// Tema: Primera preentrega
// Titular: Ariel Badano
// CoderHouse
// Servidor express

import { __dirname } from '../utils.js'
import cartsRouters from '../routes/carts.router.js'
import express from 'express'
import productsRouters from '../routes/products.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productsRouters)
app.use('/api/carts',cartsRouters)
app.use(express.static(__dirname + '/public'))


app.listen(8080,()=>{
    console.log('******* Ejecutando servidor *******')
    console.log('**** Escuchando al puerto 8080 ****')
})