function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function toggleVisibility(elementIds) {
    let element = document.getElementById(elementIds[0])
    let visibility = element.style.display
    console.log(visibility)
    if (visibility === 'inline') {
        visibility = 'none';
    } else {
        visibility = 'inline'
    }
    element.style.display = visibility

    for (let i = 1; i < elementIds.length; i++) {
        let id = elementIds[i]
        let element = document.getElementById(id)
        element.style.display = visibility;
    }
}

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
    console.log("best movie")
    url = home + "titles/?sort_by=-imdb_score"
    let response = await fetch_request(url)
    content = response.results[0]
    console.log(content)
    response = await fetch_request(content["url"])
    return response
}

async function get_best_movies(movie_amount) 
{
    url = home + "titles/?sort_by=-imdb_score"
    let movies = []
    let current_page = await fetch_request(url)
    // tant que l'on n'a pas 7 meilleur films:
    
    while (movies.length < movie_amount)
    {
        let results = current_page.results
        movies = movies.concat(results)
        current_page = await fetch_request(current_page.next)
    }

    return movies
    // Regarder l'url du prochain meilleur film
    // Si ce film n'a pas de problème (lien mort ect)
    //  l'ajouter à la liste des meilleurs films
    // Sinon on continue
    
    // console.log(second_page)
    // movies = first_page.results
    // for (let i = 0; i < 2; i++) {
    //     movies.push(second_page.results[i])
    // }
    // console.log("best movie lists")
    // console.log(movies)
    // return movies
}

async function is_movie_valid(movie_data)
{
    let img = movie_data.image_url
    return window.open(img) != null
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
        try {
            let data = await response.json();
            return data;
        } catch (error) {
            console.log("Error while getting json data from response: ", error);
            return null;
        }
    }
    else {
        console.log("HTTP-Error: " + response.status);
        return null;
    }
}

async function set_best_movie_thumbnail(best_movie)
{
    best_movie_div = document.getElementById("bestMovie")
    console.log(best_movie_div.children)
    // let baliseImage = best_movie_div.img;
    // baliseImage.src = best_movie["image_url"];
    // let baliseTitle = document.getElementById("bestMovieTitle")
    // baliseTitle.innerText = best_movie["title"]
    // let baliseDesc = document.getElementById("bestMovieDesc")
    // baliseDesc.innerText = best_movie["description"]
}


async function set_best_movies_thumbnail()
{
    let movie_amount = 7
    movies = await get_best_movies(movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial
    set_best_movie_thumbnail(movies[0])
    return
    // les autres sont utilisés pour les div dans le tag BestRatedMovies
    best_movies_div = document.getElementById("bestRatedMovies")
    for (let i = 1; i<movie_amount; i++)
    {
        movie = movies[i]
        let baliseImage = best_movies_div.querySelectorAll("div");
        console.log(baliseImage)
    }
}

// set_best_movies_thumbnail()
// get_best_movie()
// get_best_movies()




