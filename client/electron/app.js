require("dotenv").config();
const path = require("path");
const url = require("url");
const {app, BrowserWindow, ipcMain } = require("electron");
const {channels} = require("../shared/constants");
let mainWindow;
const BROWSER_WIDTH = 800;
const BROWSER_HEIGHT = 500; 

const createWindow = () => {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, "preload.js"), //might need to be just preload.js
    protocol: "file:",
    slashes: true
  });
  mainWindow = new BrowserWindow({width: BROWSER_WIDTH, height: BROWSER_HEIGHT});
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {mainWindow = null})
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if(mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion()
  });
});