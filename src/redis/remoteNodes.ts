'use strict';

import util = require('util');
import confog = require('../../config');
import redis = require('../common/redis');

var remoteNodesKey = 'remoteNodes';

// 在redis集合的尾部添加nodes
export function push(remoteNodes: { address: string, port: number }[], callback?: (err?: string, ret?: any) => void) {
    var nodes: any[] = [remoteNodesKey];

    // 插入，且格式化为address:port的格式
    for (var i = 0, j = remoteNodes.length; i < j; i++) {
        nodes.push(util.format('%s:%d', remoteNodes[i].address, remoteNodes[i].port));
    }

    if (callback || typeof callback === 'function') {
        nodes.push(callback);
    }

    redis.lpush.apply(redis, nodes);
    redis.ltrim(remoteNodesKey, 0, confog.remoteNodesLimit);

    nodes = null;
};

// 在redis链表的头部取出，并且删除node
export function pop(callback: (err: string, ret: string) => void) {
    // callback参数是 callback(err, reply)
    redis.rpop(remoteNodesKey, callback);
};