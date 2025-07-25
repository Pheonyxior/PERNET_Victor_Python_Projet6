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

async function get_best_movie()
{
    url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
    console.log(url)
    let response = await fetch(url);
    if (response.ok){
        let data = await response.json();
        console.log(data.results);
        console.log(data.results[0])
        console.log(data.results[0].url)
        return data;
    }
    else {
        alert("HTTP-Error: " + response.status);
        return ;
    }
}

let my_json = get_best_movie();
if (my_json != null){
    console.log(my_json)
    console.log(my_json.results)
    console.log(my_json["results"]);
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