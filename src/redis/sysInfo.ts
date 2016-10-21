

import redis = require('./../common/redis');

// 增加发送请求数
export function incrSendRequest() {
    redis.hincrby('sysInfo', 'sendRequest', 1);
}

// 增加发送响应数
export function incrSendReponse() {
    redis.hincrby('sysInfo', 'sendReponse', 1);
}

// 增加接收请求数
export function incrReceiveRequest() {
    redis.hincrby('sysInfo', 'receiveRequest', 1);
}

// 增加接收响应数
export function incrReceiveReponse() {
    redis.hincrby('sysInfo', 'receiveReponse', 1);
}

// 增加接收错误数
export function incrReceiveError() {
    redis.hincrby('sysInfo', 'receiveError', 1);
}

// infohash+1
export function incrInfohash() {
    redis.hincrby('sysInfo', 'infohash', 1);
}