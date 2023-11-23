import { useEffect, useState  } from "react"
import { getMovies } from "../services/movies";

export function useMovies(){
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);

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