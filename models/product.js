const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : String , 
    price: String , 
    brand: String , 
    description: String , 
})

let Product = mongoose.model('products' , ProductSchema);

module.exports = {Product}