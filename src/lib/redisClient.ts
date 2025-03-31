import Redis from "ioredis";
import { RedisInfo } from "redis-info";

let redisClient: Redis | null = null;

const connectToRedis = (): Redis => {
    const redisUrl =
        process.env.NODE_ENV === "production"
            ? process.env.REDIS_PROD_URL
            : process.env.REDIS_DEV_URL;

    if (!redisUrl) {
        throw new Error("Redis URL is not set in the environment variables.");
    }

    const redisClient = new Redis(redisUrl, 
        {
        retryStrategy: (times) => {
            console.warn(`Retrying connection to Redis (attempt ${times})...`);
            return Math.min(times * 50, 2000); // Retry strategy with a delay
        },
    });

    redisClient.on("connect", () => {
        console.log(`Connected to Redis on ${redisUrl}`);
    });

    redisClient.on("error", (err: RedisInfo) => {
        console.error("Redis connection error:", err);
    });

    redisClient.on("end", () => {
        console.warn("Redis connection lost. Attempting to reconnect...");
    });

    return redisClient;
};

if (!redisClient) {
    redisClient = connectToRedis();
}

export { redisClient, connectToRedis };
