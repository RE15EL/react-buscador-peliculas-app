import './App.css'

function App() {

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form >
          <input type="text" placeholder="Avenger, Star Wars ..."/>
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <h3>Resultados</h3>
      </main>
    </div>
  )
}

export default App
