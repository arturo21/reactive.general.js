// Clave de almacenamiento
const STORAGE_KEY = 'contador_persistente';

// Cargar estado previo si existe
reactv.loadState(STORAGE_KEY);

// Componente funcional: Contador con persistencia
reactv.defineFunctional((state, setState) => {
  const count = state.count || 0;

  // Efecto: guardar en localStorage cada vez que cambia el contador
  const persistEffect = reactv.useEffect(() => {
    reactv.setState({ count }); // actualiza estado global
    reactv.saveState(STORAGE_KEY); // guarda en localStorage
    reactv.emit('contador:cambio', count); // emite evento
  }, [count]);
  persistEffect();

  // Estilos encapsulados
  const container = document.getElementById('contador');
  reactv.applyScopedStyle(`
    #contador button { margin: 5px; padding: 10px; font-size: 16px; }
    #contador span { font-weight: bold; font-size: 18px; }
  `, container);

  return reactv.createElement('div', {},
    reactv.createElement('span', {}, `Contador: ${count}`),
    reactv.createElement('button', {
      onClick: () => setState({ count: count + 1 })
    }, '+'),
    reactv.createElement('button', {
      onClick: () => setState({ count: count - 1 })
    }, '−'),
    reactv.createElement('button', {
      onClick: () => {
        setState({ count: 0 });
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 'Reset')
  );
}, document.getElementById('contador'));

// Componente funcional: Logger de eventos
reactv.defineFunctional((state, setState) => {
  const logs = state.logs || [];

  // Escucha eventos emitidos por el contador
  reactv.on('contador:cambio', (valor) => {
    const nuevoLog = `Contador actualizado a ${valor}`;
    const nuevosLogs = [...logs, nuevoLog];
    setState({ logs: nuevosLogs }); // ✅ Corrección: usamos setState directamente
  });

  return reactv.createElement('div', {},
    reactv.createElement('h4', {}, 'Historial de cambios:'),
    ...logs.map(log => reactv.createElement('div', {}, log))
  );
}, document.getElementById('logger'));
