// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // ���Ǻ�����֮��ľ���С�������ֵʱ���ͻ�����ռ�
        pickRadius: 0,
        // �ݴ� Game ���������
        game: {
            default: null,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    getPlayerDistance: function () {
        // ���� player �ڵ�λ���жϾ���
        var playerPos = this.game.player.getPosition();
        // ��������λ�ü�������֮�����
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function () {
        // �����Ǳ��ռ�ʱ������ Game �ű��еĽӿڣ�����һ���µ�����
        this.game.spawnNewStar();
        // ���� Game �ű��ĵ÷ַ���
        this.game.gainScore();
        // Ȼ�����ٵ�ǰ���ǽڵ�
        this.node.destroy();
    },

    start () {

    },
    update: function (dt) {
        // ÿ֡�жϺ�����֮��ľ����Ƿ�С���ռ�����
        if (this.getPlayerDistance() < this.pickRadius) {
            // �����ռ���Ϊ
            this.onPicked();
            return;
        }
        // ���� Game �ű��еļ�ʱ���������ǵ�͸����
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },

    // update (dt) {},
});