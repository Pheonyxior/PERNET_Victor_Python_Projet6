let homepage = "http://localhost:8000/api/v1/titles/"

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

async function filter_movies_by(
        year = "", min_year = "", max_year = "", imdb_score = "",
        imdb_score_min = "", imdb_score_max, title = "", title_contains = "",
        genre = "", genre_contains = "", sort_by = "", director = "", 
        director_contains = "", writer = "", writer_contains = "", actor = "",
        actor_contains = "", country = "", country_contains = "", lang = "",
        lang_contains = "", company = "", company_contains = "", rating = "",
        rating_contains = ""
)
{
    let url = `${homepage}`+
            `?year=${year}`+
            `&minyear=${min_year}`+
            `&max_year=${max_year}`+
            `&imdb_score=${imdb_score}`+
            `&imdb_score_min=${imdb_score_min}`+
            `&imdb_score_max=${imdb_score_max}`+
            `&title=${title}`+
            `&title_contains=${title_contains}`+
            `&genre=${genre}`+
            `&genre_contains=${genre_contains}`+
            `&sort_by=${sort_by}`+
            `&director=${director}`+
            `&director_contains=${director_contains}`+
            `&writer=${writer}`+
            `&writer_contains=${writer_contains}`+
            `&actor=${actor}`+
            `&actor_contains=${actor_contains}`+
            `&country=${country}`+
            `&country_contains=${country_contains}`+
            `&lang=${lang}`+
            `&lang_contains=${lang_contains}`+
            `&company=${company}`+
            `&company_contains=${company_contains}`+
            `&rating=${rating}`+
            `&rating_contains=${rating_contains}`;
    
    // url.replace(/[\n\r]+/g, '');
    // url.replace(/^\s+|\s+$/gm,'';
    console.log(url)
    let response = await fetch(url);
    if (response.ok){
        let json = await response.json();
        return json;
    }
    else {
        alert("HTTP-Error: " + response.status);
        return ;
    }
}

let json = filter_movies_by(sort_by="-imdb_score");
if (json != null){
    console.log(json)
    console.log(json["results"]["title"]);
}

// let divJeu = document.getElementById("divJeu")
// console.log(divJeu)

// let h2 = document.querySelector("#divJeu h2")
// console.log(h2)

// let listh2 = document.querySelectorAll("h2")
// console.log(listh2)

// for (let i = 0; i < listh2.length; i++) {
//     console.log(listh2[i])
// }