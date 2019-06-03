(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/Event.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bf1b7bGpDxFNZxQSrgXQdYl', 'Event', __filename);
// scripts/core/Event.js

"use strict";

var Event = cc.Class({
    extends: cc.Component,
    statics: {
        ParseFinish: "ParseFinish" //解析数据完毕
    }
});
module.exports = Event;

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
        //# sourceMappingURL=Event.js.map
        