import {iApps} from './interfaces';

export class Keyboard implements iApps {
    
    public keyboard: Array<string[]> = [];
    
    public vkParameters = <any>{
        oneTime: false,
        color:   'primary' // primary | secondary | negative | positive
    }

    public viberParameters = <any>{
        defaultHeight: false,
        bgColor:       '#7360F2', 
        textColor:     '#FFFFFF'
    }

    constructor(obj: {keyboard: Array<string[]>}) {
        this.keyboard = obj.keyboard;
    }

    telegram() {
        try{
            let result = <any>{keyboard:[]};
            for (let j = 0; j < this.keyboard.length; j++) {
                result.keyboard.push([]);
                for (let k = 0; k < this.keyboard[j].length; k++) {
                    result.keyboard[j].push({text: this.keyboard[j][k]});
                }
            }
            return result;
        }catch(error){
            return {
                keyboard:[[{
                    text: 'Keyboard error'
                }]]
            };
        }
    }

    vk() {
        try{
            let result = <any>{
                one_time: this.vkParameters.oneTime, 
                buttons:  []
            };
            for (let j = 0; j < this.keyboard.length; j++) {
                result.buttons.push([]);
                for (let k = 0; k < this.keyboard[j].length; k++) {
                    result.buttons[j].push({
                        action:{
                            type:    'text',
                            label:   this.keyboard[j][k],
                            payload: ''
                        },
                        color: this.vkParameters.color
                    });
                }
            }
            return result;
        }catch(error){
            return {
                buttons:[[{
                    action: {
                        type:    'text', 
                        label:   'Keyboard error', 
                        payload: ''
                    },
                    color: 'primary'
                }]]
            };
        }
    }
    
    viber() {
        try{
            let result = <any>{
                Type:          'keyboard', 
                DefaultHeight: this.viberParameters.defaultHeight, 
                Buttons:       []
            };
            for (let j = 0; j < this.keyboard.length; j++) {
                for (let k = 0; k < this.keyboard[j].length; k++) {
                    result.Buttons.push({
                        BgColor:    this.viberParameters.bgColor, 
                        Columns:    Math.round(6/this.keyboard[j].length), 
                        ActionBody: this.keyboard[j][k], 
                        Text:       '<font color="'+this.viberParameters.textColor+'">'+this.keyboard[j][k]+'</font>'
                    });
                }
            }
            return result;
        }catch(error){
            return {
                Type:          'keyboard', 
                DefaultHeight: false, 
                Buttons:       [{
                    ActionBody: 'Keyboard error', 
                    Text:       'Keyboard error'
                }]
            };
        }
    }
}