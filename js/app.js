const formulario = document.querySelector(".formulario"),
  email = document.querySelector("#email"),
  asunto = document.querySelector("#asunto"),
  mensaje = document.querySelector("#mensaje"),
  btnReset = document.querySelector(".reset"),
  btnEnviar = document.querySelector(".enviar"),
  spinner = document.querySelector(".spinner"),
  emailObj = {
    email: "",
    asunto: "",
    mensaje: "",
  };

email.addEventListener("input", validarFormulario);
asunto.addEventListener("input", validarFormulario);
mensaje.addEventListener("input", validarFormulario);
btnReset.addEventListener("click", (e) => {
  e.preventDefault();

  resetForm();
});
formulario.addEventListener("submit", enviarEmail);

function validarFormulario(e) {
  const referencia = e.target.parentElement;
  if (e.target.value.trim() === "") {
    mostrarAlerta(`El campo ${e.target.id} los es obligatorio`, referencia);
    emailObj[e.target.name] = "";
    comprobrarEmailObj();
    return;
  }

  if (e.target.id === "email" && !validarEmail(e.target.value)) {
    mostrarAlerta("Eso no parece una dirección de Email ;-) ", referencia);
    emailObj[e.target.name] = "";
    comprobrarEmailObj();
    return;
  }

  limpiarAlerta(referencia);

  emailObj[e.target.name] = e.target.value.trim().toLowerCase();

  comprobrarEmailObj();
}

function mostrarAlerta(mensaje, referencia) {
  limpiarAlerta(referencia);

  const error = document.createElement("p");
  error.textContent = mensaje;
  error.classList.add(
    "error",
    "text-white",
    "bg-red-600",
    "text-center",
    "font-bold",
    "py-2",
    "rounded-md",
    "my-2"
  );
  referencia.appendChild(error);
}

function limpiarAlerta(referencia) {
  const alerta = referencia.querySelector(".error");
  if (alerta) {
    alerta.remove();
  }
}

function validarEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(email);
  return resultado;
}

function comprobrarEmailObj() {
  if (Object.values(emailObj).includes("")) {
    btnEnviar.classList.add("opacity-50");
    btnEnviar.disabled = true;
    return;
  }

  btnEnviar.classList.remove("opacity-50");
  btnEnviar.disabled = false;
}

function enviarEmail(e) {
  e.preventDefault();

  spinner.classList.remove("hidden");
  spinner.classList.add("flex");

  setTimeout(() => {
    spinner.classList.remove("flex");
    spinner.classList.add("hidden");

    resetForm();
  }, 3000);
}

function resetForm() {
  emailObj.email = "";
  emailObj.asunto = "";
  emailObj.mensaje = "";

  formulario.reset();
  comprobrarEmailObj();
}
