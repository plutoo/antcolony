"use strict";
var pm2 = require('pm2');
const config = require('./config');
const util = require('util');
console.log("startup ... ");
pm2.connect(function (err) {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    var method = process.argv.slice(2)[0], port = process.argv.slice(2)[1];
    console.log("enter pm2 .. ");
    if (!method || !port) {
        console.error('请输入方法名和端口号，例如: \n\tnode startup worker 3000\n\tnode startup male 1');
        process.exit(0);
    }
    else {
        pm2.start('src/queen.js', {
            name: util.format('%s[%s]', method, port),
            maxMemoryRestart: config.memoryLimit,
            nodeArgs: ['--max-old-space-size=' + config.memoryLimit[method]],
            scriptArgs: [method, port],
            force: true
        }, function (err, proc) {
            if (err) {
                console.error(err);
                process.exit(0);
            }
            pm2.disconnect(function () {
                process.exit(0);
            });
        });
    }
});
//# sourceMappingURL=startup.js.map