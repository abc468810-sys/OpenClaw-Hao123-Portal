const RUB_CNY = 0.078;

async function loadProjects() {
  const response = await fetch('./data/projects.json');
  return response.json();
}

async function loadCases() {
  const response = await fetch('./data/sample-arbitrage-cases.json');
  return response.json();
}

function decisionByScore(score) {
  if (score >= 80) return 'STRONG GO';
  if (score >= 65) return 'GO';
  if (score >= 50) return 'WATCH';
  return 'NO GO';
}

function estimateProjectScore(project) {
  const text = `${project.name} ${project.category} ${project.model} ${project.advantage} ${project.risk} ${project.scoreHint}`;

  let profit = 60;
  let regulation = 60;
  let assetLight = 60;
  let distribution = 60;
  let aiScale = 60;
  let viral = 55;

  if (text.includes('高利润') || text.includes('高溢价') || text.includes('高客单价')) profit += 20;
  if (text.includes('轻资产') || text.includes('预售') || text.includes('代理')) assetLight += 20;
  if (text.includes('招商') || text.includes('省代') || text.includes('区域代理')) distribution += 20;
  if (text.includes('AI') || text.includes('内容') || text.includes('H5')) aiScale += 20;
  if (text.includes('私域') || text.includes('短视频') || text.includes('直播')) viral += 20;

  if (text.includes('EAC') || text.includes('食品') || text.includes('清关') || text.includes('检疫')) regulation -= 20;
  if (text.includes('政策') || text.includes('售后') || text.includes('监管')) regulation -= 15;

  profit = Math.min(100, Math.max(0, profit));
  regulation = Math.min(100, Math.max(0, regulation));
  assetLight = Math.min(100, Math.max(0, assetLight));
  distribution = Math.min(100, Math.max(0, distribution));
  aiScale = Math.min(100, Math.max(0, aiScale));
  viral = Math.min(100, Math.max(0, viral));

  const total = Math.round(
    profit * 0.3 +
    regulation * 0.2 +
    assetLight * 0.15 +
    distribution * 0.15 +
    aiScale * 0.1 +
    viral * 0.1
  );

  return { profit, regulation, assetLight, distribution, aiScale, viral, total, decision: decisionByScore(total) };
}

function calculateCaseScore(item) {
  const chinaCost = Number(item.chinaPriceCNY || 0);
  const russiaSaleCny = Number(item.russiaPriceRUB || 0) * RUB_CNY;
  const logistics = Number(item.estimatedLogisticsCNY || 0);
  const eac = Number(item.estimatedEACCostCNY || 0);
  const totalCost = chinaCost + logistics + eac;
  const grossProfit = russiaSaleCny - totalCost;
  const margin = russiaSaleCny > 0 ? grossProfit / russiaSaleCny : 0;

  let profitScore = 0;
  if (margin >= 0.5) profitScore = 100;
  else if (margin >= 0.35) profitScore = 85;
  else if (margin >= 0.25) profitScore = 70;
  else if (margin >= 0.15) profitScore = 55;
  else if (margin > 0) profitScore = 35;

  const text = `${item.product} ${item.model} ${item.analysis}`;
  let regulation = 70;
  let assetLight = text.includes('预售') || text.includes('轻资产') ? 85 : 65;
  let distribution = text.includes('招商') || text.includes('代理') ? 90 : 60;
  let aiScale = text.includes('AI') || text.includes('内容') ? 85 : 60;
  let viral = text.includes('直播') || text.includes('私域') ? 80 : 55;

  if (text.includes('EAC') || text.includes('售后') || text.includes('清关')) regulation -= 20;

  const total = Math.round(
    profitScore * 0.3 +
    regulation * 0.2 +
    assetLight * 0.15 +
    distribution * 0.15 +
    aiScale * 0.1 +
    viral * 0.1
  );

  return {
    chinaCost,
    russiaSaleCny,
    totalCost,
    grossProfit,
    marginPercent: margin * 100,
    score: total,
    decision: decisionByScore(total),
  };
}

function createProjectCard(project, index) {
  const score = estimateProjectScore(project);
  return `
    <article class="card">
      <div class="badge">#${index + 1} · ${score.decision}</div>
      <h3>${project.name}</h3>
      <p><strong>综合分：</strong>${score.total}/100</p>
      <p><strong>类型：</strong>${project.category}</p>
      <p><strong>模式：</strong>${project.model}</p>
      <p><strong>优势：</strong>${project.advantage}</p>
      <p><strong>风险：</strong>${project.risk}</p>
      <p><strong>AI/招商：</strong>${project.scoreHint}</p>
    </article>
  `;
}

function createCaseCard(item, index) {
  const result = calculateCaseScore(item);
  return `
    <article class="card">
      <div class="badge">#${index + 1} · ${result.decision}</div>
      <h3>${item.product}</h3>
      <p><strong>综合分：</strong>${result.score}/100</p>
      <p><strong>平台：</strong>${item.platform}</p>
      <p><strong>中国总成本：</strong>${result.totalCost.toFixed(2)} CNY</p>
      <p><strong>俄罗斯折合售价：</strong>${result.russiaSaleCny.toFixed(2)} CNY</p>
      <p><strong>单件毛利：</strong>${result.grossProfit.toFixed(2)} CNY</p>
      <p><strong>毛利率：</strong>${result.marginPercent.toFixed(2)}%</p>
      <p><strong>模式：</strong>${item.model}</p>
      <p><strong>分析：</strong>${item.analysis}</p>
    </article>
  `;
}

async function init() {
  const projects = await loadProjects();
  const cases = await loadCases();

  const rankedProjects = projects
    .map(project => ({ project, score: estimateProjectScore(project).total }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.project);

  const rankedCases = cases
    .map(item => ({ item, score: calculateCaseScore(item).score }))
    .sort((a, b) => b.score - a.score)
    .map(row => row.item);

  document.querySelector('#project-list').innerHTML = rankedProjects.map(createProjectCard).join('');
  document.querySelector('#case-list').innerHTML = rankedCases.map(createCaseCard).join('');
}

init();
