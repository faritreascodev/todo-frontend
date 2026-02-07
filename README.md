# TODO Frontend - React + Vite

Frontend moderno para el sistema de gestión de tareas con monitoreo integrado.

## Características

- React 18 con Vite
- Dark mode por defecto
- Diseño responsive
- CRUD completo de tareas
- Filtros y estadísticas
- Edición inline
- Formato de fechas relativas

## Desarrollo Local

```bash
npm install
npm run dev
```

Desplegar en Dokploy
Sube a GitHub

Crea servicio tipo "Docker Compose" en Dokploy

Configura dominio: todo.mltprdj.com

Container: frontend, Port: 80

Deploy

Variables de Entorno
VITE_API_URL - URL de la API backend


***

## Desplegar en Dokploy

```bash
# Sube el frontend a GitHub
cd todo-frontend
git init
git add .
git commit -m "feat: frontend React + Vite"
git remote add origin https://github.com/faritreascodev/todo-frontend.git
git push -u origin main

