window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector("form")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")

  // Aquí en este punto yo me encargo de mandar a llamar las funciones de normalizar texto y validaciónes
 inputEmail.addEventListener("blur", (e) => isEmpty( `⚠️ Se requiere que ingrese su ${inputEmail.name}` , e))
inputPassword.addEventListener("blur", (e) => isEmpty( `⚠️ requiere que ingrese su ${inputPassword.name}` , e))

// 👇🏼 Ojo el evento aqui es el input... no es blur
inputEmail.addEventListener("input", validarEmail)
inputPassword.addEventListener("input", validarContrasenia)

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        // console.log("Preparando datos");




        
        const datos = {
            email: inputEmail.value,
            password: inputPassword.value
        }
        // console.log(datos);

        realizarLogin(datos)
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(datos) {
       const URL = "https://todo-api.ctd.academy/v1"
        const path = "/users/login"
        let URI = URL + path

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }

        fetch(URI, config)
            .then( response => {
                // console.log(response);
                return response.json()
            })
            .then( resJS => {
                // console.log(resJS.jwt);

                if (resJS.jwt) {
                    localStorage.setItem("jwt", resJS.jwt)
                    location.replace("mis-tareas.html")                    
                }
            } )
            .catch( err  => {
                console.log(err)
                alert(err.message)
            })


    };
});