import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColumnWidth from './ColumnWidth';
import TableColumn from './TableColumn';
import TableRow from './TableRow';
import { fetchContactsAndAccounts, changeSortBy } from '../../../actions';
import './styles.scss';

const labels = [
  { content: 'checkbox', type: 'input' },
  { content: 'Contacto', type: 'text', sortable: true, sortBy: 'name' },
  { content: 'País/Región', type: 'text', sortable: true, sortBy: 'country' },
  { content: 'Companía', type: 'text', sortable: true, sortBy: 'company' },
  { content: 'Cargo', type: 'text', sortable: true, sortBy: 'position' },
  { content: 'Canal preferido', type: 'text', sortable: false },
  { content: 'Interés', type: 'text', sortable: true, sortBy: 'interest' },
  { content: 'Acciones', type: 'text', sortable: false },
];

class UsersTable extends Component {
  onClickColumn = (sortByValue) => {
    this.props.changeSortBy(sortByValue);
    this.props.fetchContactsAndAccounts();
  };

  renderColumns = () => {
    return labels.map((label) => {
      return (
        <TableColumn
          label={label}
          key={label.content}
          onClick={this.onClickColumn}
        />
      );
    });
  };

  renderRows = () => {
    const { contacts } = this.props;

    return contacts.map((contact) => {
      return <TableRow contact={contact} key={contact.id} />;
    });
  };

  render() {
    if (this.props.contacts.length === 0 || !this.props.accounts) {
      return <div>Loading ...</div>;
    }

    return (
      <table className="users-table">
        <colgroup>
          <ColumnWidth />
        </colgroup>
        <thead>
          <tr>{this.renderColumns()}</tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps, {
  fetchContactsAndAccounts,
  changeSortBy,
})(UsersTable);
