import React from 'react';
import { MODELS } from '../constants';

const Header: React.FC = () => {
  const totalModels = MODELS.length;

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-30">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="bg-sky-500 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
            </svg>
            </div>
            <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                LLM Hardware Matcher
            </h1>
            <p className="text-sm text-slate-400">Find the perfect model for your machine.</p>
            </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-lg">
          <span className="text-slate-400 text-sm font-medium">Total Models</span>
          <span className="font-bold text-xl text-sky-400">{totalModels}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
