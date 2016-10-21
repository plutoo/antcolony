"use strict";
const redis = require("redis");
const logger = require('./logger');
const config = require('../../config');
var client = redis.createClient(config.redisPort, config.redisHost, {
    auth_pass: config.redisAuth
});
client.on("error", function (error) {
    logger.error('redis error: ' + error);
});
client.on('end', function () {
    logger.info('redis服务器连接被断开');
});
module.exports = client;
//# sourceMappingURL=redis.js.map