# 🚀 部署到 GitHub + Vercel

## 下一步操作（需手动执行）

### 1️⃣ 创建 GitHub 仓库

访问：https://github.com/new

- 仓库名：`github-daily-report`
- 设为 **Public**
- 点击 "Create repository"

### 2️⃣ 推送代码

在终端执行以下命令（替换 `<your-username>` 为你的 GitHub 用户名）：

```bash
cd /Users/zhanliming/.jvs/.openclaw/workspace/github-report-web

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/<your-username>/github-daily-report.git

# 推送代码
git push -u origin main
```

### 3️⃣ 部署到 Vercel

1. 访问 https://vercel.com
2. 登录（建议用 GitHub 登录）
3. 点击 "Add New Project"
4. 选择 `github-daily-report` 仓库
5. 点击 "Deploy"

**部署完成后获得免费域名**：
```
https://github-daily-report-xxxx.vercel.app
```

### 4️⃣ 配置自动更新

#### 4.1 创建 Vercel 部署钩子

1. Vercel 项目 → Settings → Git
2. 找到 "Deployment Hooks"
3. 点击 "Create Deployment Hook"
4. 名称：`Daily Update`
5. **复制生成的 URL**

#### 4.2 添加 GitHub Secret

1. GitHub 仓库 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. Name: `VERCEL_DEPLOY_HOOK_URL`
4. Value: (粘贴步骤 4.1 复制的 URL)
5. 点击 "Add secret"

---

## ✅ 测试

### 手动触发一次更新

```bash
cd /Users/zhanliming/.jvs/.openclaw/workspace/github-report-web
npm run fetch
git add public/data/latest.json
git commit -m "chore: test data update"
git push
```

然后检查：
- GitHub Actions 是否成功运行（仓库 → Actions）
- Vercel 是否自动重新部署

---

## 📊 完成后的效果

访问你的 Vercel 域名，你将看到：

- 📊 GitHub Top 100 项目榜单
- 🔥 今日趋势项目
- 📈 语言/类别分布统计
- 🌙 深色 GitHub 风格设计
- 📱 响应式布局（手机/平板/桌面）

**每日 9:00 自动更新数据！**

---

## 🆘 需要帮助？

查看详细部署指南：`DEPLOYMENT_GUIDE.md`
