

function ListOfMovies( {movies} ){    
    return (
        <ul className='movie-container'>
            {
                movies.map(movie => (
                    <li key={movie.imdbID} className='movie'>
                        <img src={movie.Poster} alt={movie.Title} />
                        <div className='movie-info'>
                            <h4>{movie.Title}</h4>
                            <p>{movie.Year}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults(){
    return (
        <p>No se encontraron resultados</p>
    )
}

export function Movies( { movies } ){
    const hasMovies = movies?.length > 0;
    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults/>
    )
}