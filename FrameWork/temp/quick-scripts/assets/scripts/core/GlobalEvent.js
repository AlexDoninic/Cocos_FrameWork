(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/GlobalEvent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b5a94AUBhhFQKkBpmCdMQ6J', 'GlobalEvent', __filename);
// scripts/core/GlobalEvent.js

"use strict";

//全局事件处理  分发和监听   相当于一个全局观察者
//这个事件分发处理机制 没有针对每个绑定个体的
cc.director.GlobalEvent = {
    handles_: {},
    //发送事件 事件分发
    emit: function emit(eventName, data) {
        var returns = []; //返回值
        //console.log('事件分发', eventName);
        data.eventName = eventName; //保存一下事件名字

        for (var findEvenName in this.handles_) {
            if (findEvenName == eventName) {
                for (var i = 0; i < this.handles_[findEvenName].length; i++) {
                    if (this.handles_[findEvenName][i]) {
                        var returnValue = this.handles_[findEvenName][i](data);
                        returns.push(returnValue);
                    }
                }
            }
        }
        return returns;
    },
    //添加普通事件  监听
    on: function on(eventName, callback, target) {
        //console.log('完成事件注册监听', eventName);
        this.handles_[eventName] = this.handles_[eventName] || [];

        this.handles_[eventName].push(callback.bind(target));
    },
    //通过事件名和target移除一种事件监听
    off: function off(eventName) {
        if (!this.handles_[eventName]) return;

        for (var i = 0; i < this.handles_[eventName].length; i++) {
            this.handles_[eventName][i] = null;
        }
    },

    //一次性清空所有数据
    clear: function clear() {
        for (var findEvenName in this.handles_) {
            for (var i = 0; i < this.handles_[findEvenName].length; i++) {
                this.handles_[findEvenName][i] = null;
            }
        }
    }
};

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
        //# sourceMappingURL=GlobalEvent.js.map
        