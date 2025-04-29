# 📚 API de Registro de Notas

Este proyecto permite registrar, consultar, actualizar y eliminar notas de estudiantes.

## 📖 Endpoints disponibles:

| Método | Ruta | Descripción | Body requerido | Respuesta |
|:---|:---|:---|:---|:---|
| `GET` | `/api/notas` | Obtener todas las notas | ❌ | Array de notas |
| `GET` | `/api/notas/:id` | Obtener una nota específica por ID | ❌ | Objeto nota |
| `POST` | `/api/notas` | Crear una nueva nota | ✅ {nombre, curso, nota} | Nota creada |
| `POST` | `/api/notas/masivo` | Crear varias notas de golpe | ✅ Array de objetos nota | Notas creadas |
| `PUT` | `/api/notas/:id` | Actualizar una nota por ID | ✅ {nombre, curso, nota} | Nota actualizada |
| `DELETE` | `/api/notas/:id` | Eliminar una nota por ID | ❌ | Mensaje de éxito |

---

## 📦 Tecnologías usadas

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv

---

## 🚀 Cómo iniciar

```bash
npm install
npm run dev
