# 🎾 Mundo Tenis E-commerce: Plataforma B2C Fullstack

> **Solución de comercio electrónico a medida para retail deportivo con integración de pagos digitales y gestión de inventario en tiempo real.**

![Stack](https://img.shields.io/badge/Stack-MERN_(Node_|_Express_|_React)-blue)
![DB](https://img.shields.io/badge/Database-MongoDB_(NoSQL)-green)
![Payment](https://img.shields.io/badge/Payment-WebPay_Plus-orange)
![QA](https://img.shields.io/badge/Testing-QA_Methodology-purple)

### 🧩 Arquitectura del Sistema & Flujo de Pagos
Este diagrama muestra cómo interactúan los clientes, el servidor y la pasarela de pagos WebPay:

> **Diagrama de Arquitectura:**
>
> ![Arquitectura MVC](frontend/scr/assets/Diagrama_de_flujo.png)
>

## 📖 Descripción General
Este proyecto nació de una necesidad real de negocio: transformar la venta informal (WhatsApp/Instagram) de una PYME deportiva en una **plataforma digital centralizada y escalable**.

El sistema es un **E-commerce Fullstack** diseñado bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)**. No solo gestiona el catálogo y el carrito de compras, sino que implementa un flujo de **pagos seguro con WebPay Plus** y un panel de administración robusto para el control de stock, pedidos y logística de envíos.

## 🚀 Características Clave

* **💳 Pasarela de Pagos Real:** Integración completa con **Transbank WebPay** para procesar transacciones de crédito y débito de forma segura.
* **👤 Gestión de Roles (RBAC):**
    * **Cliente:** Registro, recuperación de contraseña, historial de pedidos, tracking de envío.
    * **Administrador:** Panel de control (Dashboard) para CRUD de productos, gestión de órdenes y cambio de estados (Pendiente -> Entregado).
    * **Guest:** Navegación y carrito temporal sin necesidad de login.
* **📦 Logística & Stock:** Sistema de inventario con variantes (tallas, marcas) y cálculo automático de costos de envío.
* **🛡️ Calidad de Software (QA):** Desarrollo guiado por pruebas con un **100% de tasa de aceptabilidad** en 15 escenarios críticos de uso.

## 🛠️ Arquitectura Técnica

El sistema utiliza una arquitectura moderna basada en JavaScript (Node.js ecosystem) y bases de datos NoSQL para garantizar flexibilidad en el catálogo de productos:

* **Backend:** Node.js con Express (API RESTful).
* **Base de Datos:** **MongoDB**. Se eligió por su escalabilidad horizontal y flexibilidad de esquema (Schema-less) ideal para catálogos de productos con atributos variables.
* **Frontend:** Interfaz reactiva con diseño **Material Design** para asegurar usabilidad móvil y web.
* **Metodología:** Gestión de proyecto ágil utilizando tableros Kanban (Trello) y entregas incrementales (Sprints).

## 🧪 Aseguramiento de Calidad (QA)
A diferencia de proyectos académicos estándar, este software pasó por una fase rigurosa de QA:
* **Pruebas Funcionales:** Validación de flujos críticos (Login, Checkout, CRUD).
* **Pruebas de Integración:** Verificación de la comunicación con la API de WebPay.
* **Resultado:** 15/15 casos de prueba exitosos antes del despliegue.

---
*Proyecto desarrollado para la asignatura de Ingeniería de Software. Enfocado en la digitalización de PYMES y estándares de calidad.*
