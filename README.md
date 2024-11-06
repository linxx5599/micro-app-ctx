# 简介 [micro-app]

  基于pnpm monorepo 管理
  
# 目录结构

```
.
├── child_apps
│   ├── react16          // 子应用 react16 (history路由)
│   └── vite-vue3        // 子应用 vite (hash路由)
├── main_apps
│   └── vite-vue3        // 主应用 vite (history路由)
├── package.json
└── yarn.lock

```

# 开始

## 1、安装依赖

```bash
pnpm bootstrap
```
