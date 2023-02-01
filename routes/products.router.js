import ProductManager from '../src/productManager.js'
import { Router } from "express";
import { upload } from '../middlewares/multer.js';

const router = Router();

const path = './productos.json'
const productManager = new ProductManager(path)

// Busqueda de todos los productos y busqueda de productos filtrando por un limite pasado por query
router.get('/', async(req,res) => {

    const {limit} = req.query
    try{
        
        const products = await productManager.getProducts()
        
        if(limit){
            const productSlice = products.slice(0,limit)
            res.json({message:"productos encontrado:", productSlice}) 
        }
        else{
            res.json({message:"productos encontrado:", products})
        }
    }
    catch(error){
        console.log("CODIGO GETPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO")
        console.log("LOG: " + error)
    }
})

// Busqueda de producto por id
router.get('/:idProduct', async(req,res) => {

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
        console.log("CODIGO GETPRODID: CONTACTAR AL ADMINISTRADOR DEL SITIO")
        console.log("LOG: " + error)
    }
})


router.post('/', async(req,res) => {
    
    try{
        const {title, description, price,thumbnails,code,stock, status,category } = req.body   
        const validation = productManager.dataTypeValidation(title, description, price,thumbnails,code,stock, status,category )
        if (validation === "ok"){        
            const product = productManager.createProduct(title,description,price,thumbnails,code,stock,status, category)
            if(typeof(product) === 'string')
            {
                res.json({mensaje: product})
                return "Validation product: " + product
            }
            const cod = await productManager.addProduct(product)
            
            if (cod === "ADDPROD-COD1"){
                res.json({mesage:'ATENCION: Verifique el campo Code, el mismo ya existe en otro producto'})    
            }
            else{
                res.json({mesage:'Producto agregado',product})
            }
        }else{
            res.json({mesage:'Error: ', validation})
        }

    }
    catch(error){
        console.log("CODIGO ADDPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO")
        console.log("LOG: " + error)
    }
})

router.put('/:idProduct', async(req,res) => {

    try{

        
        const {idProduct} = req.params
        const {title, description, price,thumbnail,code,stock, status, category } = req.body   

        const dataCheck = productManager.dataTypeValidationUpdate(title, description, price,thumbnail,code,stock, status, category )
        if(dataCheck !== "OK"){
            res.json({mesage: dataCheck})
        }

        const product = productManager.createProductPut(title,description,price,thumbnail,code,stock,status,category)
        const modifyProduct = await productManager.getProductById(parseInt(idProduct))
        if (modifyProduct){
            const validation = await productManager.updateProduct(idProduct, product)
            if (validation ==='OK'){
                res.json({mesage:'Producto modificado'})
            }else{
                res.json({mesage: validation})
            }
        }
        else
        {
            res.json({mesage:'No existe el producto a modificar'})
        }   
    }
    catch(error){
        console.log("CODIGO PUTPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO")
        console.log("LOG: " + error)
    }    
})

router.delete('/:idProduct', async(req,res) => {

    const {idProduct} = req.params
        console.log(idProduct)
    try{
        const {idProduct} = req.params
        const product = await productManager.getProductById(idProduct)
        
        if(product){
            productManager.deleteProduct(idProduct)
            res.json({mesage:'Producto eliminado',product})
        } else {
            res.json({mesage:'Producto no encontrado'})
        }
    }
    catch(error){
        console.log("CODIGO DELPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO")
        console.log("LOG: " + error)
    }
    
})


export default router