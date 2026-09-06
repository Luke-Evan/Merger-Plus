# Merger-Plus

> 💸 一键打钱：提供从浏览器跳转至支付宝 / 微信支付 / QQ 支付 / Paypal 的能力，帮助个人开发者完成打赏功能实现。

本项目 fork 自 [idealclover/Merger-Plus](https://github.com/idealclover/Merger-Plus)（其又基于 [hifocus/merger](https://github.com/hifocus/merger)），遵循 GPL-3.0。

## 部署到你自己的 GitHub Pages

1. 在 GitHub 上新建一个仓库（比如 `Merger-Plus`），把本地代码推上去：

```sh
git remote rename origin upstream                      # 保留原作者仓库引用，方便以后同步更新
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git add -A
git commit -m "chore: my own donate page"
git push -u origin master                              # 分支名按你仓库的默认分支来
```

2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
   （`.github/workflows/deploy.yml` 里的 `configure-pages` 带了 `enablement: true`，通常推上去后会自动开启。）

3. 之后每次 push 到默认分支都会自动构建并发布：
   - 仓库名是 `<用户名>.github.io` → `https://<用户名>.github.io/`
   - 其它仓库名 → `https://<用户名>.github.io/<仓库名>/`（工作流会自动算好 `PUBLIC_PATH`，无需手改）

## 我需要改哪些内容

### 1. `config.json` —— 唯一必须改的文件

所有文案、头像、收款码都在这一个文件里，改完重新 build 即可。没有的支付渠道把整块删掉（或设成 `null`）即可，页面按钮会自动隐藏。

| 字段 | 含义 |
| --- | --- |
| `profile` | 页面顶部头像，建议用本地 `statics/icon.png` |
| `name` / `description` | 主标题 / 副标题 |
| `qrlogo` | 二维码中心的小 logo，可留空字符串去掉 |
| `author` / `homepage` | 页脚署名和链接 |
| `repo` | 右上角 GitHub 角标链接，留空则不显示 |
| `analytics` | 你自己的 Google Analytics 4 测量 ID（如 `G-XXXXXXX`），留空则完全不加载 GA |
| `alipay` / `wechatpay` / `tenpay` / `paypal` | 各支付渠道配置 |

收款链接怎么拿：

- **支付宝**：支付宝 App → 收付款 → 收款码 → 保存图片，用任意二维码解码工具解出 `https://qr.alipay.com/xxxx`；
  `open_url` 填 `alipays://platformapi/startapp?appId=10000007&qrcode=` + 上面链接的 URL-encode 结果（用于点击按钮直接唤起支付宝）。
- **微信**：微信 → 我 → 服务 → 收付款 → 二维码收款 → 保存收款码图片 → 解码得到 `wxp://xxxx`。
- **QQ 钱包**：QQ 钱包收款码页面链接，形如 `https://vac.qq.com/wallet/qrcode.htm?...`。
- **PayPal**：`https://www.paypal.com/paypalme/<你的用户名>`。

完整字段示例见 `config.example.json`（原作者的配置，仅供参考，**不要直接上线**，否则钱会打到原作者账上）。

### 2. 头像与图标 —— 强烈建议改

- `public/statics/icon.png`：页面头像 + 二维码中心 logo（正方形，建议 ≥128×128）。
- `public/favicon.ico`：浏览器标签页图标。

### 3. 可选

- `public/index.html`：页面结构（EJS 模板，新增字段在这里引用）。
- `public/statics/style.css`：背景渐变动画、按钮配色等。

## 本地开发

```sh
npm install
npm run dev        # 开发服务器，默认 http://localhost:4000
npm run build      # 产物在 dist/ 目录
```

部署到子路径时本地预览可加环境变量：

```sh
# Windows PowerShell
$env:PUBLIC_PATH="/Merger-Plus/"; npm run build
# macOS / Linux
PUBLIC_PATH=/Merger-Plus/ npm run build
```

## 相对原项目的改动

- **去掉 `canvas` 原生依赖**：原项目在浏览器里实际使用的是 node-canvas 的 browser 垫片，等价于 `index.js` 里内联的 `createCanvas` / `loadImage`；去掉后 Windows 与 CI 不再需要编译 Cairo/GTK。
- **构建脚本跨平台**：`NODE_OPTIONS=--openssl-legacy-provider` 改用 `cross-env` 注入（原来的写法在 Windows 下无法运行）。
- **新增 `vue` 开发依赖**：仅为满足 poi 内置 vue-loader 的可选 peer 依赖（vue 2.7 走 `compiler-sfc` 分支），页面本身不使用 Vue。
- **新增 GitHub Actions 工作流**：push 后自动构建并发布到 GitHub Pages，自动处理子路径 `PUBLIC_PATH`。
- **spectre.css 本地化**：不再依赖第三方 CDN（原 `lib.baomitu.com` 在境外访问很慢）。
- **QQ 引导图本地化**：原图床 `i.loli.net` 已失效（404），改为本地 `public/statics/qq-tip.svg`。
- **GA / 页脚 / GitHub 角标改为读 `config.json`**：避免把流量统计到原作者的 GA、页脚署名原作者。

## Open Source License

This project is under [GNU General Public License v3.0](./LICENSE).

Based on following open source projects:

- [idealclover/Merger-Plus](https://github.com/idealclover/Merger-Plus)
- [hifocus/merger](https://github.com/hifocus/merger)
- [Automattic/node-canvas](https://github.com/Automattic/node-canvas)
- [soldair/node-qrcode](https://github.com/soldair/node-qrcode)
- [faisalman/ua-parser-js](https://github.com/faisalman/ua-parser-js)
