var RankItem = cc.Class({
    extends: cc.Component,

    properties: {
        rankLbl:cc.Label,
        headIcon:cc.Sprite,
        scoreLbl:cc.Label,
        nameLbl:cc.Label,
    },

    ShowData:function (rankIndex,data) {
        this.rankLbl.string = rankIndex + 1;
        this.nameLbl.string = data.nickname;
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
module.exports = RankItem;
