import './App.css'
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  
  const { movies, setTerm, sort, setSort } = useMovies();

  const search = (event)=> {
    event.preventDefault();
    const { search_input } = Object.fromEntries(new FormData(event.target));
    setTerm(search_input);
  }

  const handleOnChange = (e)=> {
    setTerm(e.target.value);
  }

  const handleOnCheck = ()=> {
    setSort(!sort);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={search}>
          <input 
            name='search_input' 
            type="search" 
            onChange={handleOnChange}
            placeholder="Avenger, Star Wars ..."/>
          <button type="submit">Buscar</button>
        </form>

        <div className="form-check">
          <label className="" >
            <input onChange={handleOnCheck} className="form-check-input" type="checkbox" value={sort} />
            Ordenar por título
          </label>
        </div>          
               
      </header>

      <main className='results'>        
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
