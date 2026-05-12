const fs = require('fs');
const path = require('path');

function buildImagePackage(project) {
  const baseStyle = 'premium business poster, dark technology style, Russian Far East trade, China market opportunity, cinematic lighting, clean typography, no exaggerated profit claims';

  return {
    project: project.name,
    cover: {
      size: '1080x1440',
      use: '小红书封面 / 微信封面',
      title: `${project.name}：中俄跨境新机会`,
      prompt: `${baseStyle}, cover poster for ${project.name}, high-end business opportunity, strong title area, mobile social media cover`
    },
    longPoster: {
      size: '1080x3000',
      use: '微信长图 / 招商长图',
      title: `${project.name}｜AI招商项目说明`,
      prompt: `${baseStyle}, long vertical H5 poster, sections for opportunity, business model, AI automation, risk note, call to action, Chinese business layout`
    },
    telegramBanner: {
      size: '1280x720',
      use: 'Telegram / YouTube 横版封面',
      title: `${project.name} | Russia-China Opportunity`,
      prompt: `${baseStyle}, horizontal banner, Russia China trade route, AI dashboard, professional investor presentation style`
    },
    productCard: {
      size: '1080x1080',
      use: '项目卡片 / 朋友圈图',
      title: `${project.name}`,
      prompt: `${baseStyle}, square product opportunity card, minimal layout, project name, category, key advantage`
    }
  };
}

function main() {
  const inputPath = path.join(__dirname, '..', 'data', 'projects.json');
  const outputPath = path.join(__dirname, '..', 'data', 'image-packages.json');
  const projects = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const packages = projects.map(buildImagePackage);
  fs.writeFileSync(outputPath, JSON.stringify(packages, null, 2), 'utf8');
  console.log(`Generated ${packages.length} image packages at data/image-packages.json`);
}

main();
