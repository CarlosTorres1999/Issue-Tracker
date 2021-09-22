const g_usuarios = [];
let g_idUsuario = 0;


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

    let usuario = new User(
        g_idUsuario++,
        usuarioNombre.value,
        usuarioApellido.value,
        usuarioUserName.value,
        usuarioPassword.value,
        [],
        []
    );
    g_usuarios.push(usuario);
    alert("Usuario Registrado");
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





