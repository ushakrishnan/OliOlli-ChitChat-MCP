# OliOlli MCP Server - Tool Descriptions for Copilot Studio

## Server Configuration
**Endpoint:** `https://jokesmcp-http-typescript.livelysmoke-c2b03354.centralus.azurecontainerapps.io/mcp`

## Tool Descriptions (Copy-Paste Ready)

### Entertainment Tools

**get-chuck-joke**
- **Description:** "Delivers random Chuck Norris jokes for entertainment"
- **Use Cases:** "Tell me a joke", "Make me laugh", "Chuck Norris joke"
- **Parameters:** None required
- **Response:** Instant joke delivery

**get-chuck-joke-by-category** 
- **Description:** "Provides Chuck Norris jokes from specific categories (animals, career, dev, etc.)"
- **Use Cases:** "Chuck Norris joke about technology", "Animal joke", "Career humor"
- **Parameters:** Category name (auto-prompted if missing)
- **Response:** Category-specific joke

**get-chuck-categories**
- **Description:** "Lists all available Chuck Norris joke categories"
- **Use Cases:** "What joke categories exist?", "Show joke types"
- **Parameters:** None required
- **Response:** Complete category list

**get-dad-joke**
- **Description:** "Delivers random family-friendly dad jokes"
- **Use Cases:** "Tell me a dad joke", "Clean humor", "Family jokes"
- **Parameters:** None required
- **Response:** Instant dad joke

### Weather & Utility Tools

**get-current-weather**
- **Description:** "Provides real-time weather conditions with detailed metrics"
- **Use Cases:** "Current weather in [city]", "What's the weather like?", "Temperature check"
- **Parameters:** Location (city name, coordinates, or postal code)
- **Response:** Temperature, conditions, humidity, wind, air quality

**get-weather-history**
- **Description:** "Retrieves historical weather data for specific dates and locations"
- **Use Cases:** "Weather on [date] in [city]", "Historical temperature", "Past weather conditions"
- **Parameters:** Location + Date (YYYY-MM-DD format)
- **Response:** Historical weather metrics and conditions

**get-weather-forecast**
- **Description:** "Provides multi-day weather forecasts with detailed daily breakdowns"
- **Use Cases:** "5-day forecast for [city]", "Weekend weather", "Travel planning"
- **Parameters:** Location + Optional days (1-10, default: 3)
- **Response:** Daily forecasts with temperatures, conditions, precipitation chances

## Smart Features

### Automatic Parameter Prompting
- **Missing Location:** "Which city would you like weather information for?"
- **Missing Date:** "What date do you need? Please use YYYY-MM-DD format."
- **Missing Category:** "Which category would you like? Available options: [list]"

### Error Handling
- **Invalid dates:** Clear format guidance
- **Unknown locations:** Suggestions for more specific location names
- **API issues:** Graceful fallback messages

### Response Verification
All responses include signature: "(That's from the OliOlli weather collection!)"

## Integration Tips

### Natural Language Triggers
Train your Copilot to recognize these patterns:
- **Weather:** "weather", "temperature", "forecast", "climate"
- **Jokes:** "joke", "funny", "humor", "laugh", "entertainment"
- **Location phrases:** "in [city]", "for [location]", "at [place]"
- **Time phrases:** "today", "tomorrow", "this weekend", "on [date]"

### Conversation Flow Examples
```
User Input → Copilot Action → Expected Result

"Weather" → Prompt for location → Get current weather
"Joke about animals" → Use category tool → Animal-themed Chuck Norris joke  
"5-day forecast London" → Use forecast tool → London 5-day forecast
"What was weather like yesterday in Paris" → Prompt for specific date → Historical weather
```

### Best Practice Prompts
Configure your Copilot with these helper prompts:
- "I can check weather for any city worldwide"
- "I can tell jokes from various categories" 
- "For weather history, I need the date in YYYY-MM-DD format"
- "I can provide forecasts up to 10 days ahead"

---

**Ready to configure?** Use the endpoint URL and tool descriptions above in your Copilot Studio setup!