import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    paymentMethod: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isIn: [['tarjeta', 'transferencia', 'efectivo']]
        }
    },
    paymentStatus: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente',
        validate: {
            isIn: [['pendiente', 'completado', 'rechazado']]
        }
    },
    deliveryAddress: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'orders'
});

sequelize.sync({ alter: true })
    .then(() => console.log("Tabla 'orders' sincronizada"))
    .catch(err => console.error("Error sincronizando orders:", err));

export default Order;