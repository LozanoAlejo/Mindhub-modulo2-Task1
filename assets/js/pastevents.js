let maincard = document.getElementById("cardd")
function template (hola){
        return maincard.innerHTML +=
    `
  <div class="card" style="width: 16rem;">
    <img src=${hola.image} class="card-img-top" alt=${hola.name}>
    <div class="card-body">
      <h5 class="card-title">${hola.name}</h5>
      <p class="card-text">${hola.description}</p>
      <div class=${hola.price}>
        <p>Price: $15</p>
        <a href="details.html" class="btn btn-primary">Details</a>
      </div>
    </div>
    </div>
  `
  
  }
  
  const PastCartitas = []
  
  function listaCartas (array,pen) {
    for (let secondCard of array.events){
      if (array.currentDate<secondCard.date)
      pen.push(template(secondCard))
    
    }
  console.log( PastCartitas.toString() )
  
  
  }
  
  listaCartas ( data, PastCartitas )