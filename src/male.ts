
import fs = require('fs');
import path = require('path');
import async = require('async');
import util = require('util');
import config = require('../config');
import infohash = require('./redis/infohash');
import logger = require('./common/logger');
import download = require('./common/download');


export function run() {
    // 随机取出并且删除一个infohash
    infohash.spop(function (error, _infohash) {
        if (error || !_infohash) {
            setTimeout(next, 3000);
            return;
        }

        // 转为大写
        _infohash = _infohash.toUpperCase();

        // 随机生成一个队列
        var list: string[] = [],
            urls = [
                // util.format('http://zoink.it/torrent/%s.torrent', _infohash),
                // util.format('http://bt.box.n0808.com/%s/%s/%s.torrent', _infohash.substr(0, 2), _infohash.substr(_infohash.length - 2, 2), _infohash),
                // util.format('http://torrage.com/torrent/%s.torrent', _infohash),
                util.format('http://torcache.net/torrent/%s.torrent', _infohash)
            ];

        list.push(urls.splice(Math.floor(urls.length * Math.random()), 1)[0]);
        while (urls.length) {
            list.push(Math.random() > 0.5 ? urls.pop() : urls.shift());
        }

        // 按照队列的顺序下载资源
        async.whilst(function () {
            return list.length > 0;
        }, function (callback) {
            var url = list.pop(),
                timer = null;

            // 下载3分钟，返回失败
            timer = setTimeout(function () {
                callback(null);
            }, 3 * 60 * 1000);

            download(url, function (err, data) {
                clearTimeout(timer);
                if (err) {
                    // 下载失败，但是这里要响应为'成功'，以进入下一个地址的下载
                    callback(null);
                } else {
                    save(_infohash, data);
                    callback('success');
                }
            });
        }, function (err) {
            // err存在，主动断开，表示下载成功
            // if (!err) {
            //     // 下载失败，记录下来
            //     failure(_infohash);
            // }
            next();
        });
    });
};

// 保存文件
function save(_infohash, data) {
    var filePath = path.join(__dirname + '/../.temp/' + _infohash + '.torrent');
    fs.writeFile(filePath, data, function (err) {
        if (err) {
            logger.error(err as any);
        }
    });
};

// 记录失败的infohash
function failure(_infohash) {
    var filePath = path.join(__dirname + '/../log/failureInfohash.txt'),
        message = util.format('magnet:?xt=urn:btih:%s\n', _infohash);
    fs.appendFile(filePath, message);
};

function next() {
    setImmediate(run);
};

