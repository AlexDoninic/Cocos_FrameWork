//是否完成过管理工具的初始化
cc.director.initMgr = false;

function initMgr(){
    cc.Mgr = {};
    cc.Mgr.Parse = false;
    cc.Mgr.preLoadingScene = false;
    cc.Mgr.initData = false;
    
    cc.Mgr.Event = require("Event");
    cc.Mgr.Utils = require("Utils");
    cc.Mgr.Config = require("Config");
    cc.Mgr.ShareInfos = require("ShareInfos");
    cc.Mgr.ShareInfos.init();
    cc.Mgr.PlatformController = require("PlatformController");
    cc.Mgr.PlatformController.Init();

    cc.Mgr.AdsMgr = require("AdsMgr");
    cc.Mgr.AdsMgr.Init();

    //声音
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
    properties: {
        
    },

    onLoad:function () {
        //目前我们先不保存任何数据  每次开始清理一次
        //cc.sys.localStorage.clear();
        cc.director.GlobalEvent.clear();
        initMgr();
    },

    start () {
        //首先监听右上角的按钮
        cc.Mgr.PlatformController.ShareTopNav();

        cc.Mgr.PlatformController.ShowClubButton(true);

    },


    update(dt)
    {
        
    },

});
