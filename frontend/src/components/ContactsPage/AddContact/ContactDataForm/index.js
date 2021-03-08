import React, { useCallback } from 'react';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import AutocompleteInput from '../../../shared/AutocompleteInput';
import api from '../../../../apis/localApi';

const ContactDataForm = () => {
  const searchCompanies = useCallback(async (debouncedTerm) => {
    if (!debouncedTerm) {
      return [];
    }

    let data;
    try {
      const response = await api.get('/companies', {
        params: {
          searchTerm: `${debouncedTerm}%`,
          limit: 5,
        },
      });

      data = response.data;
    } catch (err) {
      data = [];
    }

    return data;
  }, []);

  const renderCompanies = (companies, setSelectedItem) => {
    return companies.map((company) => {
      return (
        <div
          className="dropdown-item is-unselectable"
          key={company.id}
          onClick={() => setSelectedItem(company)}
        >
          {company.name}
        </div>
      );
    });
  };

  return (
    <div className="contact-data columns is-relative">
      <div className="column">
        <figure className="image is-96x96">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Contact profile pic."
            className="is-rounded"
          />
        </figure>
      </div>
      <div className="column">
        <FinalFormInput name="name">
          <FormInput required={true} label="Nombre:" />
        </FinalFormInput>
      </div>
      <div className="column">
        <FinalFormInput name="lastName">
          <FormInput required={true} label="Apellido:" />
        </FinalFormInput>
      </div>
      <div className="column">
        <FinalFormInput name="position">
          <FormInput required={true} label="Cargo: " />
        </FinalFormInput>
      </div>
      <div className="column">
        <FinalFormInput name="email">
          <FormInput required={true} label="Email: " />
        </FinalFormInput>
      </div>
      <div className="column">
        <div className="field">
          <label className="label">Compañía:</label>
          <AutocompleteInput
            name="companyId"
            placeholder="Ingresa nombre de compañía"
            onDebouncedTermChange={searchCompanies}
            renderResults={renderCompanies}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDataForm;
