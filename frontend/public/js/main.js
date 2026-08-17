const formulario = document.getElementById("formulario");

// NOMBRE
const nombre = document.getElementById("nombre");

// PASSWORD
const password = document.getElementById("password");

// VALIDACIONES
const validaciones = {
  nombre: {
    regla: /^[A-Za-z0-9]+$/,
    mensaje: "Nombre inválido, solo puede contener letras y números",
    es_valido: false,
  },
  password: {
    regla:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,}$/,
    mensaje:
      "Contraseña inválida, debe contener al menos una mayúscula, un caracter especial, un número y una minuscula, mínimo 5 digitos",
    es_valido: false,
  },
  password_confirmacion: {
    regla:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,}$/,
    mensaje:
      "Contraseña inválida, debe contener al menos una mayúscula, un caracter especial, un número y una minuscula, mínimo 5 digitos",
    es_valido: false,
  },
};

function validarCampo(id, valor) {
  const error = document.getElementById(`error-${id}`)

  if (validaciones[id].regla.test(valor)) {
    validaciones[id].es_valido = true;
    error.innerText = "";
  } else {
    validaciones[id].es_valido = false;
    error.innerText = validaciones[id].mensaje;
  }
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  // VALIDACIÓN NOMBRE VERSION EFICAZ
  validarCampo("nombre", nombre.value)
  validarCampo("password", password.value)


  // VALIDACIÓN FORMULARIO
  if (validaciones["nombre"].es_valido) {
    // ENVIAR INFORMACIÓN AL BACKEND
    console.log(
      `${nombre.value} ha pasado las validaciones`,
    );
  }
});
