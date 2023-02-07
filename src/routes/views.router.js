import ProductManager from '../productManager.js'
import {Router} from 'express'

const router = new Router()
const path = './productos.json'
const productManager = new ProductManager(path)


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