const createTable = async ({ root, fetchData, getColumns, renderOption }) => {
  root.innerHTML = `
    <table class="table">
      ${getColumns()}
      <tbody></tbody>
    </table>

    <div class="table-footer has-text-grey is-flex is-justify-content-space-between is-align-items-center">
      <div class="is-flex is-align-items-center">
        <p>Filas por página</p>
        <div class="dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="button-text">10</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item">
                10
              </a>
              <a class="dropdown-item">
                15
              </a>
              <a class="dropdown-item">
                20
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="is-flex is-align-items-center">
        <p class="page-info"></p>
        <div class="ml-6 is-unselectable">
          <i class="fas fa-chevron-left left mr-2 is-clickable"></i>
          <i class="fas fa-chevron-right right ml-2 mr-2 is-clickable"></i>
        </div>
      </div>
    </div
  `;

  // Table elements.
  const tableHead = root.querySelector('thead');
  const tableBody = root.querySelector('tbody');
  const sortColumns = [];
  const sortAscStatus = {};

  // Dropdown elements.
  const dropdown = root.querySelector('.dropdown');
  const dropdownButton = root.querySelector('.dropdown button');
  const dropdownButtonContent = root.querySelector('.button-text');
  const dropdownMenu = root.querySelector('.dropdown-menu');

  // Page elements.
  const leftButton = root.querySelector('.left');
  const rightButton = root.querySelector('.right');
  const pageInfo = root.querySelector('.page-info');

  // Query variables.
  let sortBy = 'name';
  let ascending = 'true';
  let offset = 0;
  let limit = 10;
  let total = null;

  const getSortColumns = () => {
    const columns = Array.from(tableHead.querySelectorAll('th'));

    for (let column of columns) {
      const field = column.dataset.field;

      if (field) {
        sortColumns.push(column);
        sortAscStatus[field] = true;
      }
    }

    sortAscStatus[sortColumns[0].dataset.field] = false;
  };

  const addEventListeners = () => {
    for (let column of sortColumns) {
      column.addEventListener('click', () => {
        const field = column.dataset.field;
        const icon = column.querySelector('i');
        sortBy = field;
        ascending = sortAscStatus[field] ? 'true' : 'false';

        if (sortAscStatus[field]) {
          sortAscStatus[field] = false;
          icon.classList.remove('fa-sort-amount-up');
          icon.classList.add('fa-sort-amount-down');
        } else {
          sortAscStatus[field] = true;
          icon.classList.remove('fa-sort-amount-down');
          icon.classList.add('fa-sort-amount-up');
        }

        fetchAndRender(sortBy, ascending);
      });
    }

    dropdownButton.addEventListener('click', () => {
      dropdown.classList.toggle('is-active');
    });

    dropdownMenu.addEventListener('click', (evt) => {
      limit = parseInt(evt.target.textContent.trim());

      dropdown.classList.remove('is-active');
      dropdownButtonContent.textContent = limit;

      fetchAndRender(sortBy, ascending);
    });

    leftButton.addEventListener('click', () => {
      if (offset !== 0) {
        offset -= limit;
      }

      fetchAndRender(sortBy, ascending);
    });

    rightButton.addEventListener('click', () => {
      if (offset + limit < total) {
        offset += limit;
      }

      fetchAndRender(sortBy, ascending);
    });
  };

  const showOrHideArrows = () => {
    offset === 0
      ? leftButton.classList.add('is-hidden')
      : leftButton.classList.remove('is-hidden');

    offset + limit >= total
      ? rightButton.classList.add('is-hidden')
      : rightButton.classList.remove('is-hidden');
  };

  const updateLimit = () => (total < 10 ? (limit = total) : (limit = 10));

  const fetchAndRender = async (sortBy, ascending) => {
    let data;

    if (sortBy && ascending) {
      data = await fetchData(limit, offset, sortBy, ascending);
    } else {
      data = await fetchData(limit, offset);
    }

    const { items } = data; // Getting an array of all the rows.
    total = data.total; // Updating the value of total rows.

    if (!items.length) {
      return;
    }

    // Rendering items on screen.
    tableBody.innerHTML = '';

    for (let item of items) {
      const row = renderOption(item);
      tableBody.appendChild(row);
    }

    // Updating page info.
    pageInfo.textContent = `${offset + 1}-${offset + limit} de ${total} filas`;

    showOrHideArrows();
  };

  getSortColumns();
  addEventListeners();
  await fetchAndRender(sortBy, ascending);
  updateLimit();
};
