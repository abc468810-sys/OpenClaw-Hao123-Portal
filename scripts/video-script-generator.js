const fs = require('fs');
const path = require('path');

function buildVideoPackage(project) {
  const title = `俄罗斯远东机会：${project.name}`;
  const hook = `很多人只看到跨境卖货，但真正的机会，是把${project.name}做成可招商、可裂变、可AI放大的项目。`;

  return {
    project: project.name,
    title,
    coverTitle: `${project.name}：中俄跨境新机会`,
    shortVideo30s: [
      { time: '0-3s', role: '强钩子', text: hook },
      { time: '3-10s', role: '痛点', text: '传统跨境贸易靠人工找货、人工谈客户、人工写文案，效率太低。' },
      { time: '10-20s', role: '机会', text: `${project.advantage}` },
      { time: '20-27s', role: '模式', text: `${project.model}` },
      { time: '27-30s', role: '行动号召', text: '关注项目数据库，用AI筛选下一批中俄跨境机会。' }
    ],
    longVideo60s: [
      '开场：俄罗斯远东资源和中国市场之间，正在出现一批被低估的跨境项目。',
      `项目：${project.name}，属于${project.category}。`,
      `优势：${project.advantage}`,
      `商业模式：${project.model}`,
      `风险提醒：${project.risk}`,
      `AI放大：${project.scoreHint}`,
      '结尾：用AI做项目筛选、招商H5、视频脚本和自动化招商。'
    ],
    storyboard: [
      {
        shot: 1,
        duration: '3s',
        visual: '远东港口、货轮、仓库、地图线条连接中国与俄罗斯',
        voiceover: hook,
        screenText: title,
        prompt: `cinematic shot of Russian Far East port, cargo ships, trade route lines to China, premium business documentary style`
      },
      {
        shot: 2,
        duration: '7s',
        visual: '商品、仓库、平台页面、价格对比表快速闪过',
        voiceover: '传统跨境靠人找机会，效率低，判断慢。',
        screenText: '人工找货 → 效率低',
        prompt: 'fast montage of ecommerce products, warehouse shelves, price comparison dashboard, modern AI interface'
      },
      {
        shot: 3,
        duration: '10s',
        visual: '项目优势以卡片形式出现，高利润、轻资产、可招商、可AI放大',
        voiceover: project.advantage,
        screenText: '高利润 · 轻资产 · 可招商 · AI放大',
        prompt: 'premium business infographic cards floating in dark tech background, Chinese-Russian trade theme'
      },
      {
        shot: 4,
        duration: '10s',
        visual: 'AI自动生成H5、视频脚本、报价单、俄语文案的流程图',
        voiceover: 'AI可以把项目快速包装成招商页面、短视频和多语言销售材料。',
        screenText: 'AI自动包装项目',
        prompt: 'AI workflow dashboard generating H5 page, video script, quotation sheet and Russian copywriting'
      }
    ],
    prompts: {
      sora: `Create a premium 30-second business documentary video about ${project.name}, Russian Far East resources, China market opportunity, AI automation dashboard, cinematic, high-end commercial style, no exaggerated profit claims.`,
      seedance: `商业招商短视频，主题：${project.name}，俄罗斯远东资源，中国市场，AI自动化，镜头包括港口、仓库、商品、数据看板、招商H5，高级商务风。`,
      capcut: `生成30秒招商视频：标题《${project.name}：中俄跨境新机会》，风格高级、节奏快、字幕清晰、适合微信/小红书/Telegram传播。`
    }
  };
}

function main() {
  const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
  const outputPath = path.join(__dirname, '..', 'data', 'video-packages.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const packages = projects.map(buildVideoPackage);
  fs.writeFileSync(outputPath, JSON.stringify(packages, null, 2), 'utf8');
  console.log(`Generated ${packages.length} video packages at data/video-packages.json`);
}

main();
