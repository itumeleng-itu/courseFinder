# CourseFinder API Documentation

## Dynamic Model Selection

The CourseFinder API now supports dynamic model selection between different Google Generative AI models, allowing you to choose the best model for your specific use case based on performance requirements.

## Available Models

### 1. Flash Model (`flash`)
- **Model Name**: `gemini-2.5-flash`
- **Display Name**: Gemini 2.5 Flash
- **Max Tokens**: 8,192
- **Temperature**: 0.7
- **Performance**:
  - Speed: Fast ⚡
  - Accuracy: High ✅
  - Cost Efficiency: High 💰
- **Best For**: Quick responses, real-time chat, general queries
- **Description**: Fast, efficient model optimized for quick responses with high accuracy

### 2. Pro Model (`2.5`)
- **Model Name**: `gemini-2.5-pro`
- **Display Name**: Gemini 2.5 Pro
- **Max Tokens**: 32,768
- **Temperature**: 0.7
- **Performance**:
  - Speed: Medium ⚡⚡
  - Accuracy: High ✅
  - Cost Efficiency: Medium 💰💰
- **Best For**: Complex analysis, detailed responses, large context requirements
- **Description**: Advanced model with higher token limits and enhanced reasoning capabilities

### 3. Auto Selection (`auto`)
- **Model Name**: Automatically selected based on request complexity
- **Display Name**: Auto Selection
- **Performance**: Optimized based on request
- **Best For**: When you want the system to choose the optimal model
- **Description**: Automatically selects the best model based on request complexity

## API Endpoints

### 1. Matric Statistics API

**Endpoint**: `GET /api/matric-stats`

**Parameters**:
- `model` (optional): Model type to use (`flash`, `2.5`, `auto`)

**Examples**:
\`\`\`bash
# Use default model (flash)
GET /api/matric-stats/

# Use flash model explicitly
GET /api/matric-stats/?model=flash

# Use pro model for more detailed analysis
GET /api/matric-stats/?model=2.5

# Use auto selection
GET /api/matric-stats/?model=auto
\`\`\`

**Response Format**:
\`\`\`json
{
  "nationalPassRate": 82.9,
  "provinces": [
    {
      "province": "Gauteng",
      "passRate": 87.3,
      "rank": 1
    }
  ],
  "year": 2023,
  "_metadata": {
    "model": "Gemini 2.5 Flash",
    "modelType": "flash",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

**Headers**:
- `X-Model-Used`: The display name of the model used
- `Cache-Control`: Caching directives

### 2. Chat API

**Endpoint**: `POST /api/chat`

**Request Body**:
\`\`\`json
{
  "message": "What are the APS requirements for Computer Science at Wits?",
  "conversationHistory": [],
  "model": "flash"
}
\`\`\`

**Parameters**:
- `message` (required): The user's message
- `conversationHistory` (optional): Array of previous conversation messages
- `model` (optional): Model type to use (`flash`, `2.5`, `auto`)

**Examples**:
\`\`\`bash
# Use default model
POST /api/chat
{
  "message": "Hello, I need help with university applications"
}

# Use pro model for complex queries
POST /api/chat
{
  "message": "Compare the Computer Science programs at UCT, Wits, and Stellenbosch",
  "model": "2.5"
}

# Use auto selection
POST /api/chat
{
  "message": "What are my options with a 35 APS score?",
  "model": "auto"
}
\`\`\`

**Response Format**:
\`\`\`json
{
  "response": "Based on your APS score of 35, here are your university options...",
  "_metadata": {
    "model": "Gemini 2.5 Flash",
    "modelType": "flash",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "tokensUsed": 245
  }
}
\`\`\`

## Error Handling

### Model Configuration Errors

**Status Code**: `400 Bad Request`

**Response Format**:
\`\`\`json
{
  "error": "Invalid model selection",
  "message": "Unsupported model type: invalid_model. Supported types: flash, 2.5, auto",
  "availableModels": ["flash", "2.5", "auto"]
}
\`\`\`

### API Errors

**Status Code**: `500 Internal Server Error`

**Response Format**:
\`\`\`json
{
  "error": "Failed to generate response. Please try again.",
  "_metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "errorType": "GoogleGenerativeAIError"
  }
}
\`\`\`

## Performance Considerations

### Model Selection Guidelines

| Use Case | Recommended Model | Reason |
|----------|------------------|---------|
| Quick chat responses | `flash` | Fastest response time, cost-effective |
| Simple data queries | `flash` | Sufficient accuracy, optimal speed |
| Complex analysis | `2.5` | Higher token limit, better reasoning |
| Detailed comparisons | `2.5` | More comprehensive responses |
| Unknown complexity | `auto` | System optimizes automatically |

### Performance Metrics

| Model | Avg Response Time | Token Limit | Cost Efficiency | Best Use Case |
|-------|------------------|-------------|-----------------|---------------|
| Flash | ~1-2 seconds | 8,192 | High | Real-time chat, quick queries |
| Pro | ~2-4 seconds | 32,768 | Medium | Complex analysis, detailed responses |
| Auto | Variable | Variable | Optimized | Mixed workloads |

### Caching Strategy

- **Matric Stats**: Cached for 24 hours (86400 seconds)
- **Chat Responses**: Not cached (dynamic content)
- **Fallback Data**: Cached for 1 hour (3600 seconds)

## Configuration

### Environment Variables

\`\`\`bash
# Required
GOOGLE_API_KEY=your_google_api_key

# Optional - Set default model
GOOGLE_AI_DEFAULT_MODEL=flash  # Options: flash, 2.5, auto
\`\`\`

### Model Configuration

The system uses a centralized configuration system that:
- Validates model availability
- Manages model parameters (tokens, temperature)
- Provides performance metadata
- Handles fallback scenarios

## Backward Compatibility

The API maintains full backward compatibility:
- Existing requests without `model` parameter use the default model (`flash`)
- Response format includes new `_metadata` field but preserves original structure
- Error responses are enhanced but maintain original error handling

## Testing

### Unit Tests

Run the test suite to verify all models work correctly:

\`\`\`bash
npm test -- --testPathPattern=api
\`\`\`

### Integration Testing

Test all model combinations:

\`\`\`bash
# Test flash model
curl "http://localhost:3000/api/matric-stats/?model=flash"

# Test pro model
curl "http://localhost:3000/api/matric-stats/?model=2.5"

# Test auto selection
curl "http://localhost:3000/api/matric-stats/?model=auto"

# Test chat with different models
curl -X POST "http://localhost:3000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "model": "flash"}'
\`\`\`

## Migration Guide

### From Previous Version

1. **No Breaking Changes**: Existing code continues to work without modifications
2. **Optional Enhancement**: Add `model` parameter to requests for specific model selection
3. **Response Changes**: New `_metadata` field provides model information
4. **Headers**: New `X-Model-Used` header indicates which model processed the request

### Example Migration

**Before**:
\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' })
});
\`\`\`

**After** (optional enhancement):
\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ 
    message: 'Hello',
    model: 'flash'  // Optional: specify model
  })
});

// Access model information
const data = await response.json();
console.log('Model used:', data._metadata.model);
\`\`\`

## Support

For issues or questions regarding the dynamic model selection feature:
1. Check the error response for specific guidance
2. Verify model availability using the `/api/matric-stats/?model=invalid` endpoint
3. Review the performance considerations for optimal model selection
4. Ensure your API key has access to the requested models

## OpenRouter Integration

- Uses `google/gemini-2.0-flash-exp:free` via OpenRouter for chat and metrics.
- Adds Authorization header: `Authorization: Bearer ${OPENROUTER_API_KEY}` with site headers `HTTP-Referer` and `X-Title`.

### Environment Variables (OpenRouter)

\`\`\`bash
# Required for OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key

# Optional site identification for OpenRouter
SITE_URL=https://coursefinder-sa.vercel.app
SITE_NAME=CourseFinder SA
\`\`\`

### Headers (OpenRouter)
- `Authorization`: `Bearer ${OPENROUTER_API_KEY}`
- `HTTP-Referer`: Your site URL (e.g., `https://coursefinder-sa.vercel.app`)
- `X-Title`: Your site name (e.g., `CourseFinder SA`)

### 3. Matric Pass Rate API (OpenRouter)

**Endpoint**: `GET /api/matric-pass-rate`

**Description**: Returns the latest national matric pass rate (previous completed exam year). Uses OpenRouter with strict JSON output and includes a 24h cache.

**Response Format**:
\`\`\`json
{
  "success": true,
  "nationalPassRate": 83.7,
  "year": 2024,
  "source": "Department of Basic Education (DBE)",
  "_metadata": {
    "model": "google/gemini-2.0-flash-exp:free",
    "timestamp": "2025-01-15T10:30:00.000Z"
  }
}
\`\`\`

**Headers**:
- `X-Model-Used`: Model identifier
- `Cache-Control`: `public, s-maxage=86400, stale-while-revalidate=43200`

**Fallbacks**:
- If the API key is missing, rate-limited, or a parse error occurs, returns cached or fallback data:
\`\`\`json
{
  "success": true,
  "nationalPassRate": 82.9,
  "year": 2023,
  "source": "Department of Basic Education (DBE) 2023 Results",
  "_metadata": { "model": "fallback" }
}
\`\`\`

**Example**:
\`\`\`bash
curl -s "http://localhost:3000/api/matric-pass-rate" | jq
\`\`\`

### Chat API (OpenRouter)

- `POST /api/chat` accepts `{ message, conversationHistory?, model? }`.
- Uses OpenRouter and maintains conversation context by passing prior messages.
- Returns structured metadata including `tokensUsed`, duration, and model info.

**Example**:
\`\`\`bash
curl -X POST "http://localhost:3000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the APS requirements for Computer Science at Wits?",
    "conversationHistory": [],
    "model": "google/gemini-2.0-flash-exp:free"
  }'
\`\`\`
