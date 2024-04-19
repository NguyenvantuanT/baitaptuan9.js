const express = require('express');
const mongoose = require('mongoose');
const { User } = require("./models/user");
const { Product } = require("./models/product");
const fs = require('fs');
const app = express();

mongoose.connect("mongodb://localhost:27017/dbconnect")
    .then(() => console.log("Connect to mongoDB"))
    .catch((err) => console.log(err));



// Đọc tệp index.html
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data);
    });
});
app.use(express.json());
// product and user
// findOne(), update , delete 
// read index.html in index.js
app.get('/findOneProduct/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    res.json(product);
});

app.get('/findOneUser/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
});

app.delete('/deleteProduct/:id', async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
});

app.put('/updateProduct/:id', async (req, res) => {
    const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    );
    res.json(product);
});

app.put('/updateUser/:id', async (req, res) => {
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    );
    res.json(user);
});
app.post('/register', async (req, res) => {
    const newUser = new User(req.body)
    const result = await newUser.save();
    delete result.password;
    res.json(result);
})
app.get('/getAll', async (req, res) => {
    const user = await User.find({})
    res.json(user);
})

app.listen(8081, () => {
    console.log("Server is running...");
});