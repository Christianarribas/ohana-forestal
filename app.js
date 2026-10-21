/* ================================================================
   OHANA FORESTAL - JavaScript
   ----------------------------------------------------------------
   ÍNDICE
   01. Menú móvil (abrir y cerrar)
   02. Marcar en el menú la sección que se está viendo
   03. Animación de aparición al hacer scroll
   04. Formulario de contacto (aviso de envío de demostración)
   05. Año automático en el pie
   En WordPress/Gutenberg casi todo esto lo hacen los bloques solos;
   este archivo sirve para la versión en HTML.
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 01. MENÚ MÓVIL ---------- */
  var botonMenu = document.getElementById('boton-menu');
  var menuPrincipal = document.getElementById('menu-principal');

  if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener('click', function () {
      var abierto = menuPrincipal.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    // Cerrar el menú al pulsar un enlace
    menuPrincipal.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        menuPrincipal.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 02. SECCIÓN ACTIVA EN EL MENÚ ---------- */
  var enlacesMenu = document.querySelectorAll('.menu-enlace');
  var secciones = [];

  enlacesMenu.forEach(function (enlace) {
    var destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) { secciones.push({ enlace: enlace, destino: destino }); }
  });

  function marcarSeccionActiva() {
    var posicion = window.scrollY + 120;
    secciones.forEach(function (item) {
      var arriba = item.destino.offsetTop;
      var abajo = arriba + item.destino.offsetHeight;
      var dentro = posicion >= arriba && posicion < abajo;
      item.enlace.classList.toggle('activo', dentro);
    });
  }

  window.addEventListener('scroll', marcarSeccionActiva);
  marcarSeccionActiva();

  /* ---------- 03. APARICIÓN AL HACER SCROLL ---------- */
  var cosasQueAparecen = document.querySelectorAll(
    '.punto, .tarjeta, .foto-marcador, .nosotros-imagen, .nosotros-texto, .contacto-datos, .formulario'
  );

  cosasQueAparecen.forEach(function (elemento) { elemento.classList.add('aparece'); });

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  cosasQueAparecen.forEach(function (elemento) { observador.observe(elemento); });

  /* ---------- 04. FORMULARIO DE CONTACTO ----------
     En la web real lo envía un bloque de formulario de WordPress.
     Aquí solo muestra el aviso para ver cómo queda. */
  var formulario = document.getElementById('formulario-contacto');
  var aviso = document.getElementById('formulario-aviso');

  if (formulario && aviso) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      aviso.hidden = false;
      formulario.reset();
    });
  }

  /* ---------- 05. AÑO AUTOMÁTICO ---------- */
  var ano = document.getElementById('ano-actual');
  if (ano) { ano.textContent = new Date().getFullYear(); }

});
