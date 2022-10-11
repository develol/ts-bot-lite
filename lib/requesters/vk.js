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
exports.RequestVK = void 0;
var requester_1 = require("../requester");
var RequestVK = /** @class */ (function (_super) {
    __extends(RequestVK, _super);
    function RequestVK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.apiVersion = '5.131';
        _this.url = 'https://api.vk.com/method/';
        _this.messenger = 'vk';
        return _this;
    }
    RequestVK.prototype.responseTransformer = function (obj) {
        if (this.debugging)
            return obj.responce;
        switch (obj.expr) {
            case 'send':
                if (obj.responce.response != undefined) {
                    var result = {
                        ok: true,
                        messageId: null
                    };
                    result.messageId = obj.responce.response;
                    return result;
                }
                else {
                    return { ok: false };
                }
            case 'getUserInfo':
                if (obj.responce.response[0] != undefined) {
                    var result = {
                        ok: true,
                        userName: null,
                        firstName: null,
                        lastName: null
                    };
                    result.userName = (obj.responce.response[0].screen_name != undefined) ? obj.responce.response[0].screen_name : null;
                    result.firstName = (obj.responce.response[0].first_name != undefined) ? obj.responce.response[0].first_name : null;
                    result.lastName = (obj.responce.response[0].last_name != undefined) ? obj.responce.response[0].last_name : null;
                    return result;
                }
                else {
                    return { ok: false };
                }
            default:
                return obj.responce;
        }
    };
    RequestVK.prototype.sendText = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    random_id: Math.floor(Math.random() * 2000000000),
                                    user_id: obj.user,
                                    keyboard: obj.keyboard,
                                    message: obj.text
                                },
                                page: 'messages.send',
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
    RequestVK.prototype.sendPhoto = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadUrl, resultPhoto, savePhoto, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {},
                                page: 'photos.getMessagesUploadServer',
                                responseType: 'custom'
                            })];
                    case 1:
                        uploadUrl = _a.sent();
                        return [4 /*yield*/, this.senderFile({
                                downloadUrl: obj.url,
                                uploadUrl: uploadUrl.statusText.response.upload_url
                            })];
                    case 2:
                        resultPhoto = _a.sent();
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    photo: resultPhoto.photo,
                                    server: resultPhoto.server,
                                    hash: resultPhoto.hash
                                },
                                page: 'photos.saveMessagesPhoto',
                                responseType: 'custom'
                            })];
                    case 3:
                        savePhoto = _a.sent();
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    random_id: Math.floor(Math.random() * 2000000000),
                                    user_id: obj.user,
                                    keyboard: obj.keyboard,
                                    message: obj.text,
                                    attachment: 'photo' + savePhoto.statusText.response[0].owner_id + '_' + savePhoto.statusText.response[0].id
                                },
                                page: 'messages.send',
                                responseType: 'send'
                            })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_2 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RequestVK.prototype.sendFile = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadUrl, resultFile, saveFile, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    type: 'doc',
                                    peer_id: obj.user
                                },
                                page: 'docs.getMessagesUploadServer',
                                responseType: 'custom'
                            })];
                    case 1:
                        uploadUrl = _a.sent();
                        return [4 /*yield*/, this.senderFile({
                                downloadUrl: obj.url,
                                uploadUrl: uploadUrl.statusText.response.upload_url
                            })];
                    case 2:
                        resultFile = _a.sent();
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    file: resultFile.file
                                },
                                page: 'docs.save',
                                responseType: 'custom'
                            })];
                    case 3:
                        saveFile = _a.sent();
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    random_id: Math.floor(Math.random() * 2000000000),
                                    user_id: obj.user,
                                    keyboard: obj.keyboard,
                                    attachment: 'doc' + saveFile.statusText.response.doc.owner_id + '_' + saveFile.statusText.response.doc.id
                                },
                                page: 'messages.send',
                                responseType: 'send'
                            })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_3)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RequestVK.prototype.sendLocation = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    random_id: Math.floor(Math.random() * 2000000000),
                                    user_id: obj.user,
                                    keyboard: obj.keyboard,
                                    lat: obj.latitude,
                                    long: obj.longitude
                                },
                                page: 'messages.send',
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
    RequestVK.prototype.getUserInfo = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchSender({
                                param: {
                                    user_id: obj.user,
                                    fields: 'screen_name'
                                },
                                page: 'users.get',
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
    RequestVK.prototype.fetchSender = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var string, response_1, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        obj.param.v = this.apiVersion;
                        obj.param.access_token = this.token;
                        string = this.paramToString({
                            param: obj.param
                        });
                        return [4 /*yield*/, fetch(this.url + '/' + obj.page + string, {
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
    RequestVK.prototype.senderFile = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var file, fileBlob, form, result_1, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch(obj.downloadUrl)];
                    case 1:
                        file = _a.sent();
                        return [4 /*yield*/, file.blob()];
                    case 2:
                        fileBlob = _a.sent();
                        form = new FormData();
                        form.append('file', fileBlob, obj.downloadUrl.replace('\\', '/').split('/').pop());
                        return [4 /*yield*/, fetch(obj.uploadUrl, {
                                method: 'POST',
                                body: form
                            }).then(function (res) { return res.text(); })
                                .then(function (text) { return result_1 = text; })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, JSON.parse(result_1)];
                    case 4:
                        error_7 = _a.sent();
                        return [2 /*return*/, this.errorHandler(error_7)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return RequestVK;
}(requester_1.cRequester));
exports.RequestVK = RequestVK;
