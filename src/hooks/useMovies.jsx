import { useEffect, useState  } from "react"
import { getMovies } from "../services/movies";

export function useMovies(){
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);
    // const movies = moviesList.Search;
    // const mappedMovies = movies?.map( movie => ({
    //   id: movie.imdbID,
    //   title: movie.Title,
    //   year: movie.Year,
    //   poster: movie.Poster,
    // }));

    useEffect(()=>{
      const loadMovies = async () =>{
        if(term.length < 1) return

        try {
          const moviesData = await getMovies(term);
          setMovies(moviesData.Search);
        } catch (error) {
          console.error(error);
        }        
      }
      loadMovies();
    },[term])
  
    return { movies, term, setTerm };
  }