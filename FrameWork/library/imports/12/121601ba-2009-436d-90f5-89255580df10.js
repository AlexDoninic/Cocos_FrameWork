"use strict";
cc._RF.push(module, '12160G6IAlDbZD1iSVVgN8Q', 'PlatformController');
// scripts/platform/PlatformController.js

"use strict";

var PlatformController = cc.Class({
	statics: {
		//微信 wx
		//头条 tt
		//百度 baidu
		platform: "wx",

		Init: function Init() {
			if (!window.wx && !window.tt && !window.swan) this.platform = "pc";
		},

		//百度 头条等先判定是否登陆了
		IsLoginSync: function IsLoginSync() {
			if (this.platform == "baidu") {
				var result = swan.isLoginSync();
				if (result.isLogin) {
					console.log("已经有登陆了");
					return true;
				}
				return false;
			} else if (this.platform == "tt") {}

			return true;
		},

		Login: function Login() {
			var self = this;
			if (this.platform == "baidu") {
				swan.login({
					success: function success() {
						self.setUserCloudStorage(cc.Mgr.UserDataMgr.HistoryHighAssets);
					},
					fail: function fail() {
						swan.showModal({
							title: "登录失败",
							content: "是否重新登录？",
							cancelText: "退出游戏",
							success: function success(res) {
								if (res.confirm) {
									console.log("点击了确定");
									self.Login();
								} else if (res.cancel) {
									console.log("点击了取消");
									swan.exit();
								}
							}
						});
					}
				});
			} else if (this.platform == "tt") {}
			return true;
		},

		//游戏圈按钮
		CreateGameClub: function CreateGameClub() {
			if (this.platform == "wx") {
				var winSize = cc.view.getVisibleSize();
				var leftRatio = 68 / winSize.width;
				var topRatio = 275 / winSize.height;

				var sysInfo = wx.getSystemInfoSync();

				this.leftPos = sysInfo.windowWidth * leftRatio;
				this.topPos = sysInfo.windowHeight * topRatio;

				console.log(this.topPos + "  ================创建游戏圈按钮===============" + this.leftPos);

				var self = this;
				this.gameClubBtn = wx.createGameClubButton({
					icon: 'green',
					text: "游戏圈",
					style: {
						left: self.leftPos - 20,
						top: self.topPos - 20,
						width: 45,
						height: 45
					}
				});
			}
		},
		//游戏圈按钮是否显示
		ShowClubButton: function ShowClubButton() {
			var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (this.platform == "wx" && this.gameClubBtn != null) {
				if (flag == true) this.gameClubBtn.show();else this.gameClubBtn.hide();
			}
		},

		//创建意见反馈
		CreateFeedBackButton: function CreateFeedBackButton() {
			if (this.platform == "wx") {
				var winSize = cc.view.getVisibleSize();
				var leftRatio = 68 / winSize.width;
				var topRatio = 275 / winSize.height;
				var sysInfo = wx.getSystemInfoSync();
				this.lPos = sysInfo.windowWidth * leftRatio;
				this.tPos = sysInfo.windowHeight * topRatio;
				var self = this;
				cc.loader.loadRes("/share.png", function (err, texture) {
					self.feedBackBtn = wx.createFeedbackButton({
						type: "image",
						image: texture,
						style: {
							left: self.lPos - 20,
							top: self.tPos - 20,
							width: 45,
							height: 45
						}
					});
				});
			}
		},
		//意见反馈按钮显示和隐藏
		ShowFeedbackBtn: function ShowFeedbackBtn() {
			var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (this.platform == "wx" && this.feedBackBtn != null) {
				if (flag == true) this.feedBackBtn.show();else this.feedBackBtn.hide();
			}
		},

		//右上角的转发按钮
		ShareTopNav: function ShareTopNav() {
			var index = Math.floor(Math.random() * 8);
			var info = cc.Mgr.ShareInfos.getShareInfos(index);
			if (this.platform == "wx") {
				wx.showShareMenu({ withShareTicket: true });
				wx.onShareAppMessage(function () {
					// 用户点击了“转发”按钮
					return {
						title: info.text,
						//imageUrlId: '',
						imageUrl: info.url
					};
				});
			} else if (this.platform == "tt") {
				tt.showShareMenu(false);
				tt.onShareAppMessage(function () {
					// 用户点击了“转发”按钮
					return {
						title: '沙雕,这个游戏你能玩下去吗',
						//imageUrlId: 'Ik14RZj7SV2BtigrtE3d1g',
						imageUrl: ''
					};
				});
			} else if (this.platform == "baidu") {
				swan.showShareMenu(false);
				swan.onShareAppMessage(function () {
					// 用户点击了“转发”按钮
					return {
						title: info.text,
						imageUrl: info.url
					};
				});
			}
		},

		//转发一段文本
		ShareToFriendTxt: function ShareToFriendTxt(str) {
			if (this.platform == "wx") {
				console.log("点击了分享啊");
				wx.shareAppMessage({
					title: str
				});
			} else if (this.platform == "tt") {
				tt.shareAppMessage({
					title: str
				});
			} else if (this.platform == "baidu") {
				console.log("点击了分享啊");
				swan.shareAppMessage({
					title: str
				});
			}
		},

		//自定义转发
		ShareToFriend: function ShareToFriend(index) {
			var info = cc.Mgr.ShareInfos.getShareInfos(index);
			if (this.platform == "wx") {
				console.log("点击了分享啊");
				wx.shareAppMessage({
					title: info.text,
					imageUrl: info.url
				});
			} else if (this.platform == "tt") {
				tt.shareAppMessage({
					title: info.text,
					imageUrl: info.url
				});
			} else if (this.platform == "baidu") {
				console.log("点击了分享啊");
				swan.shareAppMessage({
					title: info.text,
					imageUrl: info.url
				});
			}
		},
		//显示平台的小弹窗 回调用
		showToast: function showToast(text) {
			cc.log(text);
			if (this.platform == "wx") {
				wx.showToast({
					title: text,
					icon: 'success',
					duration: 2000
				});
			} else if (this.platform == "tt") {
				tt.showToast({
					title: text,
					icon: 'success',
					duration: 2000
				});
			} else if (this.platform == "baidu") {
				swan.showToast({
					title: text,
					icon: 'success',
					duration: 2000
				});
			}
		},
		//微信开放数据存储 score 代表当前要保存的东西
		setUserCloudStorage: function setUserCloudStorage(socre) {
			cc.log("setUserCloudStorage socre = " + socre);
			if (this.platform == "wx") {
				var kvData = {};
				kvData.wxgame = {};
				kvData.wxgame.score = socre;
				kvData.wxgame.update_time = new Date().getTime();
				console.log(JSON.stringify(kvData));

				var kvDataList = new Array();
				kvDataList.push({ key: "xmbScore", value: JSON.stringify(kvData) });
				wx.setUserCloudStorage({
					KVDataList: kvDataList,
					success: function success(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function fail(res) {
						console.log("fail : " + res);
					}
				});
			} else if (this.platform == "baidu") {
				var kvData = {};
				kvData.wxgame = {};
				kvData.wxgame.score = socre;
				kvData.wxgame.update_time = new Date().getTime();
				console.log(JSON.stringify(kvData));

				var kvDataList = new Array();
				kvDataList.push({ key: "xmbScore", value: JSON.stringify(kvData) });

				swan.setUserCloudStorage({
					KVDataList: kvDataList,
					success: function success(res) {
						return console.log("success " + res);
					},
					fail: function fail(res) {
						return console.log("fail " + res);
					},
					complete: function complete(res) {
						return console.log("complete " + res);
					}
				});
			}
		},

		//是否支持排行功能
		IsSupportRank: function IsSupportRank() {
			if (this.platform == "wx" || this.platform == "baidu") return true;

			return false;
		},

		//显示子域
		showSubContentView: function showSubContentView() {
			if (this.platform == "wx" || this.platform == "baidu") {
				var param = {};
				param.platform = this.platform;
				param.flag = true;
				cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
			}
		},

		//隐藏子域
		hideSubContentView: function hideSubContentView() {
			if (this.platform == "wx" || this.platform == "baidu") {
				var param = {};
				param.flag = false;
				param.platform = this.platform;
				cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
			}
		},

		//向子域发送信息
		SendMessageToSubView: function SendMessageToSubView(code) {
			var curScore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var msg = {};
			msg.code = code;
			msg.curScore = curScore;
			if (this.platform == "wx") {
				wx.getOpenDataContext().postMessage({
					message: msg
				});
			} else if (this.platform == "baidu") {
				swan.getOpenDataContext().postMessage({
					message: msg
				});
			}
		},

		//是否支持录屏
		IsSupportRecordScreen: function IsSupportRecordScreen() {
			if (this.platform == "tt") return true;else if (this.platform == "baidu") return true;

			return false;
		},

		//开始录屏
		StartRecordScreen: function StartRecordScreen() {
			var _this = this;

			var self = this;
			this.videoPath = "";
			if (this.platform == "tt") {
				if (this.recorderManager == null) {
					this.recorderManager = tt.getGameRecorderManager();

					this.recorderManager.onStart(function (res) {
						console.log("录制开始了: " + res);
					});

					this.recorderManager.onStop(function (res) {
						console.log("录制结束了: " + res.videoPath);
						self.videoPath = res.videoPath;
						_this.onRecordStop();
					});

					this.recorderManager.onPause(function () {
						console.log("录制暂停了");
					});

					this.recorderManager.onResume(function () {
						console.log("录制恢复了");
					});

					this.recorderManager.onError(function (errMsg) {
						console.log("录制出错了:" + errMsg);
					});
				}

				this.recorderManager.start({
					duration: 30 //基础录制30秒
				});
			} else if (this.platform == "baidu") {
				if (this.recorderManager == null) {
					this.recorderManager = swan.getVideoRecorderManager();

					this.recorderManager.onStart(function (res) {
						console.log("录制开始了: " + res);
					});

					this.recorderManager.onStop(function (res) {
						console.log("录制结束了: " + res.videoPath);
						self.videoPath = res.videoPath;
					});

					this.recorderManager.onPause(function () {
						console.log("录制暂停了");
					});

					this.recorderManager.onResume(function () {
						console.log("录制恢复了");
					});

					this.recorderManager.onError(function (errMsg) {
						console.log("录制出错了:" + errMsg);
					});
				}
				this.recorderManager.start({
					duration: 30,
					microphoneEnabled: true //是否支持麦克风
				});
			}
		},
		//停止录屏
		StopRecordScreen: function StopRecordScreen() {
			if (this.platform == "tt") {
				if (this.recorderManager == null) {
					return;
				}
				console.log("停止录制");
				this.recorderManager.stop();
			} else if (this.platform == "baidu") {
				if (this.recorderManager == null) {
					return;
				}
				console.log("停止录制");
				this.recorderManager.stop();
			}
		},
		//分享录制的视频
		ShareRecordScreen: function ShareRecordScreen() {
			if (this.platform == "tt") {
				if (this.recorderManager == null || this.videoPath == "") {
					return;
				}
				console.log("分享录制的视频");
				tt.shareVideo({
					videoPath: "" + this.videoPath,
					success: function success() {
						console.log("分享成功！");
					},
					fail: function fail(e) {
						console.log("分享失败！" + e);
					}
				});
			} else if (this.platform == "baidu") {
				if (this.recorderManager == null || this.videoPath == null) {
					return;
				}

				console.log("分享录制的视频");
				swan.shareVideo({
					videoPath: "" + this.videoPath,
					success: function success() {
						console.log("分享成功！");
					},
					fail: function fail(e) {
						console.log("分享失败！" + e);
					}
				});
			}
		},

		//跳转到其他小程序
		JumpToOtherApp: function JumpToOtherApp(appId) {
			if (this.platform == "wx") {
				wx.navigateToMiniProgram({
					appId: appId,
					envVersion: 'release',
					success: function success(res) {
						console.log("成功打开了其他小程序");
					}
				});
			} else if (this.platform == "baidu") {} else if (this.platform == "tt") {}
		},

		//震屏功能  长震动还是短震动
		QuakeScreen: function QuakeScreen() {
			var long = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			if (this.platform != "pc") {
				if (long == true) {
					if (this.platform == "tt") {
						tt.vibrateLong({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateLong\u8C03\u7528\u5931\u8D25");
							}
						});
					} else if (this.platform == "baidu") {
						swan.vibrateLong({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateLong\u8C03\u7528\u5931\u8D25");
							}
						});
					} else if (this.platform == "wx") {
						wx.vibrateLong({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateLong\u8C03\u7528\u5931\u8D25");
							}
						});
					}
				} else {
					if (this.platform == "tt") {
						tt.vibrateShort({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateShort\u8C03\u7528\u5931\u8D25");
							}
						});
					} else if (this.platform == "baidu") {
						swan.vibrateShort({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateShort\u8C03\u7528\u5931\u8D25");
							}
						});
					} else if (this.platform == "wx") {
						wx.vibrateShort({
							success: function success(res) {
								console.log("" + res);
							},
							fail: function fail(res) {
								console.log("vibrateLong\u8C03\u7528\u5931\u8D25");
							}
						});
					}
				}
			}
		}
	}
});
module.exports = PlatformController;

cc._RF.pop();