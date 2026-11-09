// Define allowed environment modes
type EnvMode = "development" | "production";

// Define the shape of your API configuration
interface ServerConfig {
  API_SERVER: string;
  WS_URL: string;
}

// Development configuration
const development: ServerConfig = {
  API_SERVER:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8002/api/v1",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "ws://api.localhost:8002",
};

// Production configuration
const production: ServerConfig = {
  API_SERVER: process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`
    : "https://api.aethelflow.com/api/v1",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "wss://api.aethelflow.com",
};

// Map environments to configs
const configUrls: Record<EnvMode, ServerConfig> = {
  development,
  production,
};

// Get current environment mode (default to development)
const currentMode = "production" as EnvMode;

const API_URLS: ServerConfig = configUrls[currentMode];

export default API_URLS;
