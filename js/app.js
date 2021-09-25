
let admin = new User(0, "admin", "admin", "admin", "admin", false, "admin");

let g_data = new Data([], [], [], [], null, admin);


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
    for(let user of g_data.usuarios){
        if(user.userName === userName.value && user.password === pass.value){
            user_temp = user;
        }
        else {
            user_temp = null;
        }
    }
            
    if (user_temp){
        user_temp.estaLogueado = true;
        g_data.usuarioLogueado = user_temp;
        alert("Logueado como usuario");
        localStorage.setItem("data", JSON.stringify(g_data));
            
        
    } else if(userName.value === admin.userName && pass.value === admin.password){
       admin.estaLogeado = true;
       g_data.usuarioLogueado = admin;
       alert("logueado como administrador");
       localStorage.setItem("data", JSON.stringify(g_data));
       fnRedirigirAlUserDashboard();
    }else{

    }
}
const fnRedirigirAlUserDashboard = () => {
    location.assign("pages/UsersDashboard.html");
}


const obtener_usuario_logueado = () =>
{
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
        g_data.usuarios.splice(pos, 1);
        localStorage.setItem("data", JSON.stringify(g_data));
        fnListarUsuarios();
    }
}


const actualizarUsuario = (id) => {
    let predicate = user => user.id === id;
    if (!g_data.usuarios.find(predicate)) {

    } else {

    }
}

const fnListarUsuarios = () => {
    let buff = [];
    if(g_data.usuarios.length === 0){
        buff.push("<h1>No hay usuarios disponibles<h1>");
    }
    for(let user of g_data.usuarios){
        if(!(user.id === obtener_usuario_logueado().id) ){
            buff.push('<div class="card" style="width: 18rem;">');
            buff.push('<div class ="card-body">')    
            buff.push('<h5 class ="card-title">Usuario</h5>');    
            buff.push('<p class ="card-text">Datos del usuario</p>');   
            buff.push('</div>');   
            buff.push('<ul class ="list-group list-group-flush">');    
            buff.push('<li class ="list-group-item"> Nombre:'+user.nombre+'</li>');    
            buff.push('<li class ="list-group-item"> Apellido: '+user.apellido+'</li>');    
            buff.push('<li class ="list-group-item"> UserName: '+user.userName+'</li>');
            buff.push('<li class ="list-group-item"> Password: '+user.password+'</li>');
            buff.push('<li class ="list-group-item"> Rol de Usuario'+user.role+'</li>');      
            buff.push('</ul>');    
            buff.push('<div class ="card-body">');    
            buff.push('<button class = "btn " onclick = "fnBorrarUsuario('+user.id+')">Borrar</button>') ;  
            buff.push('<button class = "btn">Actualizar</button>');    
            buff.push('</div>');    
            buff.push('</div>');
        }

    }
    document.getElementById('tarjeta-usuario').innerHTML = buff.join("/n");


}

const init = () => {
    get_dato();
    fnListarUsuarios();
}