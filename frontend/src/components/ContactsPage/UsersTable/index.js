import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColumnWidth from './ColumnWidth';
import TableColumn from './TableColumn';
import TableRow from './TableRow';
import { fetchContacts } from '../../../actions';
import './styles.scss';

const labels = [
  { content: 'checkbox', type: 'input' },
  { content: 'Contacto', type: 'text', sortable: true },
  { content: 'País/Región', type: 'text', sortable: true },
  { content: 'Companía', type: 'text', sortable: true },
  { content: 'Cargo', type: 'text', sortable: true },
  { content: 'Canal preferido', type: 'text', sortable: false },
  { content: 'Interés', type: 'text', sortable: true },
  { content: 'Acciones', type: 'text', sortable: false },
];

class UsersTable extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  renderColumns = () => {
    return labels.map((label) => {
      return <TableColumn label={label} key={label.content} />;
    });
  };

  renderRows = () => {
    const { contacts } = this.props;

    return contacts.map((contact) => {
      return <TableRow contact={contact} key={contact.id} />;
    });
  };

  render() {
    if (this.props.contacts.length === 0) {
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
  return { contacts: state.contacts.items };
};

export default connect(mapStateToProps, { fetchContacts })(UsersTable);
