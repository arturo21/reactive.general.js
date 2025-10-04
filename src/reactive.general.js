reactv = (function () {
  // 🔔 Event Bus
  const eventBus = {
    listeners: {},
    emit(event, data) {
      (this.listeners[event] || []).forEach(fn => fn(data));
    },
    on(event, callback) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(callback);
    }
  };

  // 🧠 Context API
  const contextStore = {};
  function createContext(key, value) {
    contextStore[key] = value;
  }
  function useContext(key) {
    return contextStore[key];
  }

  // 🧠 Proxy reactivo profundo
  function createReactiveState(initialState, onChange) {
    const handler = {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'object' && value !== null
          ? new Proxy(value, handler)
          : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        onChange(target);
        return true;
      }
    };
    return new Proxy(initialState, handler);
  }

  // 📡 Observer
  class Observer {
    constructor(subject) {
      subject.registerObserver(this);
      this.subscribers = [];
    }
    subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
    notify(data) {
      this.subscribers.forEach(subscriber => subscriber(data));
    }
  }

  // 🧠 Subject con Proxy
  class Subject {
    constructor(state) {
      this._observers = [];
      this._state = createReactiveState(state, (newState) => {
        this.notifyObservers(newState);
      });
    }
    getState() {
      return this._state;
    }
    setState(newState) {
      Object.assign(this._state, newState);
    }
    registerObserver(observer) {
      this._observers.push(observer);
    }
    unregisterObserver(observer) {
      this._observers = this._observers.filter(obs => obs !== observer);
    }
    notifyObservers(data) {
      this._observers.forEach(observer => observer.notify(data));
    }
  }

  // 🧩 Componente base
  class Componente {
    constructor(props = {}, container = null) {
      this.props = props;
      this._estado = {};
      this.container = container;
      this.onMount();
    }

    setState(nuevoEstado) {
      const prevState = JSON.stringify(this._estado);
      this._estado = { ...this._estado, ...nuevoEstado };
      if (this.shouldRender(prevState, this._estado)) {
        this.onUpdate(prevState);
        this.render();
      }
    }

    shouldRender(prevState, nextState) {
      return JSON.stringify(prevState) !== JSON.stringify(nextState);
    }

    template(estado, props) {
      return createElement('div', {}, `Estado: ${JSON.stringify(estado)}`);
    }

    render() {
      if (!this.container) return;
      const element = this.template(this._estado, this.props);
      render_int(element, this.container);
    }

    onMount() {}
    onUpdate(prevState) {}
    onDestroy() {}
  }

  // 🧪 Funciones funcionales estilo React
  function useState(initialValue) {
    let value = initialValue;
    const subscribers = [];
    const setValue = (newVal) => {
      value = newVal;
      subscribers.forEach(fn => fn(value));
    };
    const subscribe = (fn) => subscribers.push(fn);
    return [() => value, setValue, subscribe];
  }

  function useEffect(callback, deps = []) {
    let prevDeps = [];
    return function runEffect() {
      const changed = deps.some((dep, i) => dep !== prevDeps[i]);
      if (changed) {
        callback();
        prevDeps = [...deps];
      }
    };
  }

  // 🏗️ createElement mejorado
  function createElement(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    for (let prop in props) {
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        element.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
      } else if (prop === 'className') {
        element.className = props[prop];
      } else {
        element.setAttribute(prop, props[prop]);
      }
    }
    children.forEach(child => {
      element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return element;
  }

  // 🧩 Fragmentos
  function createFragment(...children) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => fragment.appendChild(child));
    return fragment;
  }

  // 🎨 Scoped styles
  function applyScopedStyle(cssText, container) {
    const style = document.createElement('style');
    style.textContent = cssText;
    container.appendChild(style);
  }

  // 🔧 Render interno
  function render_int(elemento, containero) {
    containero.innerHTML = '';
    containero.appendChild(elemento);
  }

  // 🗂️ Estado global compartido
  const store = new Subject({});

  // 🧪 Devtools
  function debug() {
    console.table({
      state: store.getState(),
      events: Object.keys(eventBus.listeners),
      components: document.querySelectorAll('[data-reactv]')
    });
  }

  // 💾 Persistencia
  function saveState(key = 'reactv_state') {
    localStorage.setItem(key, JSON.stringify(store.getState()));
  }

  function loadState(key = 'reactv_state') {
    const data = localStorage.getItem(key);
    if (data) store.setState(JSON.parse(data));
  }

  // 🧱 Componentes funcionales
  function defineFunctional(renderFn, container) {
    const [getState, setState, subscribe] = useState({});
    subscribe(() => {
      const el = renderFn(getState(), setState);
      render_int(el, container);
    });
    setState(getState());
  }

  return {
    Componente,
    createElement,
    createFragment,
    applyScopedStyle,
    useState,
    useEffect,
    defineFunctional,
    createContext,
    useContext,
    debug,
    saveState,
    loadState,

    register(tag, webcomp) {
      window.customElements.define(tag, webcomp);
    },

    getState() {
      return store.getState();
    },
    setState(valor) {
      store.setState(valor);
      genrl.log("Estado actualizado:", valor);
    },

    bindComponent(componentInstance) {
      const observer = new Observer(store);
      observer.subscribe(data => componentInstance.setState(data));
    },

    render(element, container) {
      render_int(element, container);
    },

    addcomp(tag, templateJSX, callback) {
      if (!tag || !templateJSX) {
        genrl.log("addcomp requiere tag y templateJSX");
        return;
      }
      const template = genrl.getCreate('template');
      genrl.ajaxapi.get(templateJSX)
        .then(data => {
          template.innerHTML = data;
          if (typeof callback === "function") callback(template, data);
        })
        .catch(e => genrl.log("Error al cargar template:", e));
    },

    emit: eventBus.emit.bind(eventBus),
    on: eventBus.on.bind(eventBus)
  };
})();