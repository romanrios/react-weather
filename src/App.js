import Header from './Header';
import Resultados from './Resultados';
import './App.css';
import CONFIG from './config/config.js';
import { useState } from "react";
import { mock1 } from "./constants/mock.js";

function App() {
  const [lat, setLat] = useState(CONFIG.default_lat);
  const [lon, setLon] = useState(CONFIG.default_lon);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const callServer = async () => {
    if (CONFIG.use_server) {
      try {
        if (lat && lon) {
          const response = await fetch(`${CONFIG.server_url}?lat=${lat}&lon=${lon}&appid=${CONFIG.api_key}`);
          const data = await response.json();

          if (response.status !== 200) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
          }
          setResult(data);
          setError(null);
        }
      } catch (error) {
        console.log(error);
        setError({ description: error.message })
        setResult(null);
      }
    } else {
      setResult(mock1)
      setError(null);
    }
  }

  const validarLongitud = (valor, setValor) => {
    // if (valor >= -90 && valor <= 90) {
      setValor(valor);
    // } else {
    //   if (valor < -90) {
    //     setValor(-90);
    //   } else if (valor > 90) {
    //     setValor(90);
    //   }
    // }
  };


  return (
    <div className="App">

      <Header />

      <main>
        <h2 id="titulo">El tiempo</h2>
        <form className="formulario">
          <label>Latitud</label>
          <input type='number' id="latitud" value={lat} onChange={e => validarLongitud(e.target.value, setLat)} placeholder="Ingrese latitud"></input>

          <label>Longitud</label>
          <input type='number' id="longitud" value={lon} onChange={e => validarLongitud(e.target.value, setLon)} placeholder="Ingrese longitud"></input>

          <button type="button" id="buscar" onClick={() => callServer()}>Buscar</button>
        </form>

        {error && <div id="error">Ha habido un error: {error.description}</div>}
        {result && <Resultados items={result} numitems={CONFIG.num_items} />}
      </main>

    </div>
  );
}

export default App;
