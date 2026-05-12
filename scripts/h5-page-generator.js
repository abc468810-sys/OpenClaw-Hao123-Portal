const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildH5(project) {
  const name = escapeHtml(project.name);
  const category = escapeHtml(project.category);
  const model = escapeHtml(project.model);
  const advantage = escapeHtml(project.advantage);
  const risk = escapeHtml(project.risk);
  const scoreHint = escapeHtml(project.scoreHint);

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${name}｜中俄跨境招商 H5</title>
  <link rel="stylesheet" href="../assets/style.css" />
</head>
<body>
  <main class="h5-page">
    <section class="hero">
      <div class="badge">China · Russia · AI招商</div>
      <h1>${name}</h1>
      <p>${category}｜中俄跨境项目机会</p>
    </section>

    <section class="panel dark">
      <h2>为什么是这个项目？</h2>
      <p>${advantage}</p>
    </section>

    <section class="panel">
      <h2>商业模式</h2>
      <p>${model}</p>
      <div class="criteria-grid">
        <div>项目发现</div>
        <div>AI分析</div>
        <div>内容包装</div>
        <div>招商测试</div>
      </div>
    </section>

    <section class="panel dark">
      <h2>AI 放大能力</h2>
      <p>${scoreHint}</p>
      <ul>
        <li>自动生成招商 H5</li>
        <li>自动生成短视频脚本</li>
        <li>自动生成中俄双语文案</li>
        <li>自动生成报价与项目资料</li>
      </ul>
    </section>

    <section class="panel">
      <h2>风险提醒</h2>
      <p>${risk}</p>
      <p>本页面仅用于商业研究与招商材料准备，不构成收益承诺。</p>
      <p><a href="index.html">返回 H5 页面库</a></p>
    </section>
  </main>
</body>
</html>`;
}

function buildIndex(pages) {
  const links = pages.map(page => `
    <article class="card">
      <h3>${escapeHtml(page.name)}</h3>
      <p>${escapeHtml(page.category)}</p>
      <p><a href="${page.file}">打开招商 H5</a></p>
    </article>
  `).join('');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>招商 H5 页面库</title>
  <link rel="stylesheet" href="../assets/style.css" />
</head>
<body>
  <header class="hero">
    <div class="badge">Generated H5 Library</div>
    <h1>招商 H5 页面库</h1>
    <p>由项目数据库自动生成，可用于微信、私域、Telegram、项目展示。</p>
    <div class="hero-actions"><a href="../index.html">返回 AI OS 首页</a></div>
  </header>
  <main class="panel">
    <div class="card-grid">${links}</div>
  </main>
</body>
</html>`;
}

function main() {
  const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
  const outputDir = path.join(__dirname, '..', 'generated-h5');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const pages = projects.map(project => {
    const slug = slugify(project.name);
    const file = `${slug}.html`;
    const filePath = path.join(outputDir, file);
    fs.writeFileSync(filePath, buildH5(project), 'utf8');
    return { name: project.name, category: project.category, file };
  });

  fs.writeFileSync(path.join(outputDir, 'index.html'), buildIndex(pages), 'utf8');

  console.log(`Generated ${projects.length} H5 pages and index in generated-h5/`);
}

main();
