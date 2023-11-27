import { useEffect, useRef, useState  } from "react"
import { getMovies } from "../services/movies";
import { useDebounce } from "use-debounce";

export function useMovies(){
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [debounceTerm] = useDebounce(term, 400);
  const prevTerm = useRef(term);
  
    useEffect(()=>{
      const loadMovies = async () =>{
        if(prevTerm.current === debounceTerm) return;
        if(term.length < 1) return

        try {
          const moviesData = await getMovies(debounceTerm);
          setMovies(moviesData.Search);
        } catch (error) {
          console.error(error);
        }        
      }
      loadMovies();
    },[debounceTerm])
  
    return { movies, term, setTerm };
  }