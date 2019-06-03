
var ShareInfos = cc.Class({
    extends: cc.Component,
    statics:{
        init:function()
        {
            this.Infos = [
               {text:"【有人@你】我在这个游戏里面挣了一个亿",url:"https://paopao.talkyun.com.cn/yiyi/1.jpg"},
            ];
        },

        getShareInfos:function(index){
            return this.Infos[index];
        },
    },
});
module.exports = ShareInfos;