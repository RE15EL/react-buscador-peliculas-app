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

  const handleOnChange = ()=> {
    
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={search}>
          <input 
            name='search_input' 
            type="search" 
            onClick={handleOnChange}
            placeholder="Avenger, Star Wars ..."/>
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main className='results'>        
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
