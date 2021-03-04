import React, { useState, useEffect } from 'react';
import DeleteModal from '../../shared/DeleteModal';
import deleteContactIcon from '../../../assets/deleteContact.svg';
import api from '../../../apis/localApi';
import ContactField from './ContactField';

const DeleteContact = ({ match }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const contactId = match.params.id;

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await api.get(`/contacts/${contactId}`);
      setSelectedContact(data);
    };

    fetchContact();
  }, [contactId]);

  const renderContent = () => {
    return (
      <React.Fragment>
        <figure className="image is-128x128 mx-auto">
          <img src={deleteContactIcon} alt="Delete contact icon" />
        </figure>
        <h3 className="has-text-centered">
          ¿Estas seguro de que deseas eliminar el siguiente contacto?
        </h3>
        {selectedContact ? (
          <div className="block">
            <ContactField
              label="Nombre: "
              content={`${selectedContact.name} ${selectedContact.lastName}`}
            />
            <ContactField
              label="Correo electrónico: "
              content={selectedContact.email}
            />
            <ContactField
              label="Compañía: "
              content={selectedContact.company}
            />
            <ContactField
              label="Posición: "
              content={selectedContact.position}
            />
            <ContactField label="País: " content={selectedContact.country} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  };

  return (
    <DeleteModal
      title="Eliminar Contacto"
      content={renderContent()}
      originRoute="/contacts"
      onDeleteClick={() => console.log('Deleting...')}
    />
  );
};

export default DeleteContact;
