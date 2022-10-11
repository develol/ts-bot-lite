import {iApps} from './interfaces';

export class Texter implements iApps {

    public text:   string = '';
    public markup: string = ''; // html | markdown | clear | none

    /*  ┌───────────────────────────────────────────────────────────┬────────────┐  *\
        │                           HTML                            │  MARKDOWN  │
        ├───────────────────────────────────────────────────────────┼────────────┤
        │ <b>bold</b>, <strong>bold</strong>                        │ *bold*     │
        │ <i>italic</i>, <em>italic</em>                            │ _italic_   │
        │ <code>code</code>                                         │ `code`     │
        │ <s>strike</s>, <strike>strike</strike>, <del>strike</del> │ ~strike~   │
        │ <u>underline</u>                                          │            │
        │ <pre language="c++">code</pre>                            │ ```code``` │
    \*  └───────────────────────────────────────────────────────────┴────────────┘  */

    constructor(obj: {
        text:   string, 
        markup: string
    }) {
        this.markup = obj.markup;
        this.text   = obj.text;
    }

    telegram() {
        switch (this.markup) {
            case 'html':
                return this.text
                    .replace(/<(?!((\/*)b|(\/*)strong|(\/*)i|(\/*)em|(\/*)code|(\/*)s|(\/*)strike|(\/*)del|(\/*)u|(\/*)pre|(\/*)a)\s*\/?)[^>]+>/g, '')
                    .replace(/<(\/*)br[^>]*>/gi,'\r\n');
            case 'markdown':
                return this.text.replace(/~/g, '');
            case 'clear':
                return this.clearAll({
                    text: this.text
                });
            default:
                return this.text;
        } 
    }

    vk() {
        switch (this.markup) {
            case 'html':
                return this.text
                    .replace(/<(\/*)br[^>]*>/gi,'\r\n')
                    .replace(/<\/?[^>]+>/gi,'');
            case 'markdown':
                return this.text.replace(/[\~\`\*\_]/gi, '');
            case 'clear':
                return this.clearAll({
                    text: this.text
                });
            default:
                return this.text;
        } 
    }
    
    viber() {
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
                    .replace(/<\/?[^>]+>/gi,'');
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
    }

    clearAll(obj: {
        text: string
    }){
        return obj.text
            .replace(/<\/?[^>]+>/gi,'')
            .replace(/[\~\`\*\_]/gi, '');
    }
}