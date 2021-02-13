import React from 'react';
import { Form } from 'react-final-form';
import FinalFormInput from '../../shared/FinalFormInput';
import FormInput from '../../shared/FormInput';
import PasswordInput from '../../shared/PasswordInput';
import {
  required,
  requireValidEmail,
  requireValidPassword,
  passwordsMustMatch,
} from '../../../validations';
import { registerUser } from '../../../actions/registerUser';

const CreateUserForm = () => {
  return (
    <Form onSubmit={registerUser}>
      {(props) => {
        return (
          <form onSubmit={props.handleSubmit}>
            <FinalFormInput name="name" validators={[required]}>
              <FormInput required={true} label="Nombre" />
            </FinalFormInput>

            <FinalFormInput name="lastName" validators={[required]}>
              <FormInput required={true} label="Apellido" />
            </FinalFormInput>

            <FinalFormInput
              name="email"
              validators={[required, requireValidEmail]}
            >
              <FormInput
                required={true}
                label="Email"
                type="email"
                placeholder="user@email.com"
                iconLeft="fa-envelope"
              />
            </FinalFormInput>

            <FinalFormInput
              name="password"
              validators={[required, requireValidPassword]}
            >
              <PasswordInput label="Contraseña" />
            </FinalFormInput>

            <FinalFormInput
              name="passwordConfirm"
              validators={[required, passwordsMustMatch(props.values.password)]}
            >
              <PasswordInput label="Confirmar contraseña" />
            </FinalFormInput>

            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-link"
                  disabled={
                    props.hasValidationErrors ||
                    (props.hasSubmitErrors && !props.dirtySinceLastSubmit)
                  }
                  type="submit"
                >
                  Enviar
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-link is-light"
                  onClick={props.form.reset}
                  disabled={props.submitting || props.pristine}
                  type="button"
                >
                  Limpiar campos
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </Form>
  );
};

export default CreateUserForm;
