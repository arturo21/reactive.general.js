reactv=(function(){
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
	};
	class Subject {
	  constructor(state) {
	    this._state = state;
	    this._observers = [];
	  }
	  getState() {
	    return this._state;
	  }
	  setState(newState) {
	    if (this._state !== newState) {
	      this._state = newState;
	      this.notifyObservers(this._state);
	    }
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
	};
	// Función para crear elementos en el DOM a partir del JSX
	function createElement(tag, props, ...children) {
	  const element = document.createElement(tag);
	  for (let prop in props) {
	    if (prop.startsWith('on') && typeof props[prop] === 'function') {
	      const eventName = prop.substring(2).toLowerCase();
	      element.addEventListener(eventName, props[prop]);
	    }
	    else{
	      element[prop] = props[prop];
	    }
	  }

	  children.forEach(child => {
	    if (typeof child === 'string') {
	      element.appendChild(document.createTextNode(child));

	    }
	    else{
	      element.appendChild(child);
	    }
	  });
	  return element;
	};

	// Función interna para renderizar JSX en el DOM
	function render_int(elemento, containero){
	  containero.appendChild(elemento);
	};

	return{
		render:function(element, container){
			render_int(element, container);
		},
		newcomp:function(name,callback){

		},
	}
}());