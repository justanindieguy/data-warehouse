const createMessage = ({ root, title, content, onAccept }) => {
  root.innerHTML = `
    <article class="message is-success column is-two-fifths">
      <div class="message-header">
        <p>${title}</p>
      </div>
      <div class="message-body">
        <div>
          ${content}
        </div>
        <br/>
        <button class="button is-success">Aceptar</button>
      </div>
    </article>
  `;

  root.classList.remove('is-hidden');

  const acceptButton = root.querySelector('button');

  acceptButton.addEventListener('click', onAccept);
};
