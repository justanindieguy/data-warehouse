import React from 'react';
import { Form, Field } from 'react-final-form';
import FormInput from '../../shared/FormInput';
import PasswordInput from '../../shared/PasswordInput';
import {
  required,
  requireValidEmail,
  requireValidPassword,
  passwordsMustMatch,
  composeValidators,
} from '../../../validations';

const CreateUserForm = () => {
  const renderInput = (props, reactFormProps) => {
    return <FormInput {...props} {...reactFormProps} />;
  };

  const renderPasswordInput = (props, reactFormProps) => {
    return <PasswordInput {...props} {...reactFormProps} />;
  };

  return (
    <Form onSubmit={(formObj) => console.log(formObj)}>
      {({ handleSubmit, submitting, pristine, form, values, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" validate={required}>
            {(props) =>
              renderInput({ required: true, label: 'Nombre' }, props)
            }
          </Field>

          <Field name="lastName" validate={required}>
            {(props) =>
              renderInput({ required: true, label: 'Apellido' }, props)
            }
          </Field>

          <Field
            name="email"
            validate={composeValidators(required, requireValidEmail)}
          >
            {(props) =>
              renderInput(
                {
                  required: true,
                  label: 'Email',
                  type: 'email',
                  placeholder: 'user@email.com',
                  iconLeft: 'fa-envelope',
                },
                props
              )
            }
          </Field>

          <Field
            name="password"
            validate={composeValidators(required, requireValidPassword)}
          >
            {(props) => renderPasswordInput({ label: 'Contraseña' }, props)}
          </Field>

          <Field
            name="passwordConfirm"
            validate={composeValidators(
              required,
              passwordsMustMatch(values.password)
            )}
          >
            {(props) =>
              renderPasswordInput({ label: 'Confirmar contraseña' }, props)
            }
          </Field>

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                disabled={invalid || submitting}
                type="submit"
              >
                Enviar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={form.reset}
                disabled={submitting || pristine}
                type="button"
              >
                Limpiar campos
              </button>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default CreateUserForm;
