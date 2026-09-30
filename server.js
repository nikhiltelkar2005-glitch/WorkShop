const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const pathFile = path.join(__dirname, 'db.json');

async function readFile() {
    try {
        let data = await fs.readFile(pathFile, "utf-8")
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading db:", error)
    }
}

app.get("/products", async (req, res) => {
    let products = await readFile();
    res.json(products);
})

app.get("/products/:id", async (req, res) => {
    let products = await readFile();
    let productId = req.params.id;
    
    let product = products.find(p => p.id == productId);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
