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
exports.dbFilePath = exports.dbFolderPath = void 0;
var path = require("path");
var fs = require("fs");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var util_1 = require("./util");
var db_1 = require("./db");
var remoteMain = require("@electron/remote/main");
exports.dbFolderPath = path.join(process.resourcesPath, 'database');
exports.dbFilePath = path.join(exports.dbFolderPath, 'admin.db');
var videoFolderPath = path.join(electron_1.app.getPath("downloads"), 'hyu_videos');
var voiceFolderPath = path.join(__dirname, 'voice');
var BASE_URL = 'http://localhost:3000';
var mainWindow;
var database;
(0, util_1.createDirectoryIfNotExists)(exports.dbFolderPath);
(0, util_1.createDirectoryIfNotExists)(videoFolderPath);
remoteMain.initialize();
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'asstes/icons/png/hy.png')
    });
    mainWindow.once('ready-to-show', function () {
        if (mainWindow)
            mainWindow.show();
    });
    if (isDev) {
        mainWindow.loadURL(BASE_URL);
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', function () {
    createMainWindow();
    if (mainWindow)
        mainWindow.webContents.on('did-finish-load', function () {
            database = db_1["default"].getInstance();
            mainWindow.webContents.send('admin-ready');
        });
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
//----------------------- ipcMain ---------------------------------------------------------
//------------------------ Database -------------------------
electron_1.ipcMain.on('reset', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.reset()];
            case 1:
                _a.sent();
                event.reply('resetResponse', { success: true });
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('selectAll', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.selectAll()];
            case 1:
                res = _a.sent();
                event.reply('selectAllResponse', { success: true, data: res });
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('selectOne', function (event, index) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.selectOne(index)];
            case 1:
                res = _a.sent();
                event.reply('selectOneResponse', { success: true, data: res });
                return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('upsertOne', function (event, _a) {
    var index = _a.index, text = _a.text;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, database.upsertOne(index, text)["catch"](function (error) {
                        event.reply('upsertOneResponse', { success: false, error: error });
                    })];
                case 1:
                    _b.sent();
                    event.reply('upsertOneResponse', { success: true });
                    return [2 /*return*/];
            }
        });
    });
});
electron_1.ipcMain.on('upsertMany', function (event, datas) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        datas.map(function (data) {
            database.upsertOne(data.index, data.text);
        });
        event.reply('upsertManyResponse', { success: true });
        return [2 /*return*/];
    });
}); });
//------------------------ saveFile -------------------------
electron_1.ipcMain.on('saveVideo', function (event, _a) {
    var name = _a.name, data = _a.data;
    var filePath = path.join(videoFolderPath, name);
    var directoryPath = path.dirname(filePath);
    (0, util_1.createDirectoryIfNotExists)(directoryPath);
    var buffer = Buffer.from(data);
    fs.writeFile(filePath, buffer, function (err) {
        if (err) {
            event.reply("saveVideoResponse", { success: false, error: err });
            return;
        }
        event.reply("saveVideoResponse", { success: true });
    });
});
electron_1.ipcMain.on('saveVoice', function (event, _a) {
    var index = _a.index, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var voiceFilePath, response;
        return __generator(this, function (_b) {
            try {
                voiceFilePath = path.join(voiceFolderPath, "".concat(index, ".mp3"));
                fs.writeFileSync(voiceFilePath, data);
                response = { success: true, path: voiceFilePath };
                event.reply('saveVoiceResponse', response);
            }
            catch (err) {
                event.reply('saveVoiceResponse', { success: false, error: err });
            }
            return [2 /*return*/];
        });
    });
});
