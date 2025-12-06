const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let serverProcess;

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
        },
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    serverProcess = spawn("node", ["server.js"], {
        shell: true,
        stdio: "inherit",
    });

    createWindow();
});

app.on("window-all-closed", () => {
    if (serverProcess) serverProcess.kill();
    if (process.platform !== "darwin") app.quit();
});