/**
 * Unit tests for the model configuration system
 * Tests dynamic model selection, validation, and error handling
 */

import {
  ModelValidator,
  ModelConfigManager,
  ModelConfigError,
  AVAILABLE_MODELS,
  type ModelType
} from '@/lib/model-config';

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('ModelValidator', () => {
  describe('isValidModelType', () => {
    test('should validate correct model types', () => {
      expect(ModelValidator.isValidModelType('flash')).toBe(true);
      expect(ModelValidator.isValidModelType('2.5')).toBe(true);
      expect(ModelValidator.isValidModelType('auto')).toBe(true);
    });

    test('should reject invalid model types', () => {
      expect(ModelValidator.isValidModelType('invalid')).toBe(false);
      expect(ModelValidator.isValidModelType('')).toBe(false);
      expect(ModelValidator.isValidModelType('gemini-pro')).toBe(false);
    });
  });

  describe('validateModel', () => {
    test('should return config for valid models', () => {
      const flashConfig = ModelValidator.validateModel('flash');
      expect(flashConfig.name).toBe('gemini-2.5-flash');
      expect(flashConfig.isAvailable).toBe(true);

      const proConfig = ModelValidator.validateModel('2.5');
      expect(proConfig.name).toBe('gemini-2.5-pro');
      expect(proConfig.isAvailable).toBe(true);

      const autoConfig = ModelValidator.validateModel('auto');
      expect(autoConfig.name).toBe('gemini-2.5-flash');
      expect(autoConfig.isAvailable).toBe(true);
    });

    test('should throw ModelConfigError for invalid models', () => {
      expect(() => {
        ModelValidator.validateModel('invalid' as ModelType);
      }).toThrow(ModelConfigError);

      expect(() => {
        ModelValidator.validateModel('invalid' as ModelType);
      }).toThrow('Unsupported model type: invalid');
    });
  });

  describe('getModelName', () => {
    test('should return correct model names', () => {
      expect(ModelValidator.getModelName('flash')).toBe('gemini-2.5-flash');
      expect(ModelValidator.getModelName('2.5')).toBe('gemini-2.5-pro');
      expect(ModelValidator.getModelName('auto')).toBe('gemini-2.5-flash');
    });

    test('should throw error for invalid model', () => {
      expect(() => {
        ModelValidator.getModelName('invalid' as ModelType);
      }).toThrow(ModelConfigError);
    });
  });

  describe('autoSelectModel', () => {
    test('should select flash for simple requests', () => {
      expect(ModelValidator.autoSelectModel('simple')).toBe('flash');
    });

    test('should select 2.5 for complex requests', () => {
      expect(ModelValidator.autoSelectModel('complex')).toBe('2.5');
    });

    test('should default to flash when no complexity specified', () => {
      expect(ModelValidator.autoSelectModel()).toBe('flash');
    });
  });
});

describe('ModelConfigManager', () => {
  let manager: ModelConfigManager;

  beforeEach(() => {
    // Reset singleton instance
    (ModelConfigManager as any).instance = undefined;
    manager = ModelConfigManager.getInstance();
  });

  describe('getInstance', () => {
    test('should return singleton instance', () => {
      const instance1 = ModelConfigManager.getInstance();
      const instance2 = ModelConfigManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('getModelConfig', () => {
    test('should return default model config when no type specified', () => {
      const config = manager.getModelConfig();
      expect(config.name).toBe('gemini-2.5-flash'); // Default is flash
    });

    test('should return specific model config when type specified', () => {
      const flashConfig = manager.getModelConfig('flash');
      expect(flashConfig.name).toBe('gemini-2.5-flash');

      const proConfig = manager.getModelConfig('2.5');
      expect(proConfig.name).toBe('gemini-2.5-pro');
    });

    test('should throw error for invalid model type', () => {
      expect(() => {
        manager.getModelConfig('invalid' as ModelType);
      }).toThrow(ModelConfigError);
    });
  });

  describe('getModelName', () => {
    test('should return model name for valid types', () => {
      expect(manager.getModelName('flash')).toBe('gemini-2.5-flash');
      expect(manager.getModelName('2.5')).toBe('gemini-2.5-pro');
    });

    test('should return default model name when no type specified', () => {
      const modelName = manager.getModelName();
      expect(modelName).toBe('gemini-2.5-flash'); // Default is flash
    });
  });

  describe('getDefaultModel', () => {
    it('should return default model when no environment variable is set', () => {
      const manager = ModelConfigManager.getInstance();
      expect(manager.getDefaultModel()).toBe('flash');
    });

    it('should use environment variable when set', () => {
      // Store original value
      const originalEnv = process.env.GOOGLE_AI_DEFAULT_MODEL;
      
      // Clear singleton instance to force re-initialization
      (ModelConfigManager as any).instance = null;
      
      // Set environment variable
      process.env.GOOGLE_AI_DEFAULT_MODEL = '2.5';
      
      // Create new instance which should read the env var
      const newManager = ModelConfigManager.getInstance();
      expect(newManager.getDefaultModel()).toBe('2.5');
      
      // Clean up
      process.env.GOOGLE_AI_DEFAULT_MODEL = originalEnv;
      (ModelConfigManager as any).instance = null;
    });

    it('should fallback to flash for invalid env var', () => {
      process.env.GOOGLE_AI_DEFAULT_MODEL = 'invalid';
      const newManager = ModelConfigManager.getInstance();
      expect(newManager.getDefaultModel()).toBe('flash');
    });
  });

  describe('setDefaultModel', () => {
    test('should update default model', () => {
      manager.setDefaultModel('2.5');
      expect(manager.getDefaultModel()).toBe('2.5');
    });

    test('should validate model before setting', () => {
      expect(() => {
        manager.setDefaultModel('invalid' as ModelType);
      }).toThrow(ModelConfigError);
    });
  });

  describe('getAllModels', () => {
    test('should return all available models', () => {
      const models = manager.getAllModels();
      expect(models).toEqual(AVAILABLE_MODELS);
      expect(Object.keys(models)).toContain('flash');
      expect(Object.keys(models)).toContain('2.5');
      expect(Object.keys(models)).toContain('auto');
    });
  });

  describe('getPerformanceComparison', () => {
    test('should return performance comparison with scores', () => {
      const comparison = manager.getPerformanceComparison();
      
      expect(Array.isArray(comparison)).toBe(true);
      expect(comparison.length).toBe(3);
      
      comparison.forEach(item => {
        expect(item).toHaveProperty('type');
        expect(item).toHaveProperty('config');
        expect(item).toHaveProperty('score');
        expect(typeof item.score).toBe('number');
        expect(item.score).toBeGreaterThan(0);
        expect(item.score).toBeLessThanOrEqual(3);
      });

      // Should be sorted by score (highest first)
      for (let i = 0; i < comparison.length - 1; i++) {
        expect(comparison[i].score).toBeGreaterThanOrEqual(comparison[i + 1].score);
      }
    });
  });
});

describe('ModelConfigError', () => {
  test('should create error with message', () => {
    const error = new ModelConfigError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ModelConfigError');
    expect(error.modelType).toBeUndefined();
  });

  test('should create error with message and model type', () => {
    const error = new ModelConfigError('Test error', 'flash');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ModelConfigError');
    expect(error.modelType).toBe('flash');
  });
});

describe('AVAILABLE_MODELS configuration', () => {
  test('should have correct structure for all models', () => {
    Object.entries(AVAILABLE_MODELS).forEach(([type, config]) => {
      expect(config).toHaveProperty('name');
      expect(config).toHaveProperty('displayName');
      expect(config).toHaveProperty('maxTokens');
      expect(config).toHaveProperty('temperature');
      expect(config).toHaveProperty('isAvailable');
      expect(config).toHaveProperty('performance');
      expect(config).toHaveProperty('description');

      expect(typeof config.name).toBe('string');
      expect(typeof config.displayName).toBe('string');
      expect(typeof config.maxTokens).toBe('number');
      expect(typeof config.temperature).toBe('number');
      expect(typeof config.isAvailable).toBe('boolean');
      expect(typeof config.description).toBe('string');

      expect(config.performance).toHaveProperty('speed');
      expect(config.performance).toHaveProperty('accuracy');
      expect(config.performance).toHaveProperty('costEfficiency');
    });
  });

  test('should have flash model configuration', () => {
    const flash = AVAILABLE_MODELS.flash;
    expect(flash.name).toBe('gemini-2.5-flash');
    expect(flash.maxTokens).toBe(8192);
    expect(flash.performance.speed).toBe('fast');
  });

  test('should have pro model configuration', () => {
    const pro = AVAILABLE_MODELS['2.5'];
    expect(pro.name).toBe('gemini-2.5-pro');
    expect(pro.maxTokens).toBe(32768);
    expect(pro.performance.speed).toBe('medium');
  });

  test('should have auto model configuration', () => {
    const auto = AVAILABLE_MODELS.auto;
    expect(auto.name).toBe('gemini-2.5-flash'); // Defaults to flash
    expect(auto.displayName).toBe('Auto Selection');
  });
});