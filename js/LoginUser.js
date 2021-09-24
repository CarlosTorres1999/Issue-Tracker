let userName = document.getElementById("inputUser");
let pass = document.getElementById("password-login");


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
        localStorage.setItem("datos", g_data);
            
        
    } else if(userName.value === admin.userName && pass.value === admin.password){
       admin.estaLogeado = true;
       g_data.usuarioLogueado = admin;
       alert("logueado como administrador");
       localStorage.setItem("datos", g_data);
       fnRedirigirAlUserDashboard();
    }else{

    }
}
const fnRedirigirAlUserDashboard = () => {
    location.assign("./pages/UsersDashboard.html")
}

const obtener_usuario_logueado = () =>
{
    return g_data.usuarioLogueado;
}