// Test the Azure deployment to see if weather API is working
const testAzureWeather = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-azure-weather",
    method: "tools/call",
    params: {
      name: "get-current-weather",
      arguments: {
        location: "London"
      }
    }
  };

  try {
    const response = await fetch("https://jokesmcp-http-typescript.livelysmoke-c2b03354.centralus.azurecontainerapps.io/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log("=== AZURE WEATHER TEST ===");
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
          if (jsonData.error) {
            console.log("ERROR:", jsonData.error.message);
          }
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("==========================\n");
  } catch (error) {
    console.error("Azure weather test failed:", error);
  }
};

// Test health endpoint
const testAzureHealth = async () => {
  try {
    const response = await fetch("https://jokesmcp-http-typescript.livelysmoke-c2b03354.centralus.azurecontainerapps.io/health");
    const result = await response.json();
    console.log("=== AZURE HEALTH TEST ===");
    console.log("Health check:", JSON.stringify(result, null, 2));
    console.log("=========================\n");
  } catch (error) {
    console.error("Azure health test failed:", error);
  }
};

// Test joke (should work without API key)
const testAzureJoke = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-azure-joke",
    method: "tools/call",
    params: {
      name: "get-chuck-joke",
      arguments: {}
    }
  };

  try {
    const response = await fetch("https://jokesmcp-http-typescript.livelysmoke-c2b03354.centralus.azurecontainerapps.io/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log("=== AZURE JOKE TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          if (jsonData.result && jsonData.result.content) {
            console.log("Joke content:", jsonData.result.content[0].text);
          }
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=======================\n");
  } catch (error) {
    console.error("Azure joke test failed:", error);
  }
};

console.log("Testing Azure deployment...\n");

setTimeout(async () => {
  await testAzureHealth();
  await testAzureJoke();
  await testAzureWeather();
  console.log("Azure tests completed!");
}, 1000);