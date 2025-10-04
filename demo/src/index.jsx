const reactv = window.reactv;
const STORAGE_KEY = 'contador_persistente';

// Cargar estado previo
reactv.loadState(STORAGE_KEY);

// Componente funcional con JSX
reactv.defineFunctional((state, setState) => {
  const count = state.count ?? 0;

  // Efecto: sincroniza estado global, guarda y emite evento
  reactv.useEffect(() => {
    reactv.setState({ count });
    reactv.saveState(STORAGE_KEY);
    reactv.emit('contador:cambio', count);

    // Imprimir mensaje en pantalla
    const mensaje = document.getElementById('mensaje');
    if (mensaje) {
      mensaje.textContent = `✅ Contador actualizado a ${count}`;
    }
  }, [count])();

  // Estilos encapsulados
  reactv.applyScopedStyle(`
    #contador button {
      margin: 5px;
      padding: 10px;
      font-size: 16px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    #contador span {
      font-weight: bold;
      font-size: 18px;
      display: block;
      margin-bottom: 10px;
    }
    #mensaje {
      margin-top: 10px;
      font-style: italic;
      color: #444;
    }
  `, document.getElementById('contador'));

  // Render JSX
  return (
    <div id="contador" data-reactv>
      <span>Contador: {count}</span>
      <button onClick={() => setState({ count: count + 1 })}>➕</button>
      <button onClick={() => setState({ count: count - 1 })}>➖</button>
      <button onClick={() => {
        setState({ count: 0 });
        localStorage.removeItem(STORAGE_KEY);
      }}>🔄 Reset</button>
      <div id="mensaje"></div>
    </div>
  );
}, document.getElementById('contador'));
