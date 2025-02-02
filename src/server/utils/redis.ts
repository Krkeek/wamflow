import Redis from "ioredis";

let redis: Redis | null = null;

if (!redis) {
    redis = new Redis({
        host: 'redis-14900.c328.europe-west3-1.gce.redns.redis-cloud.com',
        port: 14900,
        password: 'vUX4eRFnJKMneXj16Zs1cv4avBxerLZl',  // Redis password
    });
}

export default redis;