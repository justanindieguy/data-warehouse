import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';

const ContentModal = ({ content, onDismiss }) => {
  const modalContent = useRef(null);
  useOutsideClickListener(modalContent, () => onDismiss());

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">{content}</div>
      <button className="modal-close is-large"></button>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default ContentModal;
