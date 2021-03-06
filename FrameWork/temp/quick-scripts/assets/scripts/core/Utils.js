(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/Utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8fde9BkXa9PRJVejPBOOoTq', 'Utils', __filename);
// scripts/core/Utils.js

"use strict";

var Utils = cc.Class({
    extends: cc.Component,

    statics: {
        //输入一个数值 将这个数值转换为 时间格式
        FormatNumToTime: function FormatNumToTime(num) {
            var hour = Math.floor(num / 3600); //时
            var min = Math.floor((num - hour * 3600) / 60); //分
            var sec = Math.floor(num - hour * 3600 - min * 60); //秒
            var str1 = hour;
            var str2 = min;
            var str3 = sec;
            if (hour < 10) {
                str1 = "0" + hour;
            }
            if (min < 10) {
                str2 = "0" + min;
            }
            if (sec < 10) {
                str3 = "0" + sec;
            }
            var out = str1 + ":" + str2 + ":" + str3;

            return out;
        },
        //获取系统时间
        GetSysTime: function GetSysTime() {
            var timestamp = Math.round(new Date() / 1000) - 3600 * 24 * 365 * 49;
            return timestamp;
        },
        //格式化数值
        FormatNum: function FormatNum(num) {
            num = num + '';
            var str = "";
            for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
                if (j % 3 == 0 && i != 0) {
                    //每隔三位加逗号，过滤正好在第一个数字的情况  
                    str += num[i] + ","; //加千分位逗号  
                    continue;
                }
                str += num[i]; //倒着累加数字
            }
            var out = str.split('').reverse().join(""); //字符串=>数组=>反转=>字符串
            if (out[0] == ',') return out.splice(0, 1);
            return out;
        },
        //获取翻译字段
        getTranslation: function getTranslation(desId) {
            for (var prop in cc.director.NoticeText) {
                if (prop.toString() == desId) {
                    return cc.director.NoticeText[prop];
                }
            }
            var des = "翻译字段null";
            return des;
        }
    }
});
module.exports = Utils;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Utils.js.map
        