(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ui/AppStart.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '294db5kmhVNM6K0TAEwEyUS', 'AppStart', __filename);
// scripts/ui/AppStart.js

"use strict";

//是否完成过管理工具的初始化
cc.director.initMgr = false;
//初始化管理类
function initMgr() {
    cc.Mgr = {};
    cc.Mgr.Parse = false;
    cc.Mgr.preLoadingScene = false;
    cc.Mgr.initData = false;

    cc.Mgr.Event = require("Event");
    cc.Mgr.Utils = require("Utils");
    cc.Mgr.Config = require("Config");
    cc.Mgr.ShareInfos = require("ShareInfos");
    cc.Mgr.ShareInfos.init();

    cc.Mgr.Http = require("HttpMgr");
    cc.Mgr.NetMgr = require("NetMgr");

    //平台控制管理类
    cc.Mgr.PlatformController = require("PlatformController");
    cc.Mgr.PlatformController.Init();
    //广告
    cc.Mgr.AdsMgr = require("AdsMgr");
    cc.Mgr.AdsMgr.Init();

    var AudioMgr = require("AudioMgr");
    cc.Mgr.AudioMgr = new AudioMgr();
    cc.Mgr.AudioMgr.init();
    cc.Mgr.AudioMgr.playBGM("bgm");

    var MapDataMgr = require("MapDataMgr");
    cc.Mgr.MapDataMgr = new MapDataMgr();
    cc.Mgr.MapDataMgr.initMaps(); //初始化解析数据表

    var UserDataMgr = require("UserDataMgr");
    cc.Mgr.UserDataMgr = new UserDataMgr();
}

cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function onLoad() {
        //目前我们先不保存任何数据  每次开始清理一次
        //cc.sys.localStorage.clear();
        cc.director.GlobalEvent.clear();
        initMgr();
    },

    start: function start() {
        //首先监听右上角的按钮
        cc.Mgr.PlatformController.ShareTopNav();
        cc.Mgr.PlatformController.ShowClubButton(true);
    },
    update: function update(dt) {}
});

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
        //# sourceMappingURL=AppStart.js.map
        