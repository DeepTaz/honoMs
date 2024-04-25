const PORT = process.env.PORT || 3000

const URI = process.env.AUTH_ENV === "dev" ? process.env.dev_uri || "mongodb://localhost:27017/house" : process.env.uri

const HOUSE = {
    PORT,
    URI,
    HOST: process.env.host || `http://localhost:${PORT}`,
    EXPIRES: "5m",
    JWT_SECRET: process.env.jwt_scret || "ppp",
}