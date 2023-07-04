const express = require('express');
const ProductManager = require('./ProductManager.js');

//import express from 'express';
//import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});