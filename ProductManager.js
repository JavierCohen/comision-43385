class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1; // Contador para generar IDs autoincrementables
    }

    addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        const existingProduct = this.products.find(
            (product) => product.code === code
        );
        if (existingProduct) {
            console.log("Error: Ya existe un producto con el mismo código");
            return;
        }

        // Agregar el producto al arreglo de productos
        const newProduct = {
            id: this.productIdCounter,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        };
        this.products.push(newProduct);

        // Incrementar el contador de IDs
        this.productIdCounter++;

        console.log("Producto agregado correctamente");
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

// Ejemplo de uso
const productManager = new ProductManager();
productManager.addProduct(
    "Producto 1",
    "Descripción 1",
    10,
    "thumbnail1.jpg",
    "code1",
    5
);
productManager.addProduct(
    "Producto 2",
    "Descripción 2",
    20,
    "thumbnail2.jpg",
    "code2",
    3
);

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);