'use client';

import { useState, useEffect } from 'react';
import { GitHubData, GitHubProject, LanguageStat, CategoryStat } from '../lib/types';
import AIProjectsSection from '../components/AIProjectsSection';
import InsightsSection from '../components/InsightsSection';

// 颜色配置 - 与现有报告保持一致
const colors = {
  bg: '#0d1117',
  bg2: '#161b22',
  bg3: '#21262d',
  border: '#30363d',
  text: '#e6edf3',
  text2: '#8b949e',
  accent: '#58a6ff',
  green: '#3fb950',
  orange: '#f0883e',
  purple: '#bc8cff',
  red: '#ff7b72',
  yellow: '#e3b341',
  pink: '#f778ba'
};

export default function Home() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/latest.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.bg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ color: colors.text, fontSize: '18px' }}>加载中...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.bg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ color: colors.red, fontSize: '18px' }}>数据加载失败</div>
      </div>
    );
  }

  const top10 = data.top100.slice(0, 10);
  const todayTrending = data.trending.slice(0, 10);
  
  // 语言统计
  const langCount: Record<string, number> = {};
  data.top100.forEach(proj => {
    const lang = proj.lang || '其他';
    langCount[lang] = (langCount[lang] || 0) + 1;
  });

  // 类别统计
  const categoryCount: Record<string, number> = {
    '学习资源': 0,
    'AI/ML': 0,
    '开发工具': 0,
    '框架': 0,
    '其他': 0
  };

  data.top100.forEach(proj => {
    const desc = (proj.desc + proj.name).toLowerCase();
    if (desc.includes('learn') || desc.includes('教程') || desc.includes('awesome') || desc.includes('book')) {
      categoryCount['学习资源']++;
    } else if (desc.includes('ai') || desc.includes('ml') || desc.includes('model') || desc.includes('llm')) {
      categoryCount['AI/ML']++;
    } else if (desc.includes('tool') || desc.includes('cli') || desc.includes('dev')) {
      categoryCount['开发工具']++;
    } else if (desc.includes('framework') || desc.includes('ui') || desc.includes('react') || desc.includes('vue')) {
      categoryCount['框架']++;
    } else {
      categoryCount['其他']++;
    }
  });

  return (
    <main style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      {/* Hero Section */}
      <HeroSection date={data.date} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* 概览数据 */}
        <StatsOverview 
          top10={top10} 
          top100={data.top100} 
          langCount={langCount}
          categoryCount={categoryCount}
          trending={todayTrending}
        />

        {/* Top 10 */}
        <Top10List top10={top10} />

        {/* 今日趋势 */}
        <TrendingGrid trending={todayTrending} />

        {/* AI 项目全景分析 */}
        <AIProjectsSection projects={data.top100} />

        {/* 深度洞察 */}
        <InsightsSection />

        {/* 类别分布 */}
        <CategoryDistribution categoryCount={categoryCount} total={data.top100.length} />

        {/* 语言分布 */}
        <LanguageDistribution langCount={langCount} />

        {/* 完整表格 */}
        <FullTable projects={data.top100.slice(0, 50)} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ══════════════════ 组件 ══════════════════

function HeroSection({ date }: { date: string }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d2137 100%)',
      borderBottom: `1px solid ${colors.border}`,
      padding: '60px 40px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(88,166,255,.15)',
        color: colors.accent,
        border: `1px solid rgba(88,166,255,.3)`,
        borderRadius: '20px',
        padding: '4px 16px',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '.6px',
        textTransform: 'uppercase',
        marginBottom: '20px'
      }}>
        🔬 深度调研报告
      </div>
      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 48px)',
        fontWeight: 800,
        letterSpacing: '-1px',
        marginBottom: '12px'
      }}>
        GitHub <span style={{ color: colors.accent }}>最火项目</span> 全景分析
      </h1>
      <p style={{
        color: colors.text2,
        maxWidth: '600px',
        margin: '0 auto 28px',
        fontSize: '16px'
      }}>
        基于实时 Star 排名与趋势数据，深度解析开源生态格局与技术趋势走向
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '28px',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: colors.text2, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📅 报告日期：<strong style={{ color: colors.text }}>{date}</strong>
        </span>
        <span style={{ color: colors.text2, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📊 数据来源：<strong style={{ color: colors.text }}>GitHub · evanli.github.io</strong>
        </span>
        <span style={{ color: colors.text2, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔍 覆盖项目：<strong style={{ color: colors.text }}>Top 100 + 今日趋势</strong>
        </span>
      </div>
    </div>
  );
}

function StatsOverview({ top10, top100, langCount, categoryCount, trending }: any) {
  const stats = [
    { num: top10[0]?.stars || 'N/A', label: '⭐ 最高 Star 数', sub: top10[0]?.name || '-' },
    { num: top100.length, label: '📦 分析项目总数' },
    { num: top100[99]?.stars || 'N/A', label: '⭐ 第 100 名 Star 数' },
    { num: Object.keys(langCount).length, label: '🌐 涵盖编程语言数' },
    { num: `${Math.round((categoryCount['AI/ML'] || 0) / top100.length * 100)}%`, label: '🤖 AI/ML 相关项目占比' },
    { num: `+${trending[0]?.starsToday || 0}`, label: '🔥 今日最高 Star 增长', sub: trending[0]?.fullName?.split('/')?.[1] || '-' }
  ];

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Overview</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>核心数据概览</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>GitHub Top 100 最受关注项目的关键指标汇总</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: colors.bg2,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '24px 20px',
            textAlign: 'center',
            transition: 'border-color .2s'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: colors.accent, lineHeight: 1, marginBottom: '6px' }}>{stat.num}</div>
            <div style={{ color: colors.text2, fontSize: '13px' }}>
              {stat.label}
              {stat.sub && <><br /><small style={{ color: colors.accent }}>{stat.sub}</small></>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Top10List({ top10 }: { top10: GitHubProject[] }) {
  const getRankStyle = (i: number) => {
    if (i === 0) return { background: 'linear-gradient(135deg,#f5a623,#f0d060)', color: '#1a1a1a' };
    if (i === 1) return { background: 'linear-gradient(135deg,#9aa7b5,#cdd8e3)', color: '#1a1a1a' };
    if (i === 2) return { background: 'linear-gradient(135deg,#cd7f32,#e8a96a)', color: '#1a1a1a' };
    return { background: colors.bg3, color: colors.text2, fontSize: '14px' };
  };

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Hall of Fame</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>⭐ Star 数 Top 10 项目</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>GitHub 历史积累 Star 数最高的十个开源项目</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {top10.map((proj, i) => (
          <a key={proj.name} href={proj.url} target="_blank" rel="noopener noreferrer" style={{
            background: colors.bg2,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: '48px 1fr auto',
            alignItems: 'center',
            gap: '20px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color .2s, transform .15s'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 900,
              flexShrink: 0,
              ...getRankStyle(i)
            }}>{i + 1}</div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{proj.name}</h3>
              <p style={{ color: colors.text2, fontSize: '13px', lineHeight: 1.4 }}>{proj.desc || '开源项目'}</p>
              <span style={{
                display: 'inline-block',
                background: colors.bg3,
                border: `1px solid ${colors.border}`,
                borderRadius: '20px',
                padding: '2px 10px',
                fontSize: '11px',
                color: colors.text2,
                marginTop: '6px'
              }}>{proj.lang || '无'}</span>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: colors.yellow, display: 'block' }}>{proj.stars}</span>
              <span style={{ color: colors.text2, fontSize: '11px' }}>⭐ Stars</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function TrendingGrid({ trending }: { trending: GitHubProject[] }) {
  return (
    <section style={{ padding: '52px 0 40px', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Today&apos;s Trending</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>🔥 今日趋势榜单</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>GitHub 今日 Star 增长最快的热门项目</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '16px'
      }}>
        {trending.map(proj => (
          <a key={proj.fullName} href={proj.url} target="_blank" rel="noopener noreferrer" style={{
            background: colors.bg2,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '20px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color .2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.accent }}>{proj.fullName}</h3>
              <span style={{
                background: 'rgba(63,185,80,.15)',
                color: colors.green,
                border: `1px solid rgba(63,185,80,.3)`,
                borderRadius: '20px',
                padding: '2px 10px',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}>+{proj.starsToday.toLocaleString()} ⭐ 今日</span>
            </div>
            <p style={{ color: colors.text2, fontSize: '13px', lineHeight: 1.5 }}>{proj.desc || '热门开源项目'}</p>
            <span style={{
              display: 'inline-block',
              background: colors.bg3,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '11px',
              color: colors.text2,
              marginTop: '8px'
            }}>{proj.lang}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CategoryDistribution({ categoryCount, total }: { categoryCount: Record<string, number>, total: number }) {
  const barColors: Record<string, string> = {
    '学习资源': 'linear-gradient(90deg, var(--accent), #79c0ff)',
    'AI/ML': 'linear-gradient(90deg, var(--purple), var(--pink))',
    '开发工具': 'linear-gradient(90deg, var(--green), #7ee787)',
    '框架': 'linear-gradient(90deg, var(--orange), var(--yellow))',
    '其他': 'linear-gradient(90deg, var(--red), var(--orange))'
  };

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Category Analysis</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>📊 项目类别分布</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>Top 100 项目按核心定位分类统计</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {Object.entries(categoryCount).map(([cat, count]) => {
          const pct = Math.round(count / total * 100);
          return (
            <div key={cat} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 60px', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', color: colors.text2 }}>{cat}</span>
              <div style={{ background: colors.bg3, borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  borderRadius: '4px',
                  width: `${pct}%`,
                  background: barColors[cat] || colors.accent
                }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: colors.text2, textAlign: 'right' }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LanguageDistribution({ langCount }: { langCount: Record<string, number> }) {
  const colors_list = ['#3572A5', '#2b7489', '#f1e05a', '#00ADD8', '#555555', '#dea584', '#b07219', '#00B4AB', '#563d7c', '#e34c26'];

  return (
    <section style={{ padding: '52px 0 40px', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Language Stats</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>💻 编程语言分布</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>Top 100 项目使用的主要编程语言统计</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        {Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([lang, count], i) => (
            <div key={lang} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: colors.bg2,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors_list[i % colors_list.length], flexShrink: 0 }} />
              <span style={{ fontWeight: 600 }}>{lang}</span>
              <span style={{ color: colors.text2, fontSize: '12px' }}>{count} 项目</span>
            </div>
          ))}
      </div>
    </section>
  );
}

function FullTable({ projects }: { projects: GitHubProject[] }) {
  return (
    <section style={{ padding: '52px 0 40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.accent, marginBottom: '8px' }}>Full Ranking</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>📋 Top 50 完整排名</h2>
        <p style={{ color: colors.text2, fontSize: '14px' }}>按总 Star 数排列的 GitHub 历史最受欢迎项目前 50 名</p>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ background: colors.bg2, padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: colors.text2, borderBottom: `1px solid ${colors.border}`, whiteSpace: 'nowrap' }}>#</th>
              <th style={{ background: colors.bg2, padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: colors.text2, borderBottom: `1px solid ${colors.border}`, whiteSpace: 'nowrap' }}>项目</th>
              <th style={{ background: colors.bg2, padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: colors.text2, borderBottom: `1px solid ${colors.border}`, whiteSpace: 'nowrap' }}>⭐ Stars</th>
              <th style={{ background: colors.bg2, padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: colors.text2, borderBottom: `1px solid ${colors.border}`, whiteSpace: 'nowrap' }}>语言</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(proj => (
              <tr key={proj.name} style={{ borderBottom: `1px solid ${colors.border}`, transition: 'background .15s' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: colors.text2, fontWeight: 600, width: '48px' }}>{proj.rank}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, fontWeight: 600, textDecoration: 'none' }}>{proj.name}</a>
                  <div style={{ color: colors.text2, fontSize: '12px', marginTop: '2px', maxWidth: '380px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.desc || ''}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: colors.yellow, fontWeight: 700, whiteSpace: 'nowrap' }}>⭐ {proj.stars}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}>{proj.lang || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: colors.bg2,
      borderTop: `1px solid ${colors.border}`,
      padding: '32px 40px',
      textAlign: 'center',
      color: colors.text2,
      fontSize: '13px'
    }}>
      <p>数据来源：<a href="https://evanli.github.io/Github-Ranking/" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'none' }}>Github-Ranking</a> · <a href="https://github.com/trending" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'none' }}>GitHub Trending</a></p>
      <p style={{ marginTop: '8px' }}>报告生成时间：{new Date().toLocaleString('zh-CN')}</p>
    </footer>
  );
}
