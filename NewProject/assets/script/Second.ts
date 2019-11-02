import GameMg from "./GameMg";
import EquationInfo from "./entity/EquationInfo";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Second extends cc.Component {

    blank:cc.Node;
    choice:cc.Node;
    start () {
        this.blank = this.node.getChildByName("type").getChildByName("group").getChildByName("blank_c");
        this.choice = this.node.getChildByName("type").getChildByName("group").getChildByName("choice_c");

        this.node.getChildByName("title").getComponent(cc.Label).string = GameMg.instance.title;

        this.ini();

    }

    ini(){
        let type = GameData.instance.getNum("type");
        this.setType(type);
    }


    check(event){
        let node:cc.Node = event.target;
        let type:number = 1;
        if(node.name == "blank_c"){
            type = 0;
        }
        this.setType(type);
    }

    setType(type:number){
        if(type == 0){
            this.blank.getComponent(cc.Toggle).isChecked = true;
            GameMg.instance.type = 0;
        }else{
            this.choice.getComponent(cc.Toggle).isChecked = true;
            GameMg.instance.type = 1;
        }
        GameData.instance.saveNum("type", type);
    }


    toIndex(){
        cc.director.loadScene("index");
    }

    toThird(event){
        var node = event.target;
        let level = parseInt(node.name);
        GameMg.instance.level = level;
        cc.director.loadScene("third");
    }

    table(){
        cc.director.loadScene("table");
    }

}
