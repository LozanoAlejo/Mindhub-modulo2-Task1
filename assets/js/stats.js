let $stat1 = document.getElementById("tbody1")
let $stat2 = document.getElementById("tbody2")
let $stat3 = document.getElementById("tbody3")

let lista;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(datos => {
    lista = datos
    TRPast (lista, $stat3)
    TRUpcoming (lista, $stat2)
    mayorCapacity(lista.events)
    let filtro = armNewList(lista)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(error => error.message)



// Generar los TR del past

function TRPast(losDatos, ubicacion){
    let pasEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
    let template2 = ""

    for (let past of pasEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }


    ubicacion.innerHTML = template2
}

// Generar los TR del upcoming

function TRUpcoming(losDatos, ubicacion){

        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
    
        ubicacion.innerHTML = template1
}

// Funcion de multiplicacion

function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

// Funcion de porcentaje

function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed (2)
}

function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity)
    document.getElementById ("eventomayor").innerHTML = mayorCapacity[0].name
}

function armNewList(datos){
let nuevaLista = []

    for (let newList = 0; newList < datos.events.length; newList++) {
        nuevaLista.push(datos.events[newList]);
        
        nuevaLista[newList].percentage = porcentaje(nuevaLista[newList].capacity, (nuevaLista[newList].assistance ?? nuevaLista[newList].estimate));
    }
    console.log(nuevaLista)
    return nuevaLista.sort((a,b) => b.percentage - a.percentage)
}

function imprimirMayorPorcentaje(newEvent){
    document.getElementById("mayorporcentaje").innerHTML = `${newEvent[0].name} ${newEvent[0].percentage}`
}

function imprimirMenorPorcentaje(newEvent){
    document.getElementById("menorporcentaje").innerHTML = `${newEvent[newEvent.length-1].name} ${newEvent[newEvent.length-1].percentage}`
}