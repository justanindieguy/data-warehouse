import { useEffect } from 'react';

const useOutsideClickListener = (ref, handleClickOutside) => {
  useEffect(() => {
    function onClick(evt) {
      if (ref.current && !ref.current.contains(evt.target)) {
        handleClickOutside();
      }
    }

    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [ref, handleClickOutside]);
};

export default useOutsideClickListener;
