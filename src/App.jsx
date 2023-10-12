import './App.css'
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const {movies} = useMovies();

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
              <Movies movies={movies}/>              
        </section>
      </main>
    </div>
  )
}

export default App
