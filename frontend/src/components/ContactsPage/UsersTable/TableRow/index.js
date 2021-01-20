import React from 'react';
import AccountBox from './AccountBox';
import ProgressBar from './ProgressBar';

const TableRow = ({ contact }) => {
  return (
    <tr>
      <th className="has-text-centered">
        <input type="checkbox" />
      </th>
      <th>
        <div className="is-flex">
          <figure className="image is-32x32">
            <img
              alt="Profile pic"
              className="is-rounded"
              src="https://bulma.io/images/placeholders/32x32.png"
            />
          </figure>
          <div className="ml-2">
            <h3 className="title is-size-6">
              {`${contact.name} ${contact.lastName}`}
            </h3>
            <p className="subtitle is-size-7 has-text-grey-light">
              {contact.email}
            </p>
          </div>
        </div>
      </th>
      <th>
        <div>
          <h3 className="title is-size-6">{contact.country}</h3>
          <p className="subtitle is-size-7 has-text-grey-light">
            {contact.region}
          </p>
        </div>
      </th>
      <th>
        <div>
          <h3 className="title is-size-6">{contact.company}</h3>
        </div>
      </th>
      <th>
        <div>
          <h3 className="title is-size-6">{contact.position}</h3>
        </div>
      </th>
      <th>
        <AccountBox contactId={contact.id} />
      </th>
      <th>
        <ProgressBar value={contact.interest} />
      </th>
      <th>
        <div className="has-text-centered">
          <i className="fas fa-ellipsis-h has-text-grey-light is-clickable" />
        </div>
      </th>
    </tr>
  );
};

export default TableRow;
