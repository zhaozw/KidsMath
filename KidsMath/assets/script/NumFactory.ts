import EquationInfo from "./entity/EquationInfo";

export default class NumFactory{
    static instance:NumFactory = new NumFactory();

    NUM_DATA_1 = [ [1, 10], [10, 25], [25, 50], [50, 100], [100, 250], [250, 500], [500, 1000], [1000, 5000]];
    NUM_DATA_2 = [ [1, 10], [1, 20] , [10, 30], [20, 40] , [20, 50]  , [30, 55]  , [30 , 65]  , [40, 70]    ];

    count = 10;

    getList(type:number, operator:string){
        let NUM_DATA:Array<Array<number>> = this.NUM_DATA_1;
        if(operator == "x" || operator == "/"){
            NUM_DATA = this.NUM_DATA_2;
        }
        if(operator != "#"){
            let from = NUM_DATA[type][0];
            let to = NUM_DATA[type][1];
            return this.getEquationList(from, to, operator, this.count);
        }else{
            let list:Array<EquationInfo> = [];
            let from = this.NUM_DATA_1[type][0];
            let to = this.NUM_DATA_1[type][1];
            list = this.connectList(list, this.getEquationList(from, to, "+", 2));
            list = this.connectList(list,this.getEquationList(from, to, "-", 3));

            from = this.NUM_DATA_2[type][0];
            to = this.NUM_DATA_2[type][1];
            list = this.connectList(list,this.getEquationList(from, to, "x", 2));
            list = this.connectList(list,this.getEquationList(from, to, "/", 3));

            return list;
        }
    }   

    connectList(list1, list2){
        for(let i:number=0; i<list2.length; i++){
            list1.push(list2[i]);
        }
        return list1;
    }


    getEquationList(from:number, to:number, operator:string, count:number){
        let oldOpe:string = operator;
        if(operator == "/"){
            operator = "x";
        }
        if(operator == "-"){
            operator = "+";
        }

        let list:Array<EquationInfo> = [];
        while(list.length < count){
           let gap = to - from;
           let num1 = from + Math.round(Math.random()*gap);
           let num2 = from + Math.round(Math.random()*gap);
           let info = this.createEquation(num1, num2, operator);
           if(!info.isIn(list)){
               list.push(info);
           }
        }

        if(oldOpe == "+" || oldOpe == "x"){
            return list;
        }

        if(oldOpe == "/" || oldOpe == "-"){
            let newList = [];
            for(let i:number=0; i<list.length; i++){
                let newInfo:EquationInfo = new EquationInfo();
                if(oldOpe == "/"){
                    oldOpe = "÷";
                }
                newInfo.ini(list[i].result, list[i].num1, list[i].num2, oldOpe);
                newList.push(newInfo);
            }
            list = newList;
        }

        return list;
    }

    createEquation(num1:number, num2:number, operator:string){
        let result:number = 0;
        if(operator == "+"){
            result = num1 + num2;
        }else if(operator == "x"){
            result = num1 * num2;
        }
        let info = new EquationInfo();
        info.ini(num1, num2, result, operator);
        return info;
    }
}
