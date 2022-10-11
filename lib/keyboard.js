"use strict";
exports.__esModule = true;
exports.Keyboard = void 0;
var Keyboard = /** @class */ (function () {
    function Keyboard(obj) {
        this.keyboard = [];
        this.vkParameters = {
            oneTime: false,
            color: 'primary' // primary | secondary | negative | positive
        };
        this.viberParameters = {
            defaultHeight: false,
            bgColor: '#7360F2',
            textColor: '#FFFFFF'
        };
        this.keyboard = obj.keyboard;
    }
    Keyboard.prototype.telegram = function () {
        try {
            var result = { keyboard: [] };
            for (var j = 0; j < this.keyboard.length; j++) {
                result.keyboard.push([]);
                for (var k = 0; k < this.keyboard[j].length; k++) {
                    result.keyboard[j].push({ text: this.keyboard[j][k] });
                }
            }
            return result;
        }
        catch (error) {
            return {
                keyboard: [[{
                            text: 'Keyboard error'
                        }]]
            };
        }
    };
    Keyboard.prototype.vk = function () {
        try {
            var result = {
                one_time: this.vkParameters.oneTime,
                buttons: []
            };
            for (var j = 0; j < this.keyboard.length; j++) {
                result.buttons.push([]);
                for (var k = 0; k < this.keyboard[j].length; k++) {
                    result.buttons[j].push({
                        action: {
                            type: 'text',
                            label: this.keyboard[j][k],
                            payload: ''
                        },
                        color: this.vkParameters.color
                    });
                }
            }
            return result;
        }
        catch (error) {
            return {
                buttons: [[{
                            action: {
                                type: 'text',
                                label: 'Keyboard error',
                                payload: ''
                            },
                            color: 'primary'
                        }]]
            };
        }
    };
    Keyboard.prototype.viber = function () {
        try {
            var result = {
                Type: 'keyboard',
                DefaultHeight: this.viberParameters.defaultHeight,
                Buttons: []
            };
            for (var j = 0; j < this.keyboard.length; j++) {
                for (var k = 0; k < this.keyboard[j].length; k++) {
                    result.Buttons.push({
                        BgColor: this.viberParameters.bgColor,
                        Columns: Math.round(6 / this.keyboard[j].length),
                        ActionBody: this.keyboard[j][k],
                        Text: '<font color="' + this.viberParameters.textColor + '">' + this.keyboard[j][k] + '</font>'
                    });
                }
            }
            return result;
        }
        catch (error) {
            return {
                Type: 'keyboard',
                DefaultHeight: false,
                Buttons: [{
                        ActionBody: 'Keyboard error',
                        Text: 'Keyboard error'
                    }]
            };
        }
    };
    return Keyboard;
}());
exports.Keyboard = Keyboard;
