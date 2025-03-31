import express from 'express';
import { createClients, getClients, updateClient, deleteClient } from '../controller/clientsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API para gestionar clients
 */

/**
 * @swagger
 * /api/clients/create:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: JuanPerez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               phone:
 *                 type: string
 *                 example: "5512345678"
 *               lastName:
 *                 type: string
 *                 example: Pérez
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               address:
 *                 type: string
 *                 example: "Calle Falsa 123, CDMX"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/create', createClients);

/**
 * @swagger
 * tags:
 *   - name: Clients
 *     description: The clients managing API
 *
 * /api/clients/all:
 *   get:
 *     summary: Get all clients
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/all', getClients);

/**
 * @swagger
 * /api/clients/update/{id}:
 *   put:
 *     summary: Actualiza un cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: JuanPerezActualizado
 *               email:
 *                 type: string
 *                 example: juan.actualizado@example.com
 *               phone:
 *                 type: string
 *                 example: "5598765432"
 *               lastName:
 *                 type: string
 *                 example: Pérez López
 *               address:
 *                 type: string
 *                 example: "Av. Siempre Viva 742, CDMX"
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/update/:id', updateClient);

/**
 * @swagger
 * /api/clients/remove/{id}:
 *   patch:
 *     summary: Marca un cliente como eliminado
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente deshabilitado correctamente
 *       404:
 *         description: Cliente no encontrado
 */
router.patch('/remove/:id', deleteClient);

export default router;