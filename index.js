const { app, BrowserWindow, ipcMain } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //   win.webContents.openDevTools();

  win.loadFile("index.html");

  // 监听渲染进程的全屏请求
  ipcMain.on("window:fullscreen", () => {
    if (win) {
      win.setFullScreen(true); // 设置全屏
      console.log("窗口已全屏");
    }
  });

  // 监听渲染进程的退出全屏请求
  ipcMain.on("window:exit-fullscreen", () => {
    if (win) {
      win.setFullScreen(false); // 退出全屏
      console.log("已退出全屏");
    }
  });
};

app.whenReady().then(() => {
  createWindow();
});

// 适配macOS的窗口行为
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 额外：监听系统ESC键（兜底，即使渲染进程监听失效也能退出）
app.on("browser-window-focus", (event, window) => {
  window.webContents.on("before-input-event", (event, input) => {
    if (input.key === "Escape" && input.type === "keyDown") {
      window.setFullScreen(false);
    }
  });
});
