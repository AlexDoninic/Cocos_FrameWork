var RankItem = require("RankItem");
var BeyondNode = require("BeyondNode");
var NormalNode = require("NormalNode");
//测试数据
//{"openid":"o0OhZ5Kn2xO9b5FVR8TE0YXOl3Wc","nickname":"杨彬","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/FcRibGPkicSKhn6LA1OWfL7ictiaKiajzibzW8zwQibkGKdCJmmiasvibcRasI2KytcVtW8ClH5IQTsOs3CB8vyMSUAOarA/132","KVDataList":[{"key":"\belsfkScore","value":"{\"wxgame\":{\"score\":1889,\"update_time\":1553824369920}}"}]}
cc.Class({
    extends: cc.Component,

    properties: {
        ShowNum:5,//排行榜每一页显示5个
        PageIndex:1,
        AllPageNum:1,
        PageLbl:cc.Label,

        platform:"wx",
        //over界面
        rankMyItem:RankItem,
        RankFatherNode:cc.Node,
        FiveItemNodes:[RankItem],
        //重生界面
        ReBeyondNode:BeyondNode,
        RankThreeNode:cc.Node,//结束界面的部分
        ThreeNormalNodes:[NormalNode],

        FrontPlayer:BeyondNode, //左上角的即将超越的玩家
        avatarUrl:"",
        nickName:"",
    },

    Init:function () {
        if(!window.wx && !window.tt && !window.swan)
            this.platform="pc";
    },

    start(){
        this.Init();
        if(this.platform == "wx" || this.platform == "baidu"){
            this.mySordId = -1;
            this.initUserInfo();
            wx.onMessage( data => {
                if (data.message) {
                    console.log(data.message.code);
                    //console.log(data.message.curScore);
                    switch(data.message.code)
                    {
                        case "GetRankList": //单纯的只是为了拿到排行数据
                        this.getRankListData();
                        break;
                        case "RankPanelOpen":
                        this.ShowRankList();//全部排行
                        break;
                        case "ToNextPage":
                        this.ShowNextPage();//向下翻页
                        break;
                        case "ToFrontPage":
                        this.ShowFrontPage();//向上翻页
                        break;
                        case "RankPanelClose"://关闭排行榜
                        this.CloseRankList();
                        break;
                        case "RankPanelCloseInMainView"://关闭排行榜
                        this.CloseRankListInMainView();
                        break;
                        case "ShowThreeNodes":
                        this.ShowOverThreeNodes(); //显示即将超越的玩家
                        break;
                        case "ShowBeyondNormalNode":
                        this.ShowBeyondUserInfo(data.message.curScore); //显示正常左上角玩家
                        break;
                        case "ShowBeyondRebornNode":
                        this.ShowBeyondRebornUserInfo(data.message.curScore); //显示重生超越的玩家
                        break;
                        case "RefreshBeyondNormalNode":
                        this.ShowBeyondUserInfo(data.message.curScore); //刷新超越
                        break;
                    }
                }
            });
        }
    },

    initUserInfo () {
    	if(this.platform == "wx")
    	{
    		wx.getUserInfo({
	            openIdList: ['selfOpenId'],
	            lang: 'zh_CN',
	            success: (res) => {
	                this.avatarUrl = res.data[0].avatarUrl;
	                this.nickName = res.data[0].nickName;
	            },
	            fail: (res) => {
	                console.error(res);
	            }
	        });
    	}
        else if(this.platform == "baidu"){
        	swan.getUserInfo({
	            swanIdList: ['selfSwanId', 'mVMFstGRGOhjaVwejKX6-do0wN'],
                success: (res) => {
                    this.avatarUrl = res.data[0].avatarUrl;
                },
                fail: (res) => {
                    console.log("没有成功拿到自己的数据 = ", res);
                }
	        });
        }
    },

    //结束 三个节点
    ShowOverThreeNodes:function(){
        this.RankFatherNode.active = false;
        this.FrontPlayer.node.active = false;
        this.RankThreeNode.active = true;
        this.ReBeyondNode.node.active = false;
        var infos = this.getThreeNodesAroundMe();
        for (var i = 0; i <= this.ThreeNormalNodes.length - 1; i++) {
            this.ThreeNormalNodes[i].ShowData(i, infos[i]);
        }
    },

    //显示和刷新左上角
    ShowBeyondUserInfo:function(score){
        console.log("传进来的数据 = " + score);
        this.RankFatherNode.active = false;
        this.FrontPlayer.node.active = true;
        this.RankThreeNode.active = false;
        this.ReBeyondNode.node.active = false;
        if(this.userInfo == null || this.userInfo.length == 0)
            return;
        var info = this.getUserInfoBeforeMe(score);
        this.FrontPlayer.ShowData(score, info);
    },

    //显示重生界面即将超越玩家
    ShowBeyondRebornUserInfo:function(score){
        this.RankFatherNode.active = false;
        this.FrontPlayer.node.active = false;
        this.RankThreeNode.active = false;
        this.ReBeyondNode.node.active = true;
        var info = this.getUserInfoBeforeMe(score);
        this.ReBeyondNode.ShowData(score, info);
    },

    getThreeNodesAroundMe:function(){
        var threeUserInfos = [];
        if(this.userInfo.length == 1)
        {
            threeUserInfos.push(this.userInfo[0]);
            threeUserInfos.push(this.userInfo[0]);
            threeUserInfos.push(this.userInfo[0]);
        }
        else if(this.userInfo.length >= 2 && this.mySordId == 0)
        {
            threeUserInfos.push(this.userInfo[0]);
            threeUserInfos.push(this.userInfo[0]);
            threeUserInfos.push(this.userInfo[1]);
        }
        else if(this.userInfo.length >= 2 && this.mySordId == this.userInfo.length-1)
        {
            threeUserInfos.push(this.userInfo[this.mySordId-1]);
            threeUserInfos.push(this.userInfo[this.mySordId]);
            threeUserInfos.push(this.userInfo[this.mySordId]);
        }
        else
        {
            threeUserInfos.push(this.userInfo[this.mySordId-1]);
            threeUserInfos.push(this.userInfo[this.mySordId]);
            threeUserInfos.push(this.userInfo[this.mySordId+1]);
        }
        return threeUserInfos;
    },

    ShowRankList:function()
    {
        this.FrontPlayer.node.active = false;
        this.RankThreeNode.active = false;
        this.ReBeyondNode.node.active = false;
        this.RankFatherNode.active = true;
        wx.getFriendCloudStorage({keyList:['tzScore'],
        success: (res) => {
            console.log("得到了数据了");
            this.CollateData(res.data);
            if(this.userInfo.length == 0)
                return;
            this.ShowPanel();
            this.SetMyRankItem();
            this.PageLbl.string = 1+"/"+this.AllPageNum;
        },
        fail: (res) => {
            console.error(res);
        }
        });
    },

    ShowPanel:function(){
        for (var i = 0; i < this.FiveItemNodes.length; i++) {
            this.FiveItemNodes[i].node.active = false;
        }
        if(this.userInfo == null || this.userInfo.length == 0)
            return;

        if(this.userInfo.length > this.ShowNum)
        {
            for (var i = 0; i < this.ShowNum; i++) {
                var data = this.userInfo[i];
                this.FiveItemNodes[i].node.active = true;
                this.FiveItemNodes[i].ShowData(i,data);
            }   
        }
        else
        {
            for (var i = 0; i < this.userInfo.length; i++) {
                var data = this.userInfo[i];
                this.FiveItemNodes[i].node.active = true;
                this.FiveItemNodes[i].ShowData(i,data);
            }
        } 
        this.PageIndex = 1;
    },

    ShowNextPage:function(){
        if(this.userInfo == null)
            return;
        if(this.userInfo.length <= this.PageIndex * 5)
        {
            return;
        }
        var index = this.PageIndex * 5;
        if(this.userInfo.length < (this.PageIndex + 1) * 5)
        {
            for (var j = 0; j < this.FiveItemNodes.length; j++) {
                if(this.userInfo[index] != null)
                {
                    this.FiveItemNodes[j].node.active = true;
                    this.FiveItemNodes[j].ShowData(index,this.userInfo[index]);
                }
                else
                {
                    this.FiveItemNodes[j].node.active = false;
                }
                index += 1;
            }
        }
        else if(this.userInfo.length >= (this.PageIndex + 1) * 5)
        {
            for (var j = 0; j < this.FiveItemNodes.length; j++) {
                this.FiveItemNodes[j].node.active = true;
                this.FiveItemNodes[j].ShowData(index,this.userInfo[index]);
                index += 1;
            }
        }
        this.PageIndex += 1;
        this.PageLbl.string = this.PageIndex+"/"+this.AllPageNum;
    },

    ShowFrontPage:function(){
        if(this.userInfo == null)
            return;
        if(this.userInfo.length <= this.ShowNum)
        {
            return;
        }
        if(this.PageIndex == 0)
            return;

        var index = (this.PageIndex-1) * 5;
        for (var j = 0; j < this.FiveItemNodes.length; j++) {
            if(this.userInfo[index] != null)
            {
                this.FiveItemNodes[j].node.active = true;
                this.FiveItemNodes[j].ShowData(index,this.userInfo[index]);
            }
            else
            {
                this.FiveItemNodes[j].node.active = false;
            }
            index += 1;
        }
        this.PageLbl.string = this.PageIndex+"/"+this.AllPageNum;
        this.PageIndex -= 1;
    },

    CloseRankList:function(){
        this.ShowBeyondUserInfo(this.userInfo[this.mySordId].score);
    },

    CloseRankListInMainView:function(){
        this.FrontPlayer.node.active = false;
        this.RankThreeNode.active = false;
        this.ReBeyondNode.node.active = false;
        this.RankFatherNode.active = false;
    },

    SetMyRankItem:function(){
        if(this.mySordId == -1)
        {
            this.rankMyItem.node.active = false;
            return
        }
        this.rankMyItem.ShowData(this.mySordId, this.userInfo[this.mySordId]);
    },

    //整理数据
    CollateData:function(data)
    {
        this.userInfo = [];
        var j = 0;
        for (let i = 0; i < data.length; ++i) {
            if(data[i].KVDataList.length == 0)
            {
                console.log("combData 没有此项数据");
                continue;
            }
            this.userInfo[j]={};
            this.userInfo[j].openid = data[i].openid;
            this.userInfo[j].nickname = data[i].nickname;
            this.userInfo[j].avatarUrl = data[i].avatarUrl;

            var kVDataListValuestr = data[i].KVDataList[0].value;
            kVDataListValuestr = kVDataListValuestr.substr(1); //删除第一个字符
            kVDataListValuestr = kVDataListValuestr.substr(0, kVDataListValuestr.length-1); 
            kVDataListValuestr = "{" + kVDataListValuestr + "}";
            var gameScore = JSON.parse(kVDataListValuestr).wxgame;
            this.userInfo[j].score = gameScore.score;
            j++;
        }
        //给用户数据进行排序
        this.userInfo.sort((a,b)=>{
                if(a.score<b.score)
                    return 1;
                else if(a.score>b.score)
                    return -1
                else
                    return 0;
            }
        );
        for(var i=0 ;i<this.userInfo.length;i++)
        {
            if(this.userInfo[i].avatarUrl == this.avatarUrl)
            {
                this.mySordId = i;
            }
        }
        if(this.userInfo.length % this.ShowNum != 0)
            this.AllPageNum = Math.floor(this.userInfo.length / this.ShowNum) + 1;
        else
            this.AllPageNum = Math.floor(this.userInfo.length / this.ShowNum);
        console.log("数据长度 = " + this.userInfo.length);    
    },

    //比较分数获取自己排名前方的玩家数据  保证先排过
    getUserInfoBeforeMe:function(myScore){
        var index = 0;
        for(var i=0;i<this.userInfo.length;i++)
        {
            if(myScore > this.userInfo[i].score)
            {
                break;
            }
            index += 1;
        }
        if(index >= 1)
            return this.userInfo[index-1];
        else
            return this.userInfo[0];
    },

    //拿到排行榜数据
    getRankListData:function(){
        if(this.platform == "wx")
        {
            wx.getFriendCloudStorage({keyList:['tzScore'],
            success: (res) => {
                console.log("得到了数据了： ");
                //console.log(JSON.stringify(res.data));
                this.CollateData(res.data);
            },
            fail: (res) => {
                console.error(res);
            }
            });
        }
    },

    //单纯只是拿个人数据
    GetMyUserInfo:function() {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                cc.log("成功获取自己的数据");
                this.avatarUrl = res.data[0].avatarUrl;
                this.nickName = res.data[0].nickName;
            },
            fail: (res) => {
                console.error(res);
            }
        });
    },
});
