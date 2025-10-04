<h1 align="center">🧬 reactv.general.js</h1>

<p align="center">
  <strong>Componentes reactivos, funcionales y auditables para <a href="https://github.com/arturo21/generaljs">general.JS</a></strong><br>
  <em>Arquitectura moderna, reactividad profunda y comunicación entre componentes sin dependencias externas</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-blue.svg" alt="Versión estable">
  <img src="https://img.shields.io/badge/status-activo-brightgreen.svg" alt="Estado del proyecto">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Licencia MIT">
</p>

---

## 🚀 ¿Qué es reactv.general.js?

**reactv.general.js** es un plugin avanzado para [general.JS](https://github.com/arturo21/generaljs) que permite crear interfaces reactivas con componentes funcionales o de clase, gestionando estado, efectos, estilos y eventos de forma modular y extensible.

Diseñado para desarrolladores que buscan control total sobre el DOM, el estado y la trazabilidad de sus componentes, sin depender de frameworks pesados.

---

## ✨ Características destacadas

| 🔧 Funcionalidad         | ✅ Descripción |
|--------------------------|----------------|
| 🔁 Reactividad profunda  | Proxy recursivo para detectar cambios en objetos anidados |
| ⚛️ Hooks funcionales     | `useState`, `useEffect`, `useMemo` para lógica declarativa |
| 🎯 Render condicional    | Evita renders innecesarios comparando estado y props |
| 📡 Event Bus             | Comunicación entre componentes con `emit` y `on` |
| 🎨 Scoped styles         | Estilos encapsulados por componente |
| 🧩 Fragmentos DOM        | Renderiza múltiples nodos sin contenedores artificiales |
| 🧠 Context API           | Comparte datos entre componentes sin prop drilling |
| 🧪 Lifecycle hooks       | `onMount`, `onUpdate`, `onDestroy` para componentes de clase |
| 💾 Persistencia          | Guarda y recupera estado desde `localStorage` |
| 🧱 Componentes funcionales | Define UI reactiva sin clases |
| 🛠️ Devtools integrados   | Inspecciona estado, eventos y componentes activos |
| 🧬 Plugin system         | Extiende la librería con plugins personalizados |
| ⏳ Suspense con fallback | Carga diferida de componentes con render provisional |
| 🧪 Snapshot de estado    | Captura el estado actual para pruebas o restauración |
| 🧪 Modo de prueba        | Simula eventos y renders sin afectar el DOM real |

---
## 📦 Changelog

### v2.0.0 — Reimplementación con JSX y mejoras estructurales

- 🔁 Reescrito completamente usando JSX con el pragma personalizado `reactv.jsx`
- 🧠 Integración con Babel y Webpack para compilar JSX en tiempo de desarrollo
- 🧩 Migración de `createElement` a `reactv.jsx(...)` para una sintaxis más declarativa
- 🎨 Estilos encapsulados aplicados con `applyScopedStyle` directamente al contenedor
- 💾 Persistencia automática del estado `count` en `localStorage` usando `reactv.saveState`
- 📡 Emisión de eventos `contador:cambio` cada vez que el contador se actualiza
- 📢 Impresión dinámica de mensajes en pantalla (`#mensaje`) para confirmar cambios
- 🧪 Protección contra errores comunes (`props === null`, nodos inválidos, contenedores ausentes)
- 🔐 Validación de existencia del contenedor antes de renderizar
- 🧱 Compatible con renderizado modular y extensible para futuras mejoras

---

### v1.1.0 — Versión clásica con `createElement` y eventos

- ✅ Componente funcional con `reactv.defineFunctional`
- 💾 Persistencia básica con `loadState` y `saveState`
- 📡 Emisión de eventos `contador:cambio`
- 🧩 Estilos encapsulados con `applyScopedStyle`
- 🧪 Corrección de `setState` en el logger para evitar mutaciones directas

---

### v1.0.0 — Versión inicial

- 🧮 Contador funcional con incremento, decremento y reset
- 💾 Guardado en `localStorage` bajo la clave `contador_persistente`
- 📡 Emisión de eventos para sincronización entre componentes
- 📜 Logger de eventos que escucha `contador:cambio` y muestra historial

---
## 📦 Instalación

```bash
http://cdn.underdevelopment.work/generaljs/reactive.general.min.js
