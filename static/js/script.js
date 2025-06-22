// app.js
import { productos } from './product.js';

const menuContainer = document.getElementById("menu-container");

document.getElementById('enter-site').addEventListener('click', function () {
  const splash = document.getElementById('splash-screen');
  splash.classList.add('fade-out');

  setTimeout(() => {
    splash.style.display = 'none';
  }, 700);
});

function mostrarProductos(filtro = "Todos") {
  menuContainer.innerHTML = "";

  const filtrados = filtro === "Todos"
    ? productos
    : productos.filter(p => p.categoria === filtro);

  filtrados.forEach(prod => {
    const producto = document.createElement("div");
    producto.classList.add("producto");

    producto.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <div>
        <div class="nombre">${prod.nombre}</div>
        <div class="precio">
          $${prod.precio}
        </div>
      </div>
    `;

    menuContainer.appendChild(producto);
  });
}

mostrarProductos();

document.querySelectorAll("[data-categoria]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const categoria = btn.getAttribute("data-categoria");

    document.querySelectorAll("#category-nav .nav-link").forEach(el => el.classList.remove("active"));
    if (btn.classList.contains("nav-link")) {
      btn.classList.add("active");
    }

    mostrarProductos(categoria);
    cerrarMenu();
  });
});

// Menú lateral
const menuBtn = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
  sideMenu.style.left = "0";
  overlay.style.display = "block";
});

overlay.addEventListener("click", cerrarMenu);
closeBtn.addEventListener("click", cerrarMenu);

function cerrarMenu() {
  sideMenu.style.left = "-250px";
  overlay.style.display = "none";
}
