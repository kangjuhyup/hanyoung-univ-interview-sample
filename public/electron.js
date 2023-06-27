"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var BASE_URL = 'http://localhost:3000';
var mainWindow;
var remoteMain = require("@electron/remote/main");
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
        mainWindow.show();
    });
    if (isDev) {
        mainWindow.loadURL(BASE_URL);
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
var createDirectoryIfNotExists = function (directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};
electron_1.ipcMain.on('saveVideo', function (event, _a) {
    var name = _a.name, data = _a.data;
    var filePath = path.join(electron_1.app.getPath("downloads"), 'hyu_videos', name);
    var directoryPath = path.dirname(filePath);
    createDirectoryIfNotExists(directoryPath);
    var buffer = Buffer.from(data);
    fs.writeFile(filePath, buffer, function (err) {
        if (err) {
            console.error("파일 저장 중 오류 발생:", err);
            event.reply("saveVideoResponse", { success: false, error: err });
            return;
        }
        console.log("파일 저장 완료:", filePath);
        event.reply("saveVideoResponse", { success: true });
    });
});
electron_1.app.on('ready', function () {
    console.log('electron ready');
    createMainWindow();
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
