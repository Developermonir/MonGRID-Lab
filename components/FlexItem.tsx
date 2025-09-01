import React from 'react';

interface FlexItemProps {
  id: number;
  style: React.CSSProperties;
  isSelected: boolean;
  onClick: () => void;
  onResizeStart: (direction: string, event: React.MouseEvent<HTMLDivElement>) => void;
}

const FlexItem: React.FC<FlexItemProps> = ({ id, style, isSelected, onClick, onResizeStart }) => {
  
  const handleMouseDownOnResize = (direction: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onResizeStart(direction, e);
  };

  const resizeHandleBaseClasses = 'absolute bg-primary z-10';

  return (
    <div
      style={style}
      onClick={onClick}
      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 bg-surface-2 border-2 ${isSelected ? 'border-primary shadow-2xl shadow-primary/30' : 'border-surface-3 hover:border-surface-3/50'}`}
    >
      <div className={`absolute top-2 left-2 w-6 h-6 flex items-center justify-center text-xs rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-surface-3 text-text-secondary'}`}>
        {id}
      </div>
      {isSelected && (
        <>
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          
          {/* Side handles */}
          <div className={`${resizeHandleBaseClasses} h-1 w-5 top-[-2px] left-1/2 -translate-x-1/2 cursor-n-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('n', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} h-1 w-5 bottom-[-2px] left-1/2 -translate-x-1/2 cursor-s-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('s', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} w-1 h-5 top-1/2 -translate-y-1/2 left-[-2px] cursor-w-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('w', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} w-1 h-5 top-1/2 -translate-y-1/2 right-[-2px] cursor-e-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('e', e)} title="Resize" />

          {/* Corner handles */}
          <div className={`${resizeHandleBaseClasses} w-3 h-3 top-[-5px] left-[-5px] cursor-nw-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('nw', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} w-3 h-3 top-[-5px] right-[-5px] cursor-ne-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('ne', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} w-3 h-3 bottom-[-5px] left-[-5px] cursor-sw-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('sw', e)} title="Resize" />
          <div className={`${resizeHandleBaseClasses} w-3 h-3 bottom-[-5px] right-[-5px] cursor-se-resize rounded-full`} onMouseDown={(e) => handleMouseDownOnResize('se', e)} title="Resize" />
        </>
      )}
    </div>
  );
};

export default FlexItem;
