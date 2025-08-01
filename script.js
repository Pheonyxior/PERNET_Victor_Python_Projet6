let home = "http://localhost:8000/api/v1/"

// * ?year=
// * &min_year=
// * &max_year=
// * &imdb_score=
// * &imdb_score_min=
// * &imdb_score_max=
// * &title=
// * &title_contains=
// * &genre=
// * &genre_contains=
// * &sort_by=-imdb_score
// * &director=
// * &director_contains=
// * &writer=
// * &writer_contains=
// * &actor=
// * &actor_contains=
// * &country=
// * &country_contains=
// * &lang=
// * &lang_contains=
// * &company=
// * &company_contains=
// * &rating=
// * &rating_contains=
// * 



async function get_best_movie()
{
    url = home + "titles/?sort_by=-imdb_score"
    return fetch_request(url)
}

async function get_movies_by_genre(genre)
{
    url = home + "titles/?genre=" + genre
    return fetch_request(url)
}

async function get_genres()
{
    url = home + "genres/"
    return fetch_request(url)
}

async function fetch_request(url)
{
    let response = await fetch(url);
    if (response.ok){
        let data = await response.json();
        console.log("data")
        console.log(data)
        console.log("data.results")
        console.log(data.results)

        // let baliseImage = document.getElementById("premiereImage");
        // baliseImage.setAttribute("alt", "Ceci est une image de test modifiée");
        // baliseImage.src = data.results[0]["image_url"];
        // baliseImage.classList.add("nouvelleClasse")
        // baliseImage.classList.remove("photo")

        return data;
    }
    else {
        alert("HTTP-Error: " + response.status);
        return ;
    }
}

async function truc()
{
    let baliseImage = document.getElementById("premiereImage");
    let best_movie_data = await get_best_movie();
    if (best_movie_data != null){
        // console.log(best_movie_data)
        // console.log(best_movie_data["results"])
        baliseImage.setAttribute("alt", "Ceci est une image de test modifiée");
        console.log("Best movie data")
        console.log(best_movie_data)
        baliseImage.src = best_movie_data.results[0]["image_url"];
        baliseImage.classList.add("nouvelleClasse")
        baliseImage.classList.remove("photo")
    }
}

// Afficher meilleur film()
// 
truc()




// let animation_movies = get_movies_by_genre("Animation")
// if (animation_movies != null){
//     console.log(animation_movies)
// }

// let horror_movies = get_movies_by_genre("Horror")
// if (horror_movies != null){
//     console.log(horror_movies)
// }

// let genres = get_genres()
// if (genres != null){
//     console.log(genres)
// }

let divJeu = document.getElementById("divJeu")
divJeu.innerHTML = "<h1>toto</h1>"
console.log(divJeu)

// let h2 = document.querySelector("#divJeu h2")
// console.log(h2)

// let listh2 = document.querySelectorAll("h2")
// console.log(listh2)

// for (let i = 0; i < listh2.length; i++) {
//     console.log(listh2[i])
// }