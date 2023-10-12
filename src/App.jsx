import './App.css'
import { useRef } from 'react'
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const {movies} = useMovies();
  const inputRef = useRef();

  const search = (event)=> {
    event.preventDefault();
    const value = inputRef.current.value;
    console.log(value);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={search}>
          <input ref={inputRef} type="text" placeholder="Avenger, Star Wars ..."/>
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
