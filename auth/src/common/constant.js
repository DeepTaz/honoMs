const PORT = process.env.PORT || 3000

const URI = process.env.AUTH_ENV === "dev" ? process.env.dev_uri || "mongodb://localhost:27017/house" : process.env.uri

export const AUTH = {
    PORT,
    URI,
    HOST: process.env.host || `http://localhost:${PORT}`,
    EXPIRES: "5m",
    JWT_SECRET: process.env.jwt_scret || "ppp"
}

export const COOKIE_OPTIONS = {
    /*path: '/',*/
    /*secure: true,*/
    /*httpOnly: true,*/
    /*maxAge: 1000,*/
    /*expires: new Date(),
    /*sameSite: 'Strict',*/
}

export const PATHS = {
    SIGN_IN: "/",
    SIGN_UP: "/signup",
    LOGOUT: "/logout",
    USER: "/user",
    PROFILE: "/profile"
}