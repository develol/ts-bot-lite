"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RequestViber = void 0;
var requester_1 = require("../requester");
var RequestViber = /** @class */ (function (_super) {
    __extends(RequestViber, _super);
    function RequestViber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = 'https://chatapi.viber.com/pa/';
        _this.messenger = 'viber';
        return _this;
    }
    RequestViber.prototype.responseTransformer = function (obj) {
        if (this.debugging)
            return obj.responce;
        switch (obj.expr) {
            case 'send':
                if (obj.responce.status == 0) {
                    var result = {
                        ok: true,
                        messageId: null
                    };
                    result.messageId = obj.responce.message_token;
                    return result;
                }
                else {
                    return { ok: false };
                }
            case 'getUserInfo':
                if (obj.responce.status == 0) {
                    var result = {
                        ok: true,
                        userName: null,
                        firstName: null,
                        lastName: null
                    };
                    result.userName = (obj.responce.user.name != undefined) ? obj.responce.user.name : null;
                    return result;
                }
                else {
                    return { ok: false };
                }
            default:
                return obj.responce;
        }
    };
    RequestViber.prototype.sendText = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    receiver: obj.user,
                                    type: 'text',
                                    text: obj.text,
                                    keyboard: obj.keyboard
                                },
                                page: 'send_message',
                                responseType: 'send'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestViber.prototype.sendPhoto = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    receiver: obj.user,
                                    type: 'picture',
                                    text: obj.text,
                                    keyboard: obj.keyboard,
                                    media: obj.url
                                },
                                page: 'send_message',
                                responseType: 'send'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestViber.prototype.sendFile = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var size_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(obj.url)
                                .then(function (res) { return size_1 = res.headers.get("content-length"); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    receiver: obj.user,
                                    type: 'file',
                                    keyboard: obj.keyboard,
                                    media: obj.url,
                                    size: size_1,
                                    file_name: obj.url.replace('\\', '/').split('/').pop()
                                },
                                page: 'send_message',
                                responseType: 'send'
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestViber.prototype.sendLocation = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    receiver: obj.user,
                                    type: 'location',
                                    location: { lat: obj.latitude, lon: obj.longitude },
                                    keyboard: obj.keyboard
                                },
                                page: 'send_message',
                                responseType: 'send'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestViber.prototype.getUserInfo = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    id: obj.user
                                },
                                page: 'get_user_details',
                                responseType: 'getUserInfo'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestViber.prototype.fetchSender = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var response_1, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(this.url + obj.page, {
                                headers: {
                                    'X-Viber-Auth-Token': this.token
                                },
                                method: 'POST',
                                body: JSON.stringify(obj.param)
                            }).then(function (res) { return res.text(); })
                                .then(function (text) { return response_1 = JSON.parse(text); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.responseText({
                                responseType: obj.responseType,
                                responseText: response_1
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RequestViber;
}(requester_1.cRequester));
exports.RequestViber = RequestViber;
