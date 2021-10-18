const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../model/productModel');
const data = require('../seeds/seed');
const productRouter = express.Router();


productRouter.get(
    '/seed', 
    expressAsyncHandler(async (req, res) => {
    // remove data before inserting. it will remove all data... be cautious to use it 
        // await Product.deleteMany({});
        const createdProducts = await Product.insertMany(data.products);
        res.send( { createdProducts });
    })
); 

// get all products /api/products/
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send( products );
}));
// temp product api/product route 
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    //check condition
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
})
);

module.exports = productRouter;