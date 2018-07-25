import "babel-polyfill";
import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import debuggers from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
debuggers();

// main window
let mainWindow = null;
let tasks = {
  data: [],
  push: function (func) {
    this.data.push(func);
    return this;
  },
  execu: function() {
    this.data.forEach(func => {
      try {
        func();
      } catch (e) {
        throw new Error(`run task error: ${e.message}`);
      }
    });
  }
}

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

async function installExt() {
  try {
    const name = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Added Extension: ${name}`)
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
}

// register
tasks.push(createWindow).push(installExt);

app.on('ready', tasks.execu.bind(tasks));
app.on('window-all-closed', () => {
    app.quit(); 
});

