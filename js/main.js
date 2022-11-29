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
    inputFecha.style.display="block";
    
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

    datosCliente.append(inputNombreYapellido,inputIdCliente,inputFecha);

    formularioReservas.append(datosCliente)
    agregarElementosAlFormulario();
}

function fechaSeaMayorAhoy(fecha){

    const dateHoy = new Date();
    const dateReserva = new Date(fecha);
    const operadorternario = (dateReserva>dateHoy) ? true: false;
    
    return operadorternario;
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

/* VARIABLES GLOBALES */
//localStorage.clear();

const formularioReservas = document.getElementById("reserva");
const datosCliente = document.getElementById("datosCliente");
const datosReserva = document.getElementById("datosReserva");
let btnReserva = document.getElementById("btnReserva");


let inputFecha;
let inputNombreYapellido;
let inputIdCliente;
crearInputs();

let reservas = obtenerReservas();

const tbodyClasesReservadas = document.getElementById("tbodyClasesReservadas"); 

let selectClase = document.getElementById("selectClase");

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

    //Obtenemos la clase seleccionada   
    selectClase.addEventListener("change", (event)=>{
        valor = event.target.value;
        return valor;
    }); 

    let nombreClientesEnBaseDeDatos;
    let idClientesEnBaseDeDatos;

    fetch('/mi_repositorio/json/clientes.json')
    .then( (response) => {
    
        return response.json();
    
    }).then( (clientes) => {

        nombreClientesEnBaseDeDatos = clientes.some( function (cliente) {
            return cliente.nombreYapellido.toLowerCase() === nombreYapellido.toLowerCase();
        }); 
        console.log(nombreClientesEnBaseDeDatos)

        idClientesEnBaseDeDatos = clientes.some( function (cliente) {
            return cliente.idCliente === idCliente;
        }); 
        console.log(nombreClientesEnBaseDeDatos);

        //Comprobamos que el cliente este en la base de datos
        if((!nombreClientesEnBaseDeDatos)||(!idClientesEnBaseDeDatos)){

            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Cliente no existe!'
            });

            //Limpiar inputs
            inputFecha.value="";
            inputNombreYapellido.value="";
            inputIdCliente.value="";

        } else if (fechaDisponible(fecha)){

            if(fechaSeaMayorAhoy(fecha)){
                
                //Cargamos la reserva al array
                reservas.push({
                fecha: fecha,
                nombreYapellido: nombreYapellido,
                idCliente: idCliente,
                clase: selectClase.value,
                });
    
                //Cargar el array al localstorage
                localStorage.setItem("reservas", JSON.stringify(reservas));
                console.log(reservas)
                //mensaje reserva exitosa
                Swal.fire({
                    title: 'Genial!',
                    text: 'Ya reservaste tu lugar en la clase!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                //Limpiar inputs
                inputFecha.value="";
                inputNombreYapellido.value="";
                inputIdCliente.value="";
    
                //Renderizar tabla
                renderizarTabla();

            }else{
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
});