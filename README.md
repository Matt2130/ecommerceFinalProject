# Proyecto E-commerce

Este es el proyecto final de la materia **Aplicaciones Web Orientadas a Servicios**, en el cual desarrollamos un **E-commerce** enfocado en la implementación del **Backend**.

## Estructura del Proyecto

```plaintext
ecommerce:
├── clients       # Servicio de gestión de clientes
├── config        # Configuración de Docker y otros archivos de entorno
├── email         # Servicio de envío de correos electrónicos
├── esb-service   # Bus de Servicios Empresarial (Enterprise Service Bus)
├── orders        # Servicio de gestión de órdenes
├── product       # Servicio de gestión de productos
├── users         # Servicio de autenticación y gestión de usuarios
```

## Tecnologías Utilizadas

- **JavaScript** y **Node.js** (Express.js para la mayoría de los servicios)
- **Docker** (para ejecutar el proyecto en local y realizar pruebas)
- **Postman** (para probar los endpoints)
- **Java** con **Spring Boot** (para el ESB)
- **MySQL** (base de datos principal)
- **RabbitMQ** (mensajería para la orquestación de servicios)
- **GitHub** (repositorio del proyecto)
- **JWT** (para generación y manejo de tokens de autenticación)
- **Railway** (para el despliegue en la nube)

## Arquitectura y Comunicación

El **E-commerce** se compone de **seis servicios** principales:

1. **Clients**: Maneja la información de los clientes.
2. **Users**: Servicio de autenticación y gestión de usuarios.
3. **Product**: Gestión de productos disponibles en la tienda.
4. **Orders**: Procesamiento de pedidos y gestión de órdenes.
5. **Email**: Servicio encargado del envío de correos electrónicos.
6. **ESB-Service**: **(Enterprise Service Bus)** encargado de conectar y orquestar la comunicación entre los servicios.

## Despliegue en la Nube

El proyecto está diseñado para ser desplegado en **Railway**, donde cada servicio se almacena en un contenedor independiente. Gracias a la integración con **GitHub**, cada cambio en el código se despliega automáticamente en Railway, generando un dominio único para cada servicio, lo que permite que el **ESB-Service** coordine la comunicación entre todos los módulos.

## Instalación y Ejecución

Para ejecutar el proyecto en local con **Docker**, sigue estos pasos:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd ecommerce
docker-compose up -d
```

Para probar los endpoints, puedes usar **Postman** o cualquier herramienta similar.

---
**Autor:** Manuel Hernández  
[Correo](mailto:manuel.hdz.rubio07@gmail.com)  
[LinkedIn](https://linkedin.com/in/tuusuario)
