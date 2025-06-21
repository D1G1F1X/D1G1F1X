import { Redis } from "@upstash/redis"

// Ensure this is only initialized on the server side
if (typeof window !== "undefined") {
  throw new Error("Redis client should only be used on the server side")
}

// Use environment variables for Redis connection
const KV_URL = process.env.KV_URL
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN

let redisInstance: Redis | null = null

if (KV_URL && KV_REST_API_TOKEN) {
  redisInstance = new Redis({
    url: KV_URL,
    token: KV_REST_API_TOKEN,
  })
} else {
  console.warn(
    "Upstash Redis environment variables (KV_URL, KV_REST_API_TOKEN) are not set. Redis functionality will be disabled.",
  )
}

export const redis = redisInstance
