const express = require('express');
const app = express();
const db = require('./db.json');
const PORT = 3000;

app.get('/products', (req, res) => {
    res.json(db);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = db.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
