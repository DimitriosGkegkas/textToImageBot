import dotenv from "dotenv";
dotenv.config();

const VIBER_AUTH_TOKEN = process.env.VIBER_AUTH_TOKEN;
if (!VIBER_AUTH_TOKEN) {
    throw new Error("Missing env: No VIBER_AUTH_TOKEN");
}

const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN;
if (!WEBHOOK_DOMAIN) {
    throw new Error("Missing env: No WEBHOOK_DOMAIN");
}
const BACKEND_SERVER = process.env.BACKEND_SERVER;

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Missing env: No MONGODB_URI");
}

const PORT = process.env.PORT || 3001;
if (!PORT) {
    throw new Error("Missing env: No PORT");
}

export const viberConfig = {
    auth_token: VIBER_AUTH_TOKEN,
    webhook_domain: WEBHOOK_DOMAIN,
    port: PORT,
    mongodb_uri: MONGODB_URI,
};

export const backendServer = BACKEND_SERVER;

export const witToken = process.env.WIT_TOKEN;
export const passPhrase = process.env.PASS_PHRASE || "SUPERSECRET";
export const adminUser = {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin",
    allowSend: true,
};
