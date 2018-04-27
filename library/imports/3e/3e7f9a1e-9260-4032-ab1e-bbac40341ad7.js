"use strict";
cc._RF.push(module, '3e7f9oekmBAMqseu6xANBrX', 'player');
// scripts/player.js

"use strict";

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
        // ������Ծ�߶�
        jumpHeight: 0,
        // ������Ծ����ʱ��
        jumpDuration: 0,
        // ����ƶ��ٶ�
        maxMoveSpeed: 0,
        // ���ٶ�
        accel: 0
    },
    setJumpAction: function setJumpAction() {
        // ��Ծ����
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // ����
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // �����ظ�
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function onLoad() {
        // ��ʼ����Ծ����
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // ���ٶȷ��򿪹�
        this.accLeft = false;
        this.accRight = false;
        // ���ǵ�ǰˮƽ�����ٶ�
        this.xSpeed = 0;

        // ��ʼ�������������
        this.setInputControl();
    },
    setInputControl: function setInputControl() {
        var self = this;
        // ��Ӽ����¼�����
        // �а�������ʱ���ж��Ƿ�������ָ���ķ�����Ƽ������������Ӧ�������
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.KEY.d:
                    self.accRight = true;
                    break;
            }
        });

        // �ɿ�����ʱ��ֹͣ��÷���ļ���
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
    },

    start: function start() {},

    update: function update(dt) {
        // ���ݵ�ǰ���ٶȷ���ÿ֡�����ٶ�
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // �������ǵ��ٶȲ��ܳ������ֵ
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // ���ݵ�ǰ�ٶȸ������ǵ�λ��
        this.node.x += this.xSpeed * dt;
    }

    // update (dt) {},
});

cc._RF.pop();