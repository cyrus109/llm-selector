

import React from 'react';
import { Model, PerformanceTier } from '../types';

interface ComparisonViewProps {
  models: Model[];
  onClose: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ models, onClose }) => {

  const attributes: (keyof Model | 'Header')[] = [
    'Header',
    'source',
    'size',
    'ram_required',
    'vram_required',
    'quantization',
    'quality_score',
    'performance_score',
    'speed_score',
    'cpu_performance_needed',
    'gpu_performance_needed',
    'apple_silicon_support',
    'tags'
  ];

  const attributeLabels: Record<keyof Model | 'Header', string> = {
    Header: 'Model',
    name: 'Name',
    source: 'Source',
    size: 'Size (GB)',
    ram_required: 'RAM Required (GB)',
    vram_required: 'VRAM Required (GB)',
    quantization: 'Quantization',
    quality_score: 'Quality Score',
    performance_score: 'Performance Score',
    speed_score: 'Speed Score',
    cpu_performance_needed: 'CPU Needed',
    gpu_performance_needed: 'GPU Needed',
    apple_silicon_support: 'Apple Silicon',
    tags: 'Use Cases',
    id: '',
    description: ''
  };

  const renderValue = (model: Model, attr: keyof Model) => {
    const value = model[attr];

    if (attr === 'cpu_performance_needed' || attr === 'gpu_performance_needed') {
        const tier = value as PerformanceTier;
        const colorClasses = {
            low: 'bg-green-500/20 text-green-300',
            mid: 'bg-sky-500/20 text-sky-300',
            high: 'bg-rose-500/20 text-rose-300',
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${colorClasses[tier]}`}>
                {tier}
            </span>
        );
    }

    if (typeof value === 'boolean') {
      return value ? '✅ Yes' : '❌ No';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col border border-slate-700" onClick={e => e.stopPropagation()}>
        <header className="p-4 flex justify-between items-center border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Model Comparison</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left">
            <tbody>
              {attributes.map((attr, index) => (
                <tr key={String(attr)} className="border-b border-slate-700">
                  <th className="sticky left-0 bg-slate-800 p-4 text-sm font-semibold text-slate-300 capitalize whitespace-nowrap">
                    {attributeLabels[attr]}
                  </th>
                  {models.map(model => (
                    <td key={model.id} className={`p-4 text-sm align-middle ${index === 0 ? 'font-bold text-white text-base' : 'text-slate-200'}`}>
                      {attr === 'Header' ? model.name : renderValue(model, attr as keyof Model)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;