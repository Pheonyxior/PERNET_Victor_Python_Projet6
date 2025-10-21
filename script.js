let home = "http://localhost:8000/api/v1/"
let movie_urls = []

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
    let baliseImage = document.getElementById("ratedImg0");
    baliseImage.src = best_movie["image_url"];
    let baliseTitle = document.getElementById("ratedTitle0")
    baliseTitle.innerText = best_movie["title"]
    let baliseDesc = document.getElementById("ratedDesc0")
    baliseDesc.innerText = best_movie["description"]
}

async function set_movie_thumbnail(movie_id, category_s, num_s)
{
    movie = await get_movie_details(movie_id)
    // console.log("movie ", movie)
    let baliseImage = document.getElementById(category_s+"Img"+num_s);
    baliseImage.src = movie["image_url"];
    let baliseTitle = document.getElementById(category_s+"Title"+num_s)
    baliseTitle.innerText = movie["title"]
    // let baliseDesc = document.getElementById(category_s+"Desc"+num_s)
    // baliseDesc.innerText = best_movie["description"]
}


async function set_best_movies_thumbnail()
{
    let movie_amount = 6
    let movies = await get_best_movies(movie_amount)
    // Le premier meilleur film de la liste est utilisé pour
    //  le meilleur film cas spécial
    await set_best_movie_thumbnail(movies[0]["id"])
    // movie_urls[0] = movies[0]["url"]
    let best_btn = document.getElementById("bestBtn")
    best_btn.addEventListener('click', () => displayModal(movies[0]["id"]))

    let btns = document.getElementsByClassName("rated-btn")

    for (let i = 1; i<=movie_amount; i++)
    {
        let movie = movies[i]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "rated", String(i))
        let btn = btns[i-1]
        btn.addEventListener('click', () => displayModal(movie["id"]))
        // movie_urls[i] = movie["url"]
    }
}

async function set_myst_movies_thumbnail()
{
    let movie_amount = 6
    let movies = await get_movies("mystery", movie_amount)

    let btns = document.getElementsByClassName("myst-btn")

    for (let i = 1; i<=movie_amount; i++)
    {
        let movie = movies[i-1]
        // console.log("Movie ", movie)
        // console.log(movie["id"] + " " + String(i))
        set_movie_thumbnail(movie["id"], "myst", String(i))
        let btn = btns[i-1]
        btn.addEventListener('click', () => displayModal(movie["id"]))
    }
}

async function set_anim_movies_thumbnail()
{
    let movie_amount = 6
    let movies = await get_movies("animation", movie_amount)

    let btns = document.getElementsByClassName("anim-btn")

    for (let i = 1; i<=movie_amount; i++)
    {
        let movie = movies[i-1]
        // console.log("Movie ", movie)
        // console.log(movie["id"] + " " + String(i))
        set_movie_thumbnail(movie["id"], "anim", String(i))
        let btn = btns[i-1]
        btn.addEventListener('click', () => displayModal(movie["id"]))
    }
}

async function set_other_movies_thumbnail(genre)
{
    let movie_amount = 6
    let movies = await get_movies(genre, movie_amount)

    let btns = document.getElementsByClassName("other-btn")

    for (let i = 1; i<=movie_amount; i++)
    {
        let movie = movies[i-1]
        // console.log("Movie ", movie)
        set_movie_thumbnail(movie["id"], "other", String(i))
        let btn = btns[i-1]
        btn.addEventListener('click', () => displayModal(movie["id"]))
    }
}

function set_modal()
{
    var modal = document.getElementById("detailsModal");
    var close = document.getElementsByClassName("close")[0];
    var close_desktop = document.getElementsByClassName("close-desktop")[0];

    close.onclick = function() {
        modal.style.display = "none";
    }
    close_desktop.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function displayModal(movie_id) {
    console.log("displayModal " + movie_id)
    let modal = document.getElementById("detailsModal")
    modal.style.display = "block"
    setModalContent(movie_id)
}

async function setModalContent(movie_id) {
    let details = await get_movie_details(movie_id)
    console.log(details)
    
    let thumbn = document.getElementById("detailsThumbn")
    thumbn.src = details["image_url"];

    let title = document.getElementById("detailsTitle")
    title.innerText = details["title"]
    
    let year = details["year"]
    let genres = details["genres"]
    let pg = details["rated"]
    let duration = details["duration"]
    let countries = details["countries"]
    let imdb = details["imdb_score"]
    let wwg_income = details["worldwide_gross_income"]
    
    let detailsDateGenre = document.getElementById("detailsDateGenre")
    detailsDateGenre.innerText = year + " - " + genres
    let detailsPGDurCountries = document.getElementById("detailsPGDurCountries")
    if (pg.length > 3){
        pg = "Unknown"
    }
    detailsPGDurCountries.innerText = "PG-"+ pg + " - " + duration + " minutes (" + countries + ")"
    let detailsIMDB = document.getElementById("detailsIMDB")
    detailsIMDB.innerText = "IMDB score: " + imdb + "/10"
    let detailsIncome = document.getElementById("detailsIncome")
    if (!wwg_income){
        wwg_income = "Unknown"
    }
    detailsIncome.innerText = "Recettes au box-office: " + wwg_income

    let directors_list = details["directors"]
    let directors_str = ""
    directors_list.forEach((director) => {
        directors_str += String(director)
    });
    let directors = document.getElementById("detailsDirectors")
    // directors.innerText = directors_str
    directors.innerText = details["directors"]
    
    let desc = document.getElementById("detailsDesc")
    desc.innerText = details["description"]
    
    let actors = document.getElementById("detailsActors")
    actors.innerText = details["actors"]
}


set_best_movies_thumbnail()
set_myst_movies_thumbnail()
set_anim_movies_thumbnail()
set_other_movies_thumbnail("adventure")

set_modal()







