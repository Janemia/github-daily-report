// GitHub 项目数据类型定义

export interface GitHubProject {
  rank: number;
  name: string;
  owner: string;
  fullName: string;
  stars: number;
  starsToday: number;
  desc: string;
  lang: string;
  url: string;
}

export interface GitHubData {
  top100: GitHubProject[];
  trending: GitHubProject[];
  generatedAt: string;
  date: string;
}

export interface LanguageStat {
  lang: string;
  count: number;
  percentage: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}
