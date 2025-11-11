import React from 'react';
import { Model } from '../types';
import ModelCard from './ModelCard';
import { SortOrder } from '../App';

interface ModelListProps {
  models: Model[];
  modelsToCompare: string[];
  onToggleCompare: (modelId: string) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const ModelList: React.FC<ModelListProps> = ({ models, modelsToCompare, onToggleCompare, sortOrder, onSortChange }) => {
  if (models.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-700">
        <h3 className="text-xl font-semibold text-white">No Models Match Your Criteria</h3>
        <p className="text-slate-400 mt-2">Try adjusting your filters to find a suitable model.</p>
      </div>
    );
  }

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <p className="text-slate-400">Found <span className="font-bold text-sky-400">{models.length}</span> matching models.</p>
            <div className="flex items-center gap-2">
                <label htmlFor="sort-order" className="text-sm text-slate-400">Sort by:</label>
                <select 
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value as SortOrder)}
                    className="bg-slate-700 border border-slate-600 rounded-md py-1 px-2 text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                >
                    <option value="performance">Best Performance</option>
                    <option value="quality">Best Quality</option>
                    <option value="speed">Fastest Speed</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                </select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {models.map(model => (
            <ModelCard
            key={model.id}
            model={model}
            isSelectedForCompare={modelsToCompare.includes(model.id)}
            onToggleCompare={onToggleCompare}
            />
        ))}
        </div>
    </div>
  );
};

export default ModelList;