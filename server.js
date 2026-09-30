const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const pathFile = path.join(__dirname, 'db.json');

let cache = {};

async function readFile() {
    try {
        let data = await fs.readFile(pathFile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading db:", error);
    }
}

async function readFileWithDelay() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
        let data = await fs.readFile(pathFile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading db:", error);
    }
}

app.get("/products", async (req, res) => {
    let key = "products";
    let value = cache[key];

    if (value) {
        console.log("Serving from cache");
        return res.json(value);
    }

    let products = await readFileWithDelay();
    cache[key] = products;
    res.json(products);
});

app.get("/products/:id", async (req, res) => {
    let productId = req.params.id;
    let key = "product_" + productId;
    let value = cache[key];

    if (value) {
        console.log("Serving single product from cache");
        return res.json(value);
    }

    let products = await readFileWithDelay();
    let product = products.find(p => p.id == productId);

    if (product) {
        cache[key] = product;
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
