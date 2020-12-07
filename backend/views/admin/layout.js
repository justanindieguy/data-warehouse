module.exports = ({ content, styleRoute }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Layout</title>

      <!-- Font Awesome -->
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossorigin="anonymous"
      />

      <!-- Bulma CSS -->
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css"
        integrity="sha512-ZRv40llEogRmoWgZwnsqke3HNzJ0kiI0+pcMgiz2bxO6Ew1DVBtWjVn0qjrXdT3+u+pSN36gLgmJiiQ3cQtyzA=="
        crossorigin="anonymous"
      />

      <!-- CSS -->
      <link rel="stylesheet" href="${styleRoute}" />

      <!-- Google Fonts -->
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
        rel="stylesheet"
      />

      <!-- Axios -->
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    </head>

    <body>
      <nav class="navbar is-link" aria-label="main navigation">
        <div class="navbar-bran">
          <a href="/" class="navbar-item">LOGO</a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <a href="./contacts" class="navbar-item">Contactos</a>
            <a href="./companies" class="navbar-item">Compañías</a>
            <a href="./users" class="navbar-item">Usuarios</a>
            <a href="./regions" class="navbar-item">Región / Ciudad</a>
          </div>
        </div>
      </nav>

      ${content}
    </body>
  </html>
  `;
