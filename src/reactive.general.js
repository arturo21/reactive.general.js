/*
  Copyright (C) 2024 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/

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
		register:function(tag, webcomp){
			window.customElements.define(tag, webcomp);
		},
		getState:function(){
			let estadoactual_=Subject.getState();
			return estadoactual_;
		},
		setState:function(valor){
			let estadoactual_=Subject.setState(valor);
			genrl.log("Valor del estado ya ha sido establecido!");
			return 0;
		},
		render:function(element, container){
			render_int(element, container);
		},
		addcomp:function(tag,templateJSX,callback){
			let template = genrl.getCreate('template');
			let fetchapi=genrl.ajaxapi;
			fetchapi
			.get(templateJSX)
			.then(function(data){
				template.innerHTML=data;
				if(typeof callback==="function"){
					callback(template, data);
				}
			})
			.catch(function(e){	
				console.log("ERROR:" + e);
			})
		}
	}
}());