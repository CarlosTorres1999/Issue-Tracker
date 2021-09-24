

const recuperarUsuarios = () => {
   if(localStorage.getItem("data")){
       return JSON.parse(localStorage.getItem("data"));
   } return [];
}



const obtener_posicion = (id) => {
    for (let i = 0; i < g_data.usuarios.length; i++) {
        if (g_usuarios[i].idUser === id) {
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
        return true;
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



const recuperarDatos = () => {
    let data_temp = JSON.parse(localStorage.getItem("data"));
    g_data.usuarios = data_temp.usuarios;
    g_data.estados = data_temp.data;
    g_data.tickets =data_temp.tickets;
    g_data.usuarioLogueado = data_temp.usuarioLogueado;
    g_data.administrador = data_temp.administrador;
    g_data.comentarios = data_temp.administrador;

}

const initDashBoard = () => {
    recuperarDatos();
    fnListarUsuarios();
}