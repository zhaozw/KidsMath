import GameMg from "./GameMg";
import EquationInfo from "./entity/EquationInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Result extends cc.Component {
    content:cc.Node;
    pre:cc.Node;
    start () {
        this.content = this.node.getChildByName("list").getChildByName("view").getChildByName("content");
        this.pre = this.content.getChildByName("item");

        this.ini();
    }

    // update (dt) {}


    ini(){
        let correct:number = 0;
        let maxLen:number = 0;
        for(let i:number=0; i<GameMg.instance.questions.length; i++){
            let equal:EquationInfo = GameMg.instance.questions[i];
            let str:string = equal.num1 + "  " + equal.operator + "  " + equal.num2 + "  =  ";

            let info:cc.Node = cc.instantiate(this.pre);
            if(equal.isCorrect){
                str += equal.result;
                info.color = cc.color(63,143,48);
                correct++;
            }else{
                str += equal.answer;
                info.color = cc.color(223,79,59);
            }

            info.getComponent(cc.Label).string = str;
            info.setParent(this.content);
            info.setPosition(-340, -30-i*80);

            if(info.width > maxLen){
                maxLen = info.width;
            }
        }

        let chilren = this.content.children;
        for(let i:number=0; i<chilren.length; i++){
           chilren[i].setPosition(chilren[i].x + (this.content.width-maxLen)/2, chilren[i].y);
        }



        let type:string = "blank ";
        if(GameMg.instance.type == 1){
            type = "choice ";
        }

        let top:cc.Node = this.node.getChildByName("top");
        top.getChildByName("type").getComponent(cc.Label).string = type + GameMg.instance.getOperator(GameMg.instance.operator);;
        top.getChildByName("correct").getComponent(cc.Label).string = correct*10 + "%";
        top.getChildByName("time").getComponent(cc.Label).string = GameMg.instance.time+"";
    }

    back(){
        cc.director.loadScene("second");
    }
}
