import { app, BrowserWindow, Notification } from 'electron';
const ipc = require('electron').ipcMain
const path = require('path')

let mynotification

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#333',
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Load when content is ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  app.allowRendererProcessReuse = true
  createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipc.on('notify', function (event, arg) {
  mynotification = new Notification({
    title: 'Xplore',
    body: 'Your video has been analyzed. Click to view!',
    icon: path.join(__dirname, '../assets/images/favicon.png')
  })

  mynotification.addListener('click', () => {
    let resWindow = new BrowserWindow({
      minWidth: 800,
      minHeight: 600,
      resizable: false,
      backgroundColor: '#333',
      frame: false,
      // show: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    });
    // resWindow.webContents.openDevTools();
    resWindow.loadURL(arg);

  })
  mynotification.show()
})

ipc.on('error', () => {
  mynotification = new Notification({
    title: 'Xplore',
    body: 'There was some error communicating with server. Please try again later',
    icon: path.join(__dirname, '../assets/images/favicon.png')
  })

  mynotification.addListener('click', () => {
    let resWindow = new BrowserWindow({
      minWidth: 800,
      minHeight: 600,
      resizable: false,
      frame: false,
      // show: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    });
    // resWindow.webContents.openDevTools();
    resWindow.loadURL(arg);

  })
  mynotification.show()
})