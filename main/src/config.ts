
// 开发环境地址
const config: Record<string, string> = {
  react: 'http://localhost:8888',
  vite: 'http://localhost:4007',
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key] = window.location.origin
  })

  // 在部署后，nextjs11和nuxtjs2依然和开发环境保持一致，绑定5006和6006端口，这里单独处理
  const { protocol, hostname } = window.location
  config.nextjs11 = `${protocol}//${hostname}:5006`
  config.nuxtjs2 = `${protocol}//${hostname}:6006`
}

// if (true) {
//   Object.keys(config).forEach((key) => {
//     config[key] = `http://127.0.0.1:8080`
//   })

//   const { protocol, hostname } = location
//   config.nextjs11 = `${protocol}//${hostname}:5006`
//   config.nuxtjs2 = `${protocol}//${hostname}:6006`
// }

export default config
