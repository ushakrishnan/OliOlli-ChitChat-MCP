// Test MCP parameter elicitation - testing what happens when required parameters are missing

const testMissingLocation = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-missing-location",
    method: "tools/call",
    params: {
      name: "get-current-weather",
      arguments: {}  // Missing required 'location' parameter
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
    console.log("=== MISSING LOCATION PARAMETER TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=========================================\n");
  } catch (error) {
    console.error("Missing location test failed:", error);
  }
};

const testMissingDate = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-missing-date",
    method: "tools/call",
    params: {
      name: "get-weather-history",
      arguments: {
        location: "Paris"  // Missing required 'date' parameter
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
    console.log("=== MISSING DATE PARAMETER TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("====================================\n");
  } catch (error) {
    console.error("Missing date test failed:", error);
  }
};

const testInvalidDate = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-invalid-date",
    method: "tools/call",
    params: {
      name: "get-weather-history",
      arguments: {
        location: "Berlin",
        date: "invalid-date-format"  // Invalid date format
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
    console.log("=== INVALID DATE FORMAT TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Parsed JSON:", JSON.stringify(jsonData, null, 2));
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("===================================\n");
  } catch (error) {
    console.error("Invalid date test failed:", error);
  }
};

const testListTools = async () => {
  const payload = {
    jsonrpc: "2.0",
    id: "test-list-tools",
    method: "tools/list",
    params: {}
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
    console.log("=== LIST TOOLS TEST ===");
    console.log("Raw response:", responseText);
    
    // Parse SSE format
    const lines = responseText.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const jsonData = JSON.parse(line.substring(6));
          console.log("Available tools:", jsonData.result?.tools?.map(t => `${t.name}: ${t.description}`));
        } catch (e) {
          console.log("Line:", line);
        }
      }
    }
    console.log("=======================\n");
  } catch (error) {
    console.error("List tools test failed:", error);
  }
};

// Run elicitation tests
console.log("Testing MCP Parameter Elicitation...\n");

setTimeout(async () => {
  await testListTools();
  await testMissingLocation();
  await testMissingDate();
  await testInvalidDate();
  console.log("All elicitation tests completed!");
}, 1000);