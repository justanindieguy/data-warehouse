const createTable = ({ root, fetchData, getColumns, renderOption }) => {
  root.innerHTML = `
  <table class="table">
    ${getColumns()}
    <tbody></tbody>
  </table>
  `;

  const tableHead = root.querySelector('thead');
  const tableBody = root.querySelector('tbody');
  const sortColumns = [];
  const sortAscStatus = {};

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
        const sortBy = field;
        const ascending = sortAscStatus[field] ? 'true' : 'false';
        const icon = column.querySelector('i');

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
  };

  const fetchAndRender = async (sortBy, ascending) => {
    let items;

    if (sortBy && ascending) {
      items = await fetchData(10, 0, sortBy, ascending);
    } else {
      items = await fetchData(10, 0);
    }

    if (!items.length) {
      return;
    }

    tableBody.innerHTML = '';

    for (let item of items) {
      const row = renderOption(item);
      tableBody.appendChild(row);
    }
  };

  getSortColumns();
  addEventListeners();
  fetchAndRender();
};
