// variables
const form = document.querySelector('form');
const inputName = document.querySelector('#nombre');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputSintomas = document.querySelector('#sintomas');
const containerCitas = document.querySelector('#citas');
const buttonSubmit = document.querySelector('button[type="submit"]');
let editar;

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
  borrarCita(id) {
    this.citas = this.citas.filter( cita => cita.id !== id );
    ui.mostrarAlerta('Cita borrada exitósamente')
  }
  modificarCita(obj){
    const { nombre, propietario, telefono, fecha, sintomas, id } = obj;
    this.citas = this.citas.map( cita => cita.id === id ? obj : cita  )

    console.log('desde la clase', this.citas);

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
      const { nombre, propietario, telefono, fecha, sintomas, id } = cita;
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
      divBtn.classList.add('d-flex');
      // crear btn eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'my-2', 'me-1');
      btnEliminar.innerText = 'eliminar';
      // crear btn editar
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info', 'my-2');
      btnEditar.innerText = 'editar';

      btnEliminar.onclick = () => {
        eliminarCita(id)
      };
      
      btnEditar.onclick = () => {
        editarCita(cita)
      };

      divBtn.appendChild(btnEliminar);
      divBtn.appendChild(btnEditar);
      divCita.appendChild(divBtn);


      // mostrar en html
      containerCitas.appendChild(divCita);
      // console.log('desde forEach', cita);
    });
  }
}

let administrarCitas = new Citas();
let ui = new UI();

const citaObj = {
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

  if(editar){
    editar = false;
    buttonSubmit.innerText = 'Ingresar';
    // mandando objeto a la clase
    administrarCitas.modificarCita({...citaObj});
    // mensaje éxito
    ui.mostrarAlerta('Cita editada correctamente');
  } else {
     // asignando un id al objeto
    citaObj.id = Date.now();
    // mandando objeto a la clase
    administrarCitas.agregarCita({ ...citaObj });
    // mensaje éxito
    ui.mostrarAlerta('Cita registrada correctamente');
  }
 
  // resetear formulario y limpiear el objeto
  form.reset();
  limpiarObj();

  // imprimir cita
  ui.imprimirCita(administrarCitas);
}

function formDataObj(e) {
  // llena el objeto con el cambio del input
  citaObj[e.target.name] = e.target.value;
}

function limpiarObj() {
  citaObj.nombre = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.sintomas = '';
}

function limpiarHTML(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function eliminarCita(id) {
  administrarCitas.borrarCita(id);
  // imprimir cita
  ui.imprimirCita(administrarCitas);
}

function editarCita(cita) {
  const { nombre, propietario, telefono, fecha, sintomas, id } = cita;

  editar = true;

  inputName.value = nombre;
  inputPropietario.value = propietario;
  inputTelefono.value = telefono;
  inputFecha.value = fecha;
  inputSintomas.value = sintomas;

  citaObj.nombre = nombre;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  buttonSubmit.innerText = 'Editar';
  
}
