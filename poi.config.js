require("dotenv").config()

let pageData = require("./config.json")

const env = process.env

// GitHub Pages 项目页（https://<user>.github.io/<repo>/）需要带上仓库名前缀；
// 用户页（https://<user>.github.io/）或绑定自定义域名时保持 "/" 即可。
// CI 里由 .github/workflows/deploy.yml 自动注入 PUBLIC_PATH。
const publicPath = env.PUBLIC_PATH || "/"

console.log(`PUBLIC_PATH: ${publicPath}`)

module.exports = {
  output: {
    publicUrl: publicPath
  },
  constants: {
    DATA: JSON.stringify(pageData)
  }
}
