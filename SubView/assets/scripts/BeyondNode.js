
var BeyondNode = cc.Class({
    extends: cc.Component,

    properties: {
        headIcon:cc.Sprite,
        nameLbl:cc.Label,
        scoreLbl:cc.Label,
    },

    ShowData:function (score, data) {
    	//console.log(data.nickname + "  =======" +data.score+ " ====== " + data.avatarUrl);
        this.nameLbl.string = data.nickname || data.nickName;
        if(score <= data.score)
        	this.scoreLbl.string = data.score || 0;
        else
        	this.scoreLbl.string = score;

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
module.exports = BeyondNode;
