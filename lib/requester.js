"use strict";
exports.__esModule = true;
exports.cRequester = void 0;
var cRequester = /** @class */ (function () {
    function cRequester(obj) {
        this.debugging = false;
        this.token = obj.token;
    }
    cRequester.prototype.responseText = function (obj) {
        try {
            var result = {
                ok: true,
                messenger: this.messenger,
                mask: obj.responseType,
                date: Math.round(new Date().getTime() / 1000),
                statusText: this.responseTransformer({
                    expr: obj.responseType,
                    responce: obj.responseText
                })
            };
            if (this.debugging)
                console.log(result);
            return result;
        }
        catch (error) {
            return this.errorHandler(error);
        }
    };
    cRequester.prototype.errorHandler = function (error) {
        var result = {
            ok: false,
            messenger: null,
            mask: null,
            date: Math.round(new Date().getTime() / 1000),
            statusText: error
        };
        console.log(result);
        return result;
    };
    cRequester.prototype.responseTransformer = function (obj) {
        return obj.responce;
    };
    cRequester.prototype.paramToString = function (obj) {
        var first = true;
        var string = '';
        for (var key in obj.param) {
            string += (first) ? '?' : '&';
            string += (typeof obj.param[key] === 'object' &&
                !Array.isArray(obj.param[key]) &&
                obj.param[key] !== null) ? key + '=' + encodeURIComponent(JSON.stringify(obj.param[key]))
                : key + '=' + encodeURIComponent(obj.param[key]);
            first = false;
        }
        return string;
    };
    return cRequester;
}());
exports.cRequester = cRequester;
