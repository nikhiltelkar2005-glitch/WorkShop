const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

async function readFile() {
    let data = await fs.readFile('./db.json', 'utf-8');
    return JSON.parse(data);
}

app.get('/products', async (req, res) => {
    let products = await readFile();
    console.log(products);
    res.json(products);
});

app.get('/products/:id', async (req, res) => {
    let products = await readFile();
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
