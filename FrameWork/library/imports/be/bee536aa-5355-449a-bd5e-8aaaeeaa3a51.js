"use strict";
cc._RF.push(module, 'bee53aqU1VEmr1eiqruqjpR', 'HttpMgr');
// scripts/core/HttpMgr.js

"use strict";

var URL = "http://127.0.0.1:9000";
var HttpMgr = cc.Class({
    statics: {
        sessionId: 0,
        userId: 0,
        master_url: URL,
        url: URL,
        sendRequest: function sendRequest(path, data, handler, extraUrl) {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&"; //增加一个中间的连接符
                }
                str += k + "=" + data[k];
            }
            if (extraUrl == null) {
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);

            xhr.open("GET", requestURL, true);

            if (cc.sys.isNative) {
                //是否是原生平台
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if (handler !== null) {
                            handler(ret);
                        }
                    } catch (e) {
                        console.log("err:" + e);
                    } finally {}
                }
            };

            xhr.ontimeout = function (event) {}, xhr.onerror = function (event) {}, xhr.send();
            return xhr;
        }
    }
});

cc._RF.pop();