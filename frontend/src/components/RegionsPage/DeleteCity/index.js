import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../../shared/DeleteModal';
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

  const renderContent = () => {
    return (
      <div className="icon-text is-flex is-align-items-center">
        <span className="icon is-large has-text-danger">
          <i className="fas fa-trash-alt" />
        </span>
        <span>
          <h4 className="m-0">
            ¿Estás seguro que deseas eliminar la siguiente ciudad?
          </h4>
          {selectedCity ? (
            <div>
              <b>{selectedCity.name}</b> perteneciente a{' '}
              <b>{selectedCity.countryName}</b>
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
      title="Eliminar Ciudad"
      content={renderContent()}
      originRoute="/regions"
      onDeleteClick={() => deleteCity(cityId)}
    />
  );
};

export default connect(null, { deleteCity })(DeleteCity);
