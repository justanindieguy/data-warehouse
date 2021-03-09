import React, { useState, useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';
import FinalFormInput from '../../../shared/FinalFormInput';
import SelectInput from '../../../shared/SelectInput';
import FormInput from '../../../shared/FormInput';
import RangeInput from '../../../shared/RangeInput';
import api from '../../../../apis/localApi';
import { required, noDefaults } from '../../../../validations';

const values = [
  { label: '0%', value: 0 },
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100%', value: 100 },
];

const LocationForm = ({ form }) => {
  const [fetchedRegions, setFetchedRegions] = useState([]);
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const [fetchedCities, setFetchedCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      const { data } = await api.get('/regions');
      setFetchedRegions(data);
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!selectedRegion) {
        return;
      }

      const { data } = await api.get('/countries', {
        params: { regionId: selectedRegion },
      });
      setFetchedCountries(data);
    };

    fetchCountries();
  }, [selectedRegion]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry) {
        return;
      }

      const { data } = await api.get('/cities', {
        params: { countryId: selectedCountry },
      });
      setFetchedCities(data);
    };

    fetchCities();
  }, [selectedCountry]);

  const renderOptions = (defaultOption, placesArr) => {
    return (
      <React.Fragment>
        <option value="DEFAULT" disabled>
          {defaultOption}
        </option>
        {!placesArr.length
          ? null
          : placesArr.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
      </React.Fragment>
    );
  };

  return (
    <div className="contact-location columns">
      <div className="column is-one-fifth">
        <FinalFormInput
          name="regionId"
          defaultValue="DEFAULT"
          validators={[noDefaults]}
        >
          <SelectInput
            required
            label="Región:"
            disabled={!fetchedRegions.length}
            loading={!fetchedRegions.length}
            renderOptions={() =>
              renderOptions('Selecciona una región', fetchedRegions)
            }
          />
        </FinalFormInput>
        <OnChange name="regionId">
          {(value) => {
            form.change('countryId', 'DEFAULT');
            setSelectedRegion(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput
          name="countryId"
          defaultValue="DEFAULT"
          validators={[noDefaults]}
        >
          <SelectInput
            required
            label="País:"
            disabled={!selectedRegion || !fetchedCountries.length}
            loading={selectedRegion && !fetchedCountries.length}
            renderOptions={() =>
              renderOptions('Selecciona un país', fetchedCountries)
            }
          />
        </FinalFormInput>
        <OnChange name="countryId">
          {(value) => {
            form.change('cityId', 'DEFAULT');

            value === 'DEFAULT'
              ? setSelectedCountry(null)
              : setSelectedCountry(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput
          name="cityId"
          defaultValue="DEFAULT"
          validators={[noDefaults]}
        >
          <SelectInput
            required
            label="Ciudad:"
            disabled={!selectedCountry || !fetchedCountries.length}
            loading={selectedCountry && !fetchedCities.length}
            renderOptions={() =>
              renderOptions('Selecciona una ciudad', fetchedCities)
            }
          />
        </FinalFormInput>
        <OnChange name="cityId">
          {(value) => {
            value === 'DEFAULT'
              ? setSelectedCity(null)
              : setSelectedCity(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="address" validators={[required]}>
          <FormInput
            required
            label="Dirección:"
            placeholder="Ingresa una dirección"
            disabled={!selectedRegion || !selectedCountry || !selectedCity}
          />
        </FinalFormInput>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="interest" defaultValue={0} required>
          <RangeInput
            label="Interés:"
            min="0"
            max="100"
            step="25"
            form={form}
            fieldName="interest"
            values={values}
          />
        </FinalFormInput>
      </div>
    </div>
  );
};

export default LocationForm;
