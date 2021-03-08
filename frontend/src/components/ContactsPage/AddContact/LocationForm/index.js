import React, { useState, useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';
import FinalFormInput from '../../../shared/FinalFormInput';
import SelectInput from '../../../shared/SelectInput';
import FormInput from '../../../shared/FormInput';
import RangeInput from '../../../shared/RangeInput';
import api from '../../../../apis/localApi';

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
        <FinalFormInput name="region" defaultValue="DEFAULT">
          <SelectInput
            label="Región:"
            disabled={!fetchedRegions.length}
            loading={!fetchedRegions.length}
            required={true}
            renderOptions={() =>
              renderOptions('Selecciona una región', fetchedRegions)
            }
          />
        </FinalFormInput>
        <OnChange name="region">
          {(value) => {
            form.change('country', 'DEFAULT');
            setSelectedRegion(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="country" defaultValue="DEFAULT">
          <SelectInput
            label="País:"
            disabled={!selectedRegion || !fetchedCountries.length}
            loading={selectedRegion && !fetchedCountries.length}
            required={true}
            renderOptions={() =>
              renderOptions('Selecciona un país', fetchedCountries)
            }
          />
        </FinalFormInput>
        <OnChange name="country">
          {(value) => {
            form.change('city', 'DEFAULT');

            value === 'DEFAULT'
              ? setSelectedCountry(null)
              : setSelectedCountry(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="city" defaultValue="DEFAULT">
          <SelectInput
            label="Ciudad:"
            disabled={!selectedCountry || !fetchedCountries.length}
            loading={selectedCountry && !fetchedCities.length}
            required={true}
            renderOptions={() =>
              renderOptions('Selecciona una ciudad', fetchedCities)
            }
          />
        </FinalFormInput>
        <OnChange name="city">
          {(value) => {
            value === 'DEFAULT'
              ? setSelectedCity(null)
              : setSelectedCity(value);
          }}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="address">
          <FormInput
            required={true}
            label="Dirección:"
            placeholder="Ingresa una dirección"
            disabled={!selectedRegion || !selectedCountry || !selectedCity}
          />
        </FinalFormInput>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="interest">
          <RangeInput label="Interés:" min="0" max="100" step="25" />
        </FinalFormInput>
      </div>
    </div>
  );
};

export default LocationForm;
