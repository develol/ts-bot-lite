"use strict";
exports.__esModule = true;
exports.Texter = void 0;
var Texter = /** @class */ (function () {
    /*  ┌-----------------------------------------------------------┬------------┐  *\
        |                           HTML                            |  MARKDOWN  |
        ├-----------------------------------------------------------┼------------┤
        | <b>bold</b>, <strong>bold</strong>                        | *bold*     |
        | <i>italic</i>, <em>italic</em>                            | _italic_   |
        | <code>code</code>                                         | `code`     |
        | <s>strike</s>, <strike>strike</strike>, <del>strike</del> | ~strike~   |
        | <u>underline</u>                                          |            |
        | <pre language="c++">code</pre>                            | ```code``` |
    \*  └-----------------------------------------------------------┴------------┘  */
    function Texter(obj) {
        this.text = '';
        this.markup = ''; // html | markdown | clear | none
        this.markup = obj.markup;
        this.text = obj.text;
    }
    Texter.prototype.telegram = function () {
        switch (this.markup) {
            case 'html':
                return this.text
                    .replace(/<(?!((\/*)b|(\/*)strong|(\/*)i|(\/*)em|(\/*)code|(\/*)s|(\/*)strike|(\/*)del|(\/*)u|(\/*)pre|(\/*)a)\s*\/?)[^>]+>/g, '')
                    .replace(/<(\/*)br[^>]*>/gi, '\r\n');
            case 'markdown':
                return this.text.replace(/~/g, '');
            case 'clear':
                return this.clearAll({
                    text: this.text
                });
            default:
                return this.text;
        }
    };
    Texter.prototype.vk = function () {
        switch (this.markup) {
            case 'html':
                return this.text
                    .replace(/<(\/*)br[^>]*>/gi, '\r\n')
                    .replace(/<\/?[^>]+>/gi, '');
            case 'markdown':
                return this.text.replace(/[\~\`\*\_]/gi, '');
            case 'clear':
                return this.clearAll({
                    text: this.text
                });
            default:
                return this.text;
        }
    };
    Texter.prototype.viber = function () {
        switch (this.markup) {
            case 'html':
                return this.text
                    .replace(/<(\/*)strike[^>]*>/gi, '~')
                    .replace(/<(\/*)strong[^>]*>/gi, '*')
                    .replace(/<(\/*)code[^>]*>/gi, '```')
                    .replace(/<(\/*)pre[^>]*>/gi, '```')
                    .replace(/<(\/*)del[^>]*>/gi, '~')
                    .replace(/<(\/*)br[^>]*>/gi, '\r\n')
                    .replace(/<(\/*)em[^>]*>/gi, '_')
                    .replace(/<(\/*)b[^>]*>/gi, '*')
                    .replace(/<(\/*)i[^>]*>/gi, '_')
                    .replace(/<(\/*)s[^>]*>/gi, '~')
                    .replace(/<\/?[^>]+>/gi, '');
            case 'markdown':
                return this.text
                    .replace(/```/g, '___')
                    .replace(/`/g, '```')
                    .replace(/___/g, '```');
            case 'clear':
                return this.clearAll({
                    text: this.text
                });
            default:
                return this.text;
        }
    };
    Texter.prototype.clearAll = function (obj) {
        return obj.text
            .replace(/<\/?[^>]+>/gi, '')
            .replace(/[\~\`\*\_]/gi, '');
    };
    return Texter;
}());
exports.Texter = Texter;
