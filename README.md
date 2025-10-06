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

| 🔧 Funcionalidad             | ✅ Descripción |
|------------------------------|----------------|
| 🔁 Reactividad profunda      | Proxy recursivo para detectar cambios en objetos anidados |
| ⚛️ Hooks funcionales         | `useState`, `useEffect`, `useMemo` para lógica declarativa |
| 🎯 Render condicional        | Evita renders innecesarios comparando estado y props |
| ⚡️ Virtual DOM integrado     | Renderiza con `h`, `diff`, `patch` y `renderVNode` para eficiencia y trazabilidad |
| 📡 Event Bus                 | Comunicación entre componentes con `emit` y `on` |
| 🎨 Scoped styles             | Estilos encapsulados por componente |
| 🧩 Fragmentos DOM            | Renderiza múltiples nodos sin contenedores artificiales |
| 🧠 Context API               | Comparte datos entre componentes sin prop drilling |
| 🧪 Lifecycle hooks           | `onMount`, `onUpdate`, `onDestroy` para componentes de clase |
| 💾 Persistencia              | Guarda y recupera estado desde `localStorage` |
| 🧱 Componentes funcionales   | Define UI reactiva sin clases |
| 🛠️ Devtools integrados       | Inspecciona estado, eventos y componentes activos |
| 🧬 Plugin system             | Extiende la librería con plugins personalizados |
| ⏳ Suspense con fallback     | Carga diferida de componentes con render provisional |
| 🧪 Snapshot de estado        | Captura el estado actual para pruebas o restauración |
| 🧪 Modo de prueba            | Simula eventos y renders sin afectar el DOM real |

## ⚡️ Comparativa: Render tradicional vs Virtual DOM

| 🧩 Aspecto                  | 🧱 Render tradicional (`createElement`) | ⚡️ Virtual DOM (`h`, `diff`, `patch`) |
|----------------------------|----------------------------------------|---------------------------------------|
| 🔁 Actualización           | Reemplaza todo el DOM                  | Solo aplica cambios necesarios        |
| 🧠 Trazabilidad            | No conserva estructura virtual         | Compara VNodes y genera diffs         |
| 🎯 Eficiencia              | Re-render completo                     | Patch granular por nodo               |
| 📦 Composición             | Manual con `appendChild`               | Declarativa con `h()`                 |
| 🔍 Comparación de estado   | Manual o por `JSON.stringify`          | Automática por `diff()`               |
| 🧬 Extensibilidad          | Limitada a DOM directo                 | Compatible con slots, plugins, etc.   |
| 🛠️ Integración con JSX     | Parcial (`jsx`)                        | Total (`jsx` → `h()` → VNode)         |


---
# 📦 Changelog — reactive.general.js

Todas las modificaciones importantes documentadas por versión.

---

## [1.1.0] — 2025-10-06

### ✨ Features

- Integración completa del sistema Virtual DOM:
  - `h()` para crear VNodes
  - `diff()` para comparar VNodes
  - `patch()` para aplicar actualizaciones al DOM real
  - `renderVNode()` para convertir VNode en elementos reales
- Modificación de `Componente.render()` para usar Virtual DOM
- Exposición pública de `h`, `diff`, `patch`, `renderVNode` como parte del API
- Compatibilidad con JSX vía `reactv.jsx`

### 🧠 Mejoras internas

- Renderizado eficiente sin reemplazo completo del DOM
- Trazabilidad de cambios entre estados virtuales
- Preparación para slots, transitions y plugins visuales

---

## [1.0.0] — 2025-10-01

### ✨ Features

- Clase `reactv` autoejecutable con API modular
- Sistema de eventos (`emit`, `on`)
- Context API (`createContext`, `useContext`)
- Plugin registry (`usePlugin`)
- Hooks: `useState`, `useEffect`, `useMemo`
- JSX support: `jsx()`, `createElement()`, `createFragment()`
- Scoped styles: `applyScopedStyle()`
- Componentes funcionales: `defineFunctional()`
- Clase `Componente` con `setState`, `template`, `render`, `onMount`, `onUpdate`
- Reactive store con `Subject`, `Observer`, `createReactiveState`
- Persistencia: `saveState`, `loadState`, `snapshotState`
- Suspense: `suspense(loaderFn, { fallback })`
- Devtools: `debug()`
- Test mode toggle: `testMode.enable()`, `testMode.disable()`

---
## 📦 Instalación

```bash
http://cdn.underdevelopment.work/generaljs/reactive.general.min.js
```

## Implementación Render Tradicional
```js
class Contador extends reactv.Componente {
  template(state) {
    return reactv.createElement("button", {
      onclick: () => this.setState({ count: state.count + 1 })
    }, `Contador: ${state.count}`);
  }

  onMount() {
    this.setState({ count: 0 });
  }
}
```
## Implementación de Uso VirtualDOM
```js
class Contador extends reactv.Componente {
  template(state) {
    return reactv.h("button", {
      onclick: () => this.setState({ count: state.count + 1 })
    }, `Contador: ${state.count}`);
  }

  onMount() {
    this.setState({ count: 0 });
  }
}
```

## Ejemplo completo: Componente reactivo con `reactv`

Este ejemplo muestra cómo crear un contador interactivo usando:

- `Componente` de clase
- Estado reactivo con `setState`
- Renderizado con Virtual DOM (`h`)
- JSX opcional para mayor legibilidad

---

### 🔧 Versión con Virtual DOM

```js
class Contador extends reactv.Componente {
  template(state) {
    return reactv.h("button", {
      onclick: () => this.setState({ count: state.count + 1 })
    }, `Contador: ${state.count}`);
  }

  onMount() {
    this.setState({ count: 0 });
  }
}

// Montaje en el DOM
const container = document.getElementById("app");
const instancia = new Contador({}, container);
```

### 🔧 Versión con JSX
```js
/** @jsx reactv.jsx */
class Contador extends reactv.Componente {
  template(state) {
    return (
      <button onClick={() => this.setState({ count: state.count + 1 })}>
        Contador: {state.count}
      </button>
    );
  }

  onMount() {
    this.setState({ count: 0 });
  }
}

const container = document.getElementById("app");
new Contador({}, container);
```

## 🧠 ¿Qué incluye este ejemplo?

| 🧩 Elemento         | ✅ Descripción |
|---------------------|----------------|
| `Componente`        | Clase base con ciclo de vida (`onMount`, `render`, `onUpdate`) |
| `setState()`        | Actualiza el estado interno y dispara render si hay cambios |
| `template()`        | Devuelve un VNode usando `h()` o JSX para representar la UI |
| `render()`          | Aplica `diff()` y `patch()` para actualizar el DOM de forma eficiente |
| `container`         | Nodo del DOM donde se monta el componente |
| `Virtual DOM`       | Sistema que compara y actualiza solo los nodos necesarios |
| `JSX opcional`      | Permite escribir la UI de forma declarativa y legible |
