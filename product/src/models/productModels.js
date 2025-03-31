import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },    
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },        
}, {
    timestamps: false,
    tableName: 'product'
});

sequelize.sync({ alter: true })
    .then(() => console.log("Tabla 'product' sincronizada correctamente"))
    .catch(err => console.error("Error al sincronizar la tabla 'product':", err));

export default Product;