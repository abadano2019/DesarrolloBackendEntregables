import ProductManager from './productManager.js'
import express from 'express'

const path = './productos.json'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager(path)

app.get('/products', async(req, res)=>{

    const {limit} = req.query
    console.log(limit)
    try{
        console.log(req)
        const products = await productManager.getProducts()
        console.log(products)
        if(limit){
            const productSlice = products.slice(0,limit)
            res.json({message:"productos encontrado:", productSlice}) 
        }
        else{
            res.json({message:"productos encontrado:", products})
        }
    }
    catch(error){
        console.log(error)
    }
})

app.get('/prod',async (req,res)=>{
    const {limit} = req.query
    console.log(req.query)
    const products = await productManager.getProducts()
    //console.log(req)
    //res.send('Ruta productos')
    const productosLimit = products.slice(0,limit)
    res.json({productosABC:productosLimit})
}) 


// buscar un producto en particular
app.get('/products/:idProduct',async(req,res)=>{
    try{
        const {idProduct} = req.params
        const product = await productManager.getProductById(idProduct)
        
        if(product){
            res.json({mesage:'Producto encontrado',product})
        } else {
            res.json({mesage:'Producto no encontrado'})
        }
    }
    catch(error){
        console.log(error)
    }
})

app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue">Ruta raiz</h1>')
    //res.json(productos)
    //res.redirect
    //res.render
})



app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080')
})