//Variables globales
let admin = new User(0, "admin", "admin", "admin", "admin", false, "admin");
let g_data = new Data([], [], [], null, admin, 1, 1, 1);
let g_idSelecionado = -1;

//Variables Usadas para leer los inputs
let usuarioNombre;
let usuarioApellido;
let usuarioUserName;
let usuarioPassword;
let btnRegistrarse;
let formulario;
let userName;
let pass;

let updateNombre;
let updateApellido;
let updateUserName;
let updatePassword;
let updateRole;

//Manejo de Tickets

let tituloTicket;
let descripcionTicket;
let responsable;
let fechaEntrega;
let estado;
let prioridad;

let actualizarTitulo;
let actualizarDescripcion;
let actualizarResponsable;
let actualizarEntrega;
let actualizarPrioridad;
let actualizarEstado;

let filtrarUserName;
let filtrarPrioridad;
let filtrarFechaInicio;
let filtrarFechaFin;



//RegistroUser

/**
 * Funcion para guardar nuevo Usuario
 */
const fnGuardarUsuario = () => {
    if (verificarUserName(usuarioUserName.value)) {

        let usuario = new User(
            g_data.id_usuario_global++,
            usuarioNombre.value,
            usuarioApellido.value,
            usuarioUserName.value,
            usuarioPassword.value,
            "user"
        );

        g_data.usuarios.push(usuario);
        localStorage.setItem("data", JSON.stringify(g_data));
        alert("Usuario Registrado");

    } else {
        alert("Nombre de usuario ya existe, escoja otro");
    }
}

/**
 * Verfica el nombre de Usuario, si es valido los parametros
 * @param {String} userName  El nombre de Usuario
 * @returns True si valida, false si no
 */
const verificarUserName = (userName) => {
    let usuario_temp = g_data.usuarios.find(user => user.userName === userName);
    return usuario_temp === undefined ? true : false;
}



//Login

/**
 * Funcion que recupera los datos del localStorage
 */
const get_dato = () => {
    let data_temp = localStorage.getItem("data");

    if (data_temp) {
        g_data = JSON.parse(data_temp);
    }
}

/**
 * Funcion que inicia en la carga de la pag del login, para tener los inputs del formulario de registro e inicio de sesion
 */
const initLogin = () => {
    usuarioNombre = document.getElementById("usuario-nombre");
    usuarioApellido = document.getElementById("usuario-apellido");
    usuarioPassword = document.getElementById("usuario-password");
    usuarioUserName = document.getElementById("usuario-user");
    btnRegistrarse = document.getElementById("btn-registrarse");
    nombreValidacion = document.getElementById("nombre-validacion");
    formulario = document.getElementById("formularioRegistro");
    pass = document.getElementById("password-login");
    userName = document.getElementById("inputUser");
    get_dato();
}

/**
 * Funcion que se encarga de loguear al usuario, validar sus credenciales
 */

const logear_usuario = () => {
    let user_temp = g_data.usuarios.find(user => user.userName === userName.value && user.password === pass.value);

    if (user_temp) {
        g_data.usuarioLogueado = user_temp;
        alert("Logueado como usuario");
        localStorage.setItem("data", JSON.stringify(g_data));
        fnRedirigirAlTicketDashboard();


    } else if (userName.value === admin.userName && pass.value === admin.password) {
        g_data.usuarioLogueado = admin;
        g_data.administrador = admin;
        alert("logueado como administrador");
        localStorage.setItem("data", JSON.stringify(g_data));
        fnRedirigirAlUserDashboard();
    } else {
        alert("Error en las credenciales");
    }
}


const fnRedirigirAlUserDashboard = () => {
    location.assign("pages/UsersDashboard.html");
}

const fnRedirigirAlTicketDashboard = () => {
    location.assign("pages/TicketDashBoard.html");
}

//UserController

/**
 * Recupera al usuario Logueado
 * @returns el usuario actualmente logueado
 */
const obtener_usuario_logueado = () => {
    return g_data.usuarioLogueado;
}

/**
 * Obtiene la posicion del arreglo de usuarios 
 * @param {Number} id id del usuario
 * @returns la posicion del usuario, si no se encuentra, retorna -1
 */
const obtener_posicion_usuarios = (id) => {
    for (let i = 0; i < g_data.usuarios.length; i++) {
        if (g_data.usuarios[i].idUser === id) {
            return i;
        }
    }
    return -1;
}

/**
 * Funcion para borrar el Usuario, tambien borra todos los tickets asignados, y creados por ese usuario
 * @param {Number} id el id del usuario que se desea borrar
 */
const fnBorrarUsuario = (id) => {
    let pos = obtener_posicion_usuarios(id);
    let posiciones  = [];
    if (pos === -1) {
        alert("Usuario no encontrado");
    } else {
        let band = window.confirm("Seguro que quiere borrar al usuario?");
        if (band) {
            g_data.usuarios.splice(pos, 1);
            
            for(let ticket of g_data.tickets){
                if(ticket.responsable.idUser === id || ticket.creador.idUser === id){
                    let pos_ticket = obtener_posicion_tickets(ticket.id);
                    posiciones.push(pos_ticket);
                }
            }

            for(let posicion_ticket of posiciones){
                g_data.tickets.splice(posicion_ticket, 1);
            }

            localStorage.setItem("data", JSON.stringify(g_data));
            fnListarUsuarios();
        }

    }
}

/**
 * Funcion para actualizar el usuario, lo que hace es completar el formulario de actualizacion
 * @param {Number} id id del usuario 
 */
const actualizarUsuario = (id) => {

    let user_temp = g_data.usuarios.find(user => user.idUser === id);
    if (document.getElementById("oculto")) {
        document.getElementById("oculto").id = "form-visible-registro";
    }

    updateNombre.value = user_temp.nombre;
    updateApellido.value = user_temp.apellido;
    updateUserName.value = user_temp.userName;
    updatePassword.value = user_temp.password
    updateRole.value = user_temp.role;
    g_idSelecionado = id;
}

/**
 * Funcion que actualiza al usuario, tambien actualiza las ocurrencias de los usuarios en los tickets
 */
const fnActualizar = () => {
    let predicate = user => user.idUser === g_idSelecionado;
    g_data.usuarios.find(predicate).nombre = updateNombre.value;
    g_data.usuarios.find(predicate).apellido = updateApellido.value;
    g_data.usuarios.find(predicate).userName = updateUserName.value;
    g_data.usuarios.find(predicate).password = updatePassword.value;
    g_data.usuarios.find(predicate).role = updateRole.value;

    for(let ticket of g_data.tickets){
        if(ticket.creador.idUser === g_idSelecionado){
            ticket.creador.nombre = updateNombre.value;
            ticket.creador.apellido = updateApellido.value
            ticket.creador.userName = updateUserName.value;
            ticket.creador.password = updatePassword.value;
            ticket.creador.role = updateRole.value;
        }

        if(ticket.responsable.idUser === g_idSelecionado) {
            ticket.responsable.nombre = updateNombre.value;
            ticket.responsable.apellido = updateApellido.value
            ticket.responsable.userName = updateUserName.value;
            ticket.responsable.password = updatePassword.value;
            ticket.responsable.role = updateRole.value;
        }
    }




    localStorage.setItem("data", JSON.stringify(g_data));
    document.getElementById("form-visible-registro").id = "oculto";
    fnListarUsuarios();
}

/**
 * Funcion que oculta el formulario de edicion en la pag de UserDashboard.html
 */
const fnCancelarEdicion = () => {
    if (document.getElementById("form-visible-registro")) {
        document.getElementById("form-visible-registro").id = "oculto";
    }
}


/**
 * Funcion que permite listar todos los usuarios en una tabla
 * @returns Si hay usuarios, retorna true, si no, retorna false
 */
const fnListarUsuarios = () => {

    let buff = [];
    if (g_data.usuarios.length === 0) {
        buff.push("<h1>No hay usuarios disponibles<h1>");
        document.getElementById('tabla-usuarios').innerHTML = buff.join("\n");
        return false;
    }

    buff.push(`<div class="table-responsive">`);
    buff.push(`<table class="table align-middle table-bordered">`);
    buff.push(`<thead>`);
    buff.push(`<tr>`);
    buff.push(`<th scope="col">Nombres</th>`);
    buff.push(`<th scope="col">Apellido</th>`);
    buff.push(`<th scope="col">UserName</th>`);
    buff.push(`<th scope="col">Password</th>`);
    buff.push(`<th scope="col">Role</th>`);
    buff.push(`<th scope="col">Accion</th>`);
    buff.push(`</tr>`);
    buff.push(`</thead>`);

    for (let user of g_data.usuarios) {
        buff.push(`<tbody>`);
        buff.push(`<tr>`);
        buff.push(`<td>${user.nombre}</th>`);
        buff.push(`<td>${user.apellido}</td>`);
        buff.push(`<td>${user.userName}</td>`);
        buff.push(`<td>${user.password}</td>`);
        buff.push(`<td>${user.role}</td>`);
        buff.push(`<td>`);
        buff.push(`<nav class = "botones">`);
        buff.push(`<button class = "btn btn-danger" onclick ="fnBorrarUsuario(${user.idUser})"> Borrar </button>`);
        buff.push(`<button class = "btn btn-primary" onclick = "actualizarUsuario(${user.idUser})"> Actualizar </button>`);
        buff.push(`</nav>`);
        buff.push(`</tbody>`);
    }
    buff.push(`</table>`);
    buff.push(`</div>`)
    document.getElementById('tabla-usuarios').innerHTML = buff.join("\n");
    return true;
}

/**
 * Funcion para cargar todos los inputs
 */
const init = () => {
    get_dato();
     if(!(g_data.usuarioLogueado)){
         location.assign("../index.html");
     }

    fnListarUsuarios();

    updateNombre = document.getElementById("updateNombre");
    updateApellido = document.querySelector("#updateApellido");
    updateUserName = document.getElementById("updateUserName");
    updatePassword = document.getElementById("updatePassword");
    updateRole = document.getElementById("updateRole");

}


/**
 * Para desloguear al Usuario, redirige a la pag de login
 */
const fnLogOutUsersDashBoard = () => {
    g_data.usuarioLogueado = null;
    localStorage.setItem("data", JSON.stringify(g_data));
    location.assign("../index.html");
}


/**
 * Compara si dos usuarios son iguales
 * @param {User} user1 El usuario para comparar
 * @param {User} user2 El usuario para comparar
 * @returns si son iguales, true, si no, false
 */
const compareUser = (user1, user2) => {
    return (user1.idUser === user2.idUser);
}

//TicketController
/**
 * Fucnion que carga los inputs
 */
const initTickets = () => {
    get_dato();

    if(!(g_data.usuarioLogueado)){
        location.assign("../index.html");
    }
    tituloTicket = document.getElementById("titulo-ticket");
    descripcionTicket = document.getElementById("descripcion-ticket");
    responsableTicket = document.getElementById("responsable-ticket");
    fechaEntrega = document.getElementById("fecha-fin-ticket");
    prioridad = document.getElementById("prioridad");
    estado = document.getElementById("estado");

    filtrarUserName = document.getElementById("buscar-userName");
    filtrarPrioridad = document.getElementById("filtrar-prioridad");
    filtrarFechaFin = document.getElementById("filtrar-fecha-fin");
    filtrarFechaInicio = document.getElementById("filtrar-fecha-inicio");
    fnListarTickets();
}


/**
 * Funcion que se encarga de guardar un sticker en el localstorage 
 * @returns true si se guarda correctamente, false su no
 */
const fnGuardarTicket = () => {

    let id_ticket = g_data.id_ticket_global++;
    let ticket_titulo = tituloTicket.value;
    let ticket_descripcion = descripcionTicket.value;
    let ticket_responsable;
    if (responsableTicket.value === "ME") {
        ticket_responsable = g_data.usuarioLogueado;
    } else {
        let responsable = g_data.usuarios.find(user => user.userName === responsableTicket.value);
        if (responsable) {
            ticket_responsable = responsable;
        } else {
            alert("usuario No encontrado");
            return false;
        }

    }
    let ticket_creador = g_data.usuarioLogueado;
    let ticket_fecha_vencimiento = new Date(fechaEntrega.value);
    let ticket_fecha_inicio = new Date();
    let ticket_prioridad = prioridad.value;
    let ticket_estado = estado.value;

    g_data.tickets.push(
        new Ticket(
            id_ticket,
            ticket_titulo,
            ticket_descripcion,
            ticket_responsable,
            ticket_fecha_inicio,
            ticket_fecha_vencimiento,
            ticket_prioridad,
            ticket_estado,
            ticket_creador
        )
    );
    localStorage.setItem("data", JSON.stringify(g_data));
    fnListarTickets();
    return true;
}

/**
 * Lista los tickets
 * @param {Number} id_estado_html En que estado quieres mostrar
 * @param {Function} value Un predicado que sirve de filtro 
 */

const fnListar = (id_estado_html, value) => {
    let predicate = value;
    if (!(g_data.tickets.filter(predicate).length === 0)) {
        let buff = [];
        buff.push(`
        <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          ${id_estado_html}
                        </button>
                      </h2>
                    
        `);
        for (let ticket of g_data.tickets.filter(value)) {
            if (
                compareUser(ticket.responsable, g_data.usuarioLogueado)
                || compareUser(ticket.creador, g_data.usuarioLogueado)
            ) {
                buff.push(
                    `<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class = "card">
                                <div class = "card-body">
                                    <h5 style =  class = "card-title">${ticket.titulo} </h5>
                                    <p class = "card-text">${ticket.descripcion}</p>
                                    <div class = "row">
                                        <div class = "col-sm-4">
                                            <button type = "button" class = "btn  btn-link" data-bs-toggle="modal" data-bs-target="#modalVerDetalle${ticket.id_ticket}">Ver Mas</button>
                                         </div>

                                         <div class = "col-sm-4">
                                            <button type = "button" class = "btn btn-danger" onclick = "fnBorrarTicket(${ticket.id_ticket})">Borrar</button>
                                         </div>

                                         <div class = "col-sm-4">
                                            <button type = "button" class = "btn  btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarTicket${ticket.id_ticket}">Editar</button>
                                         </div>

                                         
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                    <!-- Modal -->
                    <div class="modal fade" id="modalEditarTicket${ticket.id_ticket}" tabindex="-1" aria-labelledby="modalEditarLabel${ticket.id_ticket}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalEditarLabel${ticket.id_ticket}">Editar Ticket</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="form-ticket">
                                        <div class="row mb-3">
                    
                                            <div class="col-sm-4">
                                                <label for="actualizar-titulo${ticket.id_ticket}" class="form-label"> Titulo </label>
                                            </div>
                    
                                            <div class="col-sm-8">
                                                <input class="form-control" type="text" id="actualizar-titulo${ticket.id_ticket}" value = "${ticket.titulo}">
                                            </div>
                    
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-4">
                                                <label class="form-label" for="actualizar-descripcion${ticket.id_ticket}">Descipcion</label>
                                            </div>
                    
                                            <div class="col-sm-8">
                                                <div class="form-floating">
                                                    <textarea class="form-control" id="actualizar-descripcion${ticket.id_ticket}">${ticket.descripcion}</textarea>
                                                </div>
                                            </div>
            
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-4">
                                                <label class="form-label" for="actualizar-responsable${ticket.id_ticket}">Asignar A:</label>
                                            </div>
            
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    id="actualizar-responsable${ticket.id_ticket}" value = "${ticket.responsable.userName}">
                                            </div>
            
            
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-fecha-entrega${ticket.id_ticket}">Fecha de Entrega</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <input type="date" id="actualizar-fecha-entrega${ticket.id_ticket}" class="form-control"
                                                
                                            >
                                            </div>
            
                                        </div>
            
                                        <div class="row mb-3">
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-prioridad${ticket.id_ticket}">Prioridad</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <select  id="actualizar-prioridad${ticket.id_ticket}" name="prioridades" class = "form-control">
                                                    <option value="alta">Alta</option>
                                                    <option value="media">Media</option>
                                                    <option value="baja">Baja</option>
            
                                                </select>
                                            </div>
                                        </div>
            
            
            
            
                                        <div class="row mb-3 mt-3">
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-estado${ticket.id_ticket}">Estado</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <select  id="actualizar-estado${ticket.id_ticket}" name="estados" class = "form-control">
                                                    <option value="to-do">TO DO</option>
                                                    <option value="in-progress">IN PROGRESS</option>
                                                    <option value="finished">FINISHED</option>
            
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="fnActualizarTicket(${ticket.id_ticket}, ${ticket.id_ticket})">Editar Tarea</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="modalVerDetalle${ticket.id_ticket}" tabindex="-1" aria-labelledby="modalDetalleLabel${ticket.id_ticket}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalDetalleLabel${ticket.id_ticket}">Detalle de la Tarea</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card"">
                                        <div class="card-body">
                                            <h5 style = "margin-left:30%; margin-right: 30%;" class="card-title display-5">${ticket.titulo}</h5>
                                            <h6 style = "margin-left:30%; margin-right: 30%;"  class="card-subtitle mb-2 text-muted">Descripcion</h6>
                                            <p class="card-text">${ticket.descripcion}</p>

                                            <h6 class = "card-title display-6">Creacion y asignacion</h6>
                                            <div class = "row">
                                                <div class = "col-sm-6"> 
                                                    <h6 class = "card-subtitle ml-2">Creado por:</h6>
                                                </div>

                                                <div class = "col-sm-6">
                                                    <p class ="card-text">${ticket.creador.userName}</p>
                                                </div>
                                            </div>

                                            <div class = "row">
                                                <div class = "col-sm-6"> 
                                                    <h6 class = "card-subtitle ml-2">Asignado a:</h6>
                                                </div>

                                                <div class = "col-sm-6">
                                                    <p class ="card-text">${ticket.responsable.userName}</p>
                                                </div>
                                            </div>

                                            <h6 class = "card-title display-6">Fechas</h6>
                                            <div class = "row"> 
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">Fecha de creacion: </p>
                                                </div>
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">${ticket.fecha_creacion} </p>
                                                </div>
                                            </div>

                                            <div class = "row"> 
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">Fecha de vencimiento: </p>
                                                </div>
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">${ticket.fecha_vencimiento} </p>
                                                </div>
                                            </div>

                                            <div class = "row">
                                                <div class = "col-sm-6">
                                                    Prioridad: 
                                                </div>

                                                <div class = "col-sm-6">
                                                    ${ticket.prioridad}
                                                </div>
                                            </div>
                                </div>
                              </div>
                             </div>
                                <div class="modal-footer">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    `

                );

            }
            else {
                buff.push(
                    `<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class = "card">
                                <div class = "card-body">
                                    <h5 style =  class = "card-title">${ticket.titulo} </h5>
                                    <p class = "card-text">${ticket.descripcion}</p>
                                    <button type = "button" class = "btn  btn-link" data-bs-toggle="modal" data-bs-target="#modalVerDetalle${ticket.id_ticket}">Ver Mas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <!-- Modal -->
            <div class="modal fade" id="modalVerDetalle${ticket.id_ticket}" tabindex="-1" aria-labelledby="modalDetalleLabel${ticket.id_ticket}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalDetalleLabel${ticket.id_ticket}">Detalle de la Tarea</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card"">
                                <div class="card-body">
                                    <h5 style = "margin-left:30%; margin-right: 30%;" class="card-title display-5">${ticket.titulo}</h5>
                                    <h6 style = "margin-left:30%; margin-right: 30%;"  class="card-subtitle mb-2 text-muted">Descripcion</h6>
                                    <p class="card-text">${ticket.descripcion}</p>

                                    <h6 class = "card-title display-6">Creacion y asignacion</h6>
                                    <div class = "row">
                                        <div class = "col-sm-6"> 
                                            <h6 class = "card-subtitle ml-2">Creado por:</h6>
                                        </div>

                                        <div class = "col-sm-6">
                                            <p class ="card-text">${ticket.creador.userName}</p>
                                        </div>
                                    </div>

                                    <div class = "row">
                                        <div class = "col-sm-6"> 
                                            <h6 class = "card-subtitle ml-2">Asignado a:</h6>
                                        </div>

                                        <div class = "col-sm-6">
                                            <p class ="card-text">${ticket.responsable.userName}</p>
                                        </div>
                                    </div>

                                    <h6 class = "card-title display-6">Fechas</h6>
                                    <div class = "row"> 
                                        <div class = "col-sm-6>
                                            <p class = "card-text">Fecha de creacion: </p>
                                        </div>
                                        <div class = "col-sm-6>
                                            <p class = "card-text">${ticket.fecha_creacion} </p>
                                        </div>
                                    </div>

                                    <div class = "row"> 
                                        <div class = "col-sm-6>
                                            <p class = "card-text">Fecha de vencimiento: </p>
                                        </div>
                                        <div class = "col-sm-6>
                                            <p class = "card-text">${ticket.fecha_vencimiento} </p>
                                        </div>
                                    </div>

                                    <div class = "row">
                                    <div class = "col-sm-6">
                                        Prioridad: 
                                    </div>

                                    <div class = "col-sm-6">
                                        ${ticket.prioridad}
                                    </div>
                                </div>
                        </div>
                      </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            
            `);





            }
        };
        buff.push('</div>')
        document.getElementById(id_estado_html).innerHTML = buff.join('\n');
    }
}

/**
 * Lista todos los tickets
 */
const fnListarTickets = () => {
    if (!(g_data.tickets === 0)) {
        fnListar("to-do", t => t.estado === "to-do");
        fnListar("in-progress", t => t.estado === "in-progress");
        fnListar("finished", t => t.estado === "finished");
    }
}

/**
 * Obtiene la posicion del ticket
 * @param {Number} id El id del ticket 
 * @returns la posicion
 */
const obtener_posicion_tickets = (id) => {
    for (let i = 0; i < g_data.tickets.length; i++) {
        if (g_data.tickets[i].id_ticket === id) {
            return i;
        }
    }
    return -1;
}

/**
 * Borra el ticket 
 * @param {Number} id  el id del ticket que desea ser borrado
 */
const fnBorrarTicket = (id) => {
    let pos = obtener_posicion_tickets(id);
    if (pos === -1) {
        alert("Ticket no encontrado");
    } else {
        let band = window.confirm("Seguro que quiere borrar esta tarea?");
        if (band) {
            g_data.tickets.splice(pos, 1);
            localStorage.setItem("data", JSON.stringify(g_data));
            fnListarTickets();
        }

    }
}

/**
 * Actualiza los parametros de los tickets
 * @param {Number} id el id del ticket
 * @param {Number} value el id del ticket, para obtener del componente html
 */
const fnActualizarTicket = (id, value) => {

    actualizarTitulo = document.getElementById(`actualizar-titulo${value}`);
    actualizarDescripcion = document.getElementById(`actualizar-descripcion${value}`);
    actualizarEntrega = document.getElementById(`actualizar-fecha-entrega${value}`);
    actualizarResponsable = document.getElementById(`actualizar-responsable${value}`);
    actualizarEstado = document.getElementById(`actualizar-estado${value}`);
    actualizarPrioridad = document.getElementById(`actualizar-prioridad${value}`);

    let predicate_ticket = t => t.id_ticket === id;
    let predicate_user = u => u.userName === actualizarResponsable.value;

    let user_temp = g_data.usuarios.find(predicate_user);
    if (!(user_temp)) {
        alert("Usuario no encontrado");
    }
    else {
        g_data.tickets.find(predicate_ticket).titulo = actualizarTitulo.value;
        g_data.tickets.find(predicate_ticket).descripcion = actualizarDescripcion.value;
        g_data.tickets.find(predicate_ticket).prioridad = actualizarPrioridad.value;
        g_data.tickets.find(predicate_ticket).responsable = user_temp;
        g_data.tickets.find(predicate_ticket).fecha_vencimiento = new Date(actualizarEntrega.value);
        g_data.tickets.find(predicate_ticket).estado = actualizarEstado.value;

        localStorage.setItem("data", JSON.stringify(g_data));
        location.assign("TicketDashBoard.html");
    }
}

/**
 * Limpia el dashboard
 */
const fnLimpiarDashBoard = () => {
    document.getElementById("to-do").innerHTML = `<div id = "to-do" class = "col-sm-4"> </div>`;
    document.getElementById("in-progress").innerHTML = `<div id = "in-progress" class = "col-sm-4"> </div>`;
    document.getElementById("finished").innerHTML = `<div id = "finished" class = "col-sm-4"> </div>`;
}

/**
 * Filtra por userName
 * @param {String} userName  el usarName
 * @returns si encuentra valores, true, si no, false
 */
const fnFiltrarPorUsuario = (userName) => {
    fnLimpiarDashBoard();
    if (userName === "ME") {
        fnListar("to-do", t => {
            return t.estado === "to-do" && (
                compareUser(g_data.usuarioLogueado, t.responsable) ||
                compareUser(g_data.usuarioLogueado, t.creador)
            )
        });

        fnListar("in-progress", t => {
            return t.estado === "in-progress" && (
                compareUser(g_data.usuarioLogueado, t.responsable) ||
                compareUser(g_data.usuarioLogueado, t.creador)
            )
        });

        fnListar("finished", t => {
            return t.estado === "finished" && (
                compareUser(g_data.usuarioLogueado, t.responsable) ||
                compareUser(g_data.usuarioLogueado, t.creador)
            )
        });

        return true;
    }

    else {
        fnListar("to-do", t => {
            return t.estado === "to-do" && (
                t.creador.userName === userName ||
                t.responsable.userName === userName
            )
        });

        fnListar("in-progress", t => {
            return t.estado === "in-progress" && (
                t.creador.userName === userName ||
                t.responsable.userName === userName
            )
        });

        fnListar("finished", t => {
            return t.estado === "finished" && (
                t.creador.userName === userName ||
                t.responsable.userName === userName
            )
        });

        return false;
    }

}

/**
 * Filtra por prioridad
 * @param {String} prioridad la prioridad 
 */
const fnFiltrarPorPrioridad = (prioridad) => {
    fnLimpiarDashBoard();

    fnListar("to-do", (t) => {
        return t.estado === "to-do" && t.prioridad === prioridad;
    });

    fnListar("in-progress", (t) => {
        return t.estado === "in-progress" && t.prioridad === prioridad;
    });

    fnListar("finished", (t) => {
        return t.estado === "finished" && t.prioridad === prioridad;
    });

}
/**
 * OJO, esta funcion no esta en uso
 * @param {String} init fecha de inicio
 * @param {String} fin fehca fin
 */


const fnFiltrarUser = () => {
    fnFiltrarPorUsuario(filtrarUserName.value);
}


const fnFiltrarPrioridad = () => {
    fnFiltrarPorPrioridad(filtrarPrioridad.value);
}


/**
 * Desloguea Al usuario
 */
const logOut = () => {
    g_data.usuarioLogueado = null;
    localStorage.setItem("data", JSON.stringify(g_data));
    location.assign("../index.html");

}




const fnVerComentarios = (ticket) => {
    let buff = [];
    if( g_data.comentarios.length === 0) return;
    for(let comentario of g_data.comentarios){
        if(comentario.ticket.id_ticket === ticket.id_ticket){
            if(ticket.creador.idUser === g_data.usuarioLogueado.idUser){

            }
            else {

            }
        }
    }
}

const fnComentar = (ticket, user) => {

} 

const fnEliminarComentario = (idComentario) => {

}

const fnEditarComentario = (idComentario) => {

}