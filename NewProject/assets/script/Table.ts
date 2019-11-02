import GameMg from "./GameMg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Table extends cc.Component {


    pre:cc.Node;

    // onLoad () {}

    start () {
        this.pre = this.node.getChildByName("equations").getChildByName("1");

        this.ini();
    }

    ini(){
        this.node.getChildByName("title").getComponent(cc.Label).string = GameMg.instance.title;
        this.show(1);
    }

    show(num:number){
        let op:string = GameMg.instance.operator;
        if(op != "+" && op != "-" && op != "x" && op != "/"){
            return;
        }
        let parent:cc.Node = this.node.getChildByName("equations");
        parent.removeAllChildren(true);

        for(let i:number=0; i<=4; i++){
           let info:cc.Node = cc.instantiate(this.pre);
           info.getComponent(cc.Label).string = this.createEquation(num, i, op);
           info.setParent(parent);
           info.setPosition(-250, 450 - i*130);
        }

        for(let i:number=5; i<10; i++){
            let info:cc.Node = cc.instantiate(this.pre);
            info.getComponent(cc.Label).string = this.createEquation(num, i, op);
            info.setParent(parent);
            info.setPosition(20, 450 - (i-5)*130);
         }
    }

    createEquation(num:number, num2:number, operator:string){
        let result = -1;
        let str:string = "";
        switch(operator){
            case "+": 
                str = num + operator + num2 + "=";
                result = num + num2;
                break;
            case "-": 
                str = (num2+num) + operator + num + "=";
                result = num2;
                break;
            case "x": 
                str = num + operator + num2 + "=";
                result = num * num2;
                break
            case "/": 
                str = (num*num2) + "÷" + num + "=";
                result = num2;
                break;
        }
        if(result < 0){
            return "";
        }
        return str + result;
    }

    touchNum(event){
        var node = event.target;
        let num = parseInt(node.name);
        this.show(num);
    }

    back(){
        cc.director.loadScene("second");
    }
}
