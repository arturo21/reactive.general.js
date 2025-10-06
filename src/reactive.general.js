window.reactv = (() => {
  const eventBus = { listeners: {} };
  const contextStore = {};
  const pluginRegistry = {};
  let testMode = false;

  // 🔁 Event Bus
  const emit = (event, data) => (eventBus.listeners[event] || []).forEach(fn => fn(data));
  const on = (event, fn) => {
    eventBus.listeners[event] = eventBus.listeners[event] || [];
    eventBus.listeners[event].push(fn);
  };

  // 🧠 Context API
  const createContext = (key, value) => (contextStore[key] = value);
  const useContext = key => contextStore[key];

  // 🧬 Plugin system
  const usePlugin = (name, fn) => (pluginRegistry[name] = fn);

  // ⚛️ Hooks
  function useState(initial) {
    let value = initial;
    const subscribers = [];
    const setValue = newVal => {
      value = newVal;
      subscribers.forEach(fn => fn(value));
    };
    const subscribe = fn => subscribers.push(fn);
    return [() => value, setValue, subscribe];
  }

  function useEffect(callback, deps = []) {
    let prevDeps = [];
    return () => {
      const changed = deps.some((d, i) => d !== prevDeps[i]);
      if (changed) {
        callback();
        prevDeps = [...deps];
      }
    };
  }

  function useMemo(fn, deps = []) {
    let prevDeps = [];
    let cached;
    return () => {
      const changed = deps.some((d, i) => d !== prevDeps[i]);
      if (changed) {
        cached = fn();
        prevDeps = [...deps];
      }
      return cached;
    };
  }

  // JSX support
	function jsx(tag, props, ...children) {
	  return reactv.createElement(tag, props ?? {}, ...children);
	}

  // 🧩 Element creation
	function createElement(tag, props = {}, ...children) {
	  const el = document.createElement(tag);

	  // Protege contra props nulos
	  const safeProps = props || {};

	  for (const [key, value] of Object.entries(safeProps)) {
	    if (key.startsWith('on') && typeof value === 'function') {
	      el.addEventListener(key.slice(2).toLowerCase(), value);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }

	  for (const child of children.flat()) {
	    el.appendChild(
	      typeof child === 'string' || typeof child === 'number'
	        ? document.createTextNode(String(child))
	        : child
	    );
	  }

	  return el;
	}
  function createFragment(...children) {
    const frag = document.createDocumentFragment();
    children.forEach(child => frag.appendChild(child));
    return frag;
  }

  // 🎨 Scoped styles
  function applyScopedStyle(css, container) {
    const style = document.createElement("style");
    style.textContent = css;
    container.appendChild(style);
  }

  // 🧱 Functional component
  function defineFunctional(renderFn, container) {
    const [getState, setState, subscribe] = useState({});
    subscribe(() => {
      const el = renderFn(getState(), setState);
      container.innerHTML = "";
      container.appendChild(el);
    });
    setState(getState());
  }

  // 💾 Persistence
  const saveState = (key = "reactv_state") => {
    localStorage.setItem(key, JSON.stringify(store.getState()));
  };
  const loadState = (key = "reactv_state") => {
    const data = localStorage.getItem(key);
    if (data) store.setState(JSON.parse(data));
  };
  const snapshotState = () => JSON.parse(JSON.stringify(store.getState()));

  // 🧪 Suspense
  function suspense(loaderFn, { fallback }) {
    fallback && render_int(fallback, document.body);
    loaderFn().then(component => {
      render_int(component, document.body);
    });
  }

  // 🛠️ Devtools
  function debug() {
    console.table({
      state: store.getState(),
      events: Object.keys(eventBus.listeners),
      components: document.querySelectorAll("[data-reactv]")
    });
  }

  // 🔁 Reactive store
  function createReactiveState(initialState, onChange) {
    const handler = {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "object" && value !== null
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

  class Observer {
    constructor(subject) {
      subject.registerObserver(this);
      this.subscribers = [];
    }
    subscribe(fn) {
      this.subscribers.push(fn);
    }
    notify(data) {
      this.subscribers.forEach(fn => fn(data));
    }
  }

  class Subject {
    constructor(state) {
      this._observers = [];
      this._state = createReactiveState(state, newState => {
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
// 🧠 Virtual DOM

function h(tag, props = {}, ...children) {
  return { tag, props, children: children.flat() };
}

function changed(a, b) {
  return typeof a !== typeof b ||
         (typeof a === 'string' || typeof a === 'number') && a !== b ||
         a.tag !== b.tag;
}

function diff(oldVNode, newVNode) {
  if (!oldVNode) return { type: 'CREATE', newVNode };
  if (!newVNode) return { type: 'REMOVE' };
  if (changed(oldVNode, newVNode)) return { type: 'REPLACE', newVNode };

  return {
    type: 'UPDATE',
    props: diffProps(oldVNode.props, newVNode.props),
    children: diffChildren(oldVNode.children, newVNode.children)
  };
}

function diffProps(oldProps = {}, newProps = {}) {
  const patches = {};
  const allKeys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);
  allKeys.forEach(key => {
    if (oldProps[key] !== newProps[key]) patches[key] = newProps[key];
  });
  return patches;
}

function diffChildren(oldChildren = [], newChildren = []) {
  const patches = [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);
  for (let i = 0; i < maxLen; i++) {
    patches[i] = diff(oldChildren[i], newChildren[i]);
  }
  return patches;
}

function renderVNode(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  const el = document.createElement(vnode.tag);
  for (const [key, value] of Object.entries(vnode.props || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  vnode.children.forEach(child => el.appendChild(renderVNode(child)));
  return el;
}

function patch(container, diff, index = 0) {
  const el = container.childNodes[index];

  switch (diff.type) {
    case 'CREATE':
      container.appendChild(renderVNode(diff.newVNode));
      break;
    case 'REMOVE':
      if (el) container.removeChild(el);
      break;
    case 'REPLACE':
      container.replaceChild(renderVNode(diff.newVNode), el);
      break;
    case 'UPDATE':
      for (const [key, value] of Object.entries(diff.props)) {
        if (key.startsWith('on') && typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.setAttribute(key, value);
        }
      }
      diff.children.forEach((childDiff, i) => patch(el, childDiff, i));
      break;
  }
}

  class Componente {
    constructor(props = {}, container = null) {
      this.props = props;
      this._estado = {};
      this.container = container;
      this._vnode = null;
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
      return createElement("div", {}, `Estado: ${JSON.stringify(estado)}`);
    }

    render() {
      if (!this.container) return;
      const newVNode = this.template(this._estado, this.props);
      const delta = diff(this._vnode, newVNode);
      patch(this.container, delta);
      this._vnode = newVNode;
    }

    onMount() {}
    onUpdate(prevState) {}
    onDestroy() {}
  }

  function render_int(element, container) {
    container.innerHTML = "";
    container.appendChild(element);
  }

  const store = new Subject({});

  return {
    jsx,
    Componente,
    createElement,
    createFragment,
    applyScopedStyle,
    useState,
    useEffect,
    useMemo,
    defineFunctional,
    createContext,
    useContext,
    usePlugin,
    debug,
    saveState,
    loadState,
    snapshotState,
    suspense,
    emit,
    on,
    h,
    diff,
    patch,
    renderVNode,
    getState: () => store.getState(),
    setState: valor => {
      store.setState(valor);
      if (!testMode) genrl.log("Estado actualizado:", valor);
    },
    bindComponent: instance => {
      const observer = new Observer(store);
      observer.subscribe(data => instance.setState(data));
    },
    render: render_int,
    testMode: {
      enable: () => (testMode = true),
      disable: () => (testMode = false)
    }
  };
})();
externals: {
  reactv: 'reactv'
}