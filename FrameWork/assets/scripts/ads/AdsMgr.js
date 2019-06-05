var AdsParam = require("AdsParam");
var AdsMgr = cc.Class({
    statics:{
    	//微信 wx
        //头条 tt
        //百度 baidu
        platform:"wx",

        wxAppId:"",
        bdAppId:"",
        ttAppId:"",

        //对应的平台的  bannerId  采用加后缀的方式
        bannerId_baidu:"6191742",
        bannerId_wx:"adunit-42bcaae6cafaa7c6",
        bannerId_tt:"6152042",

        //百度广告id  激励视频
        bdVideoId_1:"6191756",
        bdVideoId_2:"6191755",
        bdVideoId_3:"6191754",
        bdVideoId_4:"6191753",
        bdVideoId_5:"6191752",
        bdVideoId_6:"6191751",
        bdVideoId_7:"6191749",
        bdVideoId_8:"6191748",
        bdVideoId_9:"6191747",
        bdVideoId_10:"6191744",
        //微信广告id  激励视频
        wxVideoId_1:"",
        wxVideoId_2:"",
        wxVideoId_3:"",
        wxVideoId_4:"",
        wxVideoId_5:"",
        wxVideoId_6:"",
        wxVideoId_7:"",
        wxVideoId_8:"",
        wxVideoId_9:"",
        wxVideoId_10:"",

        //头条广告
        ttVideoId_1:"",
        ttVideoId_2:"",
        ttVideoId_3:"",
        ttVideoId_4:"",
        ttVideoId_5:"",
        ttVideoId_6:"",
        ttVideoId_7:"",
        ttVideoId_8:"",
        ttVideoId_9:"",
        ttVideoId_10:"",


        allScreen:false,

    	//首先确定使用的平台
    	Init:function () {
        	if(!window.wx && !window.tt && !window.swan)
            	this.platform="pc";

            this.allScreen = false;
        },

    	//获取广告点ID
	    getBannerAdId:function()
	    {
	        if(this.platform == "wx")
	        {
	            return this.bannerId_wx;
	        }
	        else if(this.platform == "baidu")
	        {
	            return this.bannerId_baidu;
	        }
	        else if(this.platform == "tt")
	        {
	        	return this.bannerId_tt;
	        }
	        return null;
	    },

	    //获取广告点ID  这里配置 视频奖励广告 Id 由于会有多个广告点  根据后台设置来顶
	    getVideoAdId:function(adName)
	    {
	        var adId;
	        if(this.platform == "wx")
	        {
	            switch(adName)
	            {
	                case AdsParam.PointA:
	                    adId = this.wxVideoId_1;
	                    break;
	                case AdsParam.PointB:
	                    adId = this.wxVideoId_2;
	                    break;
	                case AdsParam.PointC:
	                    adId = this.wxVideoId_3;
	                    break;
	                case AdsParam.PointD:
	                    adId = this.wxVideoId_4;
	                    break;
	                case AdsParam.PointE:
	                    adId = this.wxVideoId_5;
	                    break;
	                case AdsParam.PointF:
	                    adId = this.wxVideoId_6;
	                    break;
	                case AdsParam.PointG:
	                    adId = this.wxVideoId_7;
	                    break;
	                case AdsParam.PointH:
	                    adId = this.wxVideoId_8;
	                    break;
	                case AdsParam.PointI:
	                    adId = this.wxVideoId_9;
	                    break;
	                case AdsParam.PointJ:
	                    adId = this.wxVideoId_10;
	                    break;
	            }
	        }
	        else if(this.platform == "baidu")
	        {
	            switch(adName)
	            {
	                case AdsParam.PointA:
	                    adId = this.bdVideoId_1;
	                    break;
	                case AdsParam.PointB:
	                    adId = this.bdVideoId_2;
	                    break;
	                case AdsParam.PointC:
	                    adId = this.bdVideoId_3;
	                    break;
	                case AdsParam.PointD:
	                    adId = this.bdVideoId_4;
	                    break;
	                case AdsParam.PointE:
	                    adId = this.bdVideoId_5;
	                    break;
	                case AdsParam.PointF:
	                    adId = this.bdVideoId_6;
	                    break;
	                case AdsParam.PointG:
	                    adId = this.bdVideoId_7;
	                    break;
	                case AdsParam.PointH:
	                    adId = this.bdVideoId_8;
	                    break;
	                case AdsParam.PointI:
	                    adId = this.bdVideoId_9;
	                    break;
	                case AdsParam.PointJ:
	                    adId = this.bdVideoId_10;
	                    break;
	            }
	        }
	        else if(this.platform == "tt")
	        {
	            switch(adName)
	            {
	                case AdsParam.PointA:
	                    adId = this.ttVideoId_1;
	                    break;
	                case AdsParam.PointB:
	                    adId = this.ttVideoId_2;
	                    break;
	                case AdsParam.PointC:
	                    adId = this.ttVideoId_3;
	                    break;
	                case AdsParam.PointD:
	                    adId = this.ttVideoId_4;
	                    break;
	                case AdsParam.PointE:
	                    adId = this.ttVideoId_5;
	                    break;
	                case AdsParam.PointF:
	                    adId = this.ttVideoId_6;
	                    break;
	                case AdsParam.PointG:
	                    adId = this.ttVideoId_7;
	                    break;
	                case AdsParam.PointH:
	                    adId = this.ttVideoId_8;
	                    break;
	                case AdsParam.PointI:
	                    adId = this.ttVideoId_9;
	                    break;
	                case AdsParam.PointJ:
	                    adId = this.ttVideoId_10;
	                    break;
	            }
	        }
	        return adId;
	    },

	    //banner 广告
	    ShowBannerAds:function()
	    {
	        var self = this;

	        if(this.bannerAdShowNum == null)
	            this.bannerAdShowNum = 0;
	        this.bannerAdShowNum ++;
	        if(this.platform == "wx")
	        {
	            if(this.bannerAdCtrl !=null && this.bannerAdShowNum%5!=0)
	            {
	                return;
	            }
	            this.bannerAdShowNum = 0;

	            if(this.bannerAdCtrl !=null)
	                this.bannerAdCtrl.destroy();
	            let WXAD={};
	            WXAD.W = wx.getSystemInfoSync().windowWidth;
	            WXAD.H = wx.getSystemInfoSync().windowHeight;

	            let adWidth = 0;
	            if(this.allScreen)
	                adWidth = WXAD.W;
	            else
	                adWidth = 300;
	            this.bannerAdCtrl = wx.createBannerAd({
	                adUnitId: this.getBannerAdId(),
	                style: { 
	                    left: 0,
	                    top: 0/*/(WXAD.H/10)*8*/,
	                    width: adWidth,
	                }
	            });
	            this.bannerAdCtrl.onResize(res=>{
	                console.log("重置广告宽度 " + WXAD.H + " , " + self.bannerAdCtrl.style.realHeight);
	                self.bannerAdCtrl.style.top = WXAD.H-self.bannerAdCtrl.style.realHeight;
	                self.bannerAdCtrl.style.left = (WXAD.W-self.bannerAdCtrl.style.realWidth)/2;
	                self.bannerAdCtrl.show();
	                
	            }); 
	            this.bannerAdCtrl.onError(err => { console.log(err) }); 
	            console.log("显示广告");
	        }
	        else if(this.platform == "baidu") //百度广告
	        {
	            if(swan.getSystemInfoSync().platform == 'ios') //目前 ios 不支持视频广告
	            {
	                return;
	            }
	            if(this.bannerAdCtrl !=null)
	                this.bannerAdCtrl.destroy();
	            let WXAD={};

	            WXAD.W = swan.getSystemInfoSync().windowWidth;
	            WXAD.H = swan.getSystemInfoSync().windowHeight;

	            console.log("百度的 bannerId = " + this.getBannerAdId());
	            this.bannerAdCtrl = swan.createBannerAd({
	                adUnitId: this.getBannerAdId(),
	                appSid:'c0fb407f',
	                style: { 
	                    left: 0,
	                    top: 0,
	                    width: 321,
	                }
	            });

	            if(this.allScreen)
	                self.bannerAdCtrl.style.width = WXAD.H;
	            else
	                self.bannerAdCtrl.style.width = 300;
	           
	            this.bannerAdCtrl.onResize(res=>{
	                console.log("重置广告宽度 ");
	                self.bannerAdCtrl.style.top = WXAD.H-res.height;
	                self.bannerAdCtrl.style.left = (WXAD.W-res.width)/2;
	                self.bannerAdCtrl.show();
	                
	            }); 

	            this.bannerAdCtrl.onLoad(() => {
	                console.log(' banner 加载完成');
	                self.bannerAdCtrl.show();
	            });
	            
	            this.bannerAdCtrl.onError(err => { console.log(err) }); 
	            console.log("显示广告");
	        }
	        else if(this.platform == "tt") //头条广告
	        {
	            if(this.bannerAdCtrl !=null)
	                this.bannerAdCtrl.destroy();
	            let WXAD={};

	            WXAD.W = tt.getSystemInfoSync().windowWidth;
	            WXAD.H = tt.getSystemInfoSync().windowHeight;

	            console.log("头条 bannerId = " + this.getBannerAdId());
	            this.bannerAdCtrl = tt.createBannerAd({
	                adUnitId: this.getBannerAdId(),
	                //appSid:'c0fb407f',
	                style: { 
	                    left: 0,
	                    top: 0,
	                    width: 321,
	                }
	            });

	            if(this.allScreen)
	                self.bannerAdCtrl.style.width = WXAD.H;
	            else
	                self.bannerAdCtrl.style.width = 300;
	           
	            this.bannerAdCtrl.onResize(res=>{
	                console.log("重置广告宽度 ");
	                self.bannerAdCtrl.style.top = WXAD.H-res.height;
	                self.bannerAdCtrl.style.left = (WXAD.W-res.width)/2;
	                self.bannerAdCtrl.show();
	                
	            }); 

	            this.bannerAdCtrl.onLoad(() => {
	                console.log(' banner 加载完成');
	                self.bannerAdCtrl.show();
	            });
	            
	            this.bannerAdCtrl.onError(err => { console.log(err) }); 
	            console.log("显示广告");
	        }
	    },

	    //cb 回调参数 0 播放完成，1 不放未完成 ，-1 视频加载出错
	    ShowVideoAds:function(adName,cb)
	    {
	        this.cb = cb
	        if(this.platform == "wx")
	        {
	            let videoAd = wx.createRewardedVideoAd({
	                adUnitId: this.getVideoAdId(adName)
	            });
	            
	            videoAd.load()
	            .then(() => videoAd.show())
	            .catch(err => console.log(err.errMsg));

	            videoAd.onError(err => { 
	                console.log("广告加载出错 " + err.errMsg) 
	                this.cb(-1);
	            }); 

	            videoAd.onLoad(()=>{ console.log("加载事件回调") });

	            videoAd.onClose(res =>{
	                console.log("是否观看完整了 " + res.isEnded) 
	                this.cb(res.isEnded?0:1);
	                videoAd.offLoad();
	                videoAd.offError();
	                videoAd.offClose();

	            });

	        }
	        else if(this.platform == "baidu")
	        {
	            console.log("百度的视频广告  " + this.getVideoAdId(adName));

	            let videoAd = swan.createRewardedVideoAd({
	                adUnitId: this.getVideoAdId(adName),
	                appSid: 'ad8b61de'
	            });
	            
	            videoAd.load()
	            .then(() => videoAd.show())
	            .catch(err => console.log(err.errMsg));

	            videoAd.onError(err => { 
	                console.log("广告加载出错 " + err.errMsg) 
	                this.cb(-1);
	            }); 

	            videoAd.onLoad(()=>{ console.log("加载事件回调") });

	            videoAd.onClose(res =>{
	                console.log("是否观看完整了 " + res.isEnded) 
	                this.cb(res.isEnded?0:1);
	                videoAd.offLoad();
	                videoAd.offError();
	                videoAd.offClose();
	            });
	        }
	        else if(this.platform == "tt")
	        {
	            console.log("头条的视频广告  " + this.getVideoAdId(adName));

	            let videoAd = tt.createRewardedVideoAd({
	                adUnitId: this.getVideoAdId(adName),
	                //appSid: 'ad8b61de'
	            });
	            
	            videoAd.load()
	            .then(() => videoAd.show())
	            .catch(err => console.log(err.errMsg));

	            videoAd.onError(err => { 
	                console.log("广告加载出错 " + err.errMsg) 
	                this.cb(-1);
	            }); 

	            videoAd.onLoad(()=>{ console.log("加载事件回调") });

	            videoAd.onClose(res =>{
	                console.log("是否观看完整了 " + res.isEnded) 
	                this.cb(res.isEnded?0:1);
	                videoAd.offLoad();
	                videoAd.offError();
	                videoAd.offClose();
	            });
	        }
	        else
	        {
	            this.cb(0);
	        }
	    },
    }, 
});
module.exports = AdsMgr;
