const electron = require('electron');
window.api = {
  ipc: require('electron-better-ipc').ipcRenderer,
  SettingsStore: require('electron-store'),
  logger: require('electron-timber'),
};
