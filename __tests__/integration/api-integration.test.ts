/**
 * Integration tests for API endpoints
 * Tests backward compatibility and end-to-end functionality
 */

import { POST as chatPOST } from '@/app/api/chat/route';
import { GET as matricGET } from '@/app/api/matric-stats/route';
import { NextRequest } from 'next/server';

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => {
  const mockSendMessage = jest.fn();
  const mockStartChat = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage
  });

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        startChat: mockStartChat,
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: jest.fn().mockReturnValue(JSON.stringify({
              provinces: [
                { province: "Western Cape", passRate: 82.5, rank: 1 },
                { province: "Gauteng", passRate: 81.2, rank: 2 }
              ],
              year: 2023,
              nationalAverage: 80.1
            }))
          }
        })
      })
    })),
    mockSendMessage,
    mockStartChat
  };
});

// Access mocked functions from the jest mock
const { mockSendMessage, mockStartChat } = require('@google/generative-ai');

beforeEach(() => {
  mockSendMessage.mockClear();
  mockStartChat.mockClear();
  
  mockSendMessage.mockResolvedValue({
    response: {
      text: jest.fn().mockReturnValue('I can help you with university applications and course selection.'),
      usageMetadata: {
        totalTokenCount: 15
      }
    }
  });
  
  mockStartChat.mockReturnValue({
    sendMessage: mockSendMessage
  });
});

describe('API Integration Tests', () => {
  describe('Backward Compatibility', () => {
    test('matric-stats API should work without model parameter (backward compatibility)', async () => {
      const request = new NextRequest('http://localhost/api/matric-stats');

      const response = await matricGET(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('provinces');
      expect(data).toHaveProperty('year');
      expect(data).toHaveProperty('nationalAverage');
      expect(data).toHaveProperty('_metadata');
      expect(data._metadata.model).toBe('Gemini 2.5 Flash'); // Default model
    });

    test('chat API should work without model parameter (backward compatibility)', async () => {
      const request = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello'
        })
      };

      const response = await chatPOST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('response');
      expect(data).toHaveProperty('_metadata');
      expect(data._metadata.model).toBe('Gemini 2.5 Flash'); // Default model
    });
  });

  describe('Dynamic Model Selection', () => {
    test('matric-stats API should work with flash model', async () => {
      const request = new NextRequest('http://localhost/api/matric-stats?model=flash');

      const response = await matricGET(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Gemini 2.5 Flash');
      expect(data._metadata.modelType).toBe('flash');
    });

    test('matric-stats API should work with pro model', async () => {
      const request = new NextRequest('http://localhost/api/matric-stats?model=2.5');

      const response = await matricGET(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data._metadata.model).toBe('Gemini 2.5 Pro');
      expect(data._metadata.modelType).toBe('2.5');
    });

    test('chat API should work with different models', async () => {
      const models = ['flash', '2.5', 'auto'];
      const expectedNames = ['Gemini 2.5 Flash', 'Gemini 2.5 Pro', 'Auto Selection'];

      for (let i = 0; i < models.length; i++) {
        const request = {
          json: jest.fn().mockResolvedValue({
            message: 'Hello',
            model: models[i]
          })
        };

        const response = await chatPOST(request as any);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data._metadata.model).toBe(expectedNames[i]);
        expect(data._metadata.modelType).toBe(models[i]);
      }
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid model gracefully in matric-stats', async () => {
      const request = new NextRequest('http://localhost/api/matric-stats?model=invalid');

      const response = await matricGET(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid model selection');
      expect(data.availableModels).toContain('flash');
      expect(data.availableModels).toContain('2.5');
      expect(data.availableModels).toContain('auto');
    });

    test('should handle invalid model gracefully in chat', async () => {
      const request = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello',
          model: 'invalid'
        })
      };

      const response = await chatPOST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid model selection');
      expect(data.availableModels).toContain('flash');
      expect(data.availableModels).toContain('2.5');
      expect(data.availableModels).toContain('auto');
    });
  });

  describe('Response Format Consistency', () => {
    test('all successful responses should include metadata', async () => {
      // Test matric-stats
      const matricRequest = new NextRequest('http://localhost/api/matric-stats');

      const matricResponse = await matricGET(matricRequest as any);
      const matricData = await matricResponse.json();

      expect(matricData).toHaveProperty('_metadata');
      expect(matricData._metadata).toHaveProperty('model');
      expect(matricData._metadata).toHaveProperty('modelType');
      expect(matricData._metadata).toHaveProperty('timestamp');

      // Test chat
      const chatRequest = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello'
        })
      };

      const chatResponse = await chatPOST(chatRequest as any);
      const chatData = await chatResponse.json();

      expect(chatData).toHaveProperty('_metadata');
      expect(chatData._metadata).toHaveProperty('model');
      expect(chatData._metadata).toHaveProperty('modelType');
      expect(chatData._metadata).toHaveProperty('timestamp');
      expect(chatData._metadata).toHaveProperty('tokensUsed');
    });

    test('error responses should include consistent error format', async () => {
      const chatRequest = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello',
          model: 'invalid'
        })
      };

      const chatResponse = await chatPOST(chatRequest as any);
      const chatData = await chatResponse.json();

      expect(chatData).toHaveProperty('error');
      expect(chatData).toHaveProperty('availableModels');
      expect(Array.isArray(chatData.availableModels)).toBe(true);
    });
  });

  describe('Performance and Configuration', () => {
    test('different models should use appropriate configurations', async () => {
      const flashRequest = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello',
          model: 'flash'
        })
      };

      await chatPOST(flashRequest as any);

      expect(mockStartChat).toHaveBeenCalledWith({
        history: [],
        generationConfig: {
          maxOutputTokens: 8192, // Flash model tokens
          temperature: 0.7
        }
      });

      mockStartChat.mockClear();

      const proRequest = {
        json: jest.fn().mockResolvedValue({
          message: 'Hello',
          model: '2.5'
        })
      };

      await chatPOST(proRequest as any);

      expect(mockStartChat).toHaveBeenCalledWith({
        history: [],
        generationConfig: {
          maxOutputTokens: 32768, // Pro model tokens
          temperature: 0.7
        }
      });
    });
  });
});