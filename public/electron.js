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
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.ipcMain.on('requestVoicePath', function (event, arg) {
    var directoryPath = path.join(__dirname, 'voice');
    var m4aFiles = fs.readdirSync(directoryPath).filter(function (filename) {
        return path.extname(filename) === '.m4a';
    }).map(function (filename) {
        return directoryPath;
    });
    event.reply('responseVoicePath', m4aFiles);
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
