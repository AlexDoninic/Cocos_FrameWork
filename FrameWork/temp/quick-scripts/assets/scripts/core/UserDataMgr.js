(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/UserDataMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd200aUEaNBB3IdNzh1nSm20', 'UserDataMgr', __filename);
// scripts/core/UserDataMgr.js

"use strict";

//游戏数据操作类
//数据操作结构
var UserDataMgr = cc.Class({
	extends: cc.Component,

	properties: {
		playTimes: cc.Integer, //游戏次数
		playerName: "Alex"
	},

	initData: function initData() {
		cc.Mgr.initData = false;

		//本地存储数据
		var StorageData = cc.sys.localStorage.getItem('game_userdata'); //作为一个整体保存起来
		if (StorageData == null || StorageData == "") {
			//cc.log("还没有保存过持久数据");
			var userdata = {};
			userdata.playerName = "";
			userdata.playTimes = 0;
			this.playerName = "";
			this.playTimes = 0;
			cc.sys.localStorage.setItem('game_userdata', JSON.stringify(userdata));
		} else {
			//cc.log("有之前保存的持久数据存在");
			var Data = JSON.parse(StorageData);
			this.playerName = Data.playerName;
			this.playTimes = Data.playTimes;
		}

		cc.Mgr.initData = true;
	},

	//保存本地数据
	SaveUserData: function SaveUserData() {
		var userdata = {};
		userdata.playerName = this.playerName;
		userdata.playTimes = this.playTimes;
		cc.sys.localStorage.setItem('game_userdata', JSON.stringify(userdata));
	}

	//其他操作方法

});

module.exports = UserDataMgr;

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
        //# sourceMappingURL=UserDataMgr.js.map
        