import React from 'react';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-surface-1/50 backdrop-blur-sm border-b border-surface-2 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex items-center gap-3">
        <div className="text-primary">{ICONS.logo}</div>
        <h1 className="text-xl font-bold text-text-primary">MonGRID Lab</h1>
        <div className="h-6 w-px bg-surface-3"></div>
        <a href="#" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          Grids <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">beta</span>
        </a>
      </div>
      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-surface-3 rounded-lg text-sm text-text-primary transition-colors"
      >
        {ICONS.github}
        Star on GitHub
      </a>
    </header>
  );
};

export default Header;