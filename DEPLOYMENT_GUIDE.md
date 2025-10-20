# 🚀 部署指南 (Deployment Guide)

## Vercel 部署 (推荐)

### 1. 准备工作

确保你的代码已经推送到GitHub仓库:

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. 连接Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "Add New Project"
4. 选择你的 `pinbar-trader` 仓库
5. 点击 "Import"

### 3. 配置项目

**Framework Preset**: Next.js (自动检测)

**Root Directory**: `./` (默认)

**Build Command**: `npm run build` (默认)

**Output Directory**: `.next` (默认)

**Install Command**: `npm install --legacy-peer-deps`

### 4. 环境变量配置

在 Vercel 项目设置中添加以下环境变量:

```env
# Binance API配置 (如果使用真实交易)
BINANCE_API_KEY=your_production_api_key
BINANCE_API_SECRET=your_production_api_secret
BINANCE_TESTNET=false

# 或者使用测试网
BINANCE_API_KEY=your_testnet_api_key
BINANCE_API_SECRET=your_testnet_api_secret
BINANCE_TESTNET=true
```

⚠️ **重要**:
- 初次部署建议使用 `BINANCE_TESTNET=true`
- 生产环境密钥需要严格保密
- 限制API权限,禁用提现功能

### 5. 部署

1. 点击 "Deploy"
2. 等待构建完成 (约2-3分钟)
3. 部署成功后会获得一个预览URL

### 6. 验证部署

访问预览URL,检查:

- ✅ 主页加载正常
- ✅ 导航链接工作
- ✅ Dashboard可访问 (需要密码)
- ✅ Splan页面正常显示
- ✅ API路由响应正常

### 7. 自定义域名 (可选)

1. 在Vercel项目设置中选择 "Domains"
2. 添加你的域名 (如 `yuanjihua.org.cn`)
3. 配置DNS记录:
   - 类型: `A`
   - 名称: `@`
   - 值: Vercel提供的IP地址

或使用CNAME:
   - 类型: `CNAME`
   - 名称: `www`
   - 值: `cname.vercel-dns.com`

### 8. 生产环境优化

#### 性能优化
```javascript
// next.config.js
module.exports = {
  // 启用压缩
  compress: true,

  // 图片优化
  images: {
    domains: ['testnet.binancefuture.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // 启用SWC minify
  swcMinify: true,
}
```

#### 安全头配置
在 `vercel.json` 中配置:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 其他部署选项

### Docker部署

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

构建和运行:

```bash
docker build -t pinbar-trader .
docker run -p 3000:3000 --env-file .env.local pinbar-trader
```

### 自托管服务器

#### 1. 安装依赖

```bash
# 克隆代码
git clone <your-repo-url>
cd pinbar-trader

# 安装依赖
npm install --legacy-peer-deps

# 构建
npm run build
```

#### 2. 配置环境变量

创建 `.env.production`:

```env
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret
BINANCE_TESTNET=true
```

#### 3. 使用PM2运行

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "pinbar-trader" -- start

# 设置开机自启
pm2 startup
pm2 save
```

#### 4. Nginx反向代理

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 监控和维护

### 1. 错误追踪 (Sentry)

安装Sentry:

```bash
npm install @sentry/nextjs
```

配置 `sentry.client.config.js`:

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 2. 性能监控

在Vercel Dashboard中查看:
- Analytics (分析)
- Speed Insights (速度洞察)
- Web Vitals (核心Web指标)

### 3. 日志管理

使用Vercel日志或配置外部日志服务:

```bash
# 查看Vercel日志
vercel logs <deployment-url>
```

### 4. 备份策略

定期备份:
- 代码库 (GitHub自动)
- 环境变量 (安全存储)
- 用户数据 (如有数据库)

## 更新和回滚

### 更新部署

```bash
# 推送新代码
git push origin main

# Vercel会自动部署
```

### 回滚部署

1. 在Vercel Dashboard找到之前的部署
2. 点击 "Promote to Production"
3. 或使用CLI:

```bash
vercel rollback
```

## 常见问题

### Q: 构建失败怎么办?
A: 检查构建日志,常见原因:
- 依赖安装失败 → 使用 `--legacy-peer-deps`
- TypeScript错误 → 运行 `npm run build` 本地测试
- 环境变量缺失 → 检查Vercel环境变量配置

### Q: API路由返回500错误?
A: 检查:
- 环境变量是否正确配置
- Binance API密钥是否有效
- 网络连接是否正常

### Q: 页面加载缓慢?
A: 优化建议:
- 启用图片优化
- 使用CDN
- 检查bundle大小
- 实施代码分割

## 安全检查清单

部署前确保:

- [ ] 所有敏感信息使用环境变量
- [ ] API密钥权限最小化
- [ ] 配置IP白名单 (Binance)
- [ ] 启用HTTPS
- [ ] 配置安全头
- [ ] 定期更新依赖
- [ ] 监控异常活动

## 性能基准

期望指标:
- **首次内容绘制 (FCP)**: < 1.8s
- **最大内容绘制 (LCP)**: < 2.5s
- **首次输入延迟 (FID)**: < 100ms
- **累积布局偏移 (CLS)**: < 0.1

---

**祝部署顺利! 🎉**

有问题联系: x.stark.dylan@gmail.com
