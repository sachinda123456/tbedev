"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
console.log('loading my Taskbuddy Review Typescripted add-on...');
(0, add_on_1.TBInitAddOn)({
    name: 'Job Reviews',
    id: 'c5ndeu59aacjmf4ksd30',
    impressions: [
        {
            name: 'home-screen',
            renderFunc: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                var user, data, avg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tbapi.activeUser()];
                        case 1:
                            user = _a.sent();
                            if (!(user.user_type === 'admin' || user.user_type === 'super_admin')) return [3 /*break*/, 3];
                            return [4 /*yield*/, tbapi.getStorage('account', user.account_id, 'job-reviews', 'all')];
                        case 2:
                            data = _a.sent();
                            avg = Math.round((data.reviewedJobs.reduce(function (acc, curr) { return acc + curr.rating; }, 0) /
                                data.reviewedJobs.length) *
                                10) / 10;
                            return [2 /*return*/, {
                                    objects: [
                                        {
                                            id: 'review-rating-label',
                                            type: 'label',
                                            title: 'You have ' + data.reviewedJobs.length + ' job ratings',
                                        },
                                        {
                                            id: 'review-avg-rating',
                                            type: 'icon-label',
                                            title: '' + avg + ' in average',
                                            icon: 'https://taskbuddy-add-on-example.netlify.app/' + Math.round(avg) + '.png',
                                        },
                                        {
                                            id: 'review-btn',
                                            type: 'button',
                                            onClick: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.webView('Your reviews', 'https://taskbuddy-add-on-example.netlify.app/all-feedback.html')];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                            title: 'See reviews',
                                        },
                                    ],
                                }];
                        case 3: return [2 /*return*/, { objects: [] }];
                    }
                });
            }); },
        },
        {
            name: 'job-screen',
            renderFunc: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                var job, user, objects, data, iconlabel, err_1, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            job = undefined;
                            user = undefined;
                            objects = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 9, , 10]);
                            return [4 /*yield*/, tbapi.activeJob()];
                        case 2:
                            job = _a.sent();
                            return [4 /*yield*/, tbapi.activeUser()];
                        case 3:
                            user = _a.sent();
                            if (!(user.user_type === 'client')) return [3 /*break*/, 4];
                            objects = __spreadArray(__spreadArray([], objects, true), [
                                {
                                    id: 'review-btn',
                                    type: 'button',
                                    onClick: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, tbapi.webView('Job feedback', 'https://taskbuddy-add-on-example.netlify.app/feedback.html')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    title: 'Send feedback',
                                },
                            ], false);
                            return [3 /*break*/, 8];
                        case 4:
                            if (!(user.user_type !== 'worker')) return [3 /*break*/, 8];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, tbapi.getStorage('job', job.id, 'job-review', 'all')];
                        case 6:
                            data = _a.sent();
                            iconlabel = [];
                            if (data.rating) {
                                iconlabel = [
                                    {
                                        id: 'review-rating',
                                        type: 'icon-label',
                                        title: '' + data.rating,
                                        icon: 'https://taskbuddy-add-on-example.netlify.app/' + data.rating + '.png',
                                    },
                                ];
                            }
                            objects = __spreadArray(__spreadArray(__spreadArray([], objects, true), iconlabel, true), [
                                {
                                    id: 'review-btn',
                                    type: 'button',
                                    onClick: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, tbapi.webView('Job feedback', 'https://taskbuddy-add-on-example.netlify.app/feedback.html')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    title: 'View feedback',
                                },
                            ], false);
                            return [3 /*break*/, 8];
                        case 7:
                            err_1 = _a.sent();
                            return [3 /*break*/, 8];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            err_2 = _a.sent();
                            console.log(err_2);
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/, {
                                objects: objects,
                            }];
                    }
                });
            }); },
        },
        {
            name: 'config-screen',
            renderFunc: function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
                var settings, account, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            settings = {};
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, tbapi.activeAccount()];
                        case 2:
                            account = _a.sent();
                            return [4 /*yield*/, tbapi.getStorage('account', account.id, 'app-settings', 'admins')];
                        case 3:
                            settings = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            err_3 = _a.sent();
                            console.log(err_3);
                            return [3 /*break*/, 5];
                        case 5:
                            console.log('App settings:', settings);
                            return [2 /*return*/, {
                                    objects: [
                                        {
                                            id: 'my-label1',
                                            type: 'label',
                                            title: settings['my-test-input'] !== undefined ? settings['my-test-input'] : 'Badge',
                                        },
                                        {
                                            id: 'my-badge',
                                            type: 'badge',
                                            color: settings['my-select'] === 'green' ? 'green' : 'red',
                                            label: settings['my-select'] === 'green' ? '👍' : '👎',
                                        },
                                        {
                                            id: 'my-label2',
                                            type: 'label',
                                            title: 'Markdown text',
                                        },
                                        {
                                            id: 'my-md',
                                            type: 'markdown-text',
                                            placeholder: 'Some long text',
                                            value: settings['my-md'] !== undefined
                                                ? settings['my-md']
                                                : "\n# Title\nand some text\n\n## Sub title\nand som other text\n            ",
                                            onChange: function (tbapi, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.setStorage('account', account.id, 'app-settings', 'admins', __assign(__assign({}, settings), {
                                                                'my-md': value,
                                                            }))];
                                                        case 1:
                                                            _a.sent();
                                                            tbapi.reRender();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                        },
                                        {
                                            id: 'my-label3',
                                            type: 'label',
                                            title: 'Select',
                                        },
                                        {
                                            id: 'my-select',
                                            type: 'select',
                                            options: [
                                                { value: 'green', label: 'Tumme upp!' },
                                                { value: 'red', label: 'Tumme ner...' },
                                            ],
                                            placeholder: 'Select up or down',
                                            value: settings['my-select'] !== undefined ? settings['my-select'] : 'green',
                                            onChange: function (tbapi, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.setStorage('account', account.id, 'app-settings', 'admins', __assign(__assign({}, settings), {
                                                                'my-select': value,
                                                            }))];
                                                        case 1:
                                                            _a.sent();
                                                            tbapi.reRender();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                        },
                                        {
                                            id: 'my-label4',
                                            type: 'label',
                                            title: 'Switch',
                                        },
                                        {
                                            id: 'my-switch',
                                            type: 'switch',
                                            title: 'onoff',
                                            value: settings['my-switch'] !== undefined ? settings['my-switch'] : true,
                                            onChange: function (tbapi, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.setStorage('account', account.id, 'app-settings', 'admins', __assign(__assign({}, settings), {
                                                                'my-switch': value,
                                                            }))];
                                                        case 1:
                                                            _a.sent();
                                                            tbapi.reRender();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                        },
                                        {
                                            id: 'my-label5',
                                            type: 'label',
                                            title: 'Multi select',
                                        },
                                        {
                                            id: 'my-multi-select',
                                            type: 'multi-select',
                                            options: [
                                                { value: '1', label: 'First' },
                                                { value: '2', label: 'Second' },
                                            ],
                                            placeholder: 'Select first or second',
                                            values: settings['my-multi-select'] !== undefined ? settings['my-multi-select'] : ['1'],
                                            onChange: function (tbapi, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.setStorage('account', account.id, 'app-settings', 'admins', __assign(__assign({}, settings), {
                                                                'my-multi-select': value,
                                                            }))];
                                                        case 1:
                                                            _a.sent();
                                                            tbapi.reRender();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                        },
                                        {
                                            id: 'my-label6',
                                            type: 'label',
                                            title: 'Text input',
                                        },
                                        {
                                            id: 'my-test-input',
                                            type: 'text-input',
                                            placeholder: 'input your text',
                                            value: settings['my-test-input'] !== undefined ? settings['my-test-input'] : 'Hej ehj',
                                            onChange: function (tbapi, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, tbapi.setStorage('account', account.id, 'app-settings', 'admins', __assign(__assign({}, settings), {
                                                                'my-test-input': value,
                                                            }))];
                                                        case 1:
                                                            _a.sent();
                                                            tbapi.reRender();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                        },
                                    ],
                                }];
                    }
                });
            }); },
        },
    ],
});
