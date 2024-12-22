const form = document.querySelector("#formulario");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let esValido=true;

  const nombre = document.querySelector("#nombre");
  const errorNombre = document.querySelector("#errorNombre");
  if (nombre.value.length < 4) {
    nombre.style.border = "1px solid red";
    errorNombre.textContent = "El nombre debe tener 4 caracteres";
    esValido=false
  } else {
    errorNombre.textContent = "";
    nombre.style.border = "1px solid green";
  }

  const mailInvalido = document.querySelector("#email");
  const errorMail = document.querySelector("#errorMail");
  if (mailInvalido.value.length < 5) {
    mailInvalido.style.border = "1px solid red";
    errorMail.textContent = "El mail debe tener 5 caracteres";
    esValido=false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailInvalido.value)) {
    mailInvalido.style.border = "1px solid red";
    errorMail.textContent =
      "El formato del correo es inválido. Debe ser algo como nombre@dominio.com.";
      esValido=false
  } else {
    mailInvalido.style.border = "1px solid green";
    errorMail.textContent = "";
  }


  const mensaje = document.querySelector("#mensaje");
  const errorMensaje = document.querySelector("#errorMensaje");
  if (mensaje.value.length < 10) {
    mensaje.style.border = "1px solid red";
    errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres";
    esValido=false
  } else {
    errorMensaje.textContent = "";
    mensaje.style.border = "1px solid green";
  }

  if (esValido) {
    form.submit();
  }
});
