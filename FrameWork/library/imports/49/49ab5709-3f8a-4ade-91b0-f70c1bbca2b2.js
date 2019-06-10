"use strict";
cc._RF.push(module, '49ab5cJP4pK3pGw9wwbvKKy', 'NetMgr');
// scripts/core/NetMgr.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//网络工具
//在优先使用websocket 否则才使用第三方 socketio
if (window.io == null) {
    window.io = require("socket-io");
}
var NetMgr = cc.Class({
    statics: {
        ip: "",
        sio: null,
        isPinging: false,
        fnDisconnect: null, //断线重连
        handlers: {}, //回调

        //注册事件
        addHandler: function addHandler(event, fn) {
            if (this.handlers[event]) {
                console.log("event:" + event + "' handler has been registered.");
                return;
            }
            var handler = function handler(data) {
                console.log(event + "(" + (typeof data === "undefined" ? "undefined" : _typeof(data)) + "):" + (data ? data.toString() : "null"));
                if (event != "disconnect" && typeof data == "string") {
                    data = JSON.parse(data);
                }
                fn(data);
            };

            this.handlers[event] = handler;
            if (this.sio) {
                console.log("register:function " + event);
                this.sio.on(event, handler);
            }
        },
        //创建连接
        connect: function connect(fnConnect, fnError) {
            var self = this;
            var opts = {
                'reconnection': false,
                'force new connection': true,
                'transports': ['websocket', 'polling']
            };
            this.sio = window.io.connect(this.ip, opts);

            //监听
            this.sio.on('reconnect', function () {
                console.log('reconnection');
            });
            this.sio.on('connect', function (data) {
                self.sio.connected = true;
                fnConnect(data);
            });
            this.sio.on('disconnect', function (data) {
                console.log("disconnect");
                self.sio.connected = false;
                self.close();
            });
            this.sio.on('connect_failed', function () {
                console.log('connect_failed');
            });

            for (var key in this.handlers) {
                var value = this.handlers[key];
                if (typeof value == "function") {
                    if (key == 'disconnect') {
                        this.fnDisconnect = value;
                    } else {
                        console.log("register:function " + key);
                        this.sio.on(key, value);
                    }
                }
            }
            this.startHearbeat();
        },
        //心跳
        startHearbeat: function startHearbeat() {
            this.sio.on('game_pong', function () {
                console.log('game_pong');
                self.lastRecieveTime = Date.now();
                self.delayMS = self.lastRecieveTime - self.lastSendTime;
                console.log(self.delayMS);
            });
            this.lastRecieveTime = Date.now();
            var self = this;

            if (!self.isPinging) {
                self.isPinging = true;
                cc.game.on(cc.game.EVENT_HIDE, function () {
                    self.ping();
                });
                setInterval(function () {
                    if (self.sio) {
                        self.ping();
                    }
                }.bind(this), 5000);
                setInterval(function () {
                    if (self.sio) {
                        if (Date.now() - self.lastRecieveTime > 10000) {
                            self.close();
                        }
                    }
                }.bind(this), 500);
            }
        },
        //发送数据
        send: function send(event, data) {
            if (this.sio.connected) {
                if (data != null && (typeof data === "undefined" ? "undefined" : _typeof(data)) == "object") {
                    data = JSON.stringify(data);
                }
                this.sio.emit(event, data);
            }
        },
        //ping
        ping: function ping() {
            if (this.sio) {
                this.lastSendTime = Date.now();
                this.send('game_ping');
            }
        },
        //断开连接
        close: function close() {
            this.delayMS = null;
            if (this.sio && this.sio.connected) {
                this.sio.connected = false;
                this.sio.disconnect();
            }
            this.sio = null;
            if (this.fnDisconnect) {
                this.fnDisconnect();
                this.fnDisconnect = null;
            }
        }
    }
});
module.exports = NetMgr;

cc._RF.pop();