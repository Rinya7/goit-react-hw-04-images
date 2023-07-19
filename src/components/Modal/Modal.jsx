import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalCss, Overlay } from './Modal.styled';

export function Modal({ closeModal, children }) {
  const handelKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);
    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, [() => closeModal()]);

  const handleClickOnBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleClickOnBackdrop}>
      <ModalCss>{children}</ModalCss>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};
