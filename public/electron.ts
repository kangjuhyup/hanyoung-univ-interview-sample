import * as path from 'path';
import * as fs from 'fs';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as isDev from 'electron-is-dev';
import { createDirectoryIfNotExists } from './util';
import AdminDatabase, { Colume } from './db';
import * as remoteMain from '@electron/remote/main';



export const dbFolderPath = path.join(process.resourcesPath, 'database');
export const dbFilePath = path.join(dbFolderPath, 'admin.db');
const videoFolderPath = path.join(app.getPath("downloads"), 'hyu_videos');
const voiceFolderPath = path.join(__dirname, 'voice');

const BASE_URL = 'http://localhost:3000';

let mainWindow: BrowserWindow | null;

let database: AdminDatabase;
createDirectoryIfNotExists(dbFolderPath);
createDirectoryIfNotExists(videoFolderPath);

remoteMain.initialize();

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1920,

    height: 1080,

    webPreferences: {
      contextIsolation: false,

      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'asstes/icons/png/hy.png')
  });

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
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

app.on('ready', (): void => {
  createMainWindow();
  if (mainWindow)
    mainWindow.webContents.on('did-finish-load', () => {
      
      database = AdminDatabase.getInstance();
      mainWindow!.webContents.send('admin-ready');
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

//----------------------- ipcMain ---------------------------------------------------------

//------------------------ Database -------------------------

ipcMain.on('reset',async (event)=>{
  await database.reset();
  event.reply('resetResponse',{success:true})
})

ipcMain.on('selectAll', async (event) => {
  const res:Colume[] = await database.selectAll()  
  event.reply('selectAllResponse', {success:true,data:res});
})

ipcMain.on('selectOne',async (event,index) => {
  const res = await database.selectOne(index);
  event.reply('selectOneResponse', {success:true,data:res});
})

ipcMain.on('upsertOne',async (event,{index,text})=> {
  await database.upsertOne(index,text);
  event.reply('upsertOneResponse',{success:true});
})

ipcMain.on('upsertMany', async (event,datas:{index:number,text:string}[]) => {
  datas.map((data) => {
    database.upsertOne(data.index,data.text);
  })
  event.reply('upsertManyResponse',{success:true});
})




//------------------------ saveFile -------------------------
ipcMain.on('saveVideo', (event, { name, data }) => {
  const filePath = path.join(videoFolderPath, name);
  const directoryPath = path.dirname(filePath);
  createDirectoryIfNotExists(directoryPath);
  const buffer = Buffer.from(data);
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      event.reply("saveVideoResponse", { success: false, error: err });
      return;
    }
    event.reply("saveVideoResponse", { success: true });
  });
})

ipcMain.on('saveVoice', async (event, { index, data }) => {
  const voiceFilePath = path.join(voiceFolderPath, `${index}.mp3`);
  try {
    const fileDescriptor = fs.openSync(voiceFilePath, 'w');
    fs.writeFile(fileDescriptor, voiceFilePath, data);
    event.reply('saveVoiceResponse', { success: true, path: voiceFilePath });
  } catch (error) {
    event.reply('saveVoiceResponse', { success: false, error: error });
  }
});