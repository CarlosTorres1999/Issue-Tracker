
let admin = new User(0, "admin", "admin", "admin", "admin", false, "admin");
let g_data = new Data([], [], [], null, admin);
let g_idSelecionado = -1;
let g_idTicket = 0;
let g_idUsuario = 1;


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

//RegistroUser
const fnGuardarUsuario = () => {
    if (verificarUserName(usuarioUserName.value)) {

        let usuario = new User(
            g_idUsuario++,
            usuarioNombre.value,
            usuarioApellido.value,
            usuarioUserName.value,
            usuarioPassword.value,
            false,
            "user"
        );

        g_data.usuarios.push(usuario);
        localStorage.setItem("data", JSON.stringify(g_data));
        alert("Usuario Registrado");

    } else {
        alert("Nombre de usuario ya existe, escoja otro");
    }
}

const verificarUserName = (userName) => {
    let usuario_temp = g_data.usuarios.find(user => user.userName === userName);
    return usuario_temp === undefined ? true : false;
}

const validarNombreApellido = (nombre, apellido) => {
    let band = true;
    if (nombre === "") {
        band = false;

    }

    if (apellido === "") {
        band = false;
    }

    return band;
}

//Login
const get_dato = () => {
    let data_temp = localStorage.getItem("data");

    if (data_temp) {
        g_data = JSON.parse(data_temp);
    }
}

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

const logear_usuario = () => {
    let user_temp = g_data.usuarios.find(user => user.userName === userName.value && user.password === pass.value);

    if (user_temp) {
        user_temp.estaLogueado = true;
        g_data.usuarioLogueado = user_temp;
        alert("Logueado como usuario");
        localStorage.setItem("data", JSON.stringify(g_data));
        fnRedirigirAlTicketDashboard();


    } else if (userName.value === admin.userName && pass.value === admin.password) {
        admin.estaLogeado = true;
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
const obtener_usuario_logueado = () => {
    return g_data.usuarioLogueado;
}

const obtener_posicion_usuarios = (id) => {
    for (let i = 0; i < g_data.usuarios.length; i++) {
        if (g_data.usuarios[i].idUser === id) {
            return i;
        }
    }
    return -1;
}


const fnBorrarUsuario = (id) => {
    let pos = obtener_posicion_usuarios(id);
    if (pos === -1) {
        alert("Usuario no encontrado");
    } else {
        let band = window.confirm("Seguro que quiere borrar al usuario?");
        if (band) {
            g_data.usuarios.splice(pos, 1);
            localStorage.setItem("data", JSON.stringify(g_data));
            fnListarUsuarios();
        }

    }
}


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

const fnActualizar = () => {
    let predicate = user => user.idUser === g_idSelecionado;
    g_data.usuarios.find(predicate).nombre = updateNombre.value;
    g_data.usuarios.find(predicate).apellido = updateApellido.value;
    g_data.usuarios.find(predicate).userName = updateUserName.value;
    g_data.usuarios.find(predicate).password = updatePassword.value;
    g_data.usuarios.find(predicate).role = updateRole.value;

    localStorage.setItem("data", JSON.stringify(g_data));
    document.getElementById("form-visible-registro").id = "oculto";
    fnListarUsuarios();
}

const fnCancelarEdicion = () => {
    if (document.getElementById("form-visible-registro")) {
        document.getElementById("form-visible-registro").id = "oculto";
    }
}

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

const init = () => {
    get_dato();


    fnListarUsuarios();

    updateNombre = document.getElementById("updateNombre");
    updateApellido = document.querySelector("#updateApellido");
    updateUserName = document.getElementById("updateUserName");
    updatePassword = document.getElementById("updatePassword");
    updateRole = document.getElementById("updateRole");

}

const fnLogOutUsersDashBoard = () => {
    admin.estaLogeado = false;
    g_data.usuarioLogueado = null;
    localStorage.setItem("data", JSON.stringify(g_data));
    location.assign("../index.html");
}

const compareUser = (user1, user2) => {
    return (user1.idUser === user2.idUser);
}

//TicketController
const initTickets = () => {
    get_dato();
    tituloTicket = document.getElementById("titulo-ticket");
    descripcionTicket = document.getElementById("descripcion-ticket");
    responsableTicket = document.getElementById("responsable-ticket");
    fechaEntrega = document.getElementById("fecha-fin-ticket");
    prioridad = document.getElementById("prioridad");
    estado = document.getElementById("estado");
    fnListarTickets();
}

const fnGuardarTicket = () => {

    let id_ticket = g_idTicket++;
    let ticket_titulo = tituloTicket.value;
    let ticket_descripcion = descripcionTicket.value;
    let ticket_responsable;
    if (responsableTicket.value === "ME" || "me" || "Me" || "mE") {
        ticket_responsable = g_data.usuarioLogueado;
    } else {
        let responsable = g_data.usuarios.find(user => user.userName === resoinsableTicket.value);
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

}

const fnListarPorEstado = (estado, id_estado_html) => {
    let predicate = t => t.estado === estado;
    if (!(g_data.tickets.filter(predicate).length === 0)) {
        let buff = [];
        buff.push(`
        <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          ${estado}
                        </button>
                      </h2>
                    
        `);
        for (let ticket of g_data.tickets.filter(predicate)) {
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
                                    <button type = "button" class = "btn btn-danger" onclick = "fnBorrarTicket(${ticket.id_ticket})">Borrar</button>
                                    <button type = "button" class = "btn  btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarTicket">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                    <!-- Modal -->
                    <div class="modal fade" id="modalEditarTicket" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalEditarLabel">Editar Ticket</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="form-ticket">
                                    <div class="row mb-3">
            
                                        <div class="col-sm-4">
                                            <label for="actualizar-titulo" class="form-label"> Titulo </label>
                                        </div>
            
                                        <div class="col-sm-8">
                                            <input class="form-control" type="text" id="actualizar-titulo" value = "${ticket.titulo}">
                                        </div>
            
                                    </div>
            
                                    <div class="row mb-3">
            
                                        <div class="col-sm-4">
                                            <label class="form-label" for="actualizar-descripcion">Descipcion</label>
                                        </div>
            
                                        <div class="col-sm-8">
                                            <div class="form-floating">
                                                <textarea class="form-control" id="actualizar-descripcion">${ticket.descripcion}</textarea>
                                            </div>
                                        </div>
            
                                    </div>
            
                                    <div class="row mb-3">
            
                                        <div class="col-sm-4">
                                            <label class="form-label" for="actualizar-responsable">Asignar A:</label>
                                        </div>
            
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control"
                                                id="actualizar-responsable" value = "${ticket.responsable.userName}">
                                        </div>
            
            
                                    </div>
            
                                    <div class="row mb-3">
            
                                        <div class="col-sm-6">
                                            <label class="form-label" for="actualizar-fecha-entrega">Fecha de Entrega</label>
                                        </div>
            
                                        <div class="col-sm-6">
                                            <input type="date" id="actualizar-fecha-entrega" class="form-control"
                                                
                                            >
                                        </div>
            
                                    </div>
            
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label" for="actualizar-prioridad">Prioridad</label>
                                        </div>
            
                                        <div class="col-sm-6">
                                            <select  id="actualizar-prioridad" name="prioridades" class = "form-control">
                                                <option value="alta">Alta</option>
                                                <option value="media">Media</option>
                                                <option value="baja">Baja</option>
            
                                            </select>
                                        </div>
                                    </div>
            
            
            
            
                                    <div class="row mb-3 mt-3">
                                        <div class="col-sm-6">
                                            <label class="form-label" for="actualizar-estado">Estado</label>
                                        </div>
            
                                        <div class="col-sm-6">
                                            <select  id="actualizar-estado" name="estados" class = "form-control">
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
                                <button type="button" class="btn btn-primary" onclick="fnActualizarTicket(${ticket.id_ticket})">Editar Tarea</button>
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
                                    <button type = "button" class = "btn btn-danger" onclick = "fnBorrarTicket(${ticket.id_ticket})">Borrar</button>
                                    <button type = "button" class = "btn  btn-link" data-bs-toggle="modal" data-bs-target="#modalVerTicket">Ver Detalles</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
                
            }
        };
        buff.push('</div>')
        document.getElementById(id_estado_html).innerHTML = buff.join('\n');
    }
}

const fnListarTickets = () => {
    if (!(g_data.tickets === 0)) {
        fnListarPorEstado("to-do", "to-do");
        fnListarPorEstado("in-progress", "in-progress");
        fnListarPorEstado("finished","finished");
    }
}
const obtener_posicion_tickets = (id) => {
    for (let i = 0; i < g_data.tickets.length; i++) {
        if (g_data.tickets[i].id_ticket === id) {
            return i;
        }
    }
    return -1;
}
const fnBorrarTicket = (id) => {
    let pos = obtener_posicion_tickets(id);
    if(pos === -1){
        alert("Ticket no encontrado");
    } else {
        let band = window.confirm("Seguro que quiere borrar esta tarea?");
        if (band) {
            g_data.tickets.splice(pos, 1);
            localStorage.setItem("data", JSON.stringify(g_data));
            location.assign("TicketDashBoard.html");
        }
        
    }
}

const fnActualizarTicket = (id) => {

    actualizarTitulo = document.getElementById("actualizar-titulo");
    actualizarDescripcion = document.getElementById("actualizar-descripcion");
    actualizarEntrega = document.getElementById("actualizar-fecha-entrega");
    actualizarResponsable = document.getElementById("actualizar-responsable");
    actualizarEstado = document.getElementById("actualizar-estado");
    actualizarPrioridad = document.getElementById("actualizar-prioridad");

    let predicate_ticket = t => t.id_ticket === id;
    let predicate_user = u => u.userName === actualizarResponsable.value;
    
    let user_temp = g_data.usuarios.find(predicate_user);
    if(!(user_temp)){
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