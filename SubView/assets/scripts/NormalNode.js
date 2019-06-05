
var NormalNode = cc.Class({
    extends: cc.Component,

    properties: {
        headIcon:cc.Sprite,
        nameLbl:cc.Label,
        scoreLbl:cc.Label,
    },

    ShowData:function (index, data) {
        this.nameLbl.string = data.nickname || data.nickName;
        this.scoreLbl.string = data.score || 0;

        console.log("Fuck = " + data.nickname + "  " + data.score);

        var self = this;
        cc.loader.load({url: data.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) 
                console.error(err);
            else
                self.headIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
    },
});
module.exports = NormalNode;
