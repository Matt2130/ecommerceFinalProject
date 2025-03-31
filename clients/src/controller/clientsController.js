import Client from '../models/clientsModels.js';
import { clientCreatedEvent } from '../services/rabbitServicesEvent.js';

//function to create new clients with post
export const createClients = async (req, res) => {
    const { username, email, phone, lastName, birthday, address } = req.body;

    if (!username || !email || !phone || !lastName || !birthday || !address) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El correo no tiene un formato válido' });
    }

    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'El teléfono debe contener al menos 10 dígitos' });
    }

    try {
        const existingClient = await Client.findOne({ where: { email } });
        if (existingClient) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const newClient = await Client.create({
            username,
            email,
            phone,
            lastName,
            birthday,
            address,
            status: true,
            creationDate: new Date(),
        });

        console.log(newClient);
        await clientCreatedEvent(newClient);
        res.status(201).json({ message: 'Cliente creado', data: newClient });
    } catch (error) {
        console.error('Error al crear el cliente: ', error);
        res.status(500).json({ message: 'Error al crear el cliente' });
    }
};

//Get all clients
export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            where: { status: true }
        });
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error al listar clientes: ', error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
};

//update clients by id with put
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { username, email, phone, lastName, address } = req.body;

    try {
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'El correo no tiene un formato válido' });
            }

            const existingClient = await Client.findOne({ where: { email } });
            if (existingClient && existingClient.id !== Number(id)) {
                return res.status(400).json({ message: 'El correo ya está registrado en otro cliente' });
            }
        }

        if (phone) {
            const phoneRegex = /^\d{10,}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: 'El teléfono debe contener al menos 10 dígitos' });
            }

            const existingPhone = await Client.findOne({ where: { phone } });
            if (existingPhone && existingPhone.id !== Number(id)) {
                return res.status(400).json({ message: 'El teléfono ya está registrado en otro cliente' });
            }
        }

        await client.update({
            username: username || client.username,
            email: email || client.email,
            phone: phone || client.phone,
            lastName: lastName || client.lastName,
            address: address || client.address,
        });

        return res.status(200).json({ message: 'Cliente actualizado', data: client });
    } catch (error) {
        console.error('Error al actualizar el cliente: ', error);
        res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
};

//delete a client by id with patch
export const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        if (!client.status) {
            return res.status(400).json({ message: "El cliente ya está desactivado." });
        }

        await client.update({ status: false }); //terminate the customer instead of deleting

        return res.status(200).json({ message: 'Cliente deshabilitado correctamente', data: client });
    } catch (error) {
        console.error('Error al deshabilitar cliente: ', error);
        return res.status(500).json({ message: 'Error al deshabilitar cliente' });
    }
};