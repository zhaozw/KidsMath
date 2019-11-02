import GameMg from "./GameMg";
import EquationInfo from "./entity/EquationInfo";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Record extends cc.Component {
    content:cc.Node;
    pre:cc.Node;
    start () {
        this.content = this.node.getChildByName("list").getChildByName("view").getChildByName("content");
        this.pre = this.content.getChildByName("button");

        this.ini();
    }


    ini(){
        let list =  GameMg.instance.recordList;
        for(let i:number=0; i<list.length; i++){
            let info = list[i];
            let operator = info["operator"];
            operator = GameMg.instance.getOperator(operator);

            let button:cc.Node = cc.instantiate(this.pre);
            let item:cc.Node = button.getChildByName("item");
            item.getChildByName("date").getComponent(cc.Label).string = info["date"];
            item.getChildByName("type").getComponent(cc.Label).string = info["type"]+ " " + operator;
            item.getChildByName("correct").getComponent(cc.Label).string = parseInt(info["r"])*10 + "%";
            item.getChildByName("time").getComponent(cc.Label).string = info["time"];
            item.getChildByName("id").getComponent(cc.Label).string = i+"";
            button.setParent(this.content);
            button.setPosition(0, -i*80);
        }

        this.content.height = list.length * 80;
    }

    detail(event){
       let node:cc.Node = event.target;
       let id = node.getChildByName("item").getChildByName("id").getComponent(cc.Label).string;
       GameMg.instance.detailId = parseInt(id);

       cc.director.loadScene("detail");
    }

    back(){
        cc.director.loadScene("second");
    }
}
