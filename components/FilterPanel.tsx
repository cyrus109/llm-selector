import React from 'react';
import { Filters } from '../types';
import RamIcon from './icons/RamIcon';
import GpuIcon from './icons/GpuIcon';
import CpuIcon from './icons/CpuIcon';
import AppleIcon from './icons/AppleIcon';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | boolean = value;

    if (type === 'range') {
      processedValue = Number(value);
    } else if (name === 'appleSilicon') {
      processedValue = (e.target as HTMLInputElement).checked;
    }
    
    onFilterChange({
      ...filters,
      [name]: processedValue,
    });
  };
  
  const FilterGroup: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
            <div className="text-slate-400">{icon}</div>
            <h4 className="font-semibold text-white">{title}</h4>
        </div>
        {children}
    </div>
  );

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sticky top-24 self-start">
        <h3 className="text-xl font-bold text-white mb-6">Filter Models</h3>

        <div className="space-y-6">
            <div>
                <label htmlFor="search" className="block text-sm font-medium text-slate-300 mb-2">Search by name or tag</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={handleInputChange}
                    placeholder="e.g., Llama, coding, vision..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
            </div>

            <FilterGroup title="System Requirements" icon={<RamIcon />}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="ram" className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>Max RAM (GB)</span>
                            <span className="font-bold text-sky-400">{filters.ram} GB</span>
                        </label>
                        <input
                            type="range"
                            id="ram"
                            name="ram"
                            min="4"
                            max="64"
                            step="4"
                            value={filters.ram}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer range-thumb"
                        />
                    </div>
                     <div>
                        <label htmlFor="vram" className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>Max VRAM (GB)</span>
                             <span className="font-bold text-sky-400">{filters.vram} GB</span>
                        </label>
                        <input
                            type="range"
                            id="vram"
                            name="vram"
                            min="2"
                            max="48"
                            step="2"
                            value={filters.vram}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer range-thumb"
                        />
                    </div>
                </div>
            </FilterGroup>

             <FilterGroup title="Hardware Performance" icon={<CpuIcon />}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cpu" className="block text-sm text-slate-400 mb-1">CPU Power</label>
                        <select
                            id="cpu"
                            name="cpu"
                            value={filters.cpu}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition capitalize"
                        >
                            <option value="any">Any</option>
                            <option value="low">Low</option>
                            <option value="mid">Mid</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="gpu" className="block text-sm text-slate-400 mb-1">GPU Power</label>
                         <select
                            id="gpu"
                            name="gpu"
                            value={filters.gpu}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition capitalize"
                        >
                            <option value="any">Any</option>
                            <option value="low">Low</option>
                            <option value="mid">Mid</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
            </FilterGroup>

            <FilterGroup title="Other" icon={<GpuIcon />}>
                 <div className="space-y-4">
                     <div>
                        <label htmlFor="source" className="block text-sm text-slate-400 mb-1">Model Source</label>
                         <select
                            id="source"
                            name="source"
                            value={filters.source}
                            onChange={handleInputChange}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        >
                            <option value="any">Any</option>
                            <option value="Ollama">Ollama</option>
                            <option value="HuggingFace">HuggingFace</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <label htmlFor="appleSilicon" className="flex items-center gap-3 text-sm text-slate-300">
                           <AppleIcon />
                           <span>Apple Silicon Native</span>
                        </label>
                        <input
                            type="checkbox"
                            id="appleSilicon"
                            name="appleSilicon"
                            checked={filters.appleSilicon}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-sky-600 focus:ring-sky-500"
                        />
                    </div>
                 </div>
            </FilterGroup>

        </div>
    </div>
  );
};

export default FilterPanel;
