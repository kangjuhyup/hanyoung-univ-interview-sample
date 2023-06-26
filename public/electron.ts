import * as path from 'path';
import * as fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';

const BASE_URL = 'http://localhost:3000';

let mainWindow: BrowserWindow | null;
import * as remoteMain from '@electron/remote/main';
remoteMain.initialize();

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1920,

    height: 1080,

    webPreferences: {
      contextIsolation: false,

      nodeIntegration: true,
    },
    icon : path.join(__dirname,'asstes/icons/png/hy.png')
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL(BASE_URL);

    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', (): void => {
    mainWindow = null;
  });
}
ipcMain.on('requestVoicePath', (event, arg)=>{ 
  const directoryPath = path.join(__dirname, 'voice');
  const m4aFiles = fs.readdirSync(directoryPath).filter((filename) => {
    return path.extname(filename) === '.m4a';
  }).map((filename) => {
    return directoryPath;
  });
  event.reply('responseVoicePath', m4aFiles);
}) 

app.on('ready', (): void => {
    console.log('electron ready')
  createMainWindow();
});

app.on('window-all-closed', (): void => {
  app.quit();
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
