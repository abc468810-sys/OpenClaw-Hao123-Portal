async function loadProjects() {
  const response = await fetch('./data/projects.json');
  return response.json();
}

async function loadCases() {
  const response = await fetch('./data/sample-arbitrage-cases.json');
  return response.json();
}

function createProjectCard(project) {
  return `
    <article class="card">
      <h3>${project.name}</h3>
      <p><strong>类型：</strong>${project.category}</p>
      <p><strong>模式：</strong>${project.model}</p>
      <p><strong>优势：</strong>${project.advantage}</p>
      <p><strong>风险：</strong>${project.risk}</p>
      <p><strong>AI/招商：</strong>${project.scoreHint}</p>
    </article>
  `;
}

function createCaseCard(item) {
  return `
    <article class="card">
      <h3>${item.product}</h3>
      <p><strong>平台：</strong>${item.platform}</p>
      <p><strong>中国价格：</strong>${item.chinaPriceCNY} CNY</p>
      <p><strong>俄罗斯价格：</strong>${item.russiaPriceRUB} RUB</p>
      <p><strong>模式：</strong>${item.model}</p>
      <p><strong>分析：</strong>${item.analysis}</p>
    </article>
  `;
}

async function init() {
  const projects = await loadProjects();
  const cases = await loadCases();

  document.querySelector('#project-list').innerHTML = projects.map(createProjectCard).join('');
  document.querySelector('#case-list').innerHTML = cases.map(createCaseCard).join('');
}

init();
