import {iRequester} from '../interfaces';
import {cRequester} from '../requester';

export class RequestTelegram extends cRequester implements iRequester {  
    public parseMode:      string = 'Markdown';
    public webPagePreview: string = 'true';

    url       = 'https://api.telegram.org/bot';
    messenger = 'telegram';
    
    responseTransformer(obj: {
        expr:     string, 
        responce: any
    }){
        if(this.debugging) return obj.responce;
        switch (obj.expr) {
            case 'send':
                if(obj.responce.ok){
                    let result = {
                        ok:        true,
                        messageId: null
                    };
                    result.messageId = obj.responce.result.message_id;
                    return result;
                }else{
                    return {ok: false};
                 }
            case 'getUserInfo':
                if(obj.responce.ok){
                    let result = {
                        ok: true, 
                        userName:  null, 
                        firstName: null, 
                        lastName:  null
                    };
                    result.userName  = (obj.responce.result.username != undefined) ? obj.responce.result.username : null;
                    result.firstName = (obj.responce.result.first_name != undefined) ? obj.responce.result.first_name : null;
                    result.lastName  = (obj.responce.result.last_name != undefined) ? obj.responce.result.last_name : null;
                    return result;
                }else{
                    return {ok: false};
                }
            default:
                return obj.responce;
        }
    }

    async sendText(obj: {
        user:     string, 
        keyboard: Object, 
        text:     string
    }){
        try{
            return await this.fetchSender({
                param: {
                    chat_id:                  obj.user,
                    reply_markup:             obj.keyboard,
                    text:                     obj.text,
                    parse_mode:               this.parseMode,
                    disable_web_page_preview: this.webPagePreview
                },
                page:         'sendMessage',
                responseType: 'send'
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }

    async sendPhoto(obj: {
        user:     string, 
        keyboard: Object, 
        text:     string, 
        url:      string
    }){
        try{
            return await this.fetchSender({
                param: {
                    chat_id:                  obj.user,
                    reply_markup:             obj.keyboard,
                    caption:                  obj.text,
                    parse_mode:               this.parseMode,
                    disable_web_page_preview: this.webPagePreview,
                    photo:                    obj.url
                },
                page:         'sendPhoto',
                responseType: 'send'
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }

    async sendFile(obj: {
        user:     string, 
        keyboard: Object, 
        url:      string
    }){
        try{
            return await this.fetchSender({
                param: {
                    chat_id:                  obj.user,
                    reply_markup:             obj.keyboard,
                    parse_mode:               this.parseMode,
                    disable_web_page_preview: this.webPagePreview,
                    document:                 obj.url
                },
                page:         'sendDocument',
                responseType: 'send'
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }

    async sendLocation(obj: {
        user:      string, 
        keyboard:  Object, 
        latitude:  string, 
        longitude: string
    }){
        try{
            return await this.fetchSender({
                param: {
                    chat_id:                  obj.user,
                    reply_markup:             obj.keyboard,
                    latitude:                 obj.latitude,
                    longitude:                obj.longitude,
                    parse_mode:               this.parseMode,
                    disable_web_page_preview: this.webPagePreview,
                },
                page:         'sendLocation',
                responseType: 'send'
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }

    async getUserInfo(obj: {
        user: string
    }){
        try{
            return await this.fetchSender({
                param: {
                    chat_id: obj.user
                },
                page:         'getChat',
                responseType: 'getUserInfo'
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }
    
    async fetchSender(obj: {
        param:        any,
        page:         string,
        responseType: string
    }){
        try{
            let string=this.paramToString({
                param: obj.param
            });
            let response;
            await fetch(this.url+this.token+'/'+obj.page+string, {
                method: 'GET',
            }).then((res: any) => res.text())
            .then((text: any) => response = JSON.parse(text));
            return this.responseText({
                responseType: obj.responseType,
                responseText: response
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }
}