export interface iApps {
    telegram(): any;
    vk():       any;
    viber():    any;
}

export interface iRequester {
    token:      string;
    url:        string;
    messenger:  string;
    debugging:  boolean;

    responseTransformer(obj: {
        expr:     string, 
        responce: any
    }): Object;
    sendText(obj: {
        user:     string, 
        keyboard: Object, 
        text:     string
    }): Object;
    sendPhoto(obj: {
        user:     string, 
        keyboard: Object, 
        text:     string, 
        url:      string
    }): Object;
    sendFile(obj: {
        user:     string, 
        keyboard: Object, 
        url:      string
    }): Object;
    sendLocation(obj: {
        user:      string, 
        keyboard:  Object, 
        latitude:  string, 
        longitude: string
    }): Object;
    getUserInfo(obj: {
        user: string
    }): Object;
    fetchSender(obj: {
        param:        any,
        page:         string,
        responseType: string
    })
}