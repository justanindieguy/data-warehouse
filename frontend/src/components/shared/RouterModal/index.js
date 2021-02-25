import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';

const RouterModal = ({ title, content, actions, onDismiss }) => {
  const modalCard = useRef(null);
  useOutsideClickListener(modalCard, () => onDismiss());

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-background"></div>
      <div
        className="modal-card"
        onClick={(evt) => evt.stopPropagation()}
        ref={modalCard}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onDismiss}
          ></button>
        </header>
        <section className="modal-card-body">{content}</section>
        <footer className="modal-card-foot">{actions}</footer>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default RouterModal;
