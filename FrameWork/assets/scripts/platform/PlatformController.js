
var PlatformController = cc.Class({
    statics:{
        //微信 wx
        //头条 tt
        //百度 baidu
        platform:"wx",

        Init:function () {
        	if(!window.wx && !window.tt && !window.swan)
            	this.platform="pc";
        },

        //百度 头条等先判定是否登陆了
        IsLoginSync:function(){
        	if(this.platform == "baidu")
        	{
        		var result = swan.isLoginSync();
    			if(result.isLogin)
    			{
    				console.log("已经有登陆了");
    				return true;
    			}
    			return false;
        	}
        	else if(this.platform == "tt")
        	{

        	}
        	return true;
        },

        Login:function(){
        	var self = this;
        	if(this.platform == "baidu")
        	{
        		swan.login({
			        success: function () {
			            //登陆成功后执行某个操作
			        },
			        fail: function () {
			            swan.showModal({
			                title: "登录失败",
			                content: "是否重新登录？",
			                cancelText: "退出游戏",
			                success: function (res) {
			                    if (res.confirm) {
			                        console.log("点击了确定");
			                        self.Login();
			                    }
			                    else if (res.cancel) {
			                        console.log("点击了取消");
			                        swan.exit();
			                    }
			                }
			            });
			        }
			    })
        	}
        	else if(this.platform == "tt")
        	{
        		tt.login({
				    success (res) {
				        
				    },
				    fail (res) {
				        tt.showModal({
			                title: "登录失败",
			                content: "是否重新登录？",
			                cancelText: "退出游戏",
			                success: function (res) {
			                    if (res.confirm) {
			                        console.log("点击了确定");
			                        self.Login();
			                    }
			                    else if (res.cancel) {
			                        console.log("点击了取消");
			                        tt.exit();
			                    }
			                }
			            });
				    }
				});
        	}
        	return true;
        },

        //游戏圈按钮
        CreateGameClub:function(){
        	if(this.platform == "wx")
        	{
        		var winSize = cc.view.getVisibleSize();
        		var leftRatio = 68 / winSize.width;
        		var topRatio = 275 / winSize.height;

        		var sysInfo = wx.getSystemInfoSync();

        		this.leftPos = sysInfo.windowWidth * leftRatio;
        		this.topPos = sysInfo.windowHeight * topRatio;

        		var self = this;
        		this.gameClubBtn = wx.createGameClubButton({
        			icon:'green',
        			text:"游戏圈",
        			style:{
        				left:self.leftPos - 20,
        				top:self.topPos - 20,
        				width: 45,
        				height: 45,
        			}
        		});
        	}
        },
        //游戏圈按钮是否显示
        ShowClubButton:function(flag = false)
        {
        	if(this.platform == "wx" && this.gameClubBtn != null)
        	{
        		if(flag == true)
        			this.gameClubBtn.show();
        		else
        			this.gameClubBtn.hide();
        	}
        },

        //创建意见反馈
        CreateFeedBackButton:function(){
        	if(this.platform == "wx")
        	{
        		var winSize = cc.view.getVisibleSize();
        		var leftRatio = 68 / winSize.width;
        		var topRatio = 275 / winSize.height;
        		var sysInfo = wx.getSystemInfoSync();
        		this.lPos = sysInfo.windowWidth * leftRatio;
        		this.tPos = sysInfo.windowHeight * topRatio;
        		var self = this;
		        cc.loader.loadRes("/share.png",function(err, texture){
		            self.feedBackBtn = wx.createFeedbackButton({
	        			type:"image",
	        			image:texture,
	        			style:{
	        				left:self.lPos - 20,
	        				top:self.tPos - 20,
	        				width: 45,
	        				height: 45,
	        			}
	        		});
		        });
        	}
        },
        //意见反馈按钮显示和隐藏
        ShowFeedbackBtn:function(flag = false)
        {
        	if(this.platform == "wx" && this.feedBackBtn != null)
        	{
        		if(flag == true)
        			this.feedBackBtn.show();
        		else
        			this.feedBackBtn.hide();
        	}
        },

        //客服入口
        OpenServiceConversation:function(){
	    	if(this.platform == "wx")
	    	{
	    		wx.openCustomerServiceConversation({
	    			sessionFrom:'',
	    			showMessageCard:true,
	    		});
	    	}
	    	else if(this.platform == "tt")
	    	{
	    		
	    	}
	    },

        //右上角的转发按钮
        ShareTopNav:function(){
        	var index = Math.floor(Math.random()*8);
	        let info = cc.Mgr.ShareInfos.getShareInfos(index);
	        if(this.platform == "wx")
	        {
	            wx.showShareMenu({withShareTicket:true});
	            wx.onShareAppMessage(function () {
	                return {
	                  title: info.text,
	                  //imageUrlId: '',
	                  imageUrl: info.url,
	                }
	            })
	        }
	        else if(this.platform == "tt")
	        {
	            tt.showShareMenu(false);
	            tt.onShareAppMessage(function () {
	                return {
	                  title: info.text,
	                  //imageUrlId: 'Ik14RZj7SV2BtigrtE3d1g',
	                  imageUrl: '',
	                }
	            })
	        }
	        else if(this.platform == "baidu")
	        {
	            swan.showShareMenu(false);
	            swan.onShareAppMessage(function () {
	                return {
	                  title: info.text,
	                  //imageUrlId: 'Ik14RZj7SV2BtigrtE3d1g',
	                  imageUrl: info.url
	                }
	            })
	        }
        },

        //转发一段文本
        ShareToFriendTxt:function(str){
        	console.log("点击了分享啊");
        	var info = cc.Mgr.ShareInfos.getShareInfos(1);
        	if(this.platform == "wx")
	        {
	            wx.shareAppMessage({
	                title: str,
	                imageUrl: info.url,
	            })
	        }
	        else if(this.platform == "tt")
	        {
	            tt.shareAppMessage({
	                title: str,
	                imageUrl: info.url,
	            })
	        }
	        else if(this.platform == "baidu")
	        {
	            swan.shareAppMessage({
	                title: str,
	                imageUrl: info.url,
	            })
	        }
        },

        //自定义转发
        ShareToFriend:function(index){
        	console.log("点击了分享啊");
        	var info = cc.Mgr.ShareInfos.getShareInfos(index);
	        if(this.platform == "wx")
	        {
	            wx.shareAppMessage({
	                title: info.text,
	                imageUrl: info.url,
	            })
	        }
	        else if(this.platform == "tt")
	        {
	            tt.shareAppMessage({
	                title: info.text,
	                imageUrl: info.url
	            })
	        }
	        else if(this.platform == "baidu")
	        {
	            swan.shareAppMessage({
	                title: info.text,
	                imageUrl: info.url
	            })
	        }
        },
 		//显示平台的小弹窗 回调用
        showToast:function(text)
	    {
	        cc.log(text);
	        if(this.platform == "wx")
	        {
	            wx.showToast({
	                title: text,
	                icon: 'none',
	                duration: 2000
	            })
	        }
	        else if(this.platform == "tt")
	        {
	            tt.showToast({
	                title: text,
	                icon: 'none',
	                duration: 2000
	            })
	        }
	        else if(this.platform == "baidu")
	        {
	            swan.showToast({
	                title: text,
	                icon: 'none',
	                duration: 2000
	            })
	        }  
	    },

	    //打开客服对话
	    OpenServiceConversation:function(){
	    	if(this.platform == "wx")
	    	{
	    		wx.openCustomerServiceConversation({
	    			sessionFrom:'',
	    			showMessageCard:true,
	    		});
	    	}
	    	else if(this.platform == "baidu")
	    	{
	    		swan.openCustomerServiceConversation({

	    		});
	    	}
	    },

	    //微信开放数据存储 score 代表当前要保存的东西
	    setUserCloudStorage:function(socre) 
	    {
	        cc.log("setUserCloudStorage socre = " + socre);
	        if(this.platform == "wx")
	        {
	            var kvData={};
	            kvData.wxgame={};
	            kvData.wxgame.score = socre;
	            kvData.wxgame.update_time =  new Date().getTime();
	            console.log(JSON.stringify(kvData));

	            var kvDataList = new Array();
	            kvDataList.push({key: "xmbScore", value: JSON.stringify(kvData)});
	            wx.setUserCloudStorage({
		            KVDataList: kvDataList,
		            success: res => {
		                console.log("success:" + JSON.stringify(res))
		            },
		            fail: res => {
		                console.log("fail : " + res);
		            }
	            });
	        }
	        else if(this.platform == "baidu")
	        {
	        	var kvData={};
	            kvData.wxgame={};
	            kvData.wxgame.score = socre;
	            kvData.wxgame.update_time =  new Date().getTime();
	            console.log(JSON.stringify(kvData));

	            var kvDataList = new Array();
	            kvDataList.push({key: "xmbScore", value: JSON.stringify(kvData)});

	        	swan.setUserCloudStorage({
					KVDataList: kvDataList,
					success: res => console.log("success "+res),
					fail: res => console.log("fail "+res),
					complete: res => console.log("complete "+res)
				});
	        }
	    },

	    //是否支持排行功能
	    IsSupportRank:function()
	    {
	        if(this.platform == "wx" || this.platform == "baidu")
	            return true;

	        return false;
	    },

	    //显示子域
	    showSubContentView:function()
	    {
	        if(this.platform == "wx" || this.platform == "baidu" )
	        {
		        var param = {};
		        param.platform = this.platform;
		        param.flag = true;
		        cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
	        }
	    },

	    //隐藏子域
	    hideSubContentView:function()
	    {
	        if(this.platform == "wx" || this.platform == "baidu" )
	        {
	            var param = {};
		        param.flag = false;
		        param.platform = this.platform;
		        cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
	        }
	    },

	    //向子域发送信息
	    SendMessageToSubView:function(code,curScore=0)
	    {
	        var msg={};
	        msg.code = code;
	        msg.curScore = curScore;
	        if(this.platform == "wx")
	        {
	            wx.getOpenDataContext().postMessage({
	                message: msg
	            });
	        }
	        else if(this.platform == "baidu")
	        {
	        	swan.getOpenDataContext().postMessage({
				    message: msg
				});
	        }
	    },

	    //是否支持录屏
	    IsSupportRecordScreen:function()
	    {
	        if(this.platform == "tt")
	            return true;
	        else if(this.platform == "baidu")//百度有基础库版本限制
	        {
	        	if(this.CompareSdkVesrion(swan.getSystemInfoSync().SDKVersion, "1.4.1"))
	        		return true;
	        	else
	            	return false;
	        }

	        return false;
	    },

	    CompareSdkVesrion:function(sdkV, needV){
	    	var out1 = sdkV.split('.');
	    	var out2 = needV.split('.');
	    	for (var i = 0; i < out1.length; i++) {
	    		if(parseInt(out1[i]) < parseInt(out2[i]))
	    		{
	    			return 0;
	    		}
	    		else if(parseInt(out1[i]) > parseInt(out2[i]))
	    		{
	    			return 1;
	    		}
	    	}
	    	return 1;
	    },

	    //开始录屏
	    StartRecordScreen:function()
	    {
	        var self = this;
	        this.videoPath = "";
	        if(this.platform == "tt")
	        {
	            if(this.recorderManager == null)
	            {
	                this.recorderManager = tt.getGameRecorderManager();
	                
	                this.recorderManager.onStart(res =>{
	                    console.log("录制开始了: "+res);
	                });

	                this.recorderManager.onStop(res =>{
	                    console.log("录制结束了: "+res.videoPath);
	                    self.videoPath = res.videoPath;
	                    self.ShareRecordScreen();
	                });
	                
	                this.recorderManager.onPause(() =>{
	                    console.log("录制暂停了");
	                });
	                
	                this.recorderManager.onResume(() =>{
	                    console.log("录制恢复了");
	                });

	                this.recorderManager.onError(errMsg =>{
	                    console.log("录制出错了:" + errMsg);
	                });
	            }

	            this.recorderManager.start({
	                duration: 30,//基础录制30秒
	            });
	        }
	        else if(this.platform == "baidu")
	        {
	            if(this.recorderManager == null)
	            {
	                this.recorderManager = swan.getVideoRecorderManager();
	                
	                this.recorderManager.onStart(res =>{
	                    console.log("录制开始了: "+res);
	                });

	                this.recorderManager.onStop(res =>{
	                    console.log("录制结束了: "+res.videoPath);
	                    self.videoPath = res.videoPath;
	                });
	                
	                this.recorderManager.onPause(() =>{
	                    console.log("录制暂停了");
	                });
	                
	                this.recorderManager.onResume(() =>{
	                    console.log("录制恢复了");
	                });

	                this.recorderManager.onError(errMsg =>{
	                    console.log("录制出错了:" + errMsg);
	                });
	            }
	            this.recorderManager.start({
	                duration: 30,
	                microphoneEnabled: true,//是否支持麦克风
	            });
	        }
	    },
	    //停止录屏
	    StopRecordScreen:function()
	    {
	        if(this.platform == "tt")
	        {
	            if(this.recorderManager == null)
	            {
	                return;
	            }
	            console.log("停止录制");
	            this.recorderManager.stop();
	        }

	        else if(this.platform == "baidu")
	        {
	            if(this.recorderManager == null)
	            {
	                return;
	            }
	            console.log("停止录制");
	            this.recorderManager.stop();
	        }
	    },
	    //分享录制的视频
	    ShareRecordScreen:function()
	    {
	        if(this.platform == "tt")
	        {
	            if(this.recorderManager == null || this.videoPath == "")
	            {
	                return;
	            }
	            console.log("分享录制的视频");
	            tt.shareVideo({
	                videoPath: `${this.videoPath}`,
	                success () {
	                console.log("分享成功！");
	                },
	                fail (e) {
	                console.log("分享失败！"  + e);
	                }
	            });
	        }
	        else if(this.platform == "baidu")
	        {
	            if(this.recorderManager == null || this.videoPath == null)
	            {
	                return;
	            }

	            console.log("分享录制的视频");
	            swan.shareVideo({
	                videoPath: `${this.videoPath}`,
	                success () {
	                console.log("分享成功！");
	                },
	                fail (e) {
	                console.log("分享失败！" + e);
	                }
	            });
	        }
	    },

	    //跳转到其他小程序  要到对应 app.json 或者 game.json 中添加列表
	    JumpToOtherApp:function(appId){
	    	if(this.platform == "wx")
	    	{
	    		wx.navigateToMiniProgram({
					appId: appId,
					envVersion:'release',
					success(res) {
						console.log("成功打开了其他小程序");
					}
				});
	    	}
	    	else if(this.platform == "baidu")
	    	{
	    		swan.navigateToMiniProgram({
					appKey: appId,
					success(res) {
						console.log("成功打开了其他小程序");
					}
				});
	    	}
	    	else if(this.platform == "tt")
	    	{
	    		tt.navigateToMiniProgram({
					appId: appId,
					envVersion:'release',
					success(res) {
						console.log("成功打开了其他小程序");
					}
				});
	    	}
	    },

	    //震屏功能  长震动还是短震动
	    QuakeScreen:function(long = true){
	    	if(this.platform != "pc")
	    	{
	    		if(long == true)
	    		{
	    			if(this.platform == "tt")
		    		{
		    			tt.vibrateLong({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateLong调用失败`);
						    }
						});
		    		}
		    		else if(this.platform == "baidu")
		    		{
		    			swan.vibrateLong({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateLong调用失败`);
						    }
						});
		    		}
		    		else if(this.platform == "wx")
		    		{
		    			wx.vibrateLong({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateLong调用失败`);
						    }
						});
		    		}
	    		}
	    		else
	    		{
	    			if(this.platform == "tt")
		    		{
		    			tt.vibrateShort({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateShort调用失败`);
						    }
						});
		    		}
		    		else if(this.platform == "baidu")
		    		{
		    			swan.vibrateShort({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateShort调用失败`);
						    }
						});
		    		}
		    		else if(this.platform == "wx")
		    		{
		    			wx.vibrateShort({
						    success (res) {
						        console.log(`${res}`);
						    },
						    fail (res) {
						        console.log(`vibrateLong调用失败`);
						    }
						});
		    		}
	    		}
	    	}
	    },
	},
});
module.exports = PlatformController;
