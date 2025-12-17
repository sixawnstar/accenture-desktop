const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    platform: "win32",
    arch: "x64",
    name: "accenture-desktop", // 和package.json的name完全一致（小写+连字符）
    // 可选：强制指定打包后的exe文件名，避免自动驼峰转换
    executableName: "accenture-desktop",
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {
    //     name: "accenture-desktop", // 和packagerConfig的name一致
    //     description: "Accenture Desktop Application",
    //     authors: "Your Name",
    //     // 关键：显式指定exe文件路径（打包后默认在out/accenture-desktop-win32-x64/下）
    //     exe: "./out/accenture-desktop-win32-x64/accenture-desktop.exe",
    //     // 可选：指定安装包文件名
    //     setupExe: "AccentureDesktop-Setup.exe",
    //   },
    // },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "accenture-desktop",
        description: "Accenture Desktop Application",
        authors: "Your Name",
        // 删除手动指定的exe路径！让Forge自动找路径
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
