import {Router} from 'express'
import { productManager } from './products.router.js'
import { socketServer } from '../app.js'

const router = new Router()

// Vista para ser utilizada con protocalo http, layout home,
router.get('/',async(req,res) =>{
    const products = await productManager.getProducts()
    //console.log(products)
    res.render('home',{ products, layout: "home" })
})

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get('/realtimeproducts',async(req,res) =>{
    const products = await productManager.getProducts()
    //console.log(products)
    res.render('realTimeProducts',{ products, layout: "home" })
})

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get('/realtimeproducts2',async(req,res) =>{
    const products = await productManager.getProducts()
        res.render('realTimeProducts2',{ products, layout: "altaProducto" })
})


export default router