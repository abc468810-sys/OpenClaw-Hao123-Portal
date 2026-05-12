const fs = require('fs');
const path = require('path');

function buildContentPackage(project) {
  return {
    project: project.name,
    category: project.category,
    positioning: `${project.name}：面向中俄跨境机会的AI招商项目`,
    h5: {
      title: `${project.name}｜中俄跨境招商机会`,
      sections: [
        `为什么是现在：${project.advantage}`,
        `商业模式：${project.model}`,
        `风险提醒：${project.risk}`,
        `AI放大：${project.scoreHint}`,
        '适合通过H5、短视频、私域和社群进行招商测试。'
      ]
    },
    shortVideo: {
      title: `${project.name}：30秒看懂中俄跨境机会`,
      hook: `这个项目不是简单卖货，而是可以被AI放大的跨境招商机会：${project.name}`,
      outline: [
        '开场钩子：指出机会',
        `项目优势：${project.advantage}`,
        `商业模式：${project.model}`,
        `风险提醒：${project.risk}`,
        '行动号召：查看项目资料或预约沟通'
      ]
    },
    russianVersion: {
      title: `${project.name}: возможность для торговли Россия-Китай`,
      subtitle: 'AI помогает анализировать проекты, создавать материалы и готовить презентации для партнеров.',
      riskNote: 'Информация предназначена для коммерческого анализа. Не является гарантией дохода.'
    },
    platformPosts: {
      xiaohongshu: {
        title: `${project.name}，一个值得测试的中俄跨境项目`,
        tags: ['中俄贸易', '俄罗斯远东', 'AI招商', '跨境项目']
      },
      telegram: {
        title: `${project.name} | Russia-China business opportunity`,
        summary: `${project.advantage} ${project.model}`
      },
      vk: {
        title: `${project.name} - проект для российско-китайского сотрудничества`,
        summary: 'Краткая презентация проекта для партнеров и каналов продаж.'
      }
    }
  };
}

function main() {
  const inputPath = path.join(__dirname, '..', 'data', 'projects.json');
  const outputPath = path.join(__dirname, '..', 'data', 'content-packages.json');
  const projects = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const packages = projects.map(buildContentPackage);
  fs.writeFileSync(outputPath, JSON.stringify(packages, null, 2), 'utf8');
  console.log(`Generated ${packages.length} content packages at data/content-packages.json`);
}

main();
