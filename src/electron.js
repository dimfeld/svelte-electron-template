const { app, BrowserWindow } = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu');
const { ipcMain: ipc } = require('electron-better-ipc');
const logger = require('electron-timber');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let renderWatcher;
if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reloader')(module);
  } catch (_) {}

  renderWatcher = require('chokidar').watch(
    path.join(__dirname, '../build/bundle.js'),
    { ignoreInitial: true }
  );
  renderWatcher.on('change', () => {
    mainWindow && mainWindow.reload();
  });
}

contextMenu();
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => {
    if (renderWatcher) {
      renderWatcher.close();
    }
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
