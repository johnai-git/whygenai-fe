import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}