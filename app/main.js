import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import debuggers from 'electron-debug';
debuggers();

// main window
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('close', () => {
    mainWindow = null;
  });

  mainWindow.show();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); 
  }
});
app.on('active', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

