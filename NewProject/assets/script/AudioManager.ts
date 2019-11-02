
const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.Node)
    click: cc.Node = null;

    @property(cc.Node)
    remove: cc.Node = null;

    @property(cc.Node)
    right: cc.Node = null;

    @property(cc.Node)
    wrong: cc.Node = null;

    start () {

    }

    playClick(){
        this.click.getComponent(cc.AudioSource).play();
    }

    playRight(){
        this.right.getComponent(cc.AudioSource).play();
    }

    playRemove(){
        this.remove.getComponent(cc.AudioSource).play();
    }

    playWrong(){
        this.wrong.getComponent(cc.AudioSource).play();
    }
}
