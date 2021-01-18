//test API number

const key = "bd86dc6e077c12c2d1a269cf575675bc";

export function getAPI() {
        const url = 'https://api.themoviedb.org/3/movie/550?api_key='+key;

    return fetch(url)
            .then((reponse)=>reponse.json())
            .catch((error)=>console.log(error))
} 
