"use strict";
cc._RF.push(module, '11029bLAD5BcZDkEfPqydNE', 'game');
// scripts/game.js

'use strict';

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
        // �����������������Ԥ����Դ
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // ���ǲ�������ʧʱ��������Χ
        maxStarDuration: 0,
        minStarDuration: 0,
        // ����ڵ㣬����ȷ���������ɵĸ߶�
        ground: {
            default: null,
            type: cc.Node
        },
        // player �ڵ㣬���ڻ�ȡ���ǵ����ĸ߶ȣ��Ϳ��������ж�����
        player: {
            default: null,
            type: cc.Node
        },
        // score label ������
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {
        // ��ȡ��ƽ��� y ������
        this.groundY = this.ground.y + this.ground.height / 2;
        // ����һ���µ�����
        this.spawnNewStar();
        // ��ʼ����ʱ��
        this.timer = 0;
        this.starDuration = 0;
        // ����һ���µ�����
        this.spawnNewStar();
        // ��ʼ���Ʒ�
        this.score = 0;
    },

    spawnNewStar: function spawnNewStar() {
        // ʹ�ø�����ģ���ڳ���������һ���½ڵ�
        var newStar = cc.instantiate(this.starPrefab);
        // �������Ľڵ���ӵ� Canvas �ڵ�����
        this.node.addChild(newStar);
        // Ϊ��������һ�����λ��
        newStar.setPosition(this.getNewStarPosition());
        // �� Game �����ʵ�������������
        newStar.getComponent('star').game = this;
        // ���ü�ʱ����������ʧʱ�䷶Χ���ȡһ��ֵ
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        // ���ݵ�ƽ��λ�ú�������Ծ�߶ȣ�����õ�һ�����ǵ� y ����
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('player').jumpHeight + 50;
        // ������Ļ��ȣ�����õ�һ������ x ����
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        // ������������
        return cc.p(randX, randY);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},

    gainScore: function gainScore() {
        this.score += 1;
        // ���� scoreDisplay Label ������
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    gameOver: function gameOver() {
        this.player.stopAllActions(); //ֹͣ player �ڵ����Ծ����
        //cc.director.loadScene('game');
        this.scoreDisplay.string = 'GameOver';
    },
    update: function update(dt) {
        // ÿ֡���¼�ʱ���������޶Ȼ�û�������µ�����
        // �ͻ������Ϸʧ���߼�
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    }
    // update (dt) {},
});

cc._RF.pop();