export function valida(input) {
    const tipoInput = input.dataset.tipo;

    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);


    }

}

const tipoErrores = [
    'valueMissing', 'typeMismatch', 'patternMismatch', 'customError'
];

const mensajesError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacío',
    },
    email: {
        valueMissing: 'Este campo no puede estar vacío',
        typeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minuscula, una letra mayuscula y no puede contener caracteres especiales',
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números',
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El campo debe contener entre 10 a 40 caracteres',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El campo debe contener entre 10 a 40 caracteres',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El campo debe contener entre 10 a 40 caracteres',
    }
    
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}



function mostrarMensajeError(tipoInput, input) {
    let mensaje = '';
    tipoErrores.forEach( error => {
        if(input.validity[error]){
          mensaje = mensajesError[tipoInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const difFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return difFechas < fechaActual;
}