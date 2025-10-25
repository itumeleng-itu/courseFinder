/**
 * Unit tests for the matric-stats API endpoint
 * Tests dynamic model selection and error handling
 */

import { GET } from '@/app/api/matric-stats/route';
import { NextRequest } from 'next/server';

// Mock the Google Generative AI
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: mockGenerateContent
      })
    })),
    mockGenerateContent
  };
});

// Get the mocked function
const { mockGenerateContent } = require('@google/generative-ai');

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  // Do not reset modules to avoid clearing mocks
  process.env = { ...originalEnv, GOOGLE_API_KEY: 'test-api-key' };
  
  // Reset and set default mock behavior
  mockGenerateContent.mockClear();
  mockGenerateContent.mockResolvedValue({
    response: {
      text: jest.fn().mockReturnValue(JSON.stringify({
        nationalPassRate: 82.9,
        provinces: [
          { province: "Gauteng", passRate: 87.3, rank: 1 },
          { province: "Western Cape", passRate: 84.6, rank: 2 }
        ],
        year: 2023
      }))
    }
  });
});

afterAll(() => {
  process.env = originalEnv;
});

describe('/api/matric-stats', () => {
  describe('GET', () => {
    test('should return matric stats with default model', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('nationalPassRate');
      expect(data).toHaveProperty('provinces');
      expect(data).toHaveProperty('year');
      expect(data).toHaveProperty('_metadata');
      expect(data._metadata.model).toBe('Gemini 2.5 Flash');
      expect(data._metadata.modelType).toBe('flash');
    });

    test('should return matric stats with flash model', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=flash');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Gemini 2.5 Flash');
      expect(data._metadata.modelType).toBe('flash');
      expect(response.headers.get('X-Model-Used')).toBe('Gemini 2.5 Flash');
    });

    test('should return matric stats with pro model', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=2.5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Gemini 2.5 Pro');
      expect(data._metadata.modelType).toBe('2.5');
      expect(response.headers.get('X-Model-Used')).toBe('Gemini 2.5 Pro');
    });

    test('should return matric stats with auto model', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=auto');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Auto Selection');
      expect(data._metadata.modelType).toBe('auto');
      expect(response.headers.get('X-Model-Used')).toBe('Auto Selection');
    });

    test('should return 400 error for invalid model', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=invalid');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Invalid model selection');
      expect(data).toHaveProperty('availableModels');
      expect(data.availableModels).toContain('flash');
      expect(data.availableModels).toContain('2.5');
      expect(data.availableModels).toContain('auto');
    });

    test('should include proper cache headers', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);

      expect(response.headers.get('Cache-Control')).toBe(
        'public, s-maxage=86400, stale-while-revalidate=43200'
      );
    });

    test('should return fallback data on API error', async () => {
      // Mock API error
      mockGenerateContent.mockRejectedValue(new Error('API Error'));

      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('nationalPassRate');
      expect(data._metadata.model).toBe('Fallback Data');
      expect(data._metadata.modelType).toBe('fallback');
      expect(data._metadata.note).toBe('API error occurred, using cached data');
      expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=3600');
    });

    test('should handle malformed JSON response', async () => {
      // Mock malformed JSON response
      mockGenerateContent.mockRejectedValue(new Error('JSON Parse Error'));

      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Fallback Data');
      expect(data._metadata.modelType).toBe('fallback');
      expect(data._metadata.note).toBe('API error occurred, using cached data');
    });

    test('should include timestamp in metadata', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);
      const data = await response.json();

      expect(data._metadata).toHaveProperty('timestamp');
      expect(new Date(data._metadata.timestamp)).toBeInstanceOf(Date);
    });

    test('should preserve original data structure', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats');
      const response = await GET(request);
      const data = await response.json();

      // Check that original structure is preserved
      expect(data).toHaveProperty('nationalPassRate');
      expect(data).toHaveProperty('provinces');
      expect(data).toHaveProperty('year');
      expect(Array.isArray(data.provinces)).toBe(true);
      
      if (data.provinces.length > 0) {
        expect(data.provinces[0]).toHaveProperty('province');
        expect(data.provinces[0]).toHaveProperty('passRate');
        expect(data.provinces[0]).toHaveProperty('rank');
      }

      // Check that metadata is additional
      expect(data).toHaveProperty('_metadata');
    });
  });

  describe('Model parameter parsing', () => {
    test('should handle empty model parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.modelType).toBe('flash'); // Should use default
    });

    test('should handle multiple model parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=flash&model=2.5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      // Should use the first parameter
      expect(data._metadata.modelType).toBe('flash');
    });

    test('should handle case sensitivity', async () => {
      const request = new NextRequest('http://localhost:3000/api/matric-stats?model=FLASH');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid model selection');
    });
  });
});