import React from 'react';
import { Model } from '../types';
import HuggingFaceIcon from './icons/HuggingFaceIcon';
import OllamaIcon from './icons/OllamaIcon';

interface ModelCardProps {
  model: Model;
  isSelectedForCompare: boolean;
  onToggleCompare: (modelId: string) => void;
}

const ScoreBar: React.FC<{ score: number, label: string, color: string }> = ({ score, label, color }) => (
    <div className="w-full">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{label}</span>
            <span>{score}/100</span>
        </div>
        <div className="bg-slate-700 rounded-full h-1.5">
            <div className={`${color} h-1.5 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
    </div>
);

const ModelCard: React.FC<ModelCardProps> = ({ model, isSelectedForCompare, onToggleCompare }) => {
  return (
    <div className={`bg-slate-800 rounded-2xl border transition-all duration-300 flex flex-col ${isSelectedForCompare ? 'border-sky-500 shadow-2xl shadow-sky-900/50' : 'border-slate-700 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-900/50'}`}>
        <div className="p-5 flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-white">{model.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${model.source === 'Ollama' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {model.source === 'Ollama' 
                            ? <OllamaIcon className="h-3.5 w-3.5" /> 
                            : <HuggingFaceIcon className="h-3.5 w-3.5" />}
                        {model.source}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor={`compare-${model.id}`} className="text-slate-400 text-sm cursor-pointer">Compare</label>
                    <input
                        type="checkbox"
                        id={`compare-${model.id}`}
                        checked={isSelectedForCompare}
                        onChange={() => onToggleCompare(model.id)}
                        className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                </div>
            </div>

            <p className="text-sm text-slate-400 mt-3 mb-4 h-10 overflow-hidden cursor-help" title={model.description}>{model.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {model.tags.map(tag => (
                    <span key={tag} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">{tag}</span>
                ))}
            </div>
            
            <div className="space-y-3">
                <ScoreBar score={model.quality_score} label="Quality" color="bg-green-500" />
                <ScoreBar score={model.performance_score} label="Performance" color="bg-sky-500" />
                <ScoreBar score={model.speed_score} label="Speed" color="bg-rose-500" />
            </div>

        </div>
        <div className="bg-slate-800/50 border-t border-slate-700 p-4 rounded-b-2xl">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z" clipRule="evenodd" /></svg>
                    <span>Size: <span className="font-semibold text-white">{model.size} GB</span></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.788 1.84L10 5.382l6.606 2.038a1 1 0 00.788-1.84l-7-3.5zM3 9.382l-.606.3a1 1 0 00.788 1.84L10 9.382V18a1 1 0 002 0V9.382l6.818 2.158a1 1 0 00.788-1.84l-.606-.3L10 11.618 3 9.382z" /></svg>
                    <span>Quant: <span className="font-semibold text-white">{model.quantization}</span></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a1 1 0 011 1v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0V9H5a1 1 0 110-2h2V5a1 1 0 011-1z" clipRule="evenodd" /><path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm2 0a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" /></svg>
                    <span>RAM: <span className="font-semibold text-white">{model.ram_required}+ GB</span></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2v10h10V5H4z" /></svg>
                    <span>VRAM: <span className="font-semibold text-white">{model.vram_required}+ GB</span></span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ModelCard;