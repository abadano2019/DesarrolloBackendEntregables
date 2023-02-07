import {Router} from 'express'
import { productManager } from './products.router.js'

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


export default router