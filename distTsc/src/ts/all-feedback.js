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
Object.defineProperty(exports, "__esModule", { value: true });
var add_on_1 = require("@taskbuddy/add-on");
(0, add_on_1.TBInitIframe)('c5ndeu59aacjmf4ksd30', 'modal-web-view', function (tbapi) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, tbapi.activeUser().then(function (user) {
                tbapi.getStorage('account', user.account_id, 'job-reviews', 'all').then(function (data) {
                    if (!data)
                        return;
                    var rCont = document.getElementById('container');
                    data.reviewedJobs.forEach(function (rj) {
                        var reviewCont = document.createElement('div');
                        reviewCont.className = 'reviewcontainer';
                        var job = document.createElement('p');
                        job.textContent = 'The job "' + rj.id + '" was rated ';
                        tbapi.getJob(rj.id).then(function (j) {
                            job.textContent = 'The job "' + j.name + '" was rated ';
                        });
                        var rating = document.createElement('img');
                        rating.src = 'https://taskbuddy-add-on-example.netlify.app/' + rj.rating + '.png';
                        rating.style.height = '2rem;';
                        var userInfo = document.createElement('p');
                        userInfo.textContent = ' by user "' + rj.u_id + '"';
                        tbapi.getUser(rj.u_id).then(function (u) {
                            userInfo.textContent = ' by user "' + u.given_name + ' ' + u.family_name + '"';
                        });
                        var moreBtn = document.createElement('a');
                        moreBtn.textContent = 'See review';
                        moreBtn.onclick = function () {
                            reviewCont.removeChild(moreBtn);
                            var moreDiv = document.createElement('div');
                            moreDiv.className = 'morediv';
                            var title = document.createElement('p');
                            var desc = document.createElement('p');
                            tbapi.getStorage('job', rj.id, 'job-review', 'all').then(function (jobreview) {
                                title.textContent = jobreview.title;
                                desc.textContent = jobreview.description;
                            });
                            moreDiv.appendChild(title);
                            moreDiv.appendChild(desc);
                            reviewCont.appendChild(moreDiv);
                        };
                        reviewCont.appendChild(job);
                        reviewCont.appendChild(rating);
                        reviewCont.appendChild(userInfo);
                        reviewCont.appendChild(moreBtn);
                        rCont === null || rCont === void 0 ? void 0 : rCont.appendChild(reviewCont);
                    });
                });
            })];
    });
}); });
