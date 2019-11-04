import GameMg from "./GameMg";
import EquationInfo from "./entity/EquationInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Detail extends cc.Component {
    content:cc.Node;
    pre:cc.Node;
    start () {
        this.content = this.node.getChildByName("list").getChildByName("view").getChildByName("content");
        this.pre = this.content.getChildByName("item");

        this.ini();
    }

    ini(){
        let obj = GameMg.instance.recordList[GameMg.instance.detailId];
        let list = obj["list"];
        let maxLen:number = 0;
        for(let i:number=0; i<list.length; i+=2){
            let str:string = list[i];

            let node:cc.Node = cc.instantiate(this.pre);
            node.getComponent(cc.Label).string = str;
            node.setParent(this.content);
            node.setPosition(-340, -i*40);

            if(list[i+1] == "1"){
                node.color = cc.color(63,143,48);
            }else{
                node.color = cc.color(223,79,59);
            }

            if(node.width > maxLen){
                maxLen = node.width;
            }
        }

        let chilren = this.content.children;
        for(let i:number=0; i<chilren.length; i++){
           chilren[i].setPosition(chilren[i].x + (this.content.width-maxLen)/2, chilren[i].y);
        }


        let top:cc.Node = this.node.getChildByName("top");
        top.getChildByName("type").getComponent(cc.Label).string = obj["type"] + " " + GameMg.instance.getOperator(obj["operator"]);
        top.getChildByName("correct").getComponent(cc.Label).string = parseInt(obj["r"])*10 + "%";
        top.getChildByName("time").getComponent(cc.Label).string = obj["time"];
    }

    del(){
        GameMg.instance.recordList.splice(GameMg.instance.detailId, 1);
        GameMg.instance.refresh();
        this.back();
    }

    back(){
        cc.director.loadScene("record");
    }
}
