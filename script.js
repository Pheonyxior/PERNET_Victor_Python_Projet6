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


async function get_movie_details(movie_id)
{
    url = home + "titles/" + String(movie_id)
    // console.log("details")
    // console.log(url)
    return fetch_request(url)
}

async function get_best_movie()
{
    url = home + "titles/?sort_by=-imdb_score"
    let response = await fetch_request(url)
    console.log("best movie")
    console.log(response)
    content = response.results[0]
    response = await fetch_request(content["url"])
    return response
}

async function get_best_movies() 
{
    url = home + "titles/?sort_by=-imdb_score"
    let first_page = await fetch_request(url)
    console.log(first_page)
    // console.log(first_page.next)
    let second_page = await fetch_request(first_page.next)
    console.log(second_page)
    let movies = first_page.results
    for (let i = 0; i < 2; i++) {
        movies.push(second_page.results[i])
    }
    console.log("best movie lists")
    console.log(movies)
    return movies
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
        // console.log("data")
        // console.log(data)
        // console.log("data.results")
        // console.log(data.results)

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

async function set_best_movie_thumbnail(best_movie)
{
    let baliseImage = document.getElementById("bestMoviePic");
    baliseImage.src = best_movie["image_url"];
    let baliseTitle = document.getElementById("bestMovieTitle")
    baliseTitle.innerText = best_movie["title"]
    let baliseDesc = document.getElementById("bestMovieDesc")
    baliseDesc.innerText = best_movie["description"]
    // console.log(best_movie_data["results"])
    // baliseImage.setAttribute("alt", "Ceci est une image de test modifiée");
    // console.log("Best movie data")
    // console.log(best_movie_data)
    // baliseImage.classList.add("nouvelleClasse")
    // baliseImage.classList.remove("photo")
}

async function set_movie_thumbnail(movie, image_id)
{
    let baliseImage = document.getElementById(image_id)
    baliseImage.src = movie["image_url"]
}

async function set_best_movies_thumbnail()
{
    let best_movies = await get_best_movies();
    if (best_movies != null){
        let best_movie = await fetch_request(best_movies[0].url)
        if (best_movie != null)
        {
            set_best_movie_thumbnail(best_movie);
        }
        else{
            alert("Could not fetch best movie data")
        }
        let second_movie = await fetch_request(best_movies[1].url)
        set_movie_thumbnail(second_movie, "secondRatedMoviePic")

        let third_movie = await fetch_request(best_movies[2].url)
        set_movie_thumbnail(third_movie, "thirdRatedMoviePic")

        let fourth_movie = await fetch_request(best_movies[3].url)
        set_movie_thumbnail(fourth_movie, "fourthRatedMoviePic")

        let fifth_movie = await fetch_request(best_movies[4].url)
        set_movie_thumbnail(fifth_movie, "fifthRatedMoviePic")

        let sixth_movie = await fetch_request(best_movies[5].url)
        set_movie_thumbnail(sixth_movie, "sixthRatedMoviePic")

        let seventh_movie = await fetch_request(best_movies[6].url)
        set_movie_thumbnail(seventh_movie, "seventhRatedMoviePic")
    }
}

// get_best_movies()
set_best_movies_thumbnail()

// let divJeu = document.getElementById("divJeu")
// divJeu.innerHTML = "<h1>toto</h1>"
// console.log(divJeu)