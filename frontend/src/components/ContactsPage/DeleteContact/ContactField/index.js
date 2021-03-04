import React from 'react';

const ContactField = ({ label, content }) => {
  return (
    <p>
      <b>{label}</b>
      {content}
    </p>
  );
};

export default ContactField;
