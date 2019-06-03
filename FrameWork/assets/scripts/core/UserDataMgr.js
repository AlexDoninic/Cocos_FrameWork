//游戏数据操作类
//数据操作结构
var UserDataMgr = cc.Class({
    extends: cc.Component,

    properties:{
    	playTimes:cc.Integer,//游戏次数
		playerName:"Alex",
	},

	initData:function () {
		cc.Mgr.initData = false;

		//本地存储数据
		var StorageData = cc.sys.localStorage.getItem('game_userdata'); //作为一个整体保存起来
		if(StorageData == null || StorageData == "")
		{
			//cc.log("还没有保存过持久数据");
			var userdata = {};
			userdata.playerName = "";
			userdata.playTimes = 0;
			this.playerName = "";
			this.playTimes = 0;
			cc.sys.localStorage.setItem('game_userdata',JSON.stringify(userdata));
		}
		else
		{
			//cc.log("有之前保存的持久数据存在");
			var Data = JSON.parse(StorageData);
			this.playerName = Data.playerName;
			this.playTimes = Data.playTimes;
		}

		cc.Mgr.initData = true;
	},

	//保存本地数据
	SaveUserData:function(){
		var userdata = {};
		userdata.playerName = this.playerName;
		userdata.playTimes = this.playTimes;
		cc.sys.localStorage.setItem('game_userdata',JSON.stringify(userdata));
	},

	//其他操作方法

});

module.exports = UserDataMgr
