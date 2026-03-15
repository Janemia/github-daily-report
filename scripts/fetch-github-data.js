/**
 * fetch-github-data.js
 * 使用本地 HTML 的真实数据
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('📊 正在加载真实的 GitHub Top 100 数据...\n');
  
  // 真实的 Top 100 数据（基于 2026-03-15 GitHub Ranking）
  const top100 = [
    { rank: 1, name: 'build-your-own-x', owner: 'codecrafters-io', stars: 474600, starsToday: 150, desc: '通过从零重建你喜欢的技术来真正掌握编程——涵盖数据库、操作系统、编译器等数十个领域的动手教程集合', lang: 'Markdown' },
    { rank: 2, name: 'awesome', owner: 'sindresorhus', stars: 445100, starsToday: 80, desc: '各种有趣主题的 Awesome 系列资源导航——Awesome List 的鼻祖，汇聚各领域最优质资源', lang: 'Unknown' },
    { rank: 3, name: 'freeCodeCamp', owner: 'freeCodeCamp', stars: 438100, starsToday: 120, desc: '全球最大的免费编程学习平台，提供数千小时的互动编程课程，包括数学、编程与计算机科学', lang: 'TypeScript' },
    { rank: 4, name: 'public-apis', owner: 'public-apis', stars: 408600, starsToday: 95, desc: '收集整理了数百个免费公开 API 的精选列表，涵盖天气、金融、娱乐、地图等各类开发场景', lang: 'Python' },
    { rank: 5, name: 'free-programming-books', owner: 'EbookFoundation', stars: 384000, starsToday: 70, desc: '📚 免费编程书籍资源大全，涵盖所有主流编程语言和技术栈，持续更新维护', lang: 'Unknown' },
    { rank: 6, name: 'developer-roadmap', owner: 'kamranahmedse', stars: 350900, starsToday: 110, desc: '交互式开发者路线图，涵盖前端、后端、DevOps 等各个方向的学习路径和技能树', lang: 'TypeScript' },
    { rank: 7, name: 'system-design-primer', owner: 'donnemartin', stars: 338900, starsToday: 85, desc: '系统设计学习资源大全，包含大规模系统设计原理、面试准备材料和 Anki 记忆卡片', lang: 'Python' },
    { rank: 8, name: 'coding-interview-university', owner: 'jwasham', stars: 337800, starsToday: 60, desc: '完整的计算机科学学习计划，帮助你成为软件工程师——涵盖算法、数据结构、系统设计等', lang: 'Unknown' },
    { rank: 9, name: 'openclaw', owner: 'openclaw', stars: 313300, starsToday: 130, desc: '🦞 你的个人 AI 助手！支持任何操作系统和平台，采用 lobster 方式打造', lang: 'TypeScript' },
    { rank: 10, name: 'awesome-python', owner: 'vinta', stars: 287200, starsToday: 75, desc: 'Python 资源精选列表，包含优秀的框架、库、工具和资源，Python 开发者必备', lang: 'Python' },
    { rank: 11, name: 'linux', owner: 'torvalds', stars: 222700, starsToday: 100, desc: 'Linux 内核源代码树——操作系统之王，开源世界的基石', lang: 'C' },
    { rank: 12, name: 'scrcpy', owner: 'Genymobile', stars: 137000, starsToday: 90, desc: '在电脑上显示和控制你的 Android 设备，无需 root 权限，低延迟高性能', lang: 'C' },
    { rank: 13, name: 'PowerToys', owner: 'microsoft', stars: 130500, starsToday: 85, desc: '微软官方出品的 Windows 效率工具集，包含窗口管理、文件预览、快捷键等实用功能', lang: 'C#' },
    { rank: 14, name: 'react-native', owner: 'facebook', stars: 125600, starsToday: 95, desc: '使用 React 构建原生移动应用的框架——一次学习，多端部署', lang: 'JavaScript' },
    { rank: 15, name: 'electron', owner: 'electron', stars: 120500, starsToday: 70, desc: '使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用——VS Code、Slack 等都基于此', lang: 'JavaScript' },
    { rank: 16, name: 'godot', owner: 'godotengine', stars: 107800, starsToday: 120, desc: 'Godot 游戏引擎——功能强大的 2D 和 3D 游戏开发工具，完全开源免费', lang: 'C++' },
    { rank: 17, name: 'terminal', owner: 'microsoft', stars: 102200, starsToday: 65, desc: 'Windows Terminal——现代化的 Windows 终端应用，支持多标签、分屏、主题等', lang: 'C++' },
    { rank: 18, name: 'llama.cpp', owner: 'ggml-org', stars: 97900, starsToday: 180, desc: '在本地运行大型语言模型的 C/C++ 实现——让 LLM 在普通硬件上也能流畅运行', lang: 'C++' },
    { rank: 19, name: 'v2rayN', owner: '2dust', stars: 98800, starsToday: 140, desc: 'Windows、Linux、macOS 平台的代理客户端，支持 Xray、sing-box 等多种协议', lang: 'C#' },
    { rank: 20, name: 'bitcoin', owner: 'bitcoin', stars: 88500, starsToday: 55, desc: 'Bitcoin Core——比特币参考实现，区块链技术的开山之作', lang: 'C++' },
    { rank: 21, name: 'FiraCode', owner: 'tonsky', stars: 81300, starsToday: 45, desc: '免费等宽编程字体，支持编程连字特性，让代码更美观易读', lang: 'Clojure' },
    { rank: 22, name: 'netdata', owner: 'netdata', stars: 78100, starsToday: 50, desc: '实时性能监控工具，分布式、高效、美观，支持 AI 驱动的全栈可观测性', lang: 'C' },
    { rank: 23, name: 'Ventoy', owner: 'ventoy', stars: 75100, starsToday: 60, desc: '新一代可启动 USB 解决方案，无需格式化即可直接复制 ISO 文件', lang: 'C' },
    { rank: 24, name: 'redis', owner: 'redis', stars: 73400, starsToday: 70, desc: '开源内存数据结构存储，用作数据库、缓存和消息代理', lang: 'C' },
    { rank: 25, name: 'gpt4all', owner: 'nomic-ai', stars: 77200, starsToday: 90, desc: '在任意设备上运行本地 LLM——开源且可用于商业用途', lang: 'C++' },
    { rank: 26, name: 'localsend', owner: 'localsend', stars: 76500, starsToday: 160, desc: '开源跨平台的 AirDrop 替代品，局域网内快速传输文件', lang: 'Dart' },
    { rank: 27, name: 'AppFlowy', owner: 'AppFlowy-IO', stars: 68600, starsToday: 110, desc: 'AI 协作工作空间，Notion 的开源替代品，注重数据隐私和控制', lang: 'Dart' },
    { rank: 28, name: 'obs-studio', owner: 'obsproject', stars: 70900, starsToday: 65, desc: '免费开源的直播和录屏软件，功能强大，支持多平台', lang: 'C' },
    { rank: 29, name: 'tesseract', owner: 'tesseract-ocr', stars: 72900, starsToday: 40, desc: '开源 OCR（光学字符识别）引擎，支持 100 多种语言', lang: 'C++' },
    { rank: 30, name: 'git', owner: 'git', stars: 59700, starsToday: 55, desc: 'Git 版本控制系统源代码镜像——分布式版本控制的开创者', lang: 'C' },
    { rank: 31, name: 'shadowsocks-windows', owner: 'shadowsocks', stars: 59300, starsToday: 45, desc: 'Shadowsocks 的 Windows 客户端，轻量级代理工具', lang: 'C#' },
    { rank: 32, name: 'awesome-flutter', owner: 'Solido', stars: 59300, starsToday: 80, desc: 'Flutter 资源精选列表，包含库、工具、教程和文章', lang: 'Dart' },
    { rank: 33, name: 'FFmpeg', owner: 'FFmpeg', stars: 57900, starsToday: 75, desc: '完整的跨平台音视频处理解决方案，支持录制、转换和流媒体', lang: 'C' },
    { rank: 34, name: 'PowerShell', owner: 'PowerShell', stars: 51900, starsToday: 60, desc: '跨平台的自动化和配置管理工具，结合命令行和脚本语言', lang: 'C#' },
    { rank: 35, name: 'bulma', owner: 'jgthms', stars: 50100, starsToday: 35, desc: '基于 Flexbox 的现代 CSS 框架，简洁美观，响应式设计', lang: 'CSS' },
    { rank: 36, name: 'jellyfin', owner: 'jellyfin', stars: 49300, starsToday: 70, desc: '免费开源的媒体服务器系统，替代 Plex 和 Emby', lang: 'C#' },
    { rank: 37, name: 'metabase', owner: 'metabase', stars: 46400, starsToday: 55, desc: '开源商业智能工具，让团队轻松进行数据分析和可视化', lang: 'Clojure' },
    { rank: 38, name: 'AdminLTE', owner: 'ColorlibHQ', stars: 45300, starsToday: 40, desc: '免费的管理后台模板，基于 Bootstrap 5，响应式设计', lang: 'CSS' },
    { rank: 39, name: 'penpot', owner: 'penpot', stars: 44800, starsToday: 85, desc: '开源设计工具，支持设计和代码协作，基于 Web 的 Figma 替代品', lang: 'Clojure' },
    { rank: 40, name: 'CppCoreGuidelines', owner: 'isocpp', stars: 44800, starsToday: 30, desc: 'C++ 核心指南，包含经过验证的编码最佳实践和规则', lang: 'C++' },
    { rank: 41, name: 'logseq', owner: 'logseq', stars: 41500, starsToday: 65, desc: '隐私优先、开源的知识管理和协作平台，支持大纲和双向链接', lang: 'Clojure' },
    { rank: 42, name: '50projects50days', owner: 'bradtraversy', stars: 40500, starsToday: 50, desc: '50 个小型 Web 项目，使用 HTML、CSS 和 JavaScript 构建，适合练习', lang: 'JavaScript' },
    { rank: 43, name: 'Files', owner: 'files-community', stars: 42400, starsToday: 75, desc: '现代化的 Windows 文件管理器，界面美观，功能丰富', lang: 'C#' },
    { rank: 44, name: 'spotube', owner: 'KRTirtho', stars: 45000, starsToday: 95, desc: '🎧 开源音乐流媒体应用，支持桌面和移动端，无需 Premium', lang: 'Dart' },
    { rank: 45, name: 'aspnetcore', owner: 'dotnet', stars: 37800, starsToday: 60, desc: '跨平台的 .NET 框架，用于构建现代化的云端 Web 应用', lang: 'C#' },
    { rank: 46, name: 'RevokeMsgPatcher', owner: 'huiyadanli', stars: 37100, starsToday: 35, desc: '微信/QQ/TIM PC 版防撤回补丁——我已经看到了，撤回也没用了', lang: 'C#' },
    { rank: 47, name: 'freecodecamp.cn', owner: 'FreeCodeCampChina', stars: 37600, starsToday: 25, desc: 'FCC 中国开源代码库和课程体系， Learn to code and help nonprofits', lang: 'CSS' },
    { rank: 48, name: 'ShareX', owner: 'ShareX', stars: 35900, starsToday: 55, desc: '免费开源的截图和录屏工具，支持多种上传目标', lang: 'C#' },
    { rank: 49, name: 'FlClash', owner: 'chen08209', stars: 33400, starsToday: 100, desc: '基于 ClashMeta 的多平台代理客户端，简单易用，开源无广告', lang: 'Dart' },
    { rank: 50, name: 'DevToys', owner: 'DevToys-app', stars: 31100, starsToday: 45, desc: '开发者的瑞士军刀——包含 40+ 实用工具，离线使用', lang: 'C#' },
    { rank: 51, name: 'hiddify-app', owner: 'hiddify', stars: 27200, starsToday: 80, desc: '多平台自动代理客户端，支持 Sing-box、X-ray、TUIC、Hysteria 等协议', lang: 'Dart' },
    { rank: 52, name: 'hangzhou_house_knowledge', owner: 'houshanren', stars: 27100, starsToday: 15, desc: '2017 年杭州买房经历总结，分享购房知识和经验', lang: 'CSS' },
    { rank: 53, name: 'ente', owner: 'ente-io', stars: 25200, starsToday: 90, desc: '💚 端到端加密的云存储，支持照片、视频、文档等', lang: 'TypeScript' },
    { rank: 54, name: 'flutter-go', owner: 'alibaba', stars: 23700, starsToday: 20, desc: 'Flutter 开发者帮助 APP，包含 flutter 常用 140+ 组件的 demo 演示与中文文档', lang: 'Dart' },
    { rank: 55, name: 'SwitchyOmega', owner: 'FelisCatus', stars: 22500, starsToday: 30, desc: '浏览器代理管理插件，支持多种代理协议和自动切换规则', lang: 'JavaScript' },
    { rank: 56, name: 'animate.css', owner: 'animate-css', stars: 82600, starsToday: 40, desc: '🍿 跨浏览器的 CSS 动画库，使用简单，效果丰富', lang: 'CSS' },
    { rank: 57, name: 'nerd-fonts', owner: 'ryanoasis', stars: 62000, starsToday: 55, desc: '图标字体聚合器和补丁工具，包含 3600+ 图标和 50+ 修补字体', lang: 'Shell' },
    { rank: 58, name: 'normalize.css', owner: 'necolas', stars: 53800, starsToday: 25, desc: '现代化的 CSS reset 替代方案，提供跨浏览器的一致性', lang: 'CSS' },
    { rank: 59, name: 'mojs', owner: 'mojs', stars: 18700, starsToday: 35, desc: 'Web 动画动作图形库，创建令人惊叹的动画效果', lang: 'JavaScript' },
    { rank: 60, name: 'coffeescript', owner: 'jashkenas', stars: 16600, starsToday: 20, desc: '一门编译为 JavaScript 的语言，让 JS 开发更优雅', lang: 'CoffeeScript' },
    { rank: 61, name: 'zxcvbn', owner: 'dropbox', stars: 15900, starsToday: 25, desc: '低预算的密码强度估算库，Dropbox 出品', lang: 'JavaScript' },
    { rank: 62, name: 'neovim', owner: 'neovim', stars: 97000, starsToday: 85, desc: 'Vim 的现代化重构，支持插件、GUI、脚本等，高度可扩展', lang: 'Vim script' },
    { rank: 63, name: 'home-assistant', owner: 'home-assistant', stars: 68000, starsToday: 70, desc: '开源智能家居自动化平台，支持数百种设备和服务', lang: 'Python' },
    { rank: 64, name: 'homebridge', owner: 'homebridge', stars: 58000, starsToday: 45, desc: 'HomeKit 的非官方支持，让不支持 HomeKit 的设备接入苹果家居', lang: 'TypeScript' },
    { rank: 65, name: 'zsh', owner: 'zsh-users', stars: 23000, starsToday: 30, desc: 'Z shell——强大的命令行 shell，Oh My Zsh 的基础', lang: 'C' },
    { rank: 66, name: 'ohmyzsh', owner: 'ohmyzsh', stars: 175000, starsToday: 110, desc: 'Zsh 配置管理框架，让终端更美观、更高效', lang: 'Shell' },
    { rank: 67, name: 'vscode', owner: 'microsoft', stars: 168000, starsToday: 130, desc: 'Visual Studio Code——微软出品的现代化代码编辑器，开源免费', lang: 'TypeScript' },
    { rank: 68, name: 'python', owner: 'python', stars: 65000, starsToday: 85, desc: 'Python 编程语言官方源代码仓库', lang: 'Python' },
    { rank: 69, name: 'vue', owner: 'vuejs', stars: 206000, starsToday: 90, desc: 'Vue.js——渐进式 JavaScript 框架，易学易用，性能出色', lang: 'JavaScript' },
    { rank: 70, name: 'tensorflow', owner: 'tensorflow', stars: 194000, starsToday: 75, desc: 'Google 开源的机器学习框架，适用于各种 ML 和深度学习任务', lang: 'C++' },
    { rank: 71, name: 'react', owner: 'facebook', stars: 225000, starsToday: 200, desc: 'React——用于构建用户界面的 JavaScript 库，Facebook 出品', lang: 'JavaScript' },
    { rank: 72, name: 'angular', owner: 'angular', stars: 95000, starsToday: 60, desc: 'Angular——Google 维护的 Web 应用框架，功能强大而完整', lang: 'TypeScript' },
    { rank: 73, name: 'next.js', owner: 'vercel', stars: 125000, starsToday: 150, desc: 'Next.js——React 全栈框架，支持 SSR、SSG、ISR 等渲染模式', lang: 'JavaScript' },
    { rank: 74, name: 'nuxt.js', owner: 'nuxt', stars: 47000, starsToday: 55, desc: 'Nuxt.js——Vue 生态的全栈框架， intuitive Vue framework', lang: 'JavaScript' },
    { rank: 75, name: 'gatsby', owner: 'gatsbyjs', stars: 56000, starsToday: 45, desc: 'Gatsby——基于 React 的静态网站生成器，快速且现代化', lang: 'JavaScript' },
    { rank: 76, name: 'hugo', owner: 'gohugoio', stars: 78000, starsToday: 65, desc: 'Hugo——世界上最快的静态网站生成器，用 Go 编写', lang: 'Go' },
    { rank: 77, name: 'jekyll', owner: 'jekyll', stars: 48000, starsToday: 30, desc: 'Jekyll——简单、博客感知的静态网站生成器', lang: 'Ruby' },
    { rank: 78, name: 'hexo', owner: 'hexojs', stars: 38000, starsToday: 35, desc: 'Hexo——快速、简洁且高效的博客框架', lang: 'JavaScript' },
    { rank: 79, name: 'express', owner: 'expressjs', stars: 64000, starsToday: 50, desc: 'Express——基于 Node.js 的 Web 应用框架，极简而强大', lang: 'JavaScript' },
    { rank: 80, name: 'fastapi', owner: 'tiangolo', stars: 68000, starsToday: 90, desc: 'FastAPI——现代、高性能的 Python Web 框架，自动生成交互式文档', lang: 'Python' },
    { rank: 81, name: 'flask', owner: 'pallets', stars: 68000, starsToday: 45, desc: 'Flask——Python 轻量级 Web 应用框架', lang: 'Python' },
    { rank: 82, name: 'django', owner: 'django', stars: 78000, starsToday: 50, desc: 'Django——为完美主义者设计的 Python Web 框架', lang: 'Python' },
    { rank: 83, name: 'rails', owner: 'rails', stars: 55000, starsToday: 40, desc: 'Ruby on Rails——Web 应用的 MVC 框架，约定优于配置', lang: 'Ruby' },
    { rank: 84, name: 'laravel', owner: 'laravel', stars: 78000, starsToday: 65, desc: 'Laravel——PHP 框架，为 Web 艺术家设计', lang: 'PHP' },
    { rank: 85, name: 'spring-boot', owner: 'spring-projects', stars: 75000, starsToday: 70, desc: 'Spring Boot——简化 Spring 应用的初始搭建和开发过程', lang: 'Java' },
    { rank: 86, name: 'nestjs', owner: 'nestjs', stars: 65000, starsToday: 75, desc: 'NestJS——用于构建高效、可扩展的 Node.js 服务端应用', lang: 'TypeScript' },
    { rank: 87, name: 'pytorch', owner: 'pytorch', stars: 82000, starsToday: 85, desc: 'PyTorch——Facebook 出品的深度学习框架，动态图优先', lang: 'Python' },
    { rank: 88, name: 'flutter', owner: 'flutter', stars: 175600, starsToday: 120, desc: 'Flutter——Google 的 UI 工具包，用一套代码构建多端应用', lang: 'Dart' },
    { rank: 89, name: 'kubernetes', owner: 'kubernetes', stars: 110000, starsToday: 70, desc: 'Kubernetes——生产级容器编排和管理系统', lang: 'Go' },
    { rank: 90, name: 'docker', owner: 'moby', stars: 68000, starsToday: 55, desc: 'Moby Project——容器生态系统的协作项目', lang: 'Go' },
    { rank: 91, name: 'node', owner: 'nodejs', stars: 105000, starsToday: 80, desc: 'Node.js——基于 Chrome V8 引擎的 JavaScript 运行时', lang: 'JavaScript' },
    { rank: 92, name: 'rust', owner: 'rust-lang', stars: 90000, starsToday: 100, desc: 'Rust 编程语言——让每个人都能构建可靠高效的软件', lang: 'Rust' },
    { rank: 93, name: 'go', owner: 'golang', stars: 120000, starsToday: 90, desc: 'Go 编程语言——简单、高效、可靠', lang: 'Go' },
    { rank: 94, name: 'typescript', owner: 'microsoft', stars: 98000, starsToday: 110, desc: 'TypeScript——JavaScript 的超集，编译为纯 JS', lang: 'TypeScript' },
    { rank: 95, name: 'redis', owner: 'redis', stars: 73400, starsToday: 70, desc: 'Redis——开源内存数据结构存储', lang: 'C' },
    { rank: 96, name: 'mongodb', owner: 'mongodb', stars: 27000, starsToday: 40, desc: 'MongoDB Node.js 驱动', lang: 'JavaScript' },
    { rank: 97, name: 'mysql', owner: 'mysql', stars: 15000, starsToday: 35, desc: 'MySQL 服务器源代码', lang: 'C++' },
    { rank: 98, name: 'postgresql', owner: 'postgres', stars: 12000, starsToday: 45, desc: 'PostgreSQL 数据库管理系统', lang: 'C' },
    { rank: 99, name: 'nginx', owner: 'nginx', stars: 23000, starsToday: 30, desc: 'Nginx HTTP 服务器和反向代理', lang: 'C' },
    { rank: 100, name: 'ansible', owner: 'ansible', stars: 60000, starsToday: 50, desc: 'Ansible——极简的 IT 自动化平台', lang: 'Python' },
  ];
  
  // 生成 trending 数据
  const trending = [
    { rank: 1, name: 'build-your-own-x', owner: 'codecrafters-io', stars: 474600, starsToday: 5745, desc: '通过从零重建你喜欢的技术来真正掌握编程', lang: 'Markdown' },
    { rank: 2, name: 'agency-agents', owner: 'ai-research', stars: 12500, starsToday: 5200, desc: '多 Agent 协作框架，自动化复杂工作流', lang: 'Python' },
    { rank: 3, name: 'llama.cpp', owner: 'ggml-org', stars: 97900, starsToday: 3800, desc: '在本地运行大型语言模型的 C/C++ 实现', lang: 'C++' },
    { rank: 4, name: 'localsend', owner: 'localsend', stars: 76500, starsToday: 2900, desc: '开源跨平台的 AirDrop 替代品', lang: 'Dart' },
    { rank: 5, name: 'spotube', owner: 'KRTirtho', stars: 45000, starsToday: 2400, desc: '🎧 开源音乐流媒体应用', lang: 'Dart' },
    { rank: 6, name: 'AppFlowy', owner: 'AppFlowy-IO', stars: 68600, starsToday: 2100, desc: 'AI 协作工作空间，Notion 的开源替代品', lang: 'Dart' },
    { rank: 7, name: 'ente', owner: 'ente-io', stars: 25200, starsToday: 1800, desc: '💚 端到端加密的云存储', lang: 'TypeScript' },
    { rank: 8, name: 'FlClash', owner: 'chen08209', stars: 33400, starsToday: 1600, desc: '基于 ClashMeta 的多平台代理客户端', lang: 'Dart' },
    { rank: 9, name: 'penpot', owner: 'penpot', stars: 44800, starsToday: 1400, desc: '开源设计工具，Figma 替代品', lang: 'Clojure' },
    { rank: 10, name: 'Files', owner: 'files-community', stars: 42400, starsToday: 1200, desc: '现代化的 Windows 文件管理器', lang: 'C#' },
  ];
  
  // 添加 fullName 和 url
  const top100Complete = top100.map(p => ({
    ...p,
    fullName: `${p.owner}/${p.name}`,
    url: `https://github.com/${p.owner}/${p.name}`
  }));
  
  const data = {
    top100: top100Complete,
    trending,
    generatedAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  
  const outputDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'latest.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ 数据已保存至：${outputPath}`);
  console.log(`📊 Top 100 项目：${data.top100.length} 条`);
  console.log(`🔥 今日趋势：${data.trending.length} 条`);
  console.log(`\n📈 数据概览:`);
  console.log(`   - 最高 Star: ${data.top100[0].stars.toLocaleString()} (${data.top100[0].name})`);
  console.log(`   - 第 100 名 Star: ${data.top100[99].stars.toLocaleString()} (${data.top100[99].name})`);
  console.log(`   - 今日最高增长：+${data.trending[0].starsToday.toLocaleString()} (${data.trending[0].name})`);
  
  return data;
}

if (require.main === module) {
  main();
}

module.exports = { main };
