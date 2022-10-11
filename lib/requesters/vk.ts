import {iRequester} from '../interfaces';
import {cRequester} from '../requester';

export class RequestVK extends cRequester implements iRequester {
    public apiVersion: string = '5.131';

    url       = 'https://api.vk.com/method/';
    messenger = 'vk';

    responseTransformer(obj: {
        expr:     string, 
        responce: any
    }){
        if(this.debugging) return obj.responce;
        switch (obj.expr) {
            case 'send':
                if(obj.responce.response != undefined){
                    let result = {
                        ok:        true,
                        messageId: null
                    };
                    result.messageId = obj.responce.response;
                    return result;
                }else{
                    return {ok: false};
                }
            case 'getUserInfo':
                if(obj.responce.response[0] != undefined){
                    let result = {
                        ok: true,
                        userName:  null, 
                        firstName: null, 
                        lastName:  null
                    };
                    result.userName  = (obj.responce.response[0].screen_name != undefined) ? obj.responce.response[0].screen_name : null;
                    result.firstName = (obj.responce.response[0].first_name != undefined) ? obj.responce.response[0].first_name : null;
                    result.lastName  = (obj.responce.response[0].last_name != undefined) ? obj.responce.response[0].last_name : null;
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
                    random_id: Math.floor(Math.random() * 2000000000),
                    user_id:   obj.user,
                    keyboard:  obj.keyboard,
                    message:   obj.text
                },
                page:         'messages.send',
                responseType: 'send'
            });
        }catch(error){
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
            let uploadUrl = await this.fetchSender({
                param:        {},
                page:         'photos.getMessagesUploadServer',
                responseType: 'custom'
            });
            
            let resultPhoto = await this.senderFile({
                downloadUrl: obj.url,
                uploadUrl: uploadUrl.statusText.response.upload_url                
            });

            let savePhoto = await this.fetchSender({
                param:        {
                    photo: resultPhoto.photo,
                    server: resultPhoto.server,
                    hash: resultPhoto.hash,
                },
                page:         'photos.saveMessagesPhoto',
                responseType: 'custom'
            });

            return await this.fetchSender({
                param: {
                    random_id:  Math.floor(Math.random() * 2000000000),
                    user_id:    obj.user,
                    keyboard:   obj.keyboard,
                    message:    obj.text,
                    attachment: 'photo'+savePhoto.statusText.response[0].owner_id+'_'+savePhoto.statusText.response[0].id
                },
                page:         'messages.send',
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
            let uploadUrl = await this.fetchSender({
                param:        {
                    type: 'doc',
                    peer_id: obj.user
                },
                page:         'docs.getMessagesUploadServer',
                responseType: 'custom'
            });
          
            let resultFile = await this.senderFile({
                downloadUrl: obj.url,
                uploadUrl: uploadUrl.statusText.response.upload_url               
            });

            let saveFile = await this.fetchSender({
                param: {
                    file: resultFile.file
                },
                page:         'docs.save',
                responseType: 'custom'
            });

            return await this.fetchSender({
                param: {
                    random_id:  Math.floor(Math.random() * 2000000000),
                    user_id:    obj.user,
                    keyboard:   obj.keyboard,
                    attachment: 'doc'+saveFile.statusText.response.doc.owner_id+'_'+saveFile.statusText.response.doc.id
                },
                page:         'messages.send',
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
                    random_id: Math.floor(Math.random() * 2000000000),
                    user_id:   obj.user,
                    keyboard:  obj.keyboard,
                    lat:       obj.latitude,
                    long:      obj.longitude
                },
                page:         'messages.send',
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
                    user_id: obj.user,
                    fields:  'screen_name'
                },
                page:         'users.get',
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
            obj.param.v            = this.apiVersion;
            obj.param.access_token = this.token;
            let string=this.paramToString({
                param: obj.param
            });
            let response;
            await fetch(this.url+'/'+obj.page+string, {
                method: 'GET',
            }).then(res => res.text())
            .then(text => response = JSON.parse(text));
            return this.responseText({
                responseType: obj.responseType,
                responseText: response
            });
        }catch(error: any){
            return this.errorHandler(error);
        }
    }

    async senderFile(obj: {
        downloadUrl: string,
        uploadUrl:   string
    }){
        try{
            let file = await fetch(obj.downloadUrl);
            let fileBlob = await file.blob();
            let form = new FormData();
            form.append('file', fileBlob, obj.downloadUrl.replace('\\','/').split('/').pop());
            let result; 
            await fetch(obj.uploadUrl, {
                method: 'POST',
                body:   form,
            }).then((res: any) => res.text())
            .then((text: any) => result = text);
            return JSON.parse(result);
        }catch(error){
            return this.errorHandler(error);
        }
    }
}
