# GitHub 每日热点报告网站

📊 基于 Next.js + Vercel 的 GitHub 热点报告展示网站

**在线演示**: [待部署]

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 抓取最新数据
npm run fetch

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

---

## 📁 项目结构

```
github-report-web/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页（今日报告）
│   └── layout.tsx         # 根布局
├── lib/                    # 工具函数和类型
│   ├── types.ts           # TypeScript 类型定义
│   └── github-data.ts     # 数据抓取逻辑
├── public/
│   └── data/
│       └── latest.json    # 最新 GitHub 数据
├── scripts/
│   └── fetch-data.js      # 数据抓取脚本
├── .github/
│   └── workflows/
│       └── daily-update.yml  # GitHub Actions
└── vercel.json            # Vercel 配置
```

---

## 🔄 自动化部署

### GitHub Actions

每日 9:00 (Asia/Shanghai) 自动执行：

1. 抓取最新 GitHub 数据
2. 更新 `public/data/latest.json`
3. 提交代码到仓库
4. 触发 Vercel 部署钩子

### 手动触发

```bash
# 本地抓取数据
npm run fetch

# 提交并推送
git add public/data/latest.json
git commit -m "chore: update daily data"
git push
```

---

## 🌐 部署到 Vercel

### 步骤 1: 创建 GitHub 仓库

```bash
cd github-report-web
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 步骤 2: 连接 Vercel

1. 访问 https://vercel.com
2. 点击 "Add New Project"
3. 导入 GitHub 仓库
4. 点击 "Deploy"

### 步骤 3: 配置部署钩子

1. 在 Vercel 项目设置中找到 "Git" → "Deployment Hooks"
2. 创建新钩子
3. 复制钩子 URL
4. 在 GitHub 仓库设置中添加 Secret: `VERCEL_DEPLOY_HOOK_URL`

### 步骤 4: 配置 GitHub Actions

1. 在 GitHub 仓库设置中添加 Secret: `GITHUB_TOKEN` (自动可用)
2. 添加 `VERCEL_DEPLOY_HOOK_URL` Secret

---

## 📊 功能特性

- ✅ 实时展示 GitHub Top 100 项目
- ✅ 今日趋势榜单
- ✅ 语言分布统计
- ✅ 项目类别分析
- ✅ 深色 GitHub 风格设计
- ✅ 响应式布局
- ✅ 自动每日更新

---

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **部署**: Vercel
- **自动化**: GitHub Actions

---

## 📝 后续计划

- [ ] 历史报告归档页
- [ ] 项目详情页
- [ ] 搜索功能
- [ ] 按语言/类别筛选
- [ ] RSS 订阅
- [ ] 邮件订阅

---

## 📄 许可证

MIT
