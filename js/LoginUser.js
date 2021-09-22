let userName = document.getElementById("inputUser");
let pass = document.getElementById("password-login");


const obtener_usuario = () => {
    const user_temp = g_usuarios.find(user => user.userName === userName.value &&
                user.password === pass.value);
            
    console.log();
    if (user_temp === undefined){
        alert("credenciales no validas");
    } else {
        alert("logueado con exito");
    }
}