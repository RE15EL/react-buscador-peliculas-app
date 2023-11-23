export const API_KEY = '8248c73f';
export const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`

export const getMovies = async (term) => {
    try {
        const res = await fetch(`${BASE_URL}${term}`);
        const data = res.json();
        return data;
    } catch (error) {
        console.error(error);
    } 
}