import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { closeModal } from '../../../actions';
import './styles.scss';

const Modal = ({ opened }) => {
  console.log(opened);

  const renderModal = () => {
    if (opened) {
      return (
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-card" onClick={(evt) => evt.stopPropagation()}>
            <header className="modal-card-head">
              <p className="modal-card-title">Modal Title</p>
              <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eum
              quidem repellat quaerat beatae, quasi molestiae unde amet dicta
              magnam explicabo ullam officiis facere sunt nemo quas impedit
              minus ducimus!
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Ok</button>
            </footer>
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
  return { opened: state.modal };
};

export default connect(mapStateToProps, { closeModal })(Modal);
