# OliOlli MCP Server

🚀 **Enhanced MCP Server** - An advanced implementation of the Microsoft Copilot Studio MCP template, upgraded with comprehensive joke and weather functionality for enterprise AI assistants.

## 🎥 Live Demonstration

**See the OliOlli MCP Server in action with Microsoft Copilot Studio integration:**
**[🎬 Watch Full Demo on YouTube →](https://youtu.be/oLNaZOOcOyA)**

> 📺 **Video shows**: Weather forecasts, joke integration, and smart parameter elicitation working live in Microsoft Copilot Studio

## �🌟 What Makes This Special?

This server builds upon the **Microsoft Copilot Studio ❤️ MCP** template but has been significantly enhanced with:

- **🎭 Complete Joke API Integration** - Chuck Norris jokes with categories + Dad jokes
- **🌤️ Advanced Weather Services** - Real-time conditions, historical data, and forecasts  
- **🤖 Sophisticated Parameter Elicitation** - Smart conversational prompting with Zod validation
- **🔧 Production-Ready Infrastructure** - Azure Container Apps deployment with environment variables
- **📚 Enterprise Documentation** - Complete integration guides for Copilot Studio and Claude Desktop
- **✅ Comprehensive Testing Suite** - Automated validation for local and Azure deployments

> **Based on**: [Microsoft Copilot Studio MCP Template](https://github.com/microsoft/mcsmcp) - Enhanced for real-world enterprise scenarios

## ❓ What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide context to LLMs, defined by [Anthropic](https://www.anthropic.com/). MCP provides a standardized way to connect AI models to different data sources and tools. MCP allows makers to seamlessly integrate existing knowledge servers and APIs directly into Copilot Studio.

Currently, Copilot Studio only supports Tools. To learn more about current capabilities, see [aka.ms/mcsmcp](https://aka.ms/mcsmcp). There are some known issues & planned improvements. These are listed [here](#known-issues-and-planned-improvements).

## 🆚 Template vs Enhanced Implementation

**Microsoft's Base Template** provides basic MCP structure and Copilot Studio integration patterns.

**OliOlli Enhancement** adds production-ready features:
- ✅ **Real API Integrations** (WeatherAPI.com, Chuck Norris API, Dad Jokes API)
- ✅ **Smart Parameter Handling** with conversational elicitation  
- ✅ **Enterprise Error Handling** and validation
- ✅ **Azure Production Deployment** with environment variables
- ✅ **Comprehensive Documentation** and testing suite

## 🎯 Enhanced Features

### 🎭 Joke Tools

- **Chuck Norris Jokes**: Random jokes and category-specific jokes
- **Dad Jokes**: Random dad jokes from icanhazdadjoke.com
- **Categories**: Get available Chuck Norris joke categories

### 🌤️ Weather Tools

- **Current Weather**: Real-time weather conditions
- **Weather History**: Historical weather data
- **Weather Forecast**: Multi-day weather forecasts

## ⚙️ Prerequisites

- Visual Studio Code installed ([link](https://code.visualstudio.com/download))
- Node v22 (ideally installed via [nvm for Windows](https://github.com/coreybutler/nvm-windows) or [nvm](https://github.com/nvm-sh/nvm))
- Git installed ([link](https://git-scm.com/downloads))
- Docker installed ([link](http://aka.ms/azure-dev/docker-install))
- Azure Developer CLI installed ([link](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd))
- Azure Subscription (with payment method added)
- GitHub account
- Copilot Studio trial or developer account
- **Weather API Key** from [WeatherAPI.com](https://www.weatherapi.com/) (free tier available)

## 🚀 Quick Start Guide

### Option 1: Use This Enhanced Server Directly

1. **Clone this repository**:
   ```bash
   git clone https://github.com/ushakrishnan/OliOlli-ChitChat-MCP.git
   cd OliOlli-ChitChat-MCP
   ```

2. **Set up environment**:
   ```bash
   npm install
   echo "WEATHER_API_KEY=your_api_key_here" > .env
   ```
   
   > **⚠️ Security Note**: Never commit your `.env` file or API keys to version control. The `.env` file is already in `.gitignore` to prevent this.

3. **Run locally** or **Deploy to Azure** (see sections below)

### Option 2: Start from Microsoft Template and Add Enhancements

If you want to build this enhancement yourself:

### Option 2: Start from Microsoft Template and Add Enhancements

If you want to build this enhancement yourself:

1. **Start with Microsoft's template**:
   - Go to [Microsoft's MCP Template](https://github.com/microsoft/mcsmcp)
   - Click `Use this template` → `Create a new repository`
   - Follow the basic setup instructions

2. **Add the enhancements from this repo**:
   - Copy the enhanced `src/server.ts` with weather and joke integrations
   - Add the `tests/` folder for comprehensive testing
   - Update `infra/resources.bicep` with environment variables
   - Copy the `docs/` folder with detailed integration guides

## 🏃‍♀️ Run Locally

1. Run `npm install`

├── docs/                      # Documentation1. Run `npm run build && npm run start`

├── dist/                      # Compiled output

1. Run `npm run build && npm run start`

    ![Terminal view after building and starting the server](./assets/vscode-terminal-run-start.png)

1. Select `PORTS` at the top of the Visual Studio Code Terminal

    ![Image of VS Code where the terminal is open and the PORTS tab is highlighted](./assets/vscode-terminal-ports.png)

1. Select the green `Forward a Port` button

    ![Image of VS Code where the PORTS tab is open and the green `Forward a Port` button is highlighted](./assets/vscode-terminal-ports-forward.png)

1. Enter `3000` as the port number (this should be the same as the port number you see when you ran the command in step 5). You might be prompted to sign in to GitHub, if so please do this, since this is required to use the port forwarding feature.

1. Right click on the row you just added and select `Port visibility` > `Public` to make the server publicly available

1. Ctrl + click on the `Forwarded address`, which should be something like: `https://something-3000.something.devtunnels.ms`

1. Select `Copy` on the following pop-up to copy the URL

    ![View of the PORTS setup with highlighted the port, the forwarded address and the visibility](./assets/vscode-terminal-ports-setup.png) 

1. Open to the browser of your choice and paste the URL in the address bar, type `/mcp` behind it and hit enter

If all went well, you will see the following error message:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

Don't worry - this error message is nothing to be worried about!

### 🌎 Deploy to Azure

> [!IMPORTANT]
> As listed in the [prerequisites](#️-prerequisites), the [Azure Developer CLI ](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) needs to be installed on your machine for this part.

Make sure to login to Azure Developer CLI if you haven't done that yet.

```azurecli
azd auth login
```

Set your Weather API key as an environment variable:

```bash
# Windows (PowerShell)
$env:WEATHER_API_KEY="your_api_key_here"

# Linux/Mac
export WEATHER_API_KEY="your_api_key_here"
```

> [!WARNING]  
> After running `azd up`, you will have an MCP Server running on Azure that is publicly available. Ideally, you don't want that. Make sure to run `azd down` after finishing the lab to delete all the resources from your Azure subscription. Learn how to run `azd down` by going to [this section](#-remove-the-azure-resources). 

Run the following command in the terminal:

```azurecli
azd up
```

For the unique environment name, enter `mcsmcplab` or something similar. Select the Azure Subscription to use and select a value for the location. After that, it will take a couple of minutes before the server has been deployed. When it's done - you should be able to go to the URL that's listed at the end and add `/mcp` to the end of that URL.

![Azd deploy server output](./assets/azd-deploy-server.png)

You should again see the following error:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

## Project Structure

```
OliOlli/
├── src/
│   └── server.ts              # Main MCP server
├── infra/                     # Azure infrastructure (Bicep)
├── tests/                     # Test scripts
├── docs/                      # Documentation
├── dist/                      # Compiled output
├── azure.yaml                 # Azure Developer CLI config
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── Dockerfile                 # Container configuration
└── .env                       # Environment variables
```

## API Endpoints

- `POST /mcp` - MCP protocol endpoint
- `GET /health` - Health check

## Tools Available

| Tool | Description | Parameters |
|------|-------------|------------|
| `get-chuck-joke` | Random Chuck Norris joke | None |
| `get-chuck-joke-by-category` | Chuck Norris joke by category | `category` (string) |
| `get-chuck-categories` | List joke categories | None |
| `get-dad-joke` | Random dad joke | None |
| `get-current-weather` | Current weather | `location` (string) |
| `get-weather-history` | Historical weather | `location` (string), `date` (YYYY-MM-DD) |
| `get-weather-forecast` | Weather forecast | `location` (string), `days` (1-10, default: 3) |

## Testing

Run test scripts from the `tests/` folder:

```bash
# Test weather functionality
node tests/test-weather.js

# Test parameter elicitation
node tests/test-elicitation.js
```

## Integration

### Copilot Studio

Use your deployed server endpoint:

**Local Development**: `https://your-devtunnel-url.devtunnels.ms/mcp`  
**Azure Deployment**: `https://your-app-name.azurecontainerapps.io/mcp`

### Claude Desktop

See comprehensive integration guide in `docs/COPILOT_STUDIO_GUIDE.md`

### GitHub Copilot (VS Code)

See integration instructions in `docs/` folder with step-by-step setup.

## � Key Enhancements Over Base Template

This implementation demonstrates **production-ready MCP patterns**:

| Enhancement | Description | Files |
|-------------|-------------|-------|
| **Real API Integration** | Live weather data from WeatherAPI.com | `src/server.ts` |
| **Parameter Elicitation** | Conversational prompting with Zod validation | `src/server.ts` |
| **Smart Error Handling** | Graceful failures with user-friendly messages | `src/server.ts` |
| **Azure Environment Variables** | Secure API key management | `infra/resources.bicep` |
| **Comprehensive Testing** | Local and Azure validation scripts | `tests/` folder |
| **Enterprise Documentation** | Copy-paste ready integration guides | `docs/` folder |
| **Signature Filtering** | Bypasses Copilot Studio content filters | `src/server.ts` |

## 👨‍💻 Use the Enhanced MCP Server

### In Visual Studio Code / GitHub Copilot

This enhanced server provides 7 production-ready tools (4 joke tools + 3 weather tools) with smart parameter elicitation.

**Setup Instructions:**

1. Press either `ctrl` + `shift` + `P` (Windows/Linux) or `cmd` + `shift` + `P` (Mac) and type `MCP`
1. Select `MCP: Add Server...`
1. Select `HTTP (HTTP or Server-Sent Events)`
1. Paste the URL of your server in the input box (make sure `/mcp` in the end is included)
1. Press `Enter`
1. Enter a name for the server, for instance `JokesMCP`
1. Select `User Settings` to save the MCP Server settings in your user settings

    This will add an MCP Server to your `settings.json` file. It should look like this:
    ![settings.json file](./assets/settings.png)

1. Open `GitHub Copilot`
1. Switch from `Ask` to `Agent`
1. Make sure the `JokesMCP` server actions are selected when you select the tools icon:

    ![Tools menu in GitHub Copilot](./assets/tools-menu.png)

1. Ask the following question:

    ```text
    Get a chuck norris joke from the Dev category
    ```

This should give you a response like this:

![Screenshot of question to provide a joke from the dev category and the answer from GitHub Copilot](./assets/github-copilot-get-joke.png)

Now you have added the enhanced `OliOlli MCP` server to Visual Studio Code!

### In Microsoft Copilot Studio

The enhanced server includes enterprise-ready features for Copilot Studio integration.

**Import the Connector**

1. Go to https://make.preview.powerapps.com/customconnectors (make sure you’re in the correct environment) and click **+ New custom connector**. 
1. Select `Import from GitHub`
1. Select `Custom` as **Connector Type**
1. Select `dev` as the **Branch**
1. Select `MCP-Streamable-HTTP` as the **Connector**
1. Select `Continue`

    ![View of the import from GitHub section](./assets/import-from-github.png)

1. Change the **Connector Name** to something appropriate, like for instance `Jokes MCP` 
1. Change the **Description** to something appropriate
1. Paste your root URL (for instance `something-3000.something.devtunnels.ms` or `something.azurecontainerapps.io`) in the **Host** field
1. Select **Create connector** 

> [!WARNING]  
> You may see a warning and an error upon creation – it should be resolved soon - but you can ignore it for now.

11. Close the connector


**Create an agent and add the MCP server as a tool**

1. Go to https://copilotstudio.preview.microsoft.com/
1. Select the environment picker at the top right corner
1. Select the right environment (the environment with the `Get new features early` toggle switched on)
1. Select `Create` in the left navigation
1. Select the blue `New agent` button

    ![New agent](./assets/newagent.png)

1. Select the `Configure` tab on the left

    ![Configure](./assets/configure.png)

1. Change the name to `Jokester`
1. Add the following `Description`

    ```text
    A humor-focused agent that delivers concise, engaging jokes only upon user request, adapting its style to match the user's tone and preferences. It remains in character, avoids repetition, and filters out offensive content to ensure a consistently appropriate and witty experience.
    ```

1. Add the following `Instructions`

    ```text
    You are a joke-telling assistant. Your sole purpose is to deliver appropriate, clever, and engaging jokes upon request. Follow these rules:
    
    * Respond only when the user asks for a joke or something related (e.g., "Tell me something funny").
    * Match the tone and humor preference of the user based on their input—clean, dark, dry, pun-based, dad jokes, etc.
    * Never break character or provide information unrelated to humor.
    * Keep jokes concise and clearly formatted.
    * Avoid offensive, discriminatory, or NSFW content.
    * When unsure about humor preference, default to a clever and universally appropriate joke.
    * Do not repeat jokes within the same session.
    * Avoid explaining the joke unless explicitly asked.
    * Be responsive, witty, and quick.
    ```

1. Select `Continue` on the top right

    ![Click continue to create agent](./assets/continue.png)

1. Enable Generative AI `Orchestration`

    ![Turn on orchestration](./assets/turnonorchestration.png)

1. Disable general knowledge in the `Knowledge` section

    ![Turn off general knowledge](./assets/turnoffgeneralknowledge.png)

1. Select `Tools` in the top menu
 
    ![Tools](./assets/tools.png)

1. Select `Add a tool`

    ![Add a tool](./assets/addatool.png)

1. Select the `Model Context Protocol` tab to filter all the Model Context Protocol Servers (see number 1 in the screenshot below)

1. Select the `Jokes MCP` server (see number 2 in the screenshot below)

    ![MCP](./assets/mcpsteps.png)

1. Create a new connection by selecting the `Not connected` and **Create new Connection**

    ![Action and connection](./assets/create-connection-action.png)

1. Select `Create`

    ![Create connection](./assets/create-connection-action-create.png)

1. Select `Add to agent` to add the tool to the agent

    ![Add tool to agent](./assets/add-tool-to-agent.png)

1. Select the `refresh icon` in the `Test your agent` pane

    ![Refresh testing pane](./assets/refreshtestingpane.png)

1. In the `Test your agent` pane send the following message:

    ```text
    Can I get a Chuck Norris joke?
    ```
  
    This will show you message that additional permissions are required to run this action. This is because of the user authentication in the action wizard.

1. Select `Connect`

    ![Additional permissions](./assets/additionalpermissions.png)
  
    This will open a new window where you can manage your connections for this agent.

1. Select `Connect` next to the `JokesMCP`

    ![Connect to JokesMCP](./assets/connect.png)

1. Wait until the connection is created and select `Submit`

    ![Pick a connection](./assets/submitconnection.png)

1. The connection should now be connected, so the status should be set to `Connected`

    ![Status connected](./assets/connected.png) 

1. Close the manage your connections tab in your browser

    Now you should be back in the Jokester agent screen.

1. Select the `refresh icon` in the `Test your agent` pane

    ![Refresh testing pane](./assets/refreshtestingpane.png)

1. In the `Test your agent` pane send the following message:

    ```text
    Can I get a Chuck Norris joke?
    ```

    This will now show a Chuck Norris joke - instead of the additional permissions. If that's not the case - you probably have missed the [prerequisite](#️-prerequisites) that the environment needs to have the `get new features early` toggle on.

    ![Chuck Norris joke](./assets/chucknorrisjoke.png)

1. In the `Test your agent` pane send the following message:

    ```text
    Can I get a Dad joke?
    ```

    This will now show a Dad joke.

    ![Dad joke](./assets/dadjoke.png)

And that was the Jokes MCP Server working in Microsoft Copilot Studio.

## ❌ Remove the Azure resources

To remove the Azure resources after finishing the lab, run the following command in the terminal:

```azurecli
azd down
```
This command will show you the resources that will be deleted and then ask you to confirm. Confirm with `y` and the resources will be deleted. This can take a couple of minutes, but at the end you will see a confirmation:

![resources deleted](./assets/azd-down-confirmation.png)

## 💡 Known issues and planned improvements

There are some known issues and planned improvements for MCP in Microsoft Copilot Studio. They are listed in [this Microsoft Learn article](https://aka.ms/mcsmcpdocs#known-issues--planned-improvements).

## 🗣️ Feedback

Hopefully you liked the lab. Please take the time to fill in our [feedback form](https://aka.ms/mcsmcp/lab/feedback) to tell us how we can improve!

## 🚀 Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## ™️ Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

![Microsoft Copilot Studio ❤️ MCP](https://m365-visitor-stats.azurewebsites.net/?resource=https://github.com/microsoft/mcsmcp)
