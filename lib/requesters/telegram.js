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
exports.RequestTelegram = void 0;
var requester_1 = require("../requester");
var RequestTelegram = /** @class */ (function (_super) {
    __extends(RequestTelegram, _super);
    function RequestTelegram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parseMode = 'Markdown';
        _this.webPagePreview = 'true';
        _this.url = 'https://api.telegram.org/bot';
        _this.messenger = 'telegram';
        return _this;
    }
    RequestTelegram.prototype.responseTransformer = function (obj) {
        if (this.debugging)
            return obj.responce;
        switch (obj.expr) {
            case 'send':
                if (obj.responce.ok) {
                    var result = {
                        ok: true,
                        messageId: null
                    };
                    result.messageId = obj.responce.result.message_id;
                    return result;
                }
                else {
                    return { ok: false };
                }
            case 'getUserInfo':
                if (obj.responce.ok) {
                    var result = {
                        ok: true,
                        userName: null,
                        firstName: null,
                        lastName: null
                    };
                    result.userName = (obj.responce.result.username != undefined) ? obj.responce.result.username : null;
                    result.firstName = (obj.responce.result.first_name != undefined) ? obj.responce.result.first_name : null;
                    result.lastName = (obj.responce.result.last_name != undefined) ? obj.responce.result.last_name : null;
                    return result;
                }
                else {
                    return { ok: false };
                }
            default:
                return obj.responce;
        }
    };
    RequestTelegram.prototype.sendText = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    chat_id: obj.user,
                                    reply_markup: obj.keyboard,
                                    text: obj.text,
                                    parse_mode: this.parseMode,
                                    disable_web_page_preview: this.webPagePreview
                                },
                                page: 'sendMessage',
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
    RequestTelegram.prototype.sendPhoto = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    chat_id: obj.user,
                                    reply_markup: obj.keyboard,
                                    caption: obj.text,
                                    parse_mode: this.parseMode,
                                    disable_web_page_preview: this.webPagePreview,
                                    photo: obj.url
                                },
                                page: 'sendPhoto',
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
    RequestTelegram.prototype.sendFile = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    chat_id: obj.user,
                                    reply_markup: obj.keyboard,
                                    parse_mode: this.parseMode,
                                    disable_web_page_preview: this.webPagePreview,
                                    document: obj.url
                                },
                                page: 'sendDocument',
                                responseType: 'send'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestTelegram.prototype.sendLocation = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    chat_id: obj.user,
                                    reply_markup: obj.keyboard,
                                    latitude: obj.latitude,
                                    longitude: obj.longitude,
                                    parse_mode: this.parseMode,
                                    disable_web_page_preview: this.webPagePreview
                                },
                                page: 'sendLocation',
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
    RequestTelegram.prototype.getUserInfo = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    chat_id: obj.user
                                },
                                page: 'getChat',
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
    RequestTelegram.prototype.fetchSender = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var string, response_1, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        string = this.paramToString({
                            param: obj.param
                        });
                        return [4 /*yield*/, fetch(this.url + this.token + '/' + obj.page + string, {
                                method: 'GET'
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
    return RequestTelegram;
}(requester_1.cRequester));
exports.RequestTelegram = RequestTelegram;
