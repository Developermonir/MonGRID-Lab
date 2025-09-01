import React from 'react';
import { FlexItemType, FlexContainerStyle } from '../types';
import FlexItem from './FlexItem';
import IconButton from './IconButton';
import { ICONS } from '../constants';

interface WorkspaceProps {
  items: FlexItemType[];
  containerStyle: FlexContainerStyle;
  selectedItemId: number | null;
  onSelectItem: (id: number) => void;
  onAddItem: () => void;
  onDuplicateItem: () => void;
  onDeleteItem: () => void;
  onShowCode: () => void;
  onResizeStart: (id: number, direction: string, event: React.MouseEvent<HTMLDivElement>) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  items,
  containerStyle,
  selectedItemId,
  onSelectItem,
  onAddItem,
  onDuplicateItem,
  onDeleteItem,
  onShowCode,
  onResizeStart
}) => {
  return (
    <main className="flex-1 bg-surface-0 flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 p-1 bg-surface-1 rounded-xl border border-surface-2">
          <IconButton onClick={onAddItem} tooltip="Add Item">
            {ICONS.plus}
          </IconButton>
          <IconButton onClick={onDuplicateItem} tooltip="Duplicate Item" disabled={!selectedItemId}>
            {ICONS.copy}
          </IconButton>
          <IconButton onClick={onDeleteItem} tooltip="Delete Item" disabled={!selectedItemId}>
            {ICONS.trash}
          </IconButton>
        </div>
        <button 
          onClick={onShowCode}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg text-sm text-white transition-colors">
            {ICONS.code}
            View Code
        </button>
      </div>
      <div className="flex-1 bg-grid-pattern rounded-2xl p-4 overflow-auto border border-surface-2" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #374151 1px, rgba(0, 0, 0, 0) 1px)'}}>
        <div
          style={containerStyle}
          className="w-full h-full"
        >
          {items.map(item => (
            <FlexItem
              key={item.id}
              id={item.id}
              style={item.styles}
              isSelected={item.id === selectedItemId}
              onClick={() => onSelectItem(item.id)}
              onResizeStart={(direction, event) => onResizeStart(item.id, direction, event)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Workspace;
