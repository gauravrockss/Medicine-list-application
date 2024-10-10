import { app, BrowserWindow } from "electron";
import { dirname, join } from "path";
import { fileURLToPath, format } from "url";
import os from "os";
import fs from "fs";
import electronSquirrelStartup from "electron-squirrel-startup";

const prod = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (electronSquirrelStartup) app.quit();

console.log("Electron Starting... ");

const directory = join(os.homedir(), "Downloads", "generated_svgs");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: true,
    icon: "./assets/logo.png",
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true, // Enable Node integration
      contextIsolation: true, // Disable context isolation
      preload: join(__dirname, "preload.mjs"),
    },
  });

  const ui = format({
    pathname: join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  window.loadURL(prod ? ui : "http://localhost:3000");

  window.once("ready-to-show", window.show);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
