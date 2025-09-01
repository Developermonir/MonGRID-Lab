import React, { useState } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { ICONS } from '../constants';

interface CodeModalProps {
  htmlCode: string;
  cssCode: string;
  wordpressCode: string;
  reactCode: string;
  onClose: () => void;
}

const CodeBlock: React.FC<{ title: string; code: string; language?: string }> = ({ title, code, language = 'css' }) => {
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <button
          onClick={() => copy(code)}
          className="flex items-center gap-2 px-3 py-1 bg-surface-3 hover:bg-primary/20 text-sm rounded-md transition-colors"
        >
          {isCopied ? ICONS.check : ICONS.copy}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-surface-0 p-4 rounded-lg text-sm overflow-x-auto max-h-96">
        <code className={`language-${language} text-text-secondary`}>{code}</code>
      </pre>
    </div>
  );
};

const TabButton: React.FC<{id: string, label: string, activeTab: string, setActiveTab: (id: string) => void}> = ({ id, label, activeTab, setActiveTab }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === id ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
    >
        {label}
    </button>
);


const CodeModal: React.FC<CodeModalProps> = ({ htmlCode, cssCode, wordpressCode, reactCode, onClose }) => {
  const [activeTab, setActiveTab] = useState('html-css');
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface-1 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-surface-2 flex-shrink-0">
          <h2 className="text-xl font-bold">Generated Code</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-2">
            {ICONS.x}
          </button>
        </div>
        <div className="flex border-b border-surface-2 px-4 flex-shrink-0">
            <TabButton id="html-css" label="HTML / CSS" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="wordpress" label="WordPress" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="react" label="React" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
            {activeTab === 'html-css' && (
                <>
                    <CodeBlock title="HTML" code={htmlCode} language="html" />
                    <CodeBlock title="CSS" code={cssCode} language="css" />
                </>
            )}
            {activeTab === 'wordpress' && (
                <CodeBlock title="WordPress (Custom HTML Block)" code={wordpressCode} language="html" />
            )}
            {activeTab === 'react' && (
                <CodeBlock title="React (JSX Component)" code={reactCode} language="jsx" />
            )}
        </div>
      </div>
    </div>
  );
};

export default CodeModal;