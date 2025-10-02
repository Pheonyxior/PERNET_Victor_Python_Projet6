function toggleVisibility(property, button_id) {
    console.log("toggleVisibility", property, button_id)
    let visibility = document.documentElement.style.getPropertyValue(property)
    console.log(visibility)
    if (visibility === 'inline')
    {
        document.documentElement.style.setProperty(property, "none");
        let butn = document.getElementById(button_id);
        butn.innerHTML = "Voir plus";
    }
    else
    {
        document.documentElement.style.setProperty(property, "inline");
        let butn = document.getElementById(button_id);
        butn.innerHTML = "Voir moins";
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
    // console.log("Best Movies: ", movies)
    return movies
}


async function get_movies(genre, movie_amount) 
{
    url = home + "titles/?sort_by=-imdb_score&genre="+genre
    let movies = []
    let current_page = await fetch_request(url)
    // tant que l'on n'a pas 7 meilleur films:
    
    while (movies.length < movie_amount)
    {
        let results = current_page.results
        movies = movies.concat(results)
        current_page = await fetch_request(current_page.next)
    }
    // console.log("Best Movies: ", movies)
    return movies
}


async function is_movie_valid(movie_data)
{
    return true
    let img = movie_data.image_url
    // console.log("img ", img)

    // console.log(urlExists(img, my_callback))

    checkURL(img)
    
    // let test = urlExists(img,)
    // if (test === null){
    //     console.log("Test returned null")
    // }
    // else{
    //     console.log("Test returned true")
    // }
    // console.log(test)
    return true
}

async function checkURL(url) { 
  try { 
    const response = await fetch(url); 
 	if (!response.ok) return console.log(`URL does not exist: ${url}`);  
 
	console.log(`URL exists: ${url}`); 
  } catch (error) { 
    console.log(`Error checking URL: ${error}`); 
  } 
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

async function set_best_movie_thumbnail(movie_id)
{
    best_movie = await get_movie_details(movie_id) 
    if (await is_movie_valid(best_movie))
    {
        // console.log("movie is valid")
        let baliseImage = document.getElementById("ratedImg0");
        baliseImage.src = best_movie["image_url"];
    }
    let baliseTitle = document.getElementById("ratedTitle0")
    baliseTitle.innerText = best_movie["title"]
    let baliseDesc = document.getElementById("ratedDesc0")
    baliseDesc.innerText = best_movie["description"]
}

async function set_movie_thumbnail(movie_id, category_s, num_s)
{
    movie = await get_movie_details(movie_id)
    // console.log("movie ", movie)
    if (is_movie_valid(movie))
    {
        let baliseImage = document.getElementById(category_s+"Img"+num_s);
        baliseImage.src = movie["image_url"];
    }
    let baliseTitle = document.getElementById(category_s+"Title"+num_s)
    baliseTitle.innerText = movie["title"]
    // let baliseDesc = document.getElementById(category_s+"Desc"+num_s)
    // baliseDesc.innerText = best_movie["description"]
}


async function set_best_movies_thumbnail()
{
    let movie_amount = 7
    let movies = await get_best_movies(movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial
    await set_best_movie_thumbnail(movies[0]["id"])

    for (let i = 1; i<=movie_amount; i++)
    {
        movie = movies[i]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "rated", String(i))
    }
}

async function set_myst_movies_thumbnail()
{
    let movie_amount = 6
    let movies = await get_movies("mystery", movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial

    for (let i = 0; i<=movie_amount; i++)
    {
        movie = movies[i]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "myst", String(i))
    }
}

async function set_anim_movies_thumbnail()
{
    let movie_amount = 6
    let movies = await get_movies("animation", movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial

    for (let i = 0; i<=movie_amount; i++)
    {
        movie = movies[i]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "anim", String(i))
    }
}

async function set_other_movies_thumbnail(genre)
{
    let movie_amount = 6
    let movies = await get_movies(genre, movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial

    for (let i = 0; i<=movie_amount; i++)
    {
        movie = movies[i]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "other", String(i))
    }
}

// Afficher le meilleur film
    // Prendre l'img du meiller film avec son id
set_best_movies_thumbnail()
set_myst_movies_thumbnail()
set_anim_movies_thumbnail()
set_other_movies_thumbnail("adventure")


// Prendre les img et titres des 6 meilleurs films

// Prendre les img et titres des 6 meilleurs films mystery

// Prendre les img et titres des 6 meilleurs films d'anim

// Prendre les img et titres des 6 meilleurs films "other" défini par l'utilisateur






