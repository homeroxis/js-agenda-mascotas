// variables
const form = document.querySelector('form');
const inputName = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');
const containerCitas = document.querySelector('#citas');

eventListaner();
function eventListaner() {
  form.addEventListener('submit', submitNuevaCita);
  // leyendo los input
  inputName.addEventListener('change', formDataObj);
  inputPropietario.addEventListener('change', formDataObj);
  inputTelefono.addEventListener('change', formDataObj);
  inputFecha.addEventListener('change', formDataObj);
  inputSintomas.addEventListener('change', formDataObj);
}

class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
}

class UI {
  // mostrar alerta
  mostrarAlerta(msg, tipo) {
    const divAlerta = document.createElement('div');
    divAlerta.classList.add('alert', 'text-center', 'my-2');
    divAlerta.innerText = msg;
    if (tipo === 'error') {
      divAlerta.classList.add('alert-danger');
    } else {
      divAlerta.classList.add('alert-success');
    }
    // insertar en el html
    document.querySelector('h1').parentElement.appendChild(divAlerta);
    // sacar la alerta
    setTimeout(() => {
      divAlerta.remove();
    }, 3000);
  }

  // imprimir citas en la clase
  imprimirCita({ citas }) {
    limpiarHTML(containerCitas);
    citas.forEach((cita) => {
      const { nombre, propietario, telefono, fecha, sintomas } = cita;
      const divCita = document.createElement('div');
      divCita.classList.add('mb-4');
      divCita.innerHTML = `
        <div>
          <h4>${ nombre }</h4>
          <b>Propietario: </b> ${ propietario } <br />
          <b>Teléfono: </b> ${ telefono } <br />
          <b>Fecha: </b> ${ fecha } <br />
          <b>Síntomas: </b> ${ sintomas } 
        <div/>
      `
      // crear botones
      const divBtn = document.createElement('div');
      divBtn.classList.add('d-flex', 'justify-content-between');
      
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'my-2');
      btnEliminar.innerText = 'eliminar';

      divBtn.appendChild(btnEliminar);
      divCita.appendChild(divBtn);


      // mostrar en html
      containerCitas.appendChild(divCita);
      console.log('desde forEach', cita);
    });
  }
}

let administrarCitas = new Citas();
let ui = new UI();

const citasObj = {
  nombre: '',
  propietario: '',
  telefono: '',
  fecha: '',
  sintomas: '',
};

function submitNuevaCita(e) {
  e.preventDefault();
  // validaciones
  if (
    inputName.value === '' ||
    inputPropietario.value === '' ||
    inputTelefono.value === '' ||
    inputFecha.value === '' ||
    inputSintomas.value === ''
  ) {
    ui.mostrarAlerta('Campos no pueden ir vacíos', 'error');
    return;
  }

  // mandando objeto a la clase
  ui.mostrarAlerta('Cita registrada correctamente');
  administrarCitas.agregarCita({ ...citasObj });
  form.reset();
  limpiarObj();

  // imprimir cita
  ui.imprimirCita(administrarCitas);
}

function formDataObj(e) {
  citasObj[e.target.name] = e.target.value;
}

function limpiarObj() {
  citasObj.nombre = '';
  citasObj.propietario = '';
  citasObj.telefono = '';
  citasObj.fecha = '';
  citasObj.sintomas = '';
}

function limpiarHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}