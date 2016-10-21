
import redis = require('./../common/redis');

// 保存infohash
export function sadd(infohash) {
    redis.sadd('infohash', infohash);
}

// 随机取出并且删除一个infohash
export function spop(callback?: (err: Error, dat: string) => void) {
    redis.spop('infohash', callback);
}