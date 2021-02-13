import React from 'react';
import { Field } from 'react-final-form';
import { composeValidators } from '../../../validations';

const FinalFormInput = ({ children, name, validators }) => {
  return (
    <Field name={name} validate={composeValidators(...validators)}>
      {(props) => {
        const inputWithProps = React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props });
          }

          return child;
        });

        return inputWithProps;
      }}
    </Field>
  );
};

export default FinalFormInput;
