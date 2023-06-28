import * as path from 'path';
import * as fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import * as sqlite3 from 'electron-sqlite3';

const sqlitePath = path.join(__dirname, 'admin.db');
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
  }

  mainWindow.on('closed', (): void => {
    mainWindow = null;
  });
}
const createDirectoryIfNotExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

ipcMain.on('saveVideo',(event,{name,data}) => {
  const filePath = path.join(app.getPath("downloads"),'hyu_videos', name);
  const directoryPath = path.dirname(filePath);
  createDirectoryIfNotExists(directoryPath);
  const buffer = Buffer.from(data);
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("파일 저장 중 오류 발생:", err);
      event.reply("saveVideoResponse", { success: false, error: err });
      return;
    }

    console.log("파일 저장 완료:", filePath);
    event.reply("saveVideoResponse", { success: true });
  });
})

ipcMain.on('saveVoice', async (event, { index, data }) => {
  const voiceFilePath = path.join(__dirname, 'voice', `${index}.mp3`);
  try {
    const fileDescriptor = fs.openSync(voiceFilePath, 'w');
    fs.writeFile(fileDescriptor,voiceFilePath, data);
    event.reply('saveVoiceResponse', { success: true, path: voiceFilePath });
  } catch (error) {
    event.reply('saveVoiceResponse', { success: false, error: error });
  }
});
app.on('ready', (): void => {
  const db = new sqlite3.Database(sqlitePath);
  createMainWindow();
  mainWindow.webContents.on('did-finish-load', () => {
    // 일렉트론 setup 이 완료되면 react로 셋업메세지 전달.
    mainWindow.webContents.send('admin-ready', db);
  });
});

app.on('window-all-closed', (): void => {
  app.quit();
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
