const layout = require('../layout');

module.exports = () =>
  layout({
    content: `
      <div class="container register-container">
        <div class="columns is-centered">
          <div class="column is-half">
            <form method="POST" id="register"></form>
          </div>
        </div>
      </div>

      <div id="message-container" class="columns is-hidden"></div>

      <script src="js/components/message.js"></script>
      <script src="js/components/registerForm.js"></script>
      <script src="js/pages/users.js"></script>
    `,
    styleRoute: 'css/register.css',
  });
