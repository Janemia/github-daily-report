'use client';

export default function InsightsSection() {
  const insights = [
    {
      icon: '🤖',
      title: 'AI/ML 主导趋势',
      description: 'Top 100 项目中 35% 与人工智能和机器学习相关，从 LLM 推理到 Agent 框架，AI 正在重塑开源生态格局。llama.cpp 等项目让大模型在本地运行成为可能。'
    },
    {
      icon: '📚',
      title: '学习资源价值',
      description: 'build-your-own-x、developer-roadmap 等教育类项目持续火热，反映开发者对系统性学习和实践技能的强烈需求。从零实现是掌握技术的最佳途径。'
    },
    {
      icon: '🛠️',
      title: '开发者工具需求',
      description: 'VS Code、PowerToys、DevToys 等效率工具持续受欢迎，说明开发者愿意投资提升工作效率。好的工具能让开发体验事半功倍。'
    },
    {
      icon: '📱',
      title: '跨平台框架兴起',
      description: 'Flutter、React Native、Electron 等跨平台方案占据重要地位，一套代码多端部署成为主流选择。开发者追求更高的开发效率和更低的维护成本。'
    },
    {
      icon: '🔒',
      title: '隐私保护意识',
      description: 'localsend、ente、Spotube 等注重隐私的开源替代品快速增长，用户对数据主权和隐私保护的关注度持续提升。开源成为信任的基础。'
    },
    {
      icon: '🌐',
      title: '开源协作精神',
      description: '从 freeCodeCamp 的免费教育到 public-apis 的资源共享，开源社区持续推动知识普惠。协作和分享是开源文化的核心价值。'
    }
  ];

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: '1px solid #30363d' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#58a6ff', marginBottom: '8px' }}>
          Key Insights
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          💡 核心洞察
        </h2>
        <p style={{ color: '#8b949e', fontSize: '14px' }}>
          从 Top 100 项目中解读开源生态的关键趋势和技术走向
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {insights.map((insight, index) => (
          <div
            key={index}
            style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              padding: '24px',
              transition: 'border-color .2s'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{insight.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
              {insight.title}
            </h3>
            <p style={{ color: '#8b949e', fontSize: '13px', lineHeight: 1.6 }}>
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
