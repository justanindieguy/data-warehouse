import React from 'react';

const AccountBox = ({ accounts }) => {
  const classes =
    'button is-small is-link is-light is-size-7 has-text-weight-normal';

  let accountsToShow;
  let renderedAccounts;
  if (accounts.length > 1) {
    accountsToShow = accounts.slice(0, 2);
    renderedAccounts = accountsToShow.map((account) => {
      return (
        <div
          className={`${classes} mr-1`}
          key={`${account.contactId}-${account.channelId}-${account.accountValue}`}
        >
          {account.channelName}
        </div>
      );
    });
  } else {
    accountsToShow = Array(2).fill({ channelName: 'Pending' });
    renderedAccounts = accountsToShow.map((account, idx) => {
      return (
        <div className={`${classes} mr-1`} key={idx}>
          {account.channelName}
        </div>
      );
    });
  }

  const getAccounts = () => {
    if (accounts.length === 1) {
      return <div className={classes}>{accounts[0].channelName}</div>;
    }

    if (accounts.length === 2) {
      return renderedAccounts;
    }

    if (accounts.length > 2 || !accounts.length) {
      return (
        <React.Fragment>
          {renderedAccounts}
          <i className="fas fa-ellipsis-h has-text-grey-light is-clickable" />
        </React.Fragment>
      );
    }
  };

  return <div className="is-flex is-align-items-center">{getAccounts()}</div>;
};

export default AccountBox;
