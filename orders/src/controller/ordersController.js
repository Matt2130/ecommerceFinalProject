import Order from '../models/ordersModels.js';

// Create order
export const createOrder = async (req, res) => {
    const requiredFields = ['total', 'paymentMethod', 'deliveryAddress'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Faltan campos obligatorios: ${missingFields.join(', ')}`
        });
    }

    try {
        const newOrder = await Order.create({
            ...req.body,
            orderDate: new Date()
        });

        res.status(201).json({
            message: 'Orden creada exitosamente',
            data: newOrder
        });
    } catch (error) {
        console.error('Error creando orden:', error);
        res.status(500).json({
            message: 'Error interno al crear la orden',
            error: error.message
        });
    }
};

// Get all orders
export const getOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error obteniendo órdenes:', error);
        res.status(500).json({ message: 'Error al obtener órdenes' });
    }
};

// update order with id
export const updateOrder = async (req, res) => {
    const allowedFields = ['paymentStatus', 'deliveryDate', 'status'];
    const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({
            message: `Campos no permitidos para actualización: ${invalidFields.join(', ')}`
        });
    }

    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) return res.status(404).json({ message: 'Orden no encontrada' });
        
        const updatedOrder = await Order.findByPk(req.params.id);
        res.status(200).json({
            message: 'Orden actualizada',
            data: updatedOrder
        });
    } catch (error) {
        console.error('Error actualizando orden:', error);
        res.status(500).json({ message: 'Error al actualizar la orden' });
    }
};

// Remove order by id
export const deleteOrder = async (req, res) => {
    try {
        const [updated] = await Order.update(
            { status: false },
            { where: { id: req.params.id } }
        );

        if (!updated) return res.status(404).json({ message: 'Orden no encontrada' });
        
        res.status(200).json({
            message: 'Orden desactivada exitosamente'
        });
    } catch (error) {
        console.error('Error desactivando orden:', error);
        res.status(500).json({ message: 'Error al desactivar la orden' });
    }
};