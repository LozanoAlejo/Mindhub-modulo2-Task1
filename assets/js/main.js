 /* let homejs = document.getElementById("cardd")
 const search = document.getElementById('buscador')
const check = document.getElementById("maincheckk") */
 /* function template (hola){
  return maincard.innerHTML +=
  `
<div class="card" style="width: 16rem;">
  <img src=${hola.image} class="card-img-top" alt=${hola.name}>
  <div class="card-body">
    <h5 class="card-title">${hola.name}</h5>
    <p class="card-text">${hola.description}</p>
    <div class=${hola.price}>
      <p>Price: $15</p>
      <a href="details.html?id=${hola._id}" class="btn btn-primary">Details</a>
    </div>
  </div>
  </div>
}
*/

//-------------creacion de las cartas---------------------------
const search = document.getElementById('busqueda')

const ubicacion = document.getElementById("cardd")
function crearCards (lista, dondeVa){
    let todasLasCards = ""
    for (let recorrido of lista){
        let template = `<div class="card" style="width: 16rem;">
        <img src=${recorrido.image} class="card-img-top" alt=${recorrido.name}>
        <div class="card-body">
          <h5 class="card-title">${recorrido.name}</h5>
          <p class="card-text">${recorrido.description}</p>
          <div class=${recorrido.price}>
            <p>Price: $15</p>
            <a href="details.html?idUrl=${recorrido._id}" class="btn btn-primary">Details</a>
          </div>
        </div>
        </div>`

        todasLasCards += template
    }
    return todasLasCards
}
renderTemplate (crearCards(data.events), ubicacion)

//---------Filtro por categoria (crea un array de las 7 categorias)----------------

const sinRepetir = []
const categorias = data.events.map(events => events.category)

categorias.forEach(categorias => {
if (!sinRepetir.includes (categorias)){
sinRepetir.push (categorias)}
})


const check = document.getElementById("maincheckk")
check.innerHTML = generarCheckbox(sinRepetir)

function generarCheckbox (categorias){
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
        let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)


search.addEventListener( 'input', filtroCruzado)

function searchFood(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}


function filtroCruzado(evento){
    let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFood (search, data.events)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h4 class="alert">Sorry ! THERE IS NO COICIDENCES WITH YOUR SEARCH</h4>`
        renderTemplate(alert, ubicacion)
    }
    else {
        renderTemplate(crearCards(filterPerCheack), ubicacion)
    }
}


function renderTemplate(template, where){
    where.innerHTML = template
}

filtroCruzado()
