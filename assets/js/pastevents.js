let ubicacion = document.getElementById("cardd")
const search = document.getElementById('busqueda')
const check = document.getElementById("maincheckk")

let fetchHome;

let pastEvent;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(data => data.json())
.then(data=>{ 
    fetchHome = data
    pastEvent = fetchHome.events.filter( past => past.date <= fetchHome.currentDate)
    renderTemplate (crearCards(pastEvent), ubicacion)
    check.innerHTML = generarCheckbox(fetchHome.events)
    check.addEventListener('change', filtroCruzado)
    search.addEventListener( 'input', filtroCruzado)
})
.catch(error => console.log(error))

function crearCards ( lista ){
    let todasLasCards = ""
    for (let recorrido of lista){
        let template =  `
        <div class="card" style="width: 16rem;">
          <img src=${recorrido.image} class="card-img-top" alt=${recorrido.name}>
          <div class="card-body">
            <h5 class="card-title">${recorrido.name}</h5>
            <p class="card-text">${recorrido.description}</p>
            <div class=${recorrido.price}>
              <p>Price: $15</p>
              <a href="details.html?idUrl=${recorrido._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
          </div>
        `
        todasLasCards += template
    }
    return todasLasCards
}
/* renderTemplate (crearCards(past), ubicacion) */

//---------Filtro por categoria (crea un array de las 7 categorias)----------------

/* const sinRepetir = []
const categorias = past.map(events => events.category)

categorias.forEach(categorias => {
if (!sinRepetir.includes (categorias)){
sinRepetir.push (categorias)}
}) */


/* const check = document.getElementById("maincheckk") */
/* check.innerHTML = generarCheckbox(sinRepetir) */

function generarCheckbox (infoData){
    const categorias = new Set(infoData.map(eventInfo => eventInfo.category))
    let template = ""
    categorias.forEach(categorias =>{
        template += `<div class="form-check form-check-inline">   
        <label class="form-check-label">${categorias}
        <input class="form-check-input" type="checkbox" value="${categorias}">
        </label>
        </div>`
    })
    return template
}

// -----------------------------------------------------------------




    function checkFilter (touchs, categoriesList){
        let values = [];
        for (let touch of touchs){
            if (touch.checked)
            values.push(touch.value.toLowerCase())
        }
        let filters = categoriesList.filter(movie => values.includes(movie.category.toLowerCase()))
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)


search.addEventListener( 'input', filtroCruzado)

function searchmovie(inputFind, categoriesList){
    const filtermovie = categoriesList.filter(movie => {
        return movie.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filtermovie
}


function filtroCruzado(evento){
    let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchmovie (search, pastEvent)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h4 class="alert"> Sorry ! THERE IS NO COICIDENCES WITH YOUR SEARCH</h4>`
        renderTemplate(alert, ubicacion)
    }
    else {
        renderTemplate(crearCards(filterPerCheack), ubicacion)
    }
}


function renderTemplate(template, where){
    where.innerHTML = template
}

/* filtroCruzado() */