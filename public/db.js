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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var sqlite3 = require("sqlite3");
var path = require("path");
var electron_1 = require("./electron");
var TEXT = {
    0: '1분간 자기소개를 해보세요.',
    1: '자신의 장점과 단점에 대하여 이야기해 보세요.',
    2: '친구와의 갈등 경험 및 해결 방법, 그리고 느낀점을 말씀해주세요.',
    3: '가장 힘들었던/보람있었던 경험을 말씀해주세요.',
    4: '최근에 읽은 책이나 영화가 있다면 간단히 이야기해 주세요.',
    5: '가장 존경하는 인물은 누구입니까? 그리고 이유에 대하여 말씀해주세요.',
    6: '본인이 추구하는 가치나 생활신조, 인생관, 좌우명은 무엇입니까?',
    7: '리더십을 발휘한 경험이 있으시면 말씀해주세요.',
    8: '지금까지 살면서 실패 경험이 있다면 말씀해주세요.',
    9: '인생에서 가장 큰 성공은 무엇이었나요?',
    10: '혼자 하는 일과 함께 하는 일 중 어떤 것을 더 선호하나요? 그리고 이유에 대하여 말씀해주세요.',
    11: '직장을 고를 때 가장 중요하게 생각하는 것이 무엇인가요?',
    12: '화가 나거나 힘들 때 어떤 방법으로 스트레스를 해소하나요?',
    13: '인생에서 위기가 있었나요? 있었다면 극복 방법을 말씀해주세요.',
    14: '나이 차이가 많이 나는 사람과 대화하면서 어려움을 느낀 경험이 있나요? 그 때 대화를 어떻게 풀어갔나요?',
    15: '본인의 취미나 특기는 무엇입니까?',
    16: '자기개발을 위해 무엇을 합니까?',
    17: '회사에서 갑자기 원하지 않는 부서로 발령을 낸다면 어떻게 할 건가요?',
    18: '상사가 부당한 지시를 한다면 어떻게 할 건가요?',
    19: '업무가 적성에 맞지 않거나 과중하다고 생각되면 어떻게 할 건가요?'
};
var AdminDatabase = /** @class */ (function () {
    function AdminDatabase() {
        AdminDatabase.db = new sqlite3.Database(electron_1.dbFilePath);
        this.init();
    }
    AdminDatabase.getInstance = function () {
        if (!AdminDatabase.instance) {
            AdminDatabase.instance = new AdminDatabase();
        }
        return AdminDatabase.instance;
    };
    AdminDatabase.prototype.init = function () {
        var _this = this;
        AdminDatabase.db.serialize(function () {
            AdminDatabase.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='admin'", function (err, row) {
                if (err) {
                    console.error("Error checking if table exists:", err);
                }
                else if (!row) {
                    AdminDatabase.db.run("\n            CREATE TABLE admin (\n              idx INTEGER PRIMARY KEY,\n              text TEXT,\n              file_path TEXT\n            );\n          ", function (err) {
                        if (err) {
                            console.error("Error creating table:", err);
                        }
                        else {
                            _this.reset().then(function () {
                                console.log("Table created and data inserted successfully");
                            })["catch"](function (err) {
                                console.error("Error inserting data:", err);
                            });
                        }
                    });
                }
                else {
                    console.log("Table already exists");
                }
            });
        });
    };
    AdminDatabase.prototype.reset = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 20)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.upsertOne(i, TEXT[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AdminDatabase.prototype.selectAll = function () {
        return new Promise(function (resolve, reject) {
            AdminDatabase.db.all('SELECT * FROM admin', function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    var parsedRows = rows.map(function (row) {
                        return {
                            idx: row.idx,
                            text: row.text,
                            file_path: row.file_path
                        };
                    });
                    resolve(parsedRows);
                }
            });
        });
    };
    AdminDatabase.prototype.selectOne = function (index) {
        return new Promise(function (resolve, reject) {
            AdminDatabase.db.get("SELECT * FROM admin WHERE idx=".concat(index), function (err, row) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({
                        idx: row.idx,
                        text: row.text,
                        file_path: row.file_path
                    });
                }
            });
        });
    };
    AdminDatabase.prototype.upsertOne = function (index, text) {
        return new Promise(function (resolve, reject) {
            AdminDatabase.db.run("INSERT OR REPLACE INTO admin (idx, text, file_path) VALUES (?,?,?)", [index, text, path.join(__dirname, 'voice', "".concat(index, ".mp3"))], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    return AdminDatabase;
}());
exports["default"] = AdminDatabase;
