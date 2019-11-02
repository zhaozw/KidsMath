import EquationInfo from "./entity/EquationInfo";
import NumFactory from "./NumFactory";
import GameMg from "./GameMg";
import GameData from "./GameData";
import AudioManager from "./AudioManager";
import Constant from "./constant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Third extends cc.Component {
    num1:cc.Node;
    num2:cc.Node;
    preNum:cc.Node;

    preSpace:cc.Node;
    blankP:cc.Node;

    blankList:Array<cc.Node> = [];
    count:number = 0;

    countStr:cc.Label;

    currentIndex:number = 0;
    currentEquation:EquationInfo;

    gap:number = 90;
    questions:Array<EquationInfo>;

    time:number = 0;
    start () {
        this.num1 = this.node.getChildByName("equation").getChildByName("num1");
        this.num2 = this.node.getChildByName("equation").getChildByName("num2");
        this.preNum = this.node.getChildByName('equation').getChildByName('preNum');

        this.blankP = this.node.getChildByName("blank");
        this.preSpace = this.node.getChildByName("preSpace");

        this.countStr = this.node.getChildByName("top").getChildByName("count").getComponent(cc.Label);

        this.ini();
    }


    ini(){
        this.node.getChildByName("top").getChildByName("title").getComponent(cc.Label).string = GameMg.instance.title;

        this.questions = NumFactory.instance.getList(GameMg.instance.level, GameMg.instance.operator);

        // for(let i:number=0; i<this.questions.length; i++){
        //     let info:EquationInfo = this.questions[i]; 
        //     console.log(info.num1 + info.operator + info.num2 + "=" + info.result);
        // }
        
        this.time = 0;
        this.node.getChildByName("top").getChildByName("time").getComponent(cc.Label).string = "0";
        this.count = 0;
        this.next();

        if(GameMg.instance.type == 0){
            this.node.getChildByName("choice").setPosition(-2000, this.node.getChildByName("choice").y);
            this.node.getChildByName("keyboard").setPosition(0, this.node.getChildByName("keyboard").y);
        }else{
            this.node.getChildByName("choice").setPosition(0, this.node.getChildByName("choice").y);
            this.node.getChildByName("keyboard").setPosition(-2000, this.node.getChildByName("keyboard").y);
        }

        this.countDown();
    }

    iniChoice(){
        let info:EquationInfo = this.questions[this.count];
        let children:Array<cc.Node> = this.node.getChildByName("choice").children
        let choice:Array<number> = info.choiceList();
        for(let i:number=0; i<children.length; i++){
            children[i].getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = choice[i]+"";
        }
    }

    choice_ok(event){
        let node:cc.Node = event.target;
        let str:string = node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string;
        let num:number = parseInt(str);
        this.ok(num);
    }

    blank_ok(){
        let num:number = 0;
        for(let i:number=0; i<this.blankList.length;i++){
            num += parseInt(this.blankList[i].getChildByName("num").getComponent(cc.Label).string) * Math.pow(10, i);
        }
        this.ok(num);
    }


    next(){
        if(this.count == this.questions.length){
            GameMg.instance.questions = this.questions;
            let that = this;
            this.schedule(function(){
                GameMg.instance.time = that.time;
                GameMg.instance.save();
                that.unscheduleAllCallbacks();
                cc.director.loadScene("result");    
            }, 0, 0, 0.3);
            
            return;
        }

        if(GameMg.instance.type == 1){
            this.iniChoice();
        }
        
        this.num1.removeAllChildren(true);
        this.num2.removeAllChildren(true);
        this.blankP.removeAllChildren(true);
        this.blankList = [];
        this.currentIndex = 0;

        let info:EquationInfo = this.questions[this.count];

        let num1Str:Array<string> = (info.num1+"").split("");
        let num2Str:Array<string> = (info.num2+"").split("");
        num2Str.unshift(info.operator);

        let resStr:Array<string> = (info.result+"").split("");

        for(let i:number=num1Str.length-1; i>=0; i--){
            let num:cc.Node = cc.instantiate(this.preNum);
            num.getComponent(cc.Label).string = num1Str[i];
            num.setParent(this.num1);
            num.setPosition(-(num1Str.length-i-1)*this.gap, 0);
        }

        for(let i:number=num2Str.length-1; i>=0; i--){
            let num:cc.Node = cc.instantiate(this.preNum);
            num.getComponent(cc.Label).string = num2Str[i];
            num.setParent(this.num2);
            num.setPosition(-(num2Str.length-i-1)*this.gap, 0); 
        }

        for(let i:number=resStr.length-1; i>=0; i--){
            let space:cc.Node = cc.instantiate(this.preSpace);
            space.setParent(this.blankP);
            space.setPosition(-(resStr.length-i-1)*this.gap, 0);
            this.blankList.push(space);
        }

        let maxLen:number = num1Str.length;
        if(num2Str.length-1 > maxLen){
            maxLen = num2Str.length-1;
        }
        if(resStr.length > maxLen){
            maxLen = resStr.length;
        }

        let numW:number = (this.gap*maxLen - 80)/2;

        this.num1.setPosition(numW, this.num1.y);
        this.num2.setPosition(numW, this.num2.y);
        this.blankP.setPosition(numW, this.blankP.y);

        this.count++;
        this.countStr.string = this.count + "/" + this.questions.length;

        this.checkAnimation();
        this.changeColor(Constant.instance.GREEN);
    }

    touchNum(event){
        let info:EquationInfo = this.questions[this.count-1];
        if(this.currentIndex == (info.result+"").length){
            return;
        }

        var node = event.target;
        let num = parseInt(node.name);

        this.blankList[this.currentIndex].getChildByName("num").getComponent(cc.Label).string = num+"";
        this.currentIndex++;

        this.checkAnimation();
        this.changeColor(Constant.instance.GREEN);
    }

    del(){
        if(this.currentIndex > 0){
            this.blankList[this.currentIndex-1].getChildByName("num").getComponent(cc.Label).string="";
            this.currentIndex--;

            this.checkAnimation();
            this.changeColor(Constant.instance.GREEN);
        }
    }

    checkAnimation(){
        for(let i:number=0; i<this.blankList.length; i++){
            if(this.currentIndex == i && GameMg.instance.type == 0){
                this.blankList[i].getChildByName("line").scale = 1;
                this.blankList[i].getChildByName("line").getComponent(cc.Animation).play();
            }else{
                this.blankList[i].getChildByName("line").scale = 0;
                this.blankList[i].getChildByName("line").getComponent(cc.Animation).stop();
            }
        }
    }

    changeColor(arr:Array<number>){
        for(let i:number=0; i<this.blankList.length; i++){
            this.blankList[i].getChildByName("num").color = cc.color(arr[0], arr[1], arr[2]);
        }
    }

    ok(num:number){
        let info:EquationInfo = this.questions[this.count-1];
        if(num == info.result){
            cc.find("Canvas").getComponent(AudioManager).playRight();
            this.next();
        }else{
            cc.find("Canvas").getComponent(AudioManager).playWrong();
            info.isCorrect = false;
            info.answer = num;
            this.changeColor(Constant.instance.RED);
        }
    }

    countDown(){
        this.unscheduleAllCallbacks();
        let that = this;
        this.schedule(function(){
            that.time++;
            that.node.getChildByName("top").getChildByName("time").getComponent(cc.Label).string = that.time+"";
        }, 1);
    }


    toSecond(){
        cc.director.loadScene("second");
    }
}
