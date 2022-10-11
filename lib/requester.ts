export abstract class cRequester {
    public token:              string;
    public url:                string;
    public messenger:          string;
    public debugging: boolean = false;
 
    constructor(obj: {token: string}) {
        this.token = obj.token;
    }

    responseText(obj: {
        responseType: string,
        responseText: any
    }){
        try{
            let result = {
                    ok:         true, 
                    messenger:  this.messenger,
                    mask:       obj.responseType,
                    date:       Math.round(new Date().getTime()/1000),
                    statusText: this.responseTransformer({
                        expr:     obj.responseType, 
                        responce: obj.responseText
                    })
            };
            if(this.debugging) console.log(result);
            return result;
        }catch(error){
            return this.errorHandler(error);
        }
    }

    errorHandler(error: any){
        let result = {
            ok:         false, 
            messenger:  null, 
            mask:       null,
            date:       Math.round(new Date().getTime()/1000),
            statusText: error
        }
        console.log(result);
        return result;
    }

    responseTransformer(obj: {expr: string, responce: any}){
        return obj.responce;
    }

    paramToString(obj: {
        param: any
    }){
        let first  = true;
        let string = '';
        for (let key in obj.param) {
            string += (first) ? '?' : '&';
            string += (
                typeof obj.param[key] === 'object' &&
                !Array.isArray(obj.param[key]) &&
                obj.param[key] !== null
            ) ? key + '=' + encodeURIComponent(JSON.stringify(obj.param[key]))
              : key + '=' + encodeURIComponent(obj.param[key]);
            first = false;
        }
        return string;
    }
}