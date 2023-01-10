/* let cadenaParametroUrl = location.search // traemos la url a manera de sting

let parametros = new URLSearchParams(cadenaParametroUrl) // transformamos a objeto de tipo urlsearchparams para poder trabajar con el metodo get


let id = parametros.get("id")

let contenedor = document.getElementById("cardd")


let cartaEncontrada = listaCartas.find(events => hola._id == id)
console.log(cartaEncontrada)

function pintarCard(carta){
    contenedor.innerHTML = ""
    let div = document.createElement("div")
    div.classname = "card5"
    div.innerHTML = '<img src= "${hola.image}" class="card-img-top" alt="${hola.name}">'

    
    contenedor.appendChild(div)
}
    pintarCard(carta) */

    let cadenaParametroUrl = location.search
let parametros = new URLSearchParams(cadenaParametroUrl)
let idCard = parametros.get("idUrl")

let contenedor = document.getElementById("tukituki") 

let walk = data.events

let cardEncontrada = walk.find(walk => walk._id == idCard)

function pintarCard(walk){
    contenedor.innerHTML = ""
    let template = `
     <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0" id="details">
          <div class="col-md-4">
            <img src="${walk.image}" class="img-fluid rounded-start" alt="${walk.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title"> ${walk.name}</h5>
            <p class="card-text">Date: ${walk.date}</p>
            <p class="card-text">Description: ${walk.description}</p>
            <p class="card-text">Category: ${walk.category}</p>
            <p class="card-text">Place: ${walk.place}</p>
            <p class="card-text">Capacity: ${walk.capacity}</p>
            <p class="card-text">Estimate: ${walk.estimate}</p>
            <p class="card-text">Price: ${walk.price}</p>
        </div>
</div>          
        </div>
      </div>`
      
      

    contenedor.innerHTML = template
}

pintarCard(cardEncontrada)
