
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  tooltip?: string;
  isActive?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ children, tooltip, isActive = false, ...props }) => {
  const activeClasses = isActive ? 'bg-primary text-white' : 'bg-surface-2 text-text-secondary hover:bg-surface-3 hover:text-text-primary';
  
  return (
    <div className="relative group">
      <button
        {...props}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-1 ${activeClasses} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
      {tooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 bg-surface-3 text-text-primary text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default IconButton;
