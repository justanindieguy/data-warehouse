import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../DeleteModal';
import api from '../../../apis/localApi';
import { deleteCity } from '../../../actions';

const DeleteCity = ({ match, deleteCity }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cityId = match.params.id;

  useEffect(() => {
    const fetchCity = async () => {
      const { data } = await api.get(`/cities/${cityId}`);
      setSelectedCity(data);
    };

    fetchCity();
  }, [cityId]);

  const renderMessage = () => {
    if (!selectedCity) {
      return null;
    }

    return (
      <React.Fragment>
        <h4 className="m-0">
          ¿Estás seguro que deseas eliminar la siguiente ciudad?
        </h4>
        <span>
          <b>{selectedCity.name}</b> perteneciente a{' '}
          <b>{selectedCity.countryName}</b>
        </span>
      </React.Fragment>
    );
  };

  return (
    <DeleteModal
      title="Eliminar Ciudad"
      message={renderMessage()}
      originRoute="/regions"
      onDeleteClick={() => deleteCity(cityId)}
    />
  );
};

export default connect(null, { deleteCity })(DeleteCity);
