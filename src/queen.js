'use strict';
/**
 * Worker - 收集infohash
 * Male   - 根据infohash下载torrent文件
 * Female - 解析torrent文件，存入mongodb
 */
var method = process.argv.slice(2)[0];
var port = process.argv.slice(2)[1];
const Male = require('./male');
const Female = require('./female');
const Worker = require('./worker');
if (method === 'male') {
    Male.run();
}
else if (method === 'female') {
    Female.run();
}
else {
    Worker.create(port);
}
//# sourceMappingURL=queen.js.map