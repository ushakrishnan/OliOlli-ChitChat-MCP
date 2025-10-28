# OliOlli MCP Server - Copilot Studio Integration Guide

## Overview
The OliOlli MCP Server provides **7 powerful tools** for Copilot Studio, combining entertainment (jokes) and utility (weather) functions with intelligent parameter elicitation.

## 🚀 Quick Setup for Copilot Studio

### Step 1: Configure MCP Connection
In your Copilot Studio settings, add the following MCP server endpoint:

```
Endpoint URL: https://jokesmcp-http-typescript.livelysmoke-c2b03354.centralus.azurecontainerapps.io/mcp
Protocol: HTTP
Authentication: None (public endpoint)
```

### Step 2: Available Tools
Once connected, your Copilot will automatically discover these tools:

| Tool Name | Description | User Experience |
|-----------|-------------|-----------------|
| `get-chuck-joke` | Random Chuck Norris joke | "Tell me a Chuck Norris joke" |
| `get-chuck-joke-by-category` | Category-specific Chuck Norris joke | "Tell me a Chuck Norris joke about animals" |
| `get-chuck-categories` | List all joke categories | "What joke categories are available?" |
| `get-dad-joke` | Random dad joke | "Tell me a dad joke" |
| `get-current-weather` | Current weather conditions | "What's the weather in London?" |
| `get-weather-history` | Historical weather data | "What was the weather like in Paris yesterday?" |
| `get-weather-forecast` | Weather forecast (1-10 days) | "Show me the 5-day forecast for Tokyo" |

## 🎯 Smart Parameter Elicitation

The server implements **automatic parameter prompting**:

### Weather Tools
- **Missing Location**: Copilot will ask "Which city would you like weather for?"
- **Missing Date**: Copilot will ask "What date? (format: YYYY-MM-DD)"
- **Invalid Format**: User gets helpful error messages with correct format examples

### Joke Tools
- **Missing Category**: Copilot will show available categories when needed

## 🗣️ Natural Conversation Examples

### Weather Interactions
```
User: "What's the weather?"
Copilot: "I need a location to check the weather. Which city would you like to know about?"
User: "London"
Copilot: [Shows current London weather with emoji-rich formatting]

User: "Weather history"
Copilot: "I need a location and date. Which city and what date (YYYY-MM-DD format)?"
User: "New York, 2024-10-25"
Copilot: [Shows historical weather data]
```

### Joke Interactions
```
User: "Tell me a joke"
Copilot: [Delivers random joke immediately]

User: "Chuck Norris joke about technology"
Copilot: [Shows tech-category Chuck Norris joke]

User: "What joke categories exist?"
Copilot: [Lists all available categories]
```

## 📋 Tool Configuration Details

### Required Parameters
- `get-current-weather`: `location` (string)
- `get-weather-history`: `location` (string), `date` (YYYY-MM-DD)
- `get-weather-forecast`: `location` (string)
- `get-chuck-joke-by-category`: `category` (string)

### Optional Parameters
- `get-weather-forecast`: `days` (1-10, default: 3)

### No Parameters
- `get-chuck-joke`, `get-dad-joke`, `get-chuck-categories`

## 🎨 Response Formatting

All responses include:
- **Rich emoji formatting** for weather data
- **Structured information** (temperature, humidity, wind, etc.)
- **Verification signature** "(That's from the OliOlli weather collection!)"
- **Error handling** with helpful messages

## 🔧 Troubleshooting

### Common Issues
1. **"Location not found"**: Use more specific location names (e.g., "London, UK" instead of just "London")
2. **"Date format error"**: Ensure dates are in YYYY-MM-DD format
3. **"Historical data unavailable"**: Weather history is limited to recent dates

### Testing the Connection
Use these test phrases in Copilot Studio:
- "Health check" → Should connect to server
- "Tell me a joke" → Should work immediately
- "Weather in Tokyo" → Should show current weather

## 🎯 Best Practices for Copilot Studio

### Conversation Flow
1. **Start Simple**: Test basic tools first (jokes work without parameters)
2. **Test Elicitation**: Try incomplete commands to see parameter prompting
3. **Verify Signatures**: Look for "(That's from the OliOlli weather collection!)" in responses

### User Training
Teach your users these natural phrases:
- "What's the weather in [city]?"
- "Show me weather history for [city] on [date]"
- "Give me a [number]-day forecast for [city]"
- "Tell me a Chuck Norris joke about [category]"

## 📊 Expected Response Times
- **Joke Tools**: < 1 second
- **Current Weather**: 1-2 seconds
- **Weather History/Forecast**: 2-3 seconds

## 🔒 Security & Reliability
- **Public endpoint** (no authentication required)
- **Azure Container Apps** hosting for 99.9% uptime
- **Rate limiting** and error handling built-in
- **CORS enabled** for web-based integration

## 📈 Monitoring
The server logs all requests for debugging. Check Azure Container Apps logs if issues arise.

---

**Ready to integrate?** Copy the endpoint URL above into your Copilot Studio MCP configuration and start testing!