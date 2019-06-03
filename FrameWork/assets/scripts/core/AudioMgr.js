/*
*****Created By Alex 2018 08 24
*/
var AudioMgr = cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume:1.0,
        sfxVolume:1.0,
        bgmAudioID:-1,
        soundAudioID:-1,
        musicState:1, //1 表示开启 0 表示关闭
    },

    // use this for initialization
    init: function () {
        cc.Mgr.loadSound = false;

        var t = cc.sys.localStorage.getItem("bgmVolume");
        if(t != null){
            this.bgmVolume = parseFloat(t);    
        }
        
        var t = cc.sys.localStorage.getItem("sfxVolume");
        if(t != null){
            this.sfxVolume = parseFloat(t);    
        }
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    },

    //获取需要播放某个音效用  根据名字来
    getUrl:function(url){
        return cc.url.raw("resources/sound/" + url + ".mp3");
    },

    //播放背景音乐
    playBGM:function(url){
        var audioUrl = this.getUrl(url);
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl,true,this.bgmVolume);
    },
    //播放音效
    playSFX:function(url){
        var audioUrl = this.getUrl(url);
        if(this.soundAudioID >= 0)
        {
            cc.audioEngine.stop(this.soundAudioID);
        }
        this.soundAudioID = cc.audioEngine.play(audioUrl,false,this.sfxVolume);
    },
    //设置音效大小
    setSFXVolume:function(v){
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    },
    //设置背景音大小
    setBGMVolume:function(v,force){
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
        }
        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    },
    //暂停
    pauseAll:function(){
        this.musicState = 0;
        this.bgmVolume = 0.0;
        this.sfxVolume = 0.0;
        cc.audioEngine.pauseAll();

    },
    //恢复
    resumeAll:function(){
        this.musicState = 1;
        this.bgmVolume = 1.0;
        this.sfxVolume = 1.0;
        cc.audioEngine.resumeAll();
    },

    getVoiceState:function(){
        return this.musicState;
    },
});
