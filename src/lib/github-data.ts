/**
 * GitHub 数据抓取逻辑
 * 复用现有 fetch-github-data.js 的核心逻辑
 */

import { GitHubData, GitHubProject } from './types';

const DATA_SOURCE_URL = 'https://evanli.github.io/Github-Ranking/';
const TRENDING_URL = 'https://github.com/trending';

/**
 * 从 GitHub Ranking 抓取 Top 100 项目
 */
async function fetchTop100(): Promise<GitHubProject[]> {
  try {
    const response = await fetch(DATA_SOURCE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${DATA_SOURCE_URL}`);
    }
    
    const html = await response.text();
    return parseTop100(html);
  } catch (error) {
    console.error('Error fetching top 100:', error);
    // 返回模拟数据用于开发测试
    return getMockTop100();
  }
}

/**
 * 解析 HTML 提取 Top 100 项目
 */
function parseTop100(html: string): GitHubProject[] {
  const projects: GitHubProject[] = [];
  
  // 简化解析逻辑 - 实际项目中需要更健壮的解析
  const regex = /<tr[^>]*>[\s\S]*?<td[^>]*>(\d+)<\/td>[\s\S]*?<a[^>]*href="\/([^/]+)\/([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<span[^>]*class="[^"]*stars[^"]*"[^>]*>([\d,]+)<\/span>/g;
  
  let match;
  let rank = 1;
  
  while ((match = regex.exec(html)) !== null && rank <= 100) {
    const [, , owner, name, , starsStr] = match;
    const stars = parseInt(starsStr.replace(/,/g, ''), 10);
    
    projects.push({
      rank: rank++,
      name,
      owner,
      fullName: `${owner}/${name}`,
      stars,
      starsToday: 0, // 需要从 trending 页面获取
      desc: '',
      lang: '',
      url: `https://github.com/${owner}/${name}`
    });
  }
  
  return projects;
}

/**
 * 获取今日趋势项目
 */
async function fetchTrending(): Promise<GitHubProject[]> {
  try {
    const response = await fetch(TRENDING_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${TRENDING_URL}`);
    }
    
    const html = await response.text();
    return parseTrending(html);
  } catch (error) {
    console.error('Error fetching trending:', error);
    return getMockTrending();
  }
}

/**
 * 解析 trending 页面
 */
function parseTrending(html: string): GitHubProject[] {
  const projects: GitHubProject[] = [];
  
  // 简化解析逻辑
  const regex = /<article[^>]*>[\s\S]*?<a[^>]*href="\/([^/]+)\/([^"]+)"[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<span[^>]*>([\d,]+)<\/span>/g;
  
  let match;
  let rank = 1;
  
  while ((match = regex.exec(html)) !== null && rank <= 30) {
    const [, owner, name, desc, starsStr] = match;
    const starsToday = parseInt(starsStr.replace(/,/g, ''), 10);
    
    projects.push({
      rank: rank++,
      name,
      owner,
      fullName: `${owner}/${name}`,
      stars: 0,
      starsToday,
      desc: desc.trim().replace(/\n/g, ' ').substring(0, 150),
      lang: '',
      url: `https://github.com/${owner}/${name}`
    });
  }
  
  return projects;
}

/**
 * 获取完整的 GitHub 数据
 */
export async function fetchGitHubData(): Promise<GitHubData> {
  const [top100, trending] = await Promise.all([
    fetchTop100(),
    fetchTrending()
  ]);
  
  const now = new Date();
  
  return {
    top100,
    trending,
    generatedAt: now.toISOString(),
    date: now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
}

/**
 * 模拟数据（用于开发测试或 API 失败时）
 */
function getMockTop100(): GitHubProject[] {
  return [
    {
      rank: 1,
      name: 'freeCodeCamp',
      owner: 'freeCodeCamp',
      fullName: 'freeCodeCamp/freeCodeCamp',
      stars: 425000,
      starsToday: 150,
      desc: 'freeCodeCamp.org\'s open-source codebase and curriculum. Learn to code for free.',
      lang: 'TypeScript',
      url: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      rank: 2,
      name: '996.ICU',
      owner: '996icu',
      fullName: '996icu/996.ICU',
      stars: 280000,
      starsToday: 50,
      desc: 'Repo for counting work and days. 996 工作制',
      lang: 'JavaScript',
      url: 'https://github.com/996icu/996.ICU'
    },
    {
      rank: 3,
      name: 'build-your-own-x',
      owner: 'codecrafters-io',
      fullName: 'codecrafters-io/build-your-own-x',
      stars: 270000,
      starsToday: 200,
      desc: 'Master programming by recreating your favorite technologies from scratch.',
      lang: 'Markdown',
      url: 'https://github.com/codecrafters-io/build-your-own-x'
    }
  ];
}

function getMockTrending(): GitHubProject[] {
  return [
    {
      rank: 1,
      name: 'awesome-ai-agents',
      owner: 'open-source',
      fullName: 'open-source/awesome-ai-agents',
      stars: 0,
      starsToday: 1500,
      desc: 'A curated list of awesome AI agent frameworks and projects',
      lang: 'Python',
      url: 'https://github.com/open-source/awesome-ai-agents'
    },
    {
      rank: 2,
      name: 'nextjs-dashboard',
      owner: 'vercel',
      fullName: 'vercel/nextjs-dashboard',
      stars: 0,
      starsToday: 1200,
      desc: 'Learn Next.js by building a dashboard',
      lang: 'TypeScript',
      url: 'https://github.com/vercel/nextjs-dashboard'
    }
  ];
}
