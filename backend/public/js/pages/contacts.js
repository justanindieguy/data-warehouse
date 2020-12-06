const tableRoot = document.querySelector('.table-container');
createTable({
  root: tableRoot,
  fetchData: async (limit, offset, sortBy, ascending) => {
    try {
      const { data } = await axios.get('/api/v1/contacts', {
        params: { limit, offset, sortBy, ascending },
      });

      return data;
    } catch (err) {
      console.error(err);
      return;
    }
  },
  getColumns: () => {
    return `
    <colgroup>
      <col span="1" style="width: 5%" />
      <col span="1" style="width: 20%" />
      <col span="1" style="width: 12.5%" />
      <col span="1" style="width: 12.5%" />
      <col span="1" style="width: 12.5%" />
      <col span="1" style="width: 15%" />
      <col span="1" style="width: 15%" />
      <col span="1" style="width: 7.5%" />
    </colgroup>
    <thead>
      <tr>
        <th class="check-input">
          <input type="checkbox" />
        </th>
        <th class="sortable" data-field="name">
          <span>Contacto</span>
          <i class="fas fa-sort-amount-down"></i>
        </th>
        <th class="sortable" data-field="country">
          <span>País/Región</span>
          <i class="fas fa-sort-amount-down"></i>
        </th>
        <th class="sortable" data-field="company">
          <span>Compañía</span>
          <i class="fas fa-sort-amount-down"></i>
        </th>
        <th class="sortable" data-field="position">
          <span>Cargo</span>
          <i class="fas fa-sort-amount-down"></i>
        </th>
        <th>
          <span>Canal preferido</span>
        </th>
        <th class="sortable" data-field="interest">
          <span>Interés</span>
          <i class="fas fa-sort-amount-down"></i>
        </th>
        <th>
          <span>Acciones</span>
        </th>
      </tr>
    </thead>
    `;
  },
  renderOption: (item) => {
    const {
      id,
      name,
      lastNameOne,
      lastNameTwo,
      email,
      country,
      region,
      position,
      interest,
      company,
      accounts,
    } = item;

    const fullName = lastNameTwo
      ? `${name} ${lastNameOne} ${lastNameTwo}`
      : `${name} ${lastNameOne}`;

    const row = document.createElement('tr');
    row.setAttribute('data-id', String(id));
    row.innerHTML = `
      <th class="check-input">
        <input type="checkbox" />
      </th>

      <th class="contact-info is-flex is-align-items-center">
        <figure class="image is-32x32">
          <img
            src="https://bulma.io/images/placeholders/32x32.png"
            alt="Demo"
          />
        </figure>
        <div class="contact-text">
          <p class="title is-6">${fullName}</p>
          <p class="subtitle is-6 has-text-grey-light">
            ${email}
          </p>
        </div>
      </th>

      <th>
        <p class="title is-6">${country}</p>
        <p class="subtitle is-6 has-text-grey-light">${region}</p>
      </th>

      <th>
        <p class="title is-6">${company}</p>
      </th>

      <th>
        <p class="title is-6">${position}</p>
      </th>

      <th class="accounts"></th>

      <th>
        <div class="interest-bar">
          <p>${interest}%</p>
          <progress class="progress is-small" value="${interest}" max="100">
            ${interest}
          </progress>
        </div>
      </th>

      <th class="has-text-centered">
        <i class="fas fa-ellipsis-h has-text-grey-light is-clickable"></i>
      </th>
    `;

    const accountsContainer = row.querySelector('.accounts');
    const interestBar = row.querySelector('progress');

    if (accounts.length === 0) {
      const accountDiv = document.createElement('div');
      accountDiv.classList.add(
        'channel',
        'has-background-warning-light',
        'has-text-dark'
      );
      accountDiv.innerText = 'Sin canales';
      accountsContainer.appendChild(accountDiv);
    } else if (accounts.length === 1) {
      const accountDiv = document.createElement('div');
      accountDiv.classList.add(
        'channel',
        'has-background-info-light',
        'mx-1',
        'has-text-link'
      );
      accountDiv.innerText = `${accounts[0].channelName}`;
      accountsContainer.appendChild(accountDiv);
    } else {
      for (let i = 0; i < 2; i += 1) {
        const accountDiv = document.createElement('div');
        accountDiv.classList.add(
          'channel',
          'has-background-info-light',
          'mx-1',
          'has-text-link'
        );
        accountDiv.innerText = `${accounts[i].channelName}`;
        accountsContainer.appendChild(accountDiv);
      }

      const seeMore = document.createElement('i');
      seeMore.classList.add('fas', 'fa-ellipsis-h', 'has-text-grey-light');
      accountsContainer.appendChild(seeMore);
    }

    switch (interest) {
      case 100:
        interestBar.classList.add('is-danger');
        break;
      case 75:
        interestBar.classList.add('is-orange');
        break;
      case 50:
        interestBar.classList.add('is-warning');
        break;
      case 25:
        interestBar.classList.add('is-info');
        break;
    }

    return row;
  },
});
