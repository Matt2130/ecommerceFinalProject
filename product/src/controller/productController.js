import Product from '../models/productModels.js';

// Validate SKU (example: format ABC-123)
const skuRegex = /^[A-Z]{3}-[0-9]{3}$/;

// Create product with post
export const createProduct = async (req, res) => {
    const { name, description, price, stock, sku, brand, model, year, color } = req.body;

    const requiredFields = ['name', 'description', 'price', 'stock', 'sku', 'brand', 'model', 'year', 'color'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `Faltan campos obligatorios: ${missingFields.join(', ')}` 
        });
    }

    if (!skuRegex.test(sku)) {
        return res.status(400).json({ 
            message: 'Formato de SKU inválido (ejemplo válido: ABC-123)' 
        });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
            message: 'El precio debe ser un número positivo' 
        });
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({ 
            message: 'El stock debe ser un entero no negativo' 
        });
    }

    try {
        // Verificar SKU único
        const existingProduct = await Product.findOne({ where: { sku } });
        if (existingProduct) {
            return res.status(400).json({ 
                message: 'El SKU ya está registrado' 
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price: parseFloat(price).toFixed(2),
            stock: parseInt(stock),
            sku: sku.toUpperCase(),
            status: true,
            brand,
            model,
            year: parseInt(year),
            color
        });

        res.status(201).json({ 
            message: 'Producto creado', 
            data: newProduct 
        });

    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ 
            message: 'Error interno al crear el producto' 
        });
    }
};

// Get all the product with status = 'activo'
export const getProduct = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { status: true }
        });
        
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            message: 'Error al obtener los productos' 
        });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ 
                message: 'Producto no encontrado' 
            });
        }

        // Validar SKU si se actualiza
        if (updates.sku) {
            if (!skuRegex.test(updates.sku)) {
                return res.status(400).json({ 
                    message: 'Formato de SKU inválido' 
                });
            }
            
            const existingProduct = await Product.findOne({ 
                where: { sku: updates.sku } 
            });
            
            if (existingProduct && existingProduct.id !== parseInt(id)) {
                return res.status(400).json({ 
                    message: 'El SKU ya está registrado' 
                });
            }
            
            updates.sku = updates.sku.toUpperCase();
        }

        // Validar tipos numéricos
        if (updates.price && (isNaN(updates.price) || updates.price) <= 0) {
            return res.status(400).json({ 
                message: 'Precio inválido' 
            });
        }

        if (updates.stock && (!Number.isInteger(updates.stock) || updates.stock < 0)) {
            return res.status(400).json({ 
                message: 'Stock inválido' 
            });
        }

        await product.update(updates);
        res.status(200).json({ 
            message: 'Producto actualizado', 
            data: product 
        });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ 
            message: 'Error al actualizar el producto' 
        });
    }
};

// Remove Product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ 
                message: 'Producto no encontrado' 
            });
        }

        if (!product.status) {
            return res.status(400).json({ 
                message: 'El producto ya está desactivado' 
            });
        }

        await product.update({ status: false });
        res.status(200).json({ 
            message: 'Producto desactivado', 
            data: product 
        });

    } catch (error) {
        console.error('Error al desactivar producto:', error);
        res.status(500).json({ 
            message: 'Error al desactivar el producto' 
        });
    }
};