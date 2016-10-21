"use strict";
const _ = require('lodash');
const bencode = require('bencode');
// 格式化文件列表
function getFileListAndSize(list) {
    var result = [], size = 0;
    list.map(function (currentValue) {
        var names = currentValue['path.utf-8'] || currentValue['path'], item = {
            s: currentValue.length,
            n: names[names.length - 1].toString() // 文件名
        };
        result.unshift(item);
        size += currentValue.length;
    });
    return {
        list: result,
        size: size
    };
}
;
// 获取主文件类型
function getFileType(list) {
    if (!list || list.length <= 0) {
        return '';
    }
    var mainFile = _.max(list, 'length'), mainFileName = mainFile['path.utf-8'] || mainFile['path'], _split = mainFileName[mainFileName.length - 1].toString().split('.');
    return _split.length <= 0 ? '' : _split[_split.length - 1];
}
module.exports = function (torrentData) {
    var data = bencode.decode(torrentData), dataInfo = data.info;
    torrentData = null;
    // 种子只有一个文件的时候，可能不存在files字段，
    if (dataInfo.files) {
        var fileListAndSize = getFileListAndSize(dataInfo.files);
        return {
            // 种子文件名
            n: (dataInfo['name.utf-8'] || dataInfo['name']).toString(),
            // 主文件类型
            t: getFileType(dataInfo.files),
            // 包含的文件列表
            f: fileListAndSize.list,
            // 总大小
            s: fileListAndSize.size
        };
    }
    else {
        var name = (dataInfo['name.utf-8'] || dataInfo['name']).toString(), _split = name.split('.'), type = _split.length <= 0 ? '' : _split[_split.length - 1];
        return {
            n: name,
            t: type,
            f: {
                n: name,
                s: dataInfo.length
            },
            s: dataInfo.length
        };
    }
};
//# sourceMappingURL=torrent.js.map