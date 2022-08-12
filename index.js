const path = require('path');
const { app, BrowserWindow } = require('electron');
const setupPug = require('electron-pug');
// const isDev = require('electron-is-dev');
const locals = {
  /* ... */
};

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, './src/preload.js'),
      // devTools: isDev ? true : false,
      devTools: true,
    },
    // resizable: false,
    // transparent: false,
    // fullscreenable: false,
  });
  win.loadURL(`file://${path.join(__dirname, './src/app/index.pug')}`);
  // win.loadURL(`file://${path.join(__dirname, '../../../../app/index.pug')}`);
  // if(isDev) win.webContents.openDevTools();
  win.webContents.openDevTools();
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  try {
    const pug = await setupPug({ pretty: true }, locals);
    pug.on('error', (err) => console.error('electron-pug error', err));
  } catch (err) {
    console.log("Could not initiate 'electron-pug'");
  }
  createWindow();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
