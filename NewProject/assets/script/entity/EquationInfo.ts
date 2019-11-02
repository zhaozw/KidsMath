
export default class EquationInfo{
    num1:number;
    num2:number;
    result:number;
    operator:string;

    answer:number = -10000;
    list:Array<number> = [];

    isCorrect:boolean = true;

    gap:number = 5;
    blankW:number = 100;

    ini(n1:number, n2:number, res:number, ope:string){
        this.operator = ope;
        this.num1 = n1;
        this.num2 = n2;
        this.result = res;
    }

    choiceList(){
        let temp:Array<number> = [];
        if(this.result <=10){
            let min:number = 1;
            if(min > this.result){
                min = this.result;
            }
            temp.push(this.result);
            while(temp.length < 4){
               let rand:number = min + Math.floor(Math.random()*(11-min));
               if(temp.indexOf(rand) < 0){
                   temp.push(rand);
               }
            }
        }else{
            temp.push(this.result);
            if(Math.random() > 0.5){
                temp.push((Math.floor(this.result/10) + 1)*10 + this.result%10);
            }else{
                temp.push((Math.floor(this.result/10) - 1)*10 + this.result%10);
            }

            while(temp.length < 4){
                let flag:number = 1;
                if(Math.random() < 0.5){
                    flag = -1;
                }
                let rand:number = this.result + 1 + Math.floor(Math.random()*5)*flag;
                if(temp.indexOf(rand) < 0){
                    temp.push(rand);
                }
             }
        }
        let list:Array<number> = [];
        while(temp.length > 0){
           let index:number =  Math.floor(Math.random()*temp.length)
           list.push(temp[index]);
           temp.splice(index, 1);
        }
        
        return list;
    }

    isIn(list:Array<EquationInfo>){
        let len = list.length;
        for(let i=0; i<len; i++){
            let info:EquationInfo = list[i];
            if(this.num1 == info.num1 && this.num2 == info.num2 && this.operator == info.operator){
                return true;
            }
        }
        return false;
    }

    // check(list, num){
    //     for(let i:number=0; i<list.length; i++){
    //         if(list[i] == num){
    //             return false;
    //         }
    //     }
    //     return true;
    // }
}
