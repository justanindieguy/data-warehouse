import React, { useRef } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { closeModal } from '../../../actions';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import './styles.scss';

const Modal = ({ title, content, footer, opened, closeModal }) => {
  const modalCard = useRef(null);

  useOutsideClickListener(modalCard, () => closeModal());

  const renderModal = () => {
    if (opened) {
      return (
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
                onClick={closeModal}
              ></button>
            </header>
            <section className="modal-card-body">{content}</section>
            <footer className="modal-card-foot">{footer}</footer>
          </div>
        </div>
      );
    }

    return null;
  };

  return ReactDOM.createPortal(
    renderModal(),
    document.querySelector('#modal-root')
  );
};

const mapStateToProps = (state) => {
  return { opened: state.modal.opened };
};

export default connect(mapStateToProps, { closeModal })(Modal);
