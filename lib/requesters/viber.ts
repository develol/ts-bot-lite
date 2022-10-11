import {iRequester} from '../interfaces';
import {cRequester} from '../requester';

export class RequestViber extends cRequester implements iRequester {
    url       = 'https://chatapi.viber.com/pa/';
    messenger = 'viber';

    responseTransformer(obj: {
        expr:     string, 
        responce: any
    }){
        if(this.debugging) return obj.responce;
        switch (obj.expr) {
            case 'send':
                if(obj.responce.status == 0){
                    let result = {
                        ok:        true,
                        messageId: null
                    };
                    result.messageId = obj.responce.message_token;
                    return result;
                }else{
                    return {ok: false};
                }
            case 'getUserInfo':
                if(obj.responce.status == 0){
                    let result = {
                        ok:        true,
                        userName:  null, 
                        firstName: null, 
                        lastName:  null
                    };
                    result.userName = (obj.responce.user.name != undefined) ? obj.responce.user.name : null;
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
                    receiver: obj.user, 
                    type:     'text', 
                    text:     obj.text, 
                    keyboard: obj.keyboard
                },
                page:         'send_message',
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
                    receiver: obj.user, 
                    type:     'picture', 
                    text:     obj.text, 
                    keyboard: obj.keyboard,
                    media:    obj.url
                },
                page:         'send_message',
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
            let size;
            await fetch(obj.url)
            .then(res => size = res.headers.get("content-length"));
            return await this.fetchSender({
                param: {
                    receiver:  obj.user, 
                    type:      'file', 
                    keyboard:  obj.keyboard,
                    media:     obj.url,
                    size:      size,
                    file_name: obj.url.replace('\\','/').split('/').pop()
                },
                page:         'send_message',
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
                    receiver: obj.user, 
                    type:     'location', 
                    location: {lat: obj.latitude, lon:obj.longitude}, 
                    keyboard: obj.keyboard
                },
                page:         'send_message',
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
                    id: obj.user
                },
                page:         'get_user_details',
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
            let response;
            await fetch(this.url+obj.page, {
                headers: {
                    'X-Viber-Auth-Token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj.param)
            }).then((res: any) => res.text())
            .then((text: any) => response = JSON.parse(text));
            return this.responseText({
                responseType: obj.responseType,
                responseText: response
            });
        }catch(error){
            return this.errorHandler(error);
        }
    }
}