import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ModelList from './components/ModelList';
import ComparisonView from './components/ComparisonView';
import { MODELS } from './constants';
import { Model, Filters } from './types';

export type SortOrder = 'performance' | 'quality' | 'speed' | 'name-asc' | 'name-desc';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    ram: 64,
    vram: 48,
    cpu: 'any',
    gpu: 'any',
    appleSilicon: false,
    source: 'any',
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>('performance');
  const [modelsToCompare, setModelsToCompare] = useState<string[]>([]);
  const [isComparisonViewOpen, setIsComparisonViewOpen] = useState(false);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  }

  const handleToggleCompare = (modelId: string) => {
    setModelsToCompare(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      }
      if (prev.length < 5) {
        return [...prev, modelId];
      }
      // Optional: Add a notification that compare limit is reached
      return prev;
    });
  };

  const filteredAndSortedModels = useMemo(() => {
    const tierOrder = { low: 1, mid: 2, high: 3 };

    let filtered = MODELS.filter(model => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        filters.search.trim() === '' ||
        model.name.toLowerCase().includes(searchLower) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesRam = model.ram_required <= filters.ram;
      const matchesVram = model.vram_required <= filters.vram;

      const matchesCpu = filters.cpu === 'any' || tierOrder[model.cpu_performance_needed] <= tierOrder[filters.cpu];
      const matchesGpu = filters.gpu === 'any' || tierOrder[model.gpu_performance_needed] <= tierOrder[filters.gpu];
      
      const matchesAppleSilicon = !filters.appleSilicon || model.apple_silicon_support;
      const matchesSource = filters.source === 'any' || model.source === filters.source;

      return matchesSearch && matchesRam && matchesVram && matchesCpu && matchesGpu && matchesAppleSilicon && matchesSource;
    });

    switch (sortOrder) {
      case 'performance':
        filtered.sort((a, b) => b.performance_score - a.performance_score);
        break;
      case 'quality':
        filtered.sort((a, b) => b.quality_score - a.quality_score);
        break;
      case 'speed':
        filtered.sort((a, b) => b.speed_score - a.speed_score);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  }, [filters, sortOrder]);

  const comparisonModels = useMemo(() => 
    MODELS.filter(model => modelsToCompare.includes(model.id)),
    [modelsToCompare]
  );

  useEffect(() => {
    if (modelsToCompare.length >= 2) {
        setIsComparisonViewOpen(true);
    } else {
        setIsComparisonViewOpen(false);
    }
  }, [modelsToCompare]);


  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <ModelList 
              models={filteredAndSortedModels}
              modelsToCompare={modelsToCompare}
              onToggleCompare={handleToggleCompare}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </main>

      {isComparisonViewOpen && (
          <ComparisonView 
            models={comparisonModels}
            onClose={() => {
                setIsComparisonViewOpen(false);
                setModelsToCompare([]); // Clear comparison on close
            }}
          />
      )}

      {modelsToCompare.length > 0 && !isComparisonViewOpen && (
        <div className="fixed bottom-6 right-6 z-40">
            <button 
                onClick={() => setIsComparisonViewOpen(true)}
                disabled={modelsToCompare.length < 2}
                className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:scale-100 flex items-center gap-3"
            >
                <span>Compare ({modelsToCompare.length})</span>
                {modelsToCompare.length < 2 && <span className="text-xs font-normal opacity-80">(Select at least 2)</span>}
            </button>
        </div>
      )}
    </div>
  );
};

export default App;
