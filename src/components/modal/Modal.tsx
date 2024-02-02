import React, { PropsWithChildren, useCallback, useEffect } from 'react';

import styled from 'styled-components';

import IModalProps from './types';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 997;
  animation: show 0.4s forwards;
`;

const StyledModalBody = styled.div`
  width: 40%;
  padding: 2em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
  z-index: 998;
`;

const Modal = ({ visible = false, hide, children }: PropsWithChildren<IModalProps>) => {
  const hideModal = useCallback(
    (e: PointerEvent) => {
      hide(e);
    },
    [hide]
  );

  useEffect(() => {
    if (!visible) return;

    const modalElement: HTMLElement | null = document.querySelector('.modal');

    const modalListener = (e: PointerEvent & { target: { className: string; tagName: string } }) => {
      const { target } = e;
      if (!target.className.includes('modal__overlay')) return false;
      hideModal(e);
    };

    if (modalElement) modalElement.addEventListener('click', modalListener);

    return () => {
      modalElement.removeEventListener('click', modalListener);
    };
  }, [visible, hideModal]);

  return (
    visible && (
      <StyledModal className="modal">
        <StyledModalBody className="modal__body">{children}</StyledModalBody>
        <StyledModalOverlay className="modal__overlay"></StyledModalOverlay>
      </StyledModal>
    )
  );
};

export default Modal;
