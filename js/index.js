const contenedor = document.getElementById("contenedor");

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.fastcheck.cl/feed/")
  .then(response => response.json())
  .then(data => {
    data.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "noticia";

      const urlInterna = "noticia.html?url=" + encodeURIComponent(item.link);

      div.innerHTML = `
        <a href="${urlInterna}">${item.title}</a>
        <p class="fecha">${new Date(item.pubDate).toLocaleDateString("es-CL", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}</p>
        <p>${item.description}</p>
      `;

      contenedor.appendChild(div);
    });
  })
  .catch(error => {
    contenedor.innerHTML = `<p>Error al cargar noticias: ${error}</p>`;
  });
