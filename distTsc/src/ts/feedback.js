"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var add_on_1 = require("@taskbuddy/add-on");
(0, add_on_1.TBInitIframe)('c5ndeu59aacjmf4ksd30', 'modal-web-view', function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
    var res, user, obj, rating, i, err_1, submit, inputs, inputList, texts, textList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tbapi.activeJob()];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, tbapi.activeUser()];
            case 2:
                user = _a.sent();
                document.getElementById('jobname').textContent = res.name;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, tbapi.getStorage('job', res.id, 'job-review', 'all')];
            case 4:
                obj = _a.sent();
                document.getElementById('title').value = obj.title(document.getElementById('description')).value = obj.description;
                rating = document.getElementsByName('rate');
                if (obj.rating !== undefined) {
                    for (i = 0; i < rating.length; i++) {
                        if (rating[i].value === '' + obj.rating)
                            rating[i].checked = true;
                    }
                }
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [3 /*break*/, 6];
            case 6:
                window['submit'] = function () { };
                if (user.user_type === 'client') {
                    submit = function () {
                        var title = document.getElementById('title').value;
                        var description = document.getElementById('description').value;
                        var rating = document.getElementsByName('rate');
                        var nRating = undefined;
                        for (var i = 0; i < rating.length; i++) {
                            if (rating[i].checked)
                                nRating = Number.parseInt(rating[i].value);
                        }
                        var rMess = '';
                        for (var i = 0; nRating && i < nRating; i++) {
                            rMess += '⭐';
                        }
                        tbapi
                            .setStorage('job', res.id, 'job-review', 'all', {
                            title: title,
                            description: description,
                            rating: nRating,
                        })
                            .then(function () { return tbapi.getStorage('account', res.account_id, 'job-reviews', 'all'); })
                            .catch(function () {
                            return {
                                reviewedJobs: [],
                            };
                        })
                            .then(function (accData) {
                            var idx = accData.reviewedJobs.findIndex(function (rj) { return rj.id === res.id; });
                            if (idx >= 0) {
                                accData.reviewedJobs[idx].rating = nRating;
                                accData.reviewedJobs[idx].u_id = user.id;
                            }
                            else {
                                accData.reviewedJobs = __spreadArray(__spreadArray([], accData.reviewedJobs, true), [
                                    { id: res.id, rating: nRating, u_id: user.id },
                                ], false);
                            }
                            return tbapi.setStorage('account', res.account_id, 'job-reviews', 'all', accData);
                        })
                            .then(function () { return tbapi.postInChat(res.channel_id, 'Rated job ' + rMess + ', ' + title); })
                            .then(function () { return tbapi.closeWebView(); });
                    };
                    inputs = document.getElementsByTagName('input');
                    inputList = Array.prototype.slice.call(inputs);
                    inputList.forEach(function (element) {
                        element.disabled = false;
                    });
                    texts = document.getElementsByTagName('textarea');
                    textList = Array.prototype.slice.call(texts);
                    textList.forEach(function (element) {
                        element.disabled = false;
                    });
                    window['submit'] = submit;
                }
                else {
                    document.getElementById('submit-btn').style.display = 'none';
                }
                return [2 /*return*/];
        }
    });
}); });
