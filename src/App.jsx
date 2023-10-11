import './App.css'
import movies from './mocks/results.json'

function App() {
  const moviesResult = movies.Search
  const hasMovies = moviesResult.length > 0;

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
        <section className='results'>
          {
            hasMovies 
              ? (
                <ul className='movie-container'>
                  {
                    moviesResult.map(movie => (
                      <li key={movie.imdbID} className='movie'>
                        <div className='movie-info'>
                          <h4>{movie.Title}</h4>
                          <p>{movie.Year}</p>
                        </div>
                        <img src={movie.Poster} alt={movie.Title} />
                      </li>
                    ))
                  }
                </ul>
              ) 
              : (
                <p>No se encontraron resultados</p>
              )
          }
        </section>
      </main>
    </div>
  )
}

export default App
