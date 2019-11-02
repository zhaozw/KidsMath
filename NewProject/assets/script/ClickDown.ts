import AudioManager from "./AudioManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ClickDown extends cc.Component {
    start () {
        let that:ClickDown = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(e:cc.Touch){
            that.touchStart(e, that);
        });
    }

    touchStart(e:cc.Touch, that:ClickDown){
        cc.find("Canvas").getComponent(AudioManager).playClick();
    }
}
