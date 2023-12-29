export default function Resultados(props) {
    if (Array.isArray(props.items.daily)) {
        const itemsSlice = props.items.daily.slice(0, props.numitems);
        return (
            <div id="resultados">
                <h2>Resultados</h2>
                <h3>Huso horario: {props.items.timezone}</h3>
                <h4>El tiempo en los próximos días será:</h4>
                <ul className="resultadosContainer">
                    {itemsSlice.map(item => {
                        return <li key={item.dt}>
                            <p><b>{new Date(item.dt * 1000).toLocaleDateString()}</b></p>
                            <img className="tiempoimg" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} />
                            <p>Temp Min: <b>{(item.temp.min - 273.15).toFixed(2)}°C</b></p>
                            <p>Temp Max: <b>{(item.temp.max - 273.15).toFixed(2)}°C</b></p>
                            <p>Humedad: <b>{item.humidity}%</b></p>
                            <p>Viento: <b>{item.wind_speed}m/s</b></p>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}