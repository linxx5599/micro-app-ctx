const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const { CHILD_APPS } = require("./constant");
const remote = require("./remote");
const cwd = process.cwd();
const APP_PATH = path.resolve(cwd, "../" + CHILD_APPS);
if (!fs.existsSync(APP_PATH)) {
  //创建子应用目录
  execSync(`mkdir ${APP_PATH}`);
}

if (!remote) return;
const p = [];
for (const k in remote) {
  const v = remote[k];
  const GIT_PATH = path.resolve(APP_PATH + "/" + k, ".git");
  //拉取远程仓库代码
  if (!fs.existsSync(GIT_PATH)) {
    const promise = new Promise((resolve, reject) => {
      exec(
        `cd../${CHILD_APPS} && git clone ${v} ${k}`,
        (error, stdout, stderr) => {
          if (error) {
            reject();
            return console.error(`执行错误: ${error}`);
          }
          console.log(`标准输出: ${stdout}`);
          if (stderr && stderr.includes("fatal:")) {
            return console.error(`标准错误输出: ${stderr}`);
          }
          console.log(`拉取远程仓库代码${k}成功...`);
          resolve();
        }
      );
    });
    p.push(promise);
  }
}

Promise.all(p).then(() => {
  // 应用初始化
  //读取CHILD_APPS下的子应用, `../${CHILD_APPS}/*`
  const apps = fs
    .readdirSync(APP_PATH)
    .map((item) => path.resolve(APP_PATH, item));
  apps.forEach((app) => {
    exec(`cd ${app} && pnpm install`, (error) => {
      if (error) {
        return console.error(`执行错误: ${error}`);
      }
    });
  });
});
