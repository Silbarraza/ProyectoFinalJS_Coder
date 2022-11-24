//Se tomaran los personajes de la api como clientes de la base de datos
/* fetch('https://swapi.dev/api/people')
.then((response)=>{
    return response.json()
}).then ((personasStarwars)=>{
      
    const personas = personasStarwars.results

    for (const persona of personas) {
        
        const nombreClienteRegistrado = persona.name
        const anioDeNacimientoCliente = persona.birth_year

        console.log(nombreClienteRegistrado,anioDeNacimientoCliente)
    }
}) */

/* FUNCIONES */
/* async function obtenerPersonasStarwars (){
    const response =await fetch ('https://swapi.dev/api/people')
    const personasStarwars  = await response.json()

    console.log(personasStarwars)

    const personasStarwarsList = personasStarwars.results
    
    for (const persona of personasStarwarsList){
        const nombreClienteRegistrado = persona.name
        const anioDeNacimientoCliente = persona.birth_year

        console.log(nombreClienteRegistrado,anioDeNacimientoCliente)
    }
   
}

obtenerPersonasStarwars() */


/* Swal.fire({
    title: 'Login',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Nombre y Apellido">
    <input type="password" id="password" class="swal2-input" placeholder="Año de Nacimiento">`,
    confirmButtonText: 'Ingresar',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Por favor ingresa tus datos`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(`
        Bienvenid@ 
        ${result.value.login}
        `.trim())
    }
}) */

/* VARIABLES */
//localStorage.clear();

/* const formularioLoginCliente = document.getElementById("formularioLogin")

const inputNombreYapellido = document.getElementById("inputNombreYapellido")
let inputClave = document.getElementById("inputClave")



formularioLoginCliente.addEventListener("submit", (event) => {

    event.preventDefault()

    //Obtenemos los datos
    const nombreYapellido = inputNombreYapellido.value
    let clave = inputClave.value

    console.log(nombreYapellido,clave)

    
}) */

//localStorage.clear();

/* FUNCIONES */
function renderizarTabla () {
    //Limpiar el tbody
    tbodyClasesReservadas.innerHTML="";

    //Recorremos las reservas
    for(const reserva of reservas){
        // Crear el tr
        const tr = document.createElement("tr");

        // Creamos las columnas
        const td1 = document.createElement("td");
        td1.innerText = reserva.fecha;

        const td2 = document.createElement("td");
        td2.innerText = reserva.nombreYapellido;

       // const td3 = document.createElement("td");
        //td3.innerText = reserva.apellido;

        const td4 = document.createElement("td");
        td4.innerText= reserva.clase;

        //Agregar al tr
        tr.append(td1);
        tr.append(td2);
        //tr.append(td3);
        tr.append(td4);

        //Agregar tr al tbody
        tbodyClasesReservadas.append(tr);

    }


}

function crearInputs (){
    
    //Creo el input fecha

    const fechaHoy = new Date();
    inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.min = `${fechaHoy.getFullYear()}-${fechaHoy.getMonth() + 1}-${fechaHoy.getDate()}`;
    inputFecha.style.padding="5px";
    inputFecha.style.margin="10px";

    //Creo input Nombre y apellido
    inputNombreYapellido= document.createElement("input");
    inputNombreYapellido.placeholder="Nombre y Apellido";
    inputNombreYapellido.type="text";
    inputNombreYapellido.style.padding= "5px";
    inputNombreYapellido.style.margin= "10px";

    //Creo input idCliente
    inputIdCliente= document.createElement("input");
    inputIdCliente.placeholder="N° de Cliente";
    inputIdCliente.type="password";
    inputIdCliente.style.padding= "5px";
    inputIdCliente.style.margin= "10px";


    //Agregamos input al formulario

    datosCliente.append(inputFecha,inputNombreYapellido,inputIdCliente);

    formularioReservas.append(datosCliente)
    agregarElementosAlFormulario();
}


function fechaSeaMayorAhoy(fecha){

    const dateHoy = new Date();
    const dateReserva = new Date(fecha);
    
    //const anioFechaReservada = dateReserva.getFullYear();
    //const mesFechaReservada = dateReserva.getMonth();
    //const diaRechaReservada = dateReserva.getDate();

    //Validar si la fecha elegida es menor a hoy
    if(dateReserva < dateHoy){
        return false;
    }
    return true;
}

function obtenerReservas () {
    
    const reservasLS = localStorage.getItem ("reservas");

    if (reservasLS !== null) {
        return JSON.parse(reservasLS);
    }

    return [];
}

function fechaDisponible(fecha){
    
    return !reservas.some( (elemento) => {
        return elemento.fecha === fecha;
    });

} 

function agregarElementosAlFormulario (){
    formularioReservas.append(datosReserva);
    formularioReservas.append(btnReserva);
}

function mensajeReserva () {
    let btnReserva = document.querySelector('#btnReserva');
    
    btnReserva.addEventListener('click', () => {

        Swal.fire({
            title: 'Genial!',
            text: 'Ya reservaste tu lugar en la clase!',
            icon: 'success',
            confirmButtonText: 'Ok'
    })
    })
}

//let personasStarwarsList ;
//let existeCliente = "";


/* 
async function obtenerPersonasStarwars (){
    const response =await fetch ('https://swapi.dev/api/people')
    const personasStarwars  = await response.json()
    
    personasStarwarsList = personasStarwars.results
    console.log(personasStarwars.results)
    

   for (const persona of personasStarwarsList){
        const nombreClienteRegistrado = persona.name
        const anioDeNacimientoCliente = persona.birth_year
        console.log(nombreClienteRegistrado,anioDeNacimientoCliente) 
    }
    //console.log(listaClientesRegistrados)
    //return nombreClienteRegistrado
}
obtenerPersonasStarwars() */




//nota: hay que comparar los inputs de nombre y id con los datos de la API, ver como hacerlo
function existeCliente (nombreYapellido, idCliente) {

    fetch('/mi_repositorio/json/clientes.json')
    .then( (response) => {
    
        return response.json();
    
    }).then( (clientes) => {

        let clienteEncontrado = true;

        for (let i=0; i < clientes.length; i++){
            
            if((clientes[i].nombreYapellido !== nombreYapellido)&&(clientes[i].idCliente !== idCliente)){
                clienteEncontrado=false;

                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Cliente no existe!'
                })

                console.log("Cliente no existe")
                //return true;
                break;
                
                

            }
        }
        return clienteEncontrado;
    });

    

}

/* VARIABLES GLOBALES */
//localStorage.clear();

const formularioReservas = document.getElementById("reserva");
const datosCliente = document.getElementById("datosCliente");
const datosReserva = document.getElementById("datosReserva");



let inputFecha;
let inputNombreYapellido;
let inputIdCliente;
crearInputs();

//const inputNombreYapellido = document.getElementById("nombreYapellido"); 
//const inputIdCliente = document.getElementById("idCliente"); 

let reservas = obtenerReservas();

const tbodyClasesReservadas = document.getElementById("tbodyClasesReservadas"); 

let selectClase = document.getElementById("selectClase");

let valor;

//const listaClientes = [];

//console.log(listaClientes)
//console.log(selectClase);


/* CODIGO */
renderizarTabla();

/*EVENTOS */

formularioReservas.addEventListener("submit", (event)=>{
    
    //Detenemos el evento
    event.preventDefault();

    //Obtenemos los datos
    const fecha = inputFecha.value;
    const nombreYapellido = inputNombreYapellido.value;
    const idCliente = parseInt(inputIdCliente.value);
    
    //Comprobar si existe el cliente
    existeCliente(nombreYapellido, idCliente);

    //Obtenemos la clase seleccionada   
    selectClase.addEventListener("change", (event)=>{
        valor = event.target.value;
        return valor;
    }); 

    //Chequeamos que la fecha no este reservada y que la fehca sea distinta de hoy
    if(fechaDisponible(fecha)) {

        // Chequeamos que la fecha elegida sea mayor al día de hoy
        if (fechaSeaMayorAhoy(fecha)){
            //Cargamos la reserva al array
            reservas.push({
            fecha: fecha,
            nombreYapellido: nombreYapellido,
            idCliente: idCliente,
            clase: selectClase.value,
            });

            //Cargar el array al localstorage
            localStorage.setItem("reservas", JSON.stringify(reservas));

            mensajeReserva();

            //alert ("Clase reservada con éxito");

            //Limpiar inputs
            inputFecha.value="";
            inputNombreYapellido.value="";
            inputIdCliente.value="";
    
            //Renderizar tabla
            renderizarTabla();

        }else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha es incorrecta!'
            })

        }
    

    }else {

        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Esta fecha ya esta reservada!'
        })
    }   


});

