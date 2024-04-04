import packageJson from "../../package.json";
import dotenv from "dotenv";

const local_env: dotenv.DotenvConfigOutput | undefined = dotenv.config();

const get_env = <T>(name: string, def: T | string = ""): T | string => {
    try {
        if (process.env[name]) return process.env[name] as T;
        if (local_env?.parsed && local_env.parsed[name]) return local_env.parsed[name] as T;
        return def;
    } catch (error) {
        return def;
    }
};

export const server = {
	host: String(get_env("HOST", "0.0.0.0")),
	port: Number(get_env("PORT", 1131)),
};

export const jwt = {
    secret: String(get_env("SECRET_KEY","secret_key"))
}

export default {
    server,
    jwt
}