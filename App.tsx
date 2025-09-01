import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FlexItemType, FlexContainerStyle, ControlTab } from './types';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import Workspace from './components/Workspace';
import Toast from './components/Toast';
import CodeModal from './components/CodeModal';

const initialItems: FlexItemType[] = [
  { id: 1, styles: { width: '150px', height: '100px' } },
  { id: 2, styles: { width: '100px', height: '150px' } },
  { id: 3, styles: { width: '200px', height: '120px' } },
];

const initialContainerStyle: FlexContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  gap: '8px',
};

interface ResizingState {
  id: number;
  direction: string;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
}

const App: React.FC = () => {
    const [items, setItems] = useState<FlexItemType[]>(initialItems);
    const [containerStyle, setContainerStyle] = useState<FlexContainerStyle>(initialContainerStyle);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<ControlTab>(ControlTab.Container);
    const [nextId, setNextId] = useState(4);
    
    const [toastInfo, setToastInfo] = useState({ show: false, message: '' });
    const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
    const [resizingState, setResizingState] = useState<ResizingState | null>(null);
    // FIX: Use a more specific type for originalFlexWrap to match React.CSSProperties['flexWrap']. This resolves a TypeScript error on line 133 when setting the container style.
    const [originalFlexWrap, setOriginalFlexWrap] = useState<React.CSSProperties['flexWrap']>(initialContainerStyle.flexWrap);


    const handleSelectItem = useCallback((id: number) => {
        setSelectedItemId(prevId => (prevId === id ? null : id));
        if (id !== selectedItemId) {
            setActiveTab(ControlTab.Items);
            setToastInfo({ show: true, message: `Item ${id} selected` });
        }
    }, [selectedItemId]);

    const handleContainerChange = useCallback((property: keyof FlexContainerStyle, value: string) => {
        setContainerStyle(prev => ({ ...prev, [property]: value }));
    }, []);

    const handleItemChange = useCallback((property: keyof React.CSSProperties, value: string | number) => {
        if (!selectedItemId) return;
        setItems(prev => prev.map(item => 
            item.id === selectedItemId ? { ...item, styles: { ...item.styles, [property]: value } } : item
        ));
    }, [selectedItemId]);
    
    const handleAddItem = () => {
        const newItem: FlexItemType = {
            id: nextId,
            styles: { width: '120px', height: '120px' },
        };
        setItems(prev => [...prev, newItem]);
        setNextId(prev => prev + 1);
        handleSelectItem(newItem.id);
    };

    const handleDuplicateItem = () => {
        const selectedItem = items.find(item => item.id === selectedItemId);
        if (!selectedItem) return;
        const newItem: FlexItemType = {
            ...selectedItem,
            id: nextId,
        };
        setItems(prev => [...prev, newItem]);
        setNextId(prev => prev + 1);
        handleSelectItem(newItem.id);
    };

    const handleDeleteItem = () => {
        if (!selectedItemId) return;
        setItems(prev => prev.filter(item => item.id !== selectedItemId));
        setSelectedItemId(null);
    };
    
    const handleResizeStart = (id: number, direction: string, e: React.MouseEvent<HTMLDivElement>) => {
        const itemToResize = items.find(item => item.id === id);
        if (!itemToResize) return;

        setOriginalFlexWrap(containerStyle.flexWrap);
        setContainerStyle(prev => ({ ...prev, flexWrap: 'nowrap' }));

        const parsePixels = (val: any): number => {
            if (typeof val === 'string') {
                const parsed = parseInt(val, 10);
                return isNaN(parsed) ? 100 : parsed;
            }
            if (typeof val === 'number') return val;
            return 100;
        };

        setResizingState({
            id,
            direction,
            initialX: e.clientX,
            initialY: e.clientY,
            initialWidth: parsePixels(itemToResize.styles.width),
            initialHeight: parsePixels(itemToResize.styles.height),
        });
    };

    useEffect(() => {
        if (!resizingState) return;

        const handleResizeMove = (e: MouseEvent) => {
            if (!resizingState) return;
            const dx = e.clientX - resizingState.initialX;
            const dy = e.clientY - resizingState.initialY;
            
            let newWidth = resizingState.initialWidth;
            let newHeight = resizingState.initialHeight;

            if (resizingState.direction.includes('e')) {
                newWidth = resizingState.initialWidth + dx;
            } else if (resizingState.direction.includes('w')) {
                newWidth = resizingState.initialWidth - dx;
            }

            if (resizingState.direction.includes('s')) {
                newHeight = resizingState.initialHeight + dy;
            } else if (resizingState.direction.includes('n')) {
                newHeight = resizingState.initialHeight - dy;
            }

            setItems(prev => prev.map(item => 
                item.id === resizingState.id ? { ...item, styles: { ...item.styles, width: `${Math.max(20, newWidth)}px`, height: `${Math.max(20, newHeight)}px` } } : item
            ));
        };

        const handleResizeEnd = () => {
            setContainerStyle(prev => ({ ...prev, flexWrap: originalFlexWrap }));
            setResizingState(null);
        };

        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', handleResizeEnd);

        return () => {
            window.removeEventListener('mousemove', handleResizeMove);
            window.removeEventListener('mouseup', handleResizeEnd);
        };
    }, [resizingState, originalFlexWrap]);


    const selectedItem = useMemo(() => items.find(item => item.id === selectedItemId), [items, selectedItemId]);

    const generateCSS = () => {
        let css = `.container {\n`;
        for (const [key, value] of Object.entries(containerStyle)) {
            const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
            css += `  ${kebabKey}: ${value};\n`;
        }
        css += `}\n\n`;

        items.forEach(item => {
            css += `.item-${item.id} {\n`;
            for (const [key, value] of Object.entries(item.styles)) {
                if(value !== undefined && value !== null && value !== '') {
                    const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
                    css += `  ${kebabKey}: ${value};\n`;
                }
            }
            css += `}\n\n`;
        });
        return css;
    };

    const generateHTML = () => {
        let html = `<div class="container">\n`;
        items.forEach(item => {
            html += `  <div class="item item-${item.id}">${item.id}</div>\n`;
        });
        html += `</div>`;
        return html;
    };
    
    const generateWordpressCode = () => {
        const html = generateHTML();
        const css = generateCSS();
        return `${html}\n\n<style>\n${css}</style>`;
    };
    
    const generateReactCode = () => {
        const toCamelCase = (s: string) => s.replace(/-./g, x => x[1].toUpperCase());

        const styleToString = (styleObj: React.CSSProperties) => {
            const stylePairs = Object.entries(styleObj)
                .filter(([, value]) => value !== undefined && value !== null && value !== '')
                .map(([key, value]) => {
                    const camelKey = toCamelCase(key);
                    const finalValue = typeof value === 'number' ? value : `'${String(value).replace(/'/g, "\\'")}'`;
                    return `    ${camelKey}: ${finalValue}`;
                });
            return `{\n${stylePairs.join(',\n')}\n  }`;
        };

        const containerStyleString = styleToString(containerStyle);
        
        let itemsStyleString = '';
        const itemElements = items.map(item => {
            itemsStyleString += `  const item${item.id}Styles = ${styleToString(item.styles)};\n`;
            return `      <div style={item${item.id}Styles}>${item.id}</div>`;
        }).join('\n');

        return `import React from 'react';

const MyGridComponent = () => {
  const containerStyles = ${containerStyleString};
  
${itemsStyleString}
  return (
    <div style={containerStyles}>
${itemElements}
    </div>
  );
};

export default MyGridComponent;`;
    };


    return (
        <div className="h-screen w-screen bg-surface-0 flex flex-col font-sans">
            <Header />
            <div className="flex flex-1 pt-16">
                <div className="flex-1 flex overflow-hidden">
                    <Workspace
                        items={items}
                        containerStyle={containerStyle}
                        selectedItemId={selectedItemId}
                        onSelectItem={handleSelectItem}
                        onAddItem={handleAddItem}
                        onDuplicateItem={handleDuplicateItem}
                        onDeleteItem={handleDeleteItem}
                        onShowCode={() => setIsCodeModalVisible(true)}
                        onResizeStart={handleResizeStart}
                    />
                    <ControlPanel
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        containerStyle={containerStyle}
                        onContainerChange={handleContainerChange}
                        selectedItem={selectedItem}
                        onItemChange={handleItemChange}
                    />
                </div>
            </div>
            <Toast 
              message={toastInfo.message}
              show={toastInfo.show}
              onClose={() => setToastInfo(prev => ({ ...prev, show: false }))}
            />
            {isCodeModalVisible && (
                <CodeModal 
                    htmlCode={generateHTML()}
                    cssCode={generateCSS()}
                    wordpressCode={generateWordpressCode()}
                    reactCode={generateReactCode()}
                    onClose={() => setIsCodeModalVisible(false)}
                />
            )}
        </div>
    );
};

export default App;
