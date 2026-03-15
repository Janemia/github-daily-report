/**
 * 数据抓取脚本 - 用于 GitHub Actions
 * 复用现有 fetch-github-data.js 逻辑
 */

const fs = require('fs');
const path = require('path');

// 复用现有脚本
const fetchScript = path.join(__dirname, '../../github-report/fetch-github-data.js');

if (fs.existsSync(fetchScript)) {
  console.log('使用现有数据抓取脚本...');
  const { main } = require(fetchScript);
  main().then(() => {
    // 复制数据到 Next.js 项目
    const sourceData = path.join(__dirname, '../../github-report/data/latest.json');
    const destData = path.join(__dirname, '../public/data/latest.json');
    
    if (fs.existsSync(sourceData)) {
      const data = fs.readFileSync(sourceData, 'utf-8');
      fs.writeFileSync(destData, data);
      console.log('✅ 数据已复制到 public/data/latest.json');
    }
  }).catch(console.error);
} else {
  console.log('使用备用抓取逻辑...');
  // 备用逻辑 - 简单模拟数据
  const mockData = {
    top100: [],
    trending: [],
    generatedAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('zh-CN')
  };
  
  const destData = path.join(__dirname, '../public/data/latest.json');
  fs.writeFileSync(destData, JSON.stringify(mockData, null, 2));
  console.log('⚠️  使用模拟数据');
}
