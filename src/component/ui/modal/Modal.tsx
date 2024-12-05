import React, { useEffect, ReactNode, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';
import { Button } from '@/component/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, className, closeOnOverlayClick = true }, ref) => {
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div className={s.overlay} onClick={closeOnOverlayClick ? onClose : undefined}>
        <div
          ref={ref}
          className={`${s.modal} ${className || ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <div className={s.title}>{title}</div>}
          <Button className={s.closeButton} onClick={onClose} aria-label="Close">
            &times;
          </Button>
          <div className={s.content}>{children}</div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';
