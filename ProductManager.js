import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.productIdCounter = 1;  // Contador para generar IDs autoincrementables
        this.loadProducts();    // Cargar productos desde el archivo al iniciar
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            // Si ocurre un error al leer el archivo, se asume que no existe o está vacío
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addProduct(product) {
        // Validar que todos los campos sean obligatorios
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        const existingProduct = this.products.find((p) => p.code === code);
        if (existingProduct) {
            console.log("Error: Ya existe un producto con el mismo código");
            return;
        }

        // Asignar un ID autoincrementable al producto
        const newProduct = {
            id: this.productIdCounter,
            ...product,
        };
        this.products.push(newProduct);

        // Incrementar el contador de IDs
        this.productIdCounter++;

        // Guardar los productos en el archivo
        this.saveProducts();

        console.log("Producto agregado correctamente");
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            throw new Error("Error: Producto no encontrado");
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            // Mantener el ID original del producto
            updatedFields.id = id;
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
            console.log("Producto actualizado correctamente");
        } else {
            console.log("Error: Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            console.log("Producto eliminado correctamente");
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

export default ProductManager;