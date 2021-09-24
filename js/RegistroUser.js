
let g_usuarios = [];
let g_tickets = [];
let g_comentarios = [];
let g_estados = [];
let g_idUsuario = 1;
let admin = new User(0, "admin", "admin", "admin","admin",false, "admin");

const g_data = new Data([], g_estados, g_tickets, g_comentarios, null, admin)

let usuarioNombre;
let usuarioApellido;
let usuarioUserName;
let usuarioPassword;
let btnRegistrarse;
let formulario = document.getElementById("formularioRegistro");

let nombreValidacion;



usuarioNombre = document.getElementById("usuario-nombre");
usuarioApellido = document.getElementById("usuario-apellido");
usuarioPassword = document.getElementById("usuario-password");
usuarioUserName = document.getElementById("usuario-user");
btnRegistrarse = document.getElementById("btn-registrarse");
nombreValidacion = document.getElementById("nombre-validacion");






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
        
        g_usuarios.push(usuario);
        g_data.usuarios = g_usuarios;
        localStorage.setItem("data", JSON.stringify(g_data));
        alert("Usuario Registrado");

    } else {
        alert("Nombre de usuario ya existe, escoja otro");
    }
}

const verificarUserName = (userName) => {
    let usuario_temp = g_usuarios.find(user => user.userName === userName);
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






