import EquationInfo from "./entity/EquationInfo";
import GameData from "./GameData";

export default class GameMg{
    static instance:GameMg = new GameMg();
    
    level:number = 5;
    operator:string = "+";
    title:string = "";

    type:number = 0;//0 blank, 1 choice

    questions:Array<EquationInfo> = [];

    recordList = [];

    detailId:number;

    time:number = 0;

    static initial:boolean = false;

    ini(){
        // GameData.instance.saveStr("list", "");
        if(!GameMg.initial){
            this.load();
            GameMg.initial = true;
        }
    }

    getOperator(ope:string){
        if(ope == "/"){
            return "÷";
        }else if(ope == "#"){
            return "mix";
        }
        return "";
    }

    load(){
        let record:string = GameData.instance.getStr("list");
        console.log(record);
        if(record != ""){
            this.recordList = JSON.parse(record);
        }
    }

    save(){
        let list:Array<string> = [];
        let correct:number = 0;
        for(let i:number=0; i<this.questions.length; i++){
            let info:EquationInfo = this.questions[i];
            let an:number = info.answer;
            if(info.isCorrect){
                an = info.result;
            }

            let str:string = info.num1 + "  " + info.operator + "  " + info.num2 + "  =  " + an;
            list.push(str);
            if(info.isCorrect){
                list.push("1");
                correct++;
            }else{
                list.push("0");
            }
        }
        let obj = {};
        obj["date"] = this.getTime();
        obj["r"] = correct;
        obj["w"] = 1;
        if(this.type == 1){
            obj["type"] = "choice";
        }else{
            obj["type"] = "blank";
        }
        obj["operator"] = this.operator;
        obj["time"] = this.time;
        obj["list"] = list;
        
        this.recordList.push(obj);

        this.refresh();
    }


    getTime(){
        let str:string = "";
        let myDate = new Date();
        let month:string = myDate.getMonth()+"";
        if(month.length < 2){
            month = "0" + month;
        }
        str += month + "-";
        str += myDate.getDate() + "-"; 
        str += myDate.getFullYear() + " "; 
        str += myDate.getHours() + ":"; 
        str += myDate.getMinutes(); 
        return str;
    }

    refresh(){
        let result:string = JSON.stringify(this.recordList);
        GameData.instance.saveStr("list", result);
    }
}
