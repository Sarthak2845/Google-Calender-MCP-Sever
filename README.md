# Google Calendar MCP Server

🗓️ A Model Context Protocol (MCP) server that enables **seamless Google Calendar integration** with MCP-compatible clients like Postman and Claude Desktop.

**Repository**: [Google Calendar MCP Server](https://github.com/Sarthak2845/Google-Calender-MCP-Sever)

## ✨ Features

- ✅ **Create** calendar events with location, time zones
- 📅 **View** existing events and schedules  
- ✏️ **Update** event details and timing
- 🗑️ **Delete** unwanted events
- 🔐 **OAuth 2.0** authentication
- 🌍 **Multi-timezone** support

---

## ⚙️ Prerequisites

- **Node.js** v18+ (v20+ recommended)
- **npm** package manager
- **Google Calendar API** enabled in Google Cloud Console
- **OAuth 2.0 access token** (not client ID/secret)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Sarthak2845/Google-Calender-MCP-Sever.git
cd Google-Calender-MCP-Sever
npm install
```

### 2. Get OAuth 2.0 Access Token
1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Select **Calendar API v3** scopes
3. Click **Authorize APIs** and sign in
4. Click **Exchange authorization code for tokens**
5. Copy the **Access token** (starts with `ya29.`)

### 3. Configure Environment
Create `.env` file:
```env
# Replace with your actual OAuth 2.0 access token
ISTRUZI_API_KEY=ya29.a0AS3H6Ny...
```

### 4. Test the Server
```bash
node mcpServer.js
```

---

## 🔧 Client Setup

### 📮 Postman Desktop
1. Open Postman Desktop
2. Create new **MCP request**
3. Set type to **STDIO**
4. Command: `node <path_to_your_project>/mcpServer.js`
5. Connect and test calendar operations

### 🤖 Claude Desktop
1. Open Claude Desktop settings
2. Go to **Developers** → **Edit Config**
3. Add server configuration:

```json
{
  "mcpServers": {
    "postman-calendar": {
      "command": "C:\\Program Files\\nodejs\\node.exe",
      "args": ["<path_to_your_project>\\mcpServer.js"]
    }
  }
}
```

**Replace `<path_to_your_project>` with your actual project path, e.g.:**
- Windows: `"D:\\my-projects\\Google-Calender-MCP-Sever\\mcpServer.js"`
- Mac/Linux: `"/Users/username/Google-Calender-MCP-Sever/mcpServer.js"`

4. Restart Claude Desktop
5. Verify server shows **green** (active) status

---

## 📝 Example Usage

### Create Event
```json
{
  "method": "tools/call",
  "params": {
    "name": "create_calendar_event",
    "arguments": {
      "calendarId": "your-email@gmail.com",
      "eventData": {
        "summary": "Team Meeting",
        "start": {
          "dateTime": "2025-03-15T10:30:00+05:30",
          "timeZone": "Asia/Kolkata"
        },
        "end": {
          "dateTime": "2025-03-15T12:30:00+05:30",
          "timeZone": "Asia/Kolkata"
        },
        "location": "Conference Room A"
      }
    }
  }
}
```

---

## ⚠️ Important Notes

- **Access tokens expire** after ~1 hour - refresh as needed
- Use **proper IANA timezone** names (e.g., `Asia/Kolkata`, not `IST`)
- Ensure **end time is after start time** to avoid errors
- Calendar ID is typically your **Gmail address**

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `Invalid Credentials` | Get fresh OAuth 2.0 access token |
| `Time range is empty` | Check start time < end time |
| `Node not found` | Install Node.js from [nodejs.org](https://nodejs.org) |
| Server not connecting | Verify absolute paths in config |

---

