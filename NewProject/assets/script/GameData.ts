
export default class GameData{
    static instance:GameData = new GameData();
    
    saveNum(key:string, value:number){
        cc.sys.localStorage.setItem(key, value);
    }

    getNum(key:string){
        let value:any = cc.sys.localStorage.getItem(key);
        if(value == null){
            return 0;
        }
        return value;
    }

    saveStr(key:string, value:string){
        cc.sys.localStorage.setItem(key, value);
    }

    getStr(key:string){
        let value:any = cc.sys.localStorage.getItem(key);
        if(value == null){
            return "";
        }
        return value;
    }
}