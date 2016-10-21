import util = require('util');
import mongoose = require('mongoose');
import config = require('../../config');
import logger = require('../common/logger');

var uri = util.format('mongodb://%s:%d/%s', config.mongodbHost, config.mongodbPort, config.mongodbDatabase);

//mongoose.set('debug', config.debug);

mongoose.connect(uri, {
    user: config.mongodbUserName,
    pass: config.mongodbPassword
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.mongodbDatabase, err.message);
        process.exit(1);
    }
});

mongoose.connection.on('error', function (err) {
    logger.error('mongodb error: ' + err);
});

// models
require('./resource');

declare class ResourceIf {
    _id: string | Buffer;
    n?: string;
    t?: string;
    s?: number
    f?: { n: string, s?: number }[];
    h?: number;
    c?: Date;
    u?: Date;
    d?: boolean;
    constructor(opts?: any);
    static findOne(opts: ResourceIf | string, callback: (err: Error, ret?: ResourceIf) => void);
};
export var Resource: typeof ResourceIf = mongoose.model('Resource') as any;