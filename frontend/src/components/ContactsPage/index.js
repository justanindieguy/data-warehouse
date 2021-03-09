import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import NoResults from '../shared/NoResults';
import ContactsTable from './ContactsTable';
import Footer from './Footer';
import { fetchContactsAndAccounts } from '../../actions';

class ContactsPage extends Component {
  componentDidMount() {
    this.props.fetchContactsAndAccounts();
  }

  render() {
    return (
      <div className="container is-fluid">
        <Header />

        {this.props.contacts.length === 0 ? (
          <NoResults icon="fa-frown" message="Intenta añadiendo un contacto" />
        ) : (
          <React.Fragment>
            <ContactsTable contacts={this.props.contacts} />
            <Footer />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { contacts: state.contacts };
};

export default connect(mapStateToProps, { fetchContactsAndAccounts })(
  ContactsPage
);
