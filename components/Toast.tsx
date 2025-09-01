
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="bg-surface-2 border border-surface-3 rounded-lg shadow-lg px-4 py-3 flex items-center gap-4 text-sm text-text-primary">
        <div className="text-primary">{ICONS.check}</div>
        <span>{message}</span>
        <div className="w-px h-5 bg-surface-3 mx-2"></div>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
          {ICONS.x}
        </button>
      </div>
    </div>
  );
};

export default Toast;
