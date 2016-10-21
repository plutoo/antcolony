"use strict";
const redis = require('./../common/redis');
// 保存infohash
function sadd(infohash) {
    redis.sadd('infohash', infohash);
}
exports.sadd = sadd;
// 随机取出并且删除一个infohash
function spop(callback) {
    redis.spop('infohash', callback);
}
exports.spop = spop;
//# sourceMappingURL=infohash.js.map