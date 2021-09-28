
let admin = new User(0, "admin", "admin", "admin", "admin", false, "admin");

let g_data = new Data([], [], [], [], null, admin);
let g_idSelecionado = -1;

let g_idUsuario = 1;
let usuarioNombre;
let usuarioApellido;
let usuarioUserName;
let usuarioPassword;
let btnRegistrarse;
let formulario;
let userName;
let pass;


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
    let user_temp;
    for (let user of g_data.usuarios) {
        if (user.userName === userName.value && user.password === pass.value) {
            user_temp = user;
        }
        else {
            user_temp = null;
        }
    }

    if (user_temp) {
        user_temp.estaLogueado = true;
        g_data.usuarioLogueado = user_temp;
        alert("Logueado como usuario");
        localStorage.setItem("data", JSON.stringify(g_data));


    } else if (userName.value === admin.userName && pass.value === admin.password) {
        admin.estaLogeado = true;
        g_data.usuarioLogueado = admin;
        alert("logueado como administrador");
        localStorage.setItem("data", JSON.stringify(g_data));
        fnRedirigirAlUserDashboard();
    } else {

    }
}
const fnRedirigirAlUserDashboard = () => {
    location.assign("pages/UsersDashboard.html");
}


const obtener_usuario_logueado = () => {
    return g_data.usuarioLogueado;
}

const obtener_posicion = (id) => {
    for (let i = 0; i < g_data.usuarios.length; i++) {
        if (g_data.usuarios[i].idUser === id) {
            return i;
        }
    }
    return -1;
}


const fnBorrarUsuario = (id) => {
    let pos = obtener_posicion(id);
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
    

    let user_temp = g_data.usuarios.find(user => user.id === id);
    
    document.getElementById("oculto").id = "form-visible-registro";

    document.getElementById("updateNombre").value = user_temp.nombre
    document.getElementById("updateApellido").value = user_temp.apellido;
    document.getElementById("updateUserName").value = user_temp.userName;
    document.getElementById("updatePassword").value = user_temp.password
    document.getElementById("updateRole").value = user_temp.role;
    g_idSelecionado = id;
}

const fnActualizar = () => {
    let predicate = user => user.id === g_idSelecionado;
    g_data.usuarios.find(predicate).nombre = document.getElementById("updateNombre").value;
    g_data.usuarios.find(predicate).apellido = document.getElementById("updateApellido").value;
    g_data.usuarios.find(predicate).userName = document.getElementById("updateUserName").value;
    g_data.usuarios.find(predicate).password = document.getElementById("updatePassword").value;
    g_data.usuarios.find(predicate).role = document.getElementById("updateRole").value;

    localStorage.setItem("data", JSON.stringify(g_data));
    fnListarUsuarios();
}

const fnListarUsuarios = () => {

    let buff = [];
    if (g_data.usuarios.length === 0) {
        buff.push("<h1>No hay usuarios disponibles<h1>");
        document.getElementById('tabla-usuarios').innerHTML = buff.join("\n");
        return false;
    }

    buff.push(`<table class="table">`);
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
        buff.push(`<nav>`);
        buff.push(`<button class = "btn btn-danger" onclick ="fnBorrarUsuario(${user.idUser})"> Borrar </button>`);
        buff.push(`<button class = "btn btn-primary" onclick = "actualizarUsuario(${user.idUser})"> Actualizar </button>`);
        buff.push(`</nav>`);
        buff.push(`</tbody>`);
    }
    buff.push(`</table>`);
    document.getElementById('tabla-usuarios').innerHTML = buff.join("\n");
    return true;
}

const init = () => {
    get_dato();
    fnListarUsuarios();
    return false;
}