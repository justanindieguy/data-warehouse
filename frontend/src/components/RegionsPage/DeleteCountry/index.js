import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../../shared/DeleteModal';
import api from '../../../apis/localApi';
import { deleteCountry } from '../../../actions';

const DeleteCountry = ({ match, deleteCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countryId = match.params.id;

  useEffect(() => {
    const fetchCountry = async () => {
      const { data } = await api.get(`/countries/${countryId}`);
      setSelectedCountry(data);
    };

    fetchCountry();
  }, [countryId]);

  const renderContent = () => {
    if (!selectedCountry) {
      return <div>Loading...</div>;
    }

    return (
      <div className="icon-text is-flex is-align-items-center">
        <span className="icon is-large has-text-danger">
          <i className="fas fa-trash-alt" />
        </span>
        <span>
          <h4 className="m-0">
            ¿Estás seguro que deseas eliminar el siguiente país?
          </h4>
          {selectedCountry ? (
            <div>
              <b>{selectedCountry.name}</b> perteneciente a{' '}
              <b>{selectedCountry.regionName}</b>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </span>
      </div>
    );
  };

  return (
    <DeleteModal
      title="Eliminar País"
      content={renderContent()}
      originRoute="/regions"
      onDeleteClick={() => deleteCountry(countryId)}
    />
  );
};

export default connect(null, { deleteCountry })(DeleteCountry);
