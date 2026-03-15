#!/bin/bash
# 自动推送脚本

cd /Users/zhanliming/.jvs/.openclaw/workspace/github-report-web

echo "📦 开始推送代码到 GitHub..."

# 配置 Git 用户信息
git config user.name "Janemia"
git config user.email "jandawn@126.com"

# 推送代码（后台运行）
nohup git push origin main > /tmp/git-push.log 2>&1 &

echo "✅ 推送已在后台启动"
echo "📄 查看日志：tail -f /tmp/git-push.log"
echo ""
echo "等待 30 秒后检查推送状态..."
sleep 30

if grep -q "Everything up-to-date\|main -> main" /tmp/git-push.log 2>/dev/null; then
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 访问网站：https://github-daily-report.vercel.app"
    echo "📊 查看部署：https://vercel.com/janemias-projects/github-daily-report/deployments"
else
    echo "⏳ 推送可能还在进行中..."
    echo "请手动执行：cd /Users/zhanliming/.jvs/.openclaw/workspace/github-report-web && git push origin main"
fi
