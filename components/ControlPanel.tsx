
import React, { ChangeEvent } from 'react';
import { FlexItemType, FlexContainerStyle, ControlTab } from '../types';
import {
  FLEX_DIRECTION_OPTIONS,
  FLEX_WRAP_OPTIONS,
  JUSTIFY_CONTENT_OPTIONS,
  ALIGN_ITEMS_OPTIONS,
  ALIGN_CONTENT_OPTIONS,
  ALIGN_SELF_OPTIONS,
  ICONS,
} from '../constants';
// FIX: Import IconButton component
import IconButton from './IconButton';

interface ControlProps {
  activeTab: ControlTab;
  setActiveTab: (tab: ControlTab) => void;
  containerStyle: FlexContainerStyle;
  onContainerChange: (property: keyof FlexContainerStyle, value: string) => void;
  selectedItem: FlexItemType | undefined;
  onItemChange: (property: keyof React.CSSProperties, value: string | number) => void;
}

const ControlPanel: React.FC<ControlProps> = ({
  activeTab,
  setActiveTab,
  containerStyle,
  onContainerChange,
  selectedItem,
  onItemChange,
}) => {
  
  const handleItemStyleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onItemChange(name as keyof React.CSSProperties, value);
  };
  
  const handleContainerStyleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      onContainerChange(name as keyof FlexContainerStyle, value);
  };


  const renderSelect = (label: string, property: keyof React.CSSProperties, options: string[], value: any, handler: any) => (
    <div className="p-3 bg-surface-2 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <IconButton tooltip={`About ${label}`}>{ICONS.info}</IconButton>
      </div>
      <select
        name={property}
        value={value || ''}
        onChange={handler}
        className="mt-2 w-full bg-surface-3 border border-surface-3 text-text-primary text-sm rounded-md focus:ring-primary focus:border-primary block p-2"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const renderInput = (label: string, property: keyof React.CSSProperties, value: any, handler: any, type: string = "number", unit?: string) => (
    <div className="p-3 bg-surface-2 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <IconButton tooltip={`About ${label}`}>{ICONS.info}</IconButton>
      </div>
      <div className="flex items-center mt-2">
         <input
          type={type}
          name={property}
          value={value || ''}
          onChange={handler}
          className="w-full bg-surface-3 border border-surface-3 text-text-primary text-sm rounded-md focus:ring-primary focus:border-primary block p-2"
        />
        {unit && <span className="ml-2 text-text-secondary">{unit}</span>}
      </div>
    </div>
  );
  
  const renderGapInput = () => (
    <div className="p-3 bg-surface-2 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-text-primary">Gap</label>
        <IconButton tooltip="Gap between items">{ICONS.info}</IconButton>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="number"
          name="gap"
          value={String(containerStyle.gap || '8').replace('px', '')}
          onChange={(e) => onContainerChange('gap', `${e.target.value}px`)}
          className="w-full bg-surface-3 border border-surface-3 text-text-primary text-sm rounded-md focus:ring-primary focus:border-primary block p-2"
        />
        <span className="ml-2 text-text-secondary">px</span>
      </div>
    </div>
  );

  const containerControls = (
    <div className="space-y-3">
      {renderSelect('Flex Direction', 'flexDirection', FLEX_DIRECTION_OPTIONS, containerStyle.flexDirection, handleContainerStyleChange)}
      {renderSelect('Flex Wrap', 'flexWrap', FLEX_WRAP_OPTIONS, containerStyle.flexWrap, handleContainerStyleChange)}
      {renderSelect('Justify Content', 'justifyContent', JUSTIFY_CONTENT_OPTIONS, containerStyle.justifyContent, handleContainerStyleChange)}
      {renderSelect('Align Items', 'alignItems', ALIGN_ITEMS_OPTIONS, containerStyle.alignItems, handleContainerStyleChange)}
      {renderSelect('Align Content', 'alignContent', ALIGN_CONTENT_OPTIONS, containerStyle.alignContent, handleContainerStyleChange)}
      {renderGapInput()}
    </div>
  );

  const itemControls = (
    <div className={`space-y-3 ${!selectedItem ? 'opacity-50 pointer-events-none' : ''}`}>
      {!selectedItem && <div className="text-center text-text-secondary p-4">Select an item to edit its properties.</div>}
      {renderInput('Order', 'order', selectedItem?.styles.order, handleItemStyleChange)}
      {renderInput('Flex Grow', 'flexGrow', selectedItem?.styles.flexGrow, handleItemStyleChange)}
      {renderInput('Flex Shrink', 'flexShrink', selectedItem?.styles.flexShrink, handleItemStyleChange)}
      {renderInput('Flex Basis', 'flexBasis', selectedItem?.styles.flexBasis, handleItemStyleChange, 'text')}
      {renderSelect('Align Self', 'alignSelf', ALIGN_SELF_OPTIONS, selectedItem?.styles.alignSelf, handleItemStyleChange)}
      {renderInput('Width', 'width', selectedItem?.styles.width, handleItemStyleChange, 'text')}
      {renderInput('Height', 'height', selectedItem?.styles.height, handleItemStyleChange, 'text')}
    </div>
  );


  return (
    <div className="bg-surface-1 w-80 p-4 flex flex-col h-full border-l border-surface-2">
      <div className="flex bg-surface-2 p-1 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab(ControlTab.Container)}
          className={`flex-1 p-2 text-sm rounded-md transition-colors ${activeTab === ControlTab.Container ? 'bg-primary text-white' : 'hover:bg-surface-3'}`}
        >
          Container
        </button>
        <button
          onClick={() => setActiveTab(ControlTab.Items)}
          className={`flex-1 p-2 text-sm rounded-md transition-colors ${activeTab === ControlTab.Items ? 'bg-primary text-white' : 'hover:bg-surface-3'}`}
        >
          Items
        </button>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {activeTab === ControlTab.Container ? containerControls : itemControls}
      </div>
    </div>
  );
};

export default ControlPanel;
