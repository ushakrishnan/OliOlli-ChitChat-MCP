import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const server = new McpServer({
  name: "mcp-streamable-http",
  version: "1.0.0",
});

// Get Chuck Norris joke tool
const getChuckJoke = server.tool(
  "get-chuck-joke",
  "Get a random Chuck Norris joke",
  async (extra) => {
    console.log("=== TOOL INVOCATION: get-chuck-joke ===");
    console.log("Request ID:", extra.requestId);
    console.log("Available properties:", Object.keys(extra));
    console.log("========================================");
    
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `${data.value} (That's from the OliOlli joke collection!)`,
        },
      ],
    };
  }
);

// Get Chuck Norris joke by category tool
const getChuckJokeByCategory = server.tool(
  "get-chuck-joke-by-category",
  "Get a random Chuck Norris joke by category",
  {
    category: z.string().describe("Category of the Chuck Norris joke"),
  },
  async (params: { category: string }) => {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${params.category}`
    );
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `${data.value} (That's from the OliOlli joke collection!)`,
        },
      ],
    };
  }
);

// Get Chuck Norris joke categories tool
const getChuckCategories = server.tool(
  "get-chuck-categories",
  "Get all available categories for Chuck Norris jokes",
  async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/categories");
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `Available categories: ${data.join(", ")} (That's from the OliOlli joke collection!)`,
        },
      ],
    };
  }
);

// Get Dad joke tool
const getDadJoke = server.tool(
  "get-dad-joke",
  "Get a random dad joke",
  async (extra) => {
    console.log("=== TOOL INVOCATION: get-dad-joke ===");
    console.log("Request ID:", extra.requestId);
    console.log("Available properties:", Object.keys(extra));
    console.log("====================================");
    
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `${data.joke} (That's from the OliOlli joke collection!)`,
        },
      ],
    };
  }
);

// Weather API helper function
const getWeatherApiKey = () => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("WEATHER_API_KEY not found in environment variables");
  }
  return apiKey;
};

// Get current weather tool
const getCurrentWeather = server.tool(
  "get-current-weather",
  "Get current weather conditions for a specific location",
  {
    location: z.string().describe("Location (city name, coordinates, or postal code). Examples: 'London', 'New York', '48.8566,2.3522', or '10001'"),
  },
  async (params: { location: string }) => {
    const apiKey = getWeatherApiKey();
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(params.location)}&aqi=yes`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    const weatherInfo = `🌡️ Current Weather for ${data.location.name}, ${data.location.region}, ${data.location.country}

📍 Location: ${data.location.name} (${data.location.lat}, ${data.location.lon})
🕐 Local Time: ${data.location.localtime}
🌡️ Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)
🌤️ Condition: ${data.current.condition.text}
💨 Wind: ${data.current.wind_kph} km/h (${data.current.wind_mph} mph) ${data.current.wind_dir}
💧 Humidity: ${data.current.humidity}%
👁️ Visibility: ${data.current.vis_km} km (${data.current.vis_miles} miles)
🌊 Pressure: ${data.current.pressure_mb} mb
☁️ Cloud Cover: ${data.current.cloud}%
🌡️ Feels Like: ${data.current.feelslike_c}°C (${data.current.feelslike_f}°F)
💨 Gust: ${data.current.gust_kph} km/h (${data.current.gust_mph} mph)

🏭 Air Quality Index: ${data.current.air_quality?.us_epa_index || 'N/A'} (US EPA)
- CO: ${data.current.air_quality.co} μg/m³
- NO₂: ${data.current.air_quality.no2} μg/m³
- O₃: ${data.current.air_quality.o3} μg/m³

(That's from the OliOlli weather collection!)`;
    
    return {
      content: [
        {
          type: "text",
          text: weatherInfo,
        },
      ],
    };
  }
);

// Get weather history tool
const getWeatherHistory = server.tool(
  "get-weather-history",
  "Get historical weather data for a specific location and date",
  {
    location: z.string().describe("Location (city name, coordinates, or postal code). Examples: 'London', 'New York', '48.8566,2.3522', or '10001'"),
    date: z.string().describe("Date in YYYY-MM-DD format (must be within the last 30 days). Example: '2025-10-15'"),
  },
  async (params: { location: string; date: string }) => {
    const apiKey = getWeatherApiKey();
    
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(params.date)) {
      throw new Error("Date must be in YYYY-MM-DD format");
    }
    
    const response = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${encodeURIComponent(params.location)}&dt=${params.date}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const dayData = data.forecast.forecastday[0].day;
    
    const historyInfo = `📅 Weather History for ${data.location.name}, ${data.location.region}, ${data.location.country} on ${params.date}

📍 Location: ${data.location.name} (${data.location.lat}, ${data.location.lon})
📅 Date: ${params.date}

🌡️ Temperature:
- Max: ${dayData.maxtemp_c}°C (${dayData.maxtemp_f}°F)
- Min: ${dayData.mintemp_c}°C (${dayData.mintemp_f}°F)
- Average: ${dayData.avgtemp_c}°C (${dayData.avgtemp_f}°F)

🌤️ Condition: ${dayData.condition.text}
💧 Humidity: ${dayData.avghumidity}%
💨 Max Wind: ${dayData.maxwind_kph} km/h (${dayData.maxwind_mph} mph)
👁️ Average Visibility: ${dayData.avgvis_km} km (${dayData.avgvis_miles} miles)
☔ Total Precipitation: ${dayData.totalprecip_mm} mm (${dayData.totalprecip_in} inches)
☀️ UV Index: ${dayData.uv}

(That's from the OliOlli weather collection!)`;
    
    return {
      content: [
        {
          type: "text",
          text: historyInfo,
        },
      ],
    };
  }
);

// Get weather forecast tool
const getWeatherForecast = server.tool(
  "get-weather-forecast",
  "Get weather forecast for a specific location",
  {
    location: z.string().describe("Location (city name, coordinates, or postal code). Examples: 'London', 'New York', '48.8566,2.3522', or '10001'"),
    days: z.number().min(1).max(10).default(3).describe("Number of forecast days (1-10, default: 3)"),
  },
  async (params: { location: string; days?: number }) => {
    const apiKey = getWeatherApiKey();
    const forecastDays = params.days || 3;
    
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(params.location)}&days=${forecastDays}&aqi=no&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    let forecastInfo = `🔮 ${forecastDays}-Day Weather Forecast for ${data.location.name}, ${data.location.region}, ${data.location.country}

📍 Location: ${data.location.name} (${data.location.lat}, ${data.location.lon})
🕐 Local Time: ${data.location.localtime}

`;

    data.forecast.forecastday.forEach((day: any, index: number) => {
      const dayData = day.day;
      forecastInfo += `📅 Day ${index + 1} - ${day.date}:
🌡️ Temp: ${dayData.mintemp_c}°C to ${dayData.maxtemp_c}°C (${dayData.mintemp_f}°F to ${dayData.maxtemp_f}°F)
🌤️ Condition: ${dayData.condition.text}
☔ Rain Chance: ${dayData.daily_chance_of_rain}%
🌨️ Snow Chance: ${dayData.daily_chance_of_snow}%
💨 Max Wind: ${dayData.maxwind_kph} km/h (${dayData.maxwind_mph} mph)
💧 Humidity: ${dayData.avghumidity}%
☀️ UV Index: ${dayData.uv}
☔ Precipitation: ${dayData.totalprecip_mm} mm

`;
    });

    // Add weather alerts if any
    if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
      forecastInfo += `⚠️ Weather Alerts:
`;
      data.alerts.alert.forEach((alert: any) => {
        forecastInfo += `- ${alert.headline}: ${alert.desc}
`;
      });
    }

    forecastInfo += `(That's from the OliOlli weather collection!)`;
    
    return {
      content: [
        {
          type: "text",
          text: forecastInfo,
        },
      ],
    };
  }
);

const app = express();
app.use(express.json());

// Add CORS headers for testing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const transport: StreamableHTTPServerTransport =
  new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // set to undefined for stateless servers
  });

// Setup routes for the server
const setupServer = async () => {
  await server.connect(transport);
};

app.post("/mcp", async (req: Request, res: Response) => {
  console.log("=== MCP REQUEST DEBUG ===");
  console.log("Body:", JSON.stringify(req.body, null, 2));
  
  // Log the specific headers we're looking for
  console.log("=== HEADERS WE CONFIGURED ===");
  console.log("X-User-Id:", req.headers['x-user-id']);
  console.log("X-User-Email:", req.headers['x-user-email']);
  console.log("X-Session-Id:", req.headers['x-session-id']);
  console.log("X-Connection-Id:", req.headers['x-connection-id']);
  console.log("X-MS-User-Object-Id:", req.headers['x-ms-user-object-id']);
  console.log("X-MS-Tenant-Id:", req.headers['x-ms-tenant-id']);
  
  // Log ALL headers to see what else comes through
  console.log("=== ALL HEADERS ===");
  Object.keys(req.headers).forEach(key => {
    console.log(`${key}: ${req.headers[key]}`);
  });
  console.log("========================");
  
  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.get("/health", (req: Request, res: Response) => {
  console.log("=== HEALTH CHECK REQUEST ===");
  console.log("Headers:", req.headers);
  console.log("==========================");
  res.json({ 
    status: "healthy", 
    server: "OliOlli MCP Server",
    timestamp: new Date().toISOString()
  });
});

app.get("/mcp", async (req: Request, res: Response) => {
  console.log("Received GET MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

app.delete("/mcp", async (req: Request, res: Response) => {
  console.log("Received DELETE MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
setupServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to set up the server:", error);
    process.exit(1);
  });
