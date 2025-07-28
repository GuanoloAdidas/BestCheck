const params = new URLSearchParams(window.location.search);
const url = params.get("url");

if (!url) {
  document.getElementById("titulo").innerText = "URL no válida";
} else {
  fetch(url)
    .then(resp => resp.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title = doc.querySelector("h1.entry-title");
      document.getElementById("titulo").innerText = title ? title.innerText : "Sin título";

      const contenidoOriginal = doc.querySelector("div.entry-content");
      const contenido = document.getElementById("contenido");
      if (contenidoOriginal) {
        contenido.innerHTML = contenidoOriginal.innerHTML;
      } else {
        contenido.innerHTML = "<p class='error'>No se pudo extraer el contenido.</p>";
      }
    })
    .catch(err => {
      document.getElementById("titulo").innerText = "Error al cargar";
      document.getElementById("contenido").innerHTML = `<p class="error">${err}</p>`;
    });
}
