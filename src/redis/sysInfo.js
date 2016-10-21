"use strict";
const redis = require('./../common/redis');
// 增加发送请求数
function incrSendRequest() {
    redis.hincrby('sysInfo', 'sendRequest', 1);
}
exports.incrSendRequest = incrSendRequest;
// 增加发送响应数
function incrSendReponse() {
    redis.hincrby('sysInfo', 'sendReponse', 1);
}
exports.incrSendReponse = incrSendReponse;
// 增加接收请求数
function incrReceiveRequest() {
    redis.hincrby('sysInfo', 'receiveRequest', 1);
}
exports.incrReceiveRequest = incrReceiveRequest;
// 增加接收响应数
function incrReceiveReponse() {
    redis.hincrby('sysInfo', 'receiveReponse', 1);
}
exports.incrReceiveReponse = incrReceiveReponse;
// 增加接收错误数
function incrReceiveError() {
    redis.hincrby('sysInfo', 'receiveError', 1);
}
exports.incrReceiveError = incrReceiveError;
// infohash+1
function incrInfohash() {
    redis.hincrby('sysInfo', 'infohash', 1);
}
exports.incrInfohash = incrInfohash;
//# sourceMappingURL=sysInfo.js.map