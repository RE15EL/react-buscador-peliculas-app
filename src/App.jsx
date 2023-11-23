import './App.css'
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const { movies, setTerm } = useMovies();

  const search = (event)=> {
    event.preventDefault();
    const { search_input } = Object.fromEntries(new FormData(event.target));
    setTerm(search_input);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={search}>
          <input name='search_input' type="text" placeholder="Avenger, Star Wars ..."/>
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
