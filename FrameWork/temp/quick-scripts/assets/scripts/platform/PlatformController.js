(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/platform/PlatformController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '12160G6IAlDbZD1iSVVgN8Q', 'PlatformController', __filename);
// scripts/platform/PlatformController.js

"use strict";

var _statics;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlatformController = cc.Class({
	statics: (_statics = {
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
						//登陆成功后执行某个操作
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
			} else if (this.platform == "tt") {
				tt.login({
					success: function success(res) {},
					fail: function fail(res) {
						tt.showModal({
							title: "登录失败",
							content: "是否重新登录？",
							cancelText: "退出游戏",
							success: function success(res) {
								if (res.confirm) {
									console.log("点击了确定");
									self.Login();
								} else if (res.cancel) {
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
		CreateGameClub: function CreateGameClub() {
			if (this.platform == "wx") {
				var winSize = cc.view.getVisibleSize();
				var leftRatio = 68 / winSize.width;
				var topRatio = 275 / winSize.height;

				var sysInfo = wx.getSystemInfoSync();

				this.leftPos = sysInfo.windowWidth * leftRatio;
				this.topPos = sysInfo.windowHeight * topRatio;

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

		//客服入口
		OpenServiceConversation: function OpenServiceConversation() {
			if (this.platform == "wx") {
				wx.openCustomerServiceConversation({
					sessionFrom: '',
					showMessageCard: true
				});
			} else if (this.platform == "tt") {}
		},

		//右上角的转发按钮
		ShareTopNav: function ShareTopNav() {
			var index = Math.floor(Math.random() * 8);
			var info = cc.Mgr.ShareInfos.getShareInfos(index);
			if (this.platform == "wx") {
				wx.showShareMenu({ withShareTicket: true });
				wx.onShareAppMessage(function () {
					return {
						title: info.text,
						//imageUrlId: '',
						imageUrl: info.url
					};
				});
			} else if (this.platform == "tt") {
				tt.showShareMenu(false);
				tt.onShareAppMessage(function () {
					return {
						title: info.text,
						//imageUrlId: 'Ik14RZj7SV2BtigrtE3d1g',
						imageUrl: ''
					};
				});
			} else if (this.platform == "baidu") {
				swan.showShareMenu(false);
				swan.onShareAppMessage(function () {
					return {
						title: info.text,
						//imageUrlId: 'Ik14RZj7SV2BtigrtE3d1g',
						imageUrl: info.url
					};
				});
			}
		},

		//转发一段文本
		ShareToFriendTxt: function ShareToFriendTxt(str) {
			console.log("点击了分享啊");
			var info = cc.Mgr.ShareInfos.getShareInfos(1);
			if (this.platform == "wx") {
				wx.shareAppMessage({
					title: str,
					imageUrl: info.url
				});
			} else if (this.platform == "tt") {
				tt.shareAppMessage({
					title: str,
					imageUrl: info.url
				});
			} else if (this.platform == "baidu") {
				swan.shareAppMessage({
					title: str,
					imageUrl: info.url
				});
			}
		},

		//自定义转发
		ShareToFriend: function ShareToFriend(index) {
			console.log("点击了分享啊");
			var info = cc.Mgr.ShareInfos.getShareInfos(index);
			if (this.platform == "wx") {
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
					icon: 'none',
					duration: 2000
				});
			} else if (this.platform == "tt") {
				tt.showToast({
					title: text,
					icon: 'none',
					duration: 2000
				});
			} else if (this.platform == "baidu") {
				swan.showToast({
					title: text,
					icon: 'none',
					duration: 2000
				});
			}
		}

	}, _defineProperty(_statics, "OpenServiceConversation", function OpenServiceConversation() {
		if (this.platform == "wx") {
			wx.openCustomerServiceConversation({
				sessionFrom: '',
				showMessageCard: true
			});
		} else if (this.platform == "baidu") {
			swan.openCustomerServiceConversation({});
		}
	}), _defineProperty(_statics, "setUserCloudStorage", function setUserCloudStorage(socre) {
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
	}), _defineProperty(_statics, "IsSupportRank", function IsSupportRank() {
		if (this.platform == "wx" || this.platform == "baidu") return true;

		return false;
	}), _defineProperty(_statics, "showSubContentView", function showSubContentView() {
		if (this.platform == "wx" || this.platform == "baidu") {
			var param = {};
			param.platform = this.platform;
			param.flag = true;
			cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
		}
	}), _defineProperty(_statics, "hideSubContentView", function hideSubContentView() {
		if (this.platform == "wx" || this.platform == "baidu") {
			var param = {};
			param.flag = false;
			param.platform = this.platform;
			cc.director.GlobalEvent.emit(cc.Mgr.Event.ShowRank, param);
		}
	}), _defineProperty(_statics, "SendMessageToSubView", function SendMessageToSubView(code) {
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
	}), _defineProperty(_statics, "IsSupportRecordScreen", function IsSupportRecordScreen() {
		if (this.platform == "tt") return true;else if (this.platform == "baidu") //百度有基础库版本限制
			{
				if (this.CompareSdkVesrion(swan.getSystemInfoSync().SDKVersion, "1.4.1")) return true;else return false;
			}

		return false;
	}), _defineProperty(_statics, "CompareSdkVesrion", function CompareSdkVesrion(sdkV, needV) {
		var out1 = sdkV.split('.');
		var out2 = needV.split('.');
		for (var i = 0; i < out1.length; i++) {
			if (parseInt(out1[i]) < parseInt(out2[i])) {
				return 0;
			} else if (parseInt(out1[i]) > parseInt(out2[i])) {
				return 1;
			}
		}
		return 1;
	}), _defineProperty(_statics, "StartRecordScreen", function StartRecordScreen() {
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
					self.ShareRecordScreen();
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
	}), _defineProperty(_statics, "StopRecordScreen", function StopRecordScreen() {
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
	}), _defineProperty(_statics, "ShareRecordScreen", function ShareRecordScreen() {
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
	}), _defineProperty(_statics, "JumpToOtherApp", function JumpToOtherApp(appId) {
		if (this.platform == "wx") {
			wx.navigateToMiniProgram({
				appId: appId,
				envVersion: 'release',
				success: function success(res) {
					console.log("成功打开了其他小程序");
				}
			});
		} else if (this.platform == "baidu") {
			swan.navigateToMiniProgram({
				appKey: appId,
				success: function success(res) {
					console.log("成功打开了其他小程序");
				}
			});
		} else if (this.platform == "tt") {
			tt.navigateToMiniProgram({
				appId: appId,
				envVersion: 'release',
				success: function success(res) {
					console.log("成功打开了其他小程序");
				}
			});
		}
	}), _defineProperty(_statics, "QuakeScreen", function QuakeScreen() {
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
	}), _statics)
});
module.exports = PlatformController;

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
        //# sourceMappingURL=PlatformController.js.map
        