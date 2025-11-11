export type PerformanceTier = 'low' | 'mid' | 'high';

export type ModelSource = 'Ollama' | 'HuggingFace';

export interface Model {
  id: string;
  name: string;
  description: string;
  source: ModelSource;
  size: number; // in GB
  ram_required: number; // in GB
  vram_required: number; // in GB
  quantization: string;
  quality_score: number; // 0-100
  performance_score: number; // 0-100
  speed_score: number; // 0-100
  cpu_performance_needed: PerformanceTier;
  gpu_performance_needed: PerformanceTier;
  apple_silicon_support: boolean;
  tags: string[];
}

export interface Filters {
  search: string;
  ram: number;
  vram: number;
  cpu: PerformanceTier | 'any';
  gpu: PerformanceTier | 'any';
  appleSilicon: boolean;
  source: ModelSource | 'any';
}
