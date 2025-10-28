/**
 * Google Generative AI Model Configuration
 * Supports dynamic model selection between flash and 2.5 models
 */

export type ModelType = 'flash' | '2.5' | 'auto';

export interface ModelConfig {
  name: string;
  displayName: string;
  maxTokens: number;
  temperature: number;
  isAvailable: boolean;
  performance: {
    speed: 'fast' | 'medium' | 'slow';
    accuracy: 'high' | 'medium' | 'low';
    costEfficiency: 'high' | 'medium' | 'low';
  };
  description: string;
}

export const AVAILABLE_MODELS: Record<ModelType, ModelConfig> = {
  'flash': {
    name: 'gemini-2.5-flash',
    displayName: 'Gemini 2.5 Flash',
    maxTokens: 8192,
    temperature: 0.7,
    isAvailable: true,
    performance: {
      speed: 'fast',
      accuracy: 'high',
      costEfficiency: 'high'
    },
    description: 'Fast, efficient model optimized for quick responses with high accuracy'
  },
  '2.5': {
    name: 'gemini-2.5-pro',
    displayName: 'Gemini 2.5 Pro',
    maxTokens: 32768,
    temperature: 0.7,
    isAvailable: true,
    performance: {
      speed: 'medium',
      accuracy: 'high',
      costEfficiency: 'medium'
    },
    description: 'Advanced model with higher token limits and enhanced reasoning capabilities'
  },
  'auto': {
    name: 'gemini-2.5-flash', // Default fallback
    displayName: 'Auto Selection',
    maxTokens: 8192,
    temperature: 0.7,
    isAvailable: true,
    performance: {
      speed: 'fast',
      accuracy: 'high',
      costEfficiency: 'high'
    },
    description: 'Automatically selects the best model based on request complexity'
  }
};

export class ModelConfigError extends Error {
  constructor(message: string, public modelType?: ModelType) {
    super(message);
    this.name = 'ModelConfigError';
  }
}

export class ModelValidator {
  /**
   * Validates if a model type is supported
   */
  static isValidModelType(modelType: string): modelType is ModelType {
    return Object.keys(AVAILABLE_MODELS).includes(modelType);
  }

  /**
   * Validates if a model is available and compatible
   */
  static validateModel(modelType: ModelType): ModelConfig {
    if (!this.isValidModelType(modelType)) {
      throw new ModelConfigError(
        `Unsupported model type: ${modelType}. Supported types: ${Object.keys(AVAILABLE_MODELS).join(', ')}`,
        modelType as ModelType
      );
    }

    const config = AVAILABLE_MODELS[modelType];
    
    if (!config.isAvailable) {
      throw new ModelConfigError(
        `Model ${config.displayName} is currently unavailable`,
        modelType
      );
    }

    return config;
  }

  /**
   * Gets the actual model name for Google AI API
   */
  static getModelName(modelType: ModelType): string {
    const config = this.validateModel(modelType);
    return config.name;
  }

  /**
   * Auto-selects the best model based on request complexity
   */
  static autoSelectModel(requestComplexity: 'simple' | 'complex' = 'simple'): ModelType {
    // For now, default to flash for all requests
    // This can be enhanced with more sophisticated logic
    return requestComplexity === 'complex' ? '2.5' : 'flash';
  }
}

export class ModelConfigManager {
  private static instance: ModelConfigManager;
  private defaultModel: ModelType;

  private constructor() {
    // Get default model from environment variable or use 'flash' as fallback
    const envModel = process.env.GOOGLE_AI_DEFAULT_MODEL as ModelType;
    this.defaultModel = ModelValidator.isValidModelType(envModel) ? envModel : 'flash';
  }

  static getInstance(): ModelConfigManager {
    if (!ModelConfigManager.instance) {
      ModelConfigManager.instance = new ModelConfigManager();
    } else {
      const envModel = process.env.GOOGLE_AI_DEFAULT_MODEL as ModelType;
      if (ModelValidator.isValidModelType(envModel) && envModel !== ModelConfigManager.instance.getDefaultModel()) {
        ModelConfigManager.instance.setDefaultModel(envModel);
      }
    }
    return ModelConfigManager.instance;
  }

  /**
   * Gets the model configuration for a given type
   */
  getModelConfig(modelType?: ModelType): ModelConfig {
    const type = modelType || this.defaultModel;
    return ModelValidator.validateModel(type);
  }

  /**
   * Gets the model name for Google AI API
   */
  getModelName(modelType?: ModelType): string {
    const type = modelType || this.defaultModel;
    return ModelValidator.getModelName(type);
  }

  /**
   * Gets the default model type
   */
  getDefaultModel(): ModelType {
    return this.defaultModel;
  }

  /**
   * Sets a new default model (for testing purposes)
   */
  setDefaultModel(modelType: ModelType): void {
    ModelValidator.validateModel(modelType); // Validate before setting
    this.defaultModel = modelType;
  }

  /**
   * Gets all available models
   */
  getAllModels(): Record<ModelType, ModelConfig> {
    return AVAILABLE_MODELS;
  }

  /**
   * Gets performance comparison between models
   */
  getPerformanceComparison(): Array<{
    type: ModelType;
    config: ModelConfig;
    score: number;
  }> {
    return Object.entries(AVAILABLE_MODELS).map(([type, config]) => {
      // Simple scoring algorithm (can be enhanced)
      const speedScore = config.performance.speed === 'fast' ? 3 : config.performance.speed === 'medium' ? 2 : 1;
      const accuracyScore = config.performance.accuracy === 'high' ? 3 : config.performance.accuracy === 'medium' ? 2 : 1;
      const costScore = config.performance.costEfficiency === 'high' ? 3 : config.performance.costEfficiency === 'medium' ? 2 : 1;
      
      return {
        type: type as ModelType,
        config,
        score: (speedScore + accuracyScore + costScore) / 3
      };
    }).sort((a, b) => b.score - a.score);
  }
}

// Export singleton instance
export const modelConfig = ModelConfigManager.getInstance();
