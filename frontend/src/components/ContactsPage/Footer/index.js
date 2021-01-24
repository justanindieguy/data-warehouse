import React from 'react';
import { connect } from 'react-redux';
import {
  changeRowsPerPage,
  changeOffset,
  fetchContactsAndAccounts,
} from '../../../actions';
import Dropdown from '../../shared/Dropdown';

const dropdownItems = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

const Footer = (props) => {
  const { offset, limit, totalContacts } = props.queryInfo;
  const isInFirstPage = offset - limit < 0;
  const isInLastPage = offset + limit >= totalContacts;

  // Modifies the action when a dropdown item is selected.
  const onSelectDropdownItem = (value) => {
    props.changeRowsPerPage(value);
    props.fetchContactsAndAccounts();
  };

  const onClickNextPageBtn = () => {
    props.changeOffset(true);

    // If the user is in the last page and clicks the button don't fetch.
    if (!isInLastPage) {
      props.fetchContactsAndAccounts();
    }
  };

  const onClickPrevPageBtn = () => {
    props.changeOffset(false);

    // If the user is in the first page and clicks the button don't fetch.
    if (!isInFirstPage) {
      props.fetchContactsAndAccounts();
    }
  };

  const getRowsIndicator = () => {
    const lowerLimit = offset + 1;
    let upperLimit;

    if (offset + limit >= totalContacts) {
      upperLimit = offset + (totalContacts - offset);
    } else {
      upperLimit = offset + limit;
    }

    return `${lowerLimit}-${upperLimit} de ${totalContacts} filas`;
  };

  return (
    <div className="is-flex is-justify-content-space-between has-text-grey py-4">
      <div className="is-flex is-align-items-center">
        <p className="mr-2">Filas por página</p>
        <Dropdown
          items={dropdownItems}
          onSelectDropdownItem={onSelectDropdownItem}
        />
      </div>
      <div className="is-flex is-align-items-center">
        <p className="mr-6">{getRowsIndicator()}</p>
        <div className="is-flex">
          <i
            className={`fas fa-chevron-left is-block mr-2 is-clickable ${
              isInFirstPage ? 'has-text-grey-lighter' : ''
            }`}
            onClick={onClickPrevPageBtn}
          />
          <i
            className={`fas fa-chevron-right is-block ml-2 is-clickable ${
              isInLastPage ? 'has-text-grey-lighter' : ''
            }`}
            onClick={onClickNextPageBtn}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { queryInfo: state.contactsQuery };
};

export default connect(mapStateToProps, {
  changeRowsPerPage,
  changeOffset,
  fetchContactsAndAccounts,
})(Footer);
