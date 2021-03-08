import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import './styles.scss';

const ContentModal = ({ content, onDismiss }) => {
  const modalContent = useRef(null);
  useOutsideClickListener(modalContent, () => onDismiss());

  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content" ref={modalContent}>
        {content}
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default ContentModal;
