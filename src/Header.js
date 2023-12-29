export default function Header(props) {
    return (<div id="cabecera" className="App-header">
        <img className="logo" src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" />
        <h3 className="mensaje">Bienvenido a la página de Román Ríos</h3>
    </div>)
}