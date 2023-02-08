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
import { productManager } from './routes/products.router.js'
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

    socket.on('addProduct', async({title, description, price, code,stock,status,category})=>{
        
        try{
            const thumbnails = []   
            const validation = productManager.dataTypeValidation(title, description, parseInt(price),thumbnails,code,parseInt(stock), Boolean(status),category )
            if (validation === "ok"){        
                const product = productManager.createProduct(title,description,price,thumbnails,code,stock,status, category)
                if(typeof(product) === 'string')
                {
                    return "Validation product: " + product
                }
                const cod = await productManager.addProduct(product)
                
                if (cod === "ADDPROD-COD1"){
                    console.log({mesage:'ATENCION: Verifique el campo Code, el mismo ya existe en otro producto'})    
                }
                else{
                    
                    const products = await productManager.getProducts()
                    socketServer.emit("productoAgregado",{products})
                    console.log({mesage:'Producto agregado',product})
                }
            }else{
                console.log({mesage:'Error: ', validation})
            }
        }
        catch(error){
            console.log("CODIGO ADDPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO")
            console.log("LOG: " + error)
        }
    })
})