import GameMg from "./GameMg";
import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {

    audioMg:AudioManager;
  
    start () {
        GameMg.instance.ini();
        this.audioMg = this.node.parent.getComponent(AudioManager);

        let that = this;
        this.schedule(function(){   
            GameMg.instance.removeLoading();
        }, 0, 0, 0.5);
        
    }
    


    toSecond(event){

        var node = event.target;

        if(node.name == "addition"){
            GameMg.instance.operator = "+";
            GameMg.instance.title = "Addition";
        }else if(node.name == "minus"){
            GameMg.instance.operator = "-";
            GameMg.instance.title = "Minus";
        }else if(node.name == "multiply"){
            GameMg.instance.operator = "x";
            GameMg.instance.title = "Multiply";
        }else if(node.name == "division"){
            GameMg.instance.operator = "/";
            GameMg.instance.title = "Division";
        }else if(node.name == "mix"){
            GameMg.instance.operator = "#";
            GameMg.instance.title = "Mix";
        }
        cc.director.loadScene("second");
    }

    record(){
        cc.director.loadScene("record");
    }

    exit(){
        cc.game.end();
    }
}
