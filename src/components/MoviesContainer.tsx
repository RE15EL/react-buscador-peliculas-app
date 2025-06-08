import { useMovies } from "../hooks/useMovies";
import { Movies } from "./Movies";

export const MoviesContainer = () => {
  const { movies, setTerm, sort, setSort } = useMovies();

  const search = (event) => {
    event.preventDefault();
    const { search_input } = Object.fromEntries(new FormData(event.target));
    setTerm(typeof search_input === "string" ? search_input : "");
  };

  const handleOnChange = (e) => {
    setTerm(e.target.value);
  };

  const handleOnCheck = () => {
    setSort(!sort);
  };

  return (
    <div>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={search}>
          <input
            name="search_input"
            type="search"
            onChange={handleOnChange}
            placeholder="Avenger, Star Wars ..."
          />
          <button type="submit">Buscar</button>
        </form>

        <div className="form-check">
          <label className="">
            <input
              onChange={handleOnCheck}
              className="form-check-input"
              type="checkbox"
              value={sort ? "true" : "false"}
            />
            Ordenar por título
          </label>
        </div>
      </header>

      <main className="results">
        <Movies movies={movies} />
      </main>
    </div>
  );
};
