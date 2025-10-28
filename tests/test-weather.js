// Test script for weather functionality
const testCurrentWeather = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-current-weather",
    method: "tools/call",
    params: {
      name: "get-current-weather",
      arguments: {
        location: "London"
      }
    }
  };

  try {
    const response = await fetch("http://localhost:3000/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log("=== CURRENT WEATHER TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
          if (jsonData.result && jsonData.result.content) {
            console.log("Weather content:", jsonData.result.content[0].text);
          }
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=============================\n");
  } catch (error) {
    console.error("Current weather test failed:", error);
  }
};

const testWeatherHistory = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-weather-history",
    method: "tools/call",
    params: {
      name: "get-weather-history",
      arguments: {
        location: "New York",
        date: "2024-10-20"
      }
    }
  };

  try {
    const response = await fetch("http://localhost:3000/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log("=== WEATHER HISTORY TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
          if (jsonData.result && jsonData.result.content) {
            console.log("Weather content:", jsonData.result.content[0].text);
          }
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=============================\n");
  } catch (error) {
    console.error("Weather history test failed:", error);
  }
};

const testWeatherForecast = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-weather-forecast",
    method: "tools/call",
    params: {
      name: "get-weather-forecast",
      arguments: {
        location: "Tokyo",
        days: 3
      }
    }
  };

  try {
    const response = await fetch("http://localhost:3000/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log("=== WEATHER FORECAST TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
          if (jsonData.result && jsonData.result.content) {
            console.log("Weather content:", jsonData.result.content[0].text);
          }
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=============================\n");
  } catch (error) {
    console.error("Weather forecast test failed:", error);
  }
};

// Run all tests
console.log("Testing Weather API functionality...\n");

setTimeout(async () => {
  await testCurrentWeather();
  await testWeatherHistory();
  await testWeatherForecast();
  console.log("All tests completed!");
}, 1000); // Wait 1 second for server to be ready