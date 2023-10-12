

function ListOfMovies( {movies} ){    
    return (
        <ul className='movie-container'>
            {
                movies.map(movie => (
                    <li key={movie.id} className='movie'>
                    <div className='movie-info'>
                        <h4>{movie.title}</h4>
                        <p>{movie.year}</p>
                    </div>
                    <img src={movie.poster} alt={movie.Title} />
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