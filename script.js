// script.js - lógica en JavaScript 
(function(){
  const $ = (sel) => document.querySelector(sel);

  // Elementos
  const btnBienvenida = $('#btnBienvenida');
  const btnCambiarFondo = $('#btnCambiarFondo');
  const btnCambiarParrafo = $('#btnCambiarParrafo');
  const panel = $('#panel');
  const parrafo = $('#parrafoDestacado');
  const formPerfil = $('#formPerfil');
  const nombre = $('#nombre');
  const correo = $('#correo');
  const bio = $('#bio');
  const btnLimpiar = $('#btnLimpiar');

  const formPendiente = $('#formPendiente');
  const inputPendiente = $('#inputPendiente');
  const errorPendiente = $('#errorPendiente');
  const btnAgregarPendiente = $('#btnAgregarPendiente');
  const listaPendientes = $('#listaPendientes');

  const btnTemaClaro = $('#btnTemaClaro');
  const btnTemaOscuro = $('#btnTemaOscuro');

  // 1) Alerta de bienvenida
  btnBienvenida?.addEventListener('click', () => {
    alert('¡Bienvenido! Este es el perfil de Ernesto Salvador.');
  });

  // 2) Cambiar color de fondo del panel + guardar en localStorage
  const CLAVE_TEMA = 'temaPanel';
  function aplicarTemaGuardado(){
    const tema = localStorage.getItem(CLAVE_TEMA);
    if(tema === 'alt'){ panel.classList.add('panel-alt'); }
  }
  aplicarTemaGuardado();

  btnCambiarFondo?.addEventListener('click', () => {
    panel.classList.toggle('panel-alt');
    const tema = panel.classList.contains('panel-alt') ? 'alt' : 'base';
    localStorage.setItem(CLAVE_TEMA, tema);
  });

  // 3) Cambiar contenido de un <p>
  btnCambiarParrafo?.addEventListener('click', () => {
    parrafo.textContent = 'Se actualizó el texto de demostración con un botón. Todo correcto.';
  });

  // 4) Agregar dinámicamente elementos a una lista
  btnAgregarPendiente?.addEventListener('click', () => {
    const valor = (inputPendiente.value || '').trim();
    if(!valor){
      inputPendiente.classList.add('is-invalid');
      errorPendiente.style.display = 'block';
      return;
    }
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = valor;
    listaPendientes.appendChild(li);
    inputPendiente.value = '';
    inputPendiente.classList.remove('is-invalid');
    errorPendiente.style.display = 'none';
  });

  inputPendiente?.addEventListener('input', () => {
    inputPendiente.classList.remove('is-invalid');
    errorPendiente.style.display = 'none';
  });

  // 5) Validación del formulario + guardar/precargar datos
  const CLAVE_FORM = 'datosPerfil';
  function precargarFormulario(){
    try{
      const raw = localStorage.getItem(CLAVE_FORM);
      if(!raw) return;
      const datos = JSON.parse(raw);
      nombre.value = datos.nombre || '';
      correo.value = datos.correo || '';
      bio.value = datos.bio || '';
    }catch(e){ /* nada */ }
  }
  precargarFormulario();

  formPerfil?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let ok = true;

    if(!nombre.value.trim()){
      nombre.classList.add('is-invalid'); ok = false;
    }else nombre.classList.remove('is-invalid');

    const correoVal = correo.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoVal)){
      correo.classList.add('is-invalid'); ok = false;
    }else correo.classList.remove('is-invalid');

    if(!bio.value.trim()){
      bio.classList.add('is-invalid'); ok = false;
    }else bio.classList.remove('is-invalid');

    if(!ok) return;

    const datos = { nombre: nombre.value.trim(), correo: correoVal, bio: bio.value.trim() };
    localStorage.setItem(CLAVE_FORM, JSON.stringify(datos));
    alert('Datos guardados en el navegador.');
  });

  btnLimpiar?.addEventListener('click', () => {
    [nombre, correo, bio].forEach(i => { i.value=''; i.classList.remove('is-invalid'); });
    localStorage.removeItem(CLAVE_FORM);
  });

  // 6) Tema claro/oscuro del panel (se mantiene por localStorage arriba)
  btnTemaClaro?.addEventListener('click', () => {
    panel.classList.remove('panel-alt');
    localStorage.setItem(CLAVE_TEMA, 'base');
  });
  btnTemaOscuro?.addEventListener('click', () => {
    panel.classList.add('panel-alt');
    localStorage.setItem(CLAVE_TEMA, 'alt');
  });
})();