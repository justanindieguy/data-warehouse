import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../DeleteModal';
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

  const renderMessage = () => {
    if (!selectedCountry) {
      return null;
    }

    return (
      <React.Fragment>
        <h4 className="m-0">
          ¿Estás seguro que deseas eliminar el siguiente país?
        </h4>
        <span>
          <b>{selectedCountry.name}</b> perteneciente a{' '}
          <b>{selectedCountry.regionName}</b>
        </span>
      </React.Fragment>
    );
  };

  return (
    <DeleteModal
      title="Eliminar País"
      message={renderMessage()}
      originRoute="/regions"
      onDeleteClick={() => deleteCountry(countryId)}
    />
  );
};

export default connect(null, { deleteCountry })(DeleteCountry);
