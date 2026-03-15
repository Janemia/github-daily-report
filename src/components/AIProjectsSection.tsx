'use client';

import { GitHubProject } from '../lib/types';

interface AIProjectsSectionProps {
  projects: GitHubProject[];
}

interface AICategory {
  name: string;
  tag: string;
  color: string;
  projects: GitHubProject[];
}

export default function AIProjectsSection({ projects }: AIProjectsSectionProps) {
  // 分类 AI 项目
  const categories: AICategory[] = [
    {
      name: '🧠 Agent 框架',
      tag: 'tag-agent',
      color: '#58a6ff',
      projects: projects.filter(p => 
        p.desc.toLowerCase().includes('agent') || 
        p.desc.toLowerCase().includes('auto') ||
        p.name.toLowerCase().includes('agent')
      ).slice(0, 4)
    },
    {
      name: '⚡ 工作流引擎',
      tag: 'tag-workflow',
      color: '#3fb950',
      projects: projects.filter(p => 
        p.desc.toLowerCase().includes('workflow') || 
        p.desc.toLowerCase().includes('automation') ||
        p.desc.toLowerCase().includes('flow')
      ).slice(0, 4)
    },
    {
      name: '📊 数据处理',
      tag: 'tag-data',
      color: '#f0883e',
      projects: projects.filter(p => 
        p.desc.toLowerCase().includes('data') || 
        p.desc.toLowerCase().includes('analytics') ||
        p.desc.toLowerCase().includes('ml')
      ).slice(0, 4)
    },
    {
      name: '🎨 媒体生成',
      tag: 'tag-media',
      color: '#f778ba',
      projects: projects.filter(p => 
        p.desc.toLowerCase().includes('image') || 
        p.desc.toLowerCase().includes('video') ||
        p.desc.toLowerCase().includes('music') ||
        p.desc.toLowerCase().includes('generate')
      ).slice(0, 4)
    }
  ];

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: '1px solid #30363d' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#bc8cff', marginBottom: '8px' }}>
          AI Ecosystem
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          🤖 AI 项目全景分析
        </h2>
        <p style={{ color: '#8b949e', fontSize: '14px' }}>
          从 Agent 框架到媒体生成，探索 AI 开源生态的四大核心领域
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              padding: '24px',
              transition: 'border-color .2s',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* 顶部彩色条 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`
              }}
            />

            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: '10px', color: category.color }}>
              {category.name}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {category.projects.length > 0 ? (
                category.projects.map((project) => (
                  <a
                    key={project.fullName}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        background: '#0d1117',
                        border: '1px solid #30363d',
                        borderRadius: '8px',
                        padding: '16px',
                        transition: 'border-color .2s'
                      }}
                    >
                      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: '#58a6ff' }}>
                        {project.name}
                      </h3>
                      <div style={{ color: '#e3b341', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                        ⭐ {project.stars.toLocaleString()}
                      </div>
                      <p style={{ color: '#8b949e', fontSize: '13px', lineHeight: 1.6, marginBottom: '8px' }}>
                        {project.desc}
                      </p>
                      {project.lang && (
                        <span style={{
                          display: 'inline-block',
                          background: '#21262d',
                          border: '1px solid #30363d',
                          borderRadius: '20px',
                          padding: '2px 10px',
                          fontSize: '11px',
                          color: '#8b949e'
                        }}>
                          {project.lang}
                        </span>
                      )}
                    </div>
                  </a>
                ))
              ) : (
                <p style={{ color: '#8b949e', fontSize: '13px', fontStyle: 'italic' }}>
                  暂无相关项目
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
