const form = document.querySelector('#project-form');
const resultBox = document.querySelector('#result');

function clampScore(value) {
  return Math.max(0, Math.min(10, Number(value) || 0));
}

function calculateProjectScore(data) {
  const grossProfit = data.salePrice - data.purchasePrice - data.shippingCost - data.certCost - data.platformCost;
  const margin = data.salePrice > 0 ? grossProfit / data.salePrice : 0;

  let profitScore = 0;
  if (margin >= 0.5) profitScore = 10;
  else if (margin >= 0.35) profitScore = 8;
  else if (margin >= 0.25) profitScore = 6;
  else if (margin >= 0.15) profitScore = 4;
  else if (margin > 0) profitScore = 2;

  const totalScore = (
    profitScore * 0.3 +
    data.lowRegulation * 0.2 +
    data.lightAsset * 0.15 +
    data招商 * 0.15 +
    data.viral * 0.1 +
    data.aiScale * 0.1
  );

  let decision = 'NO GO';
  if (totalScore >= 8 && margin >= 0.3) decision = 'STRONG GO';
  else if (totalScore >= 6.5 && margin >= 0.2) decision = 'GO';
  else if (totalScore >= 5) decision = 'WATCH';

  return {
    grossProfit,
    margin,
    profitScore,
    totalScore,
    decision,
  };
}

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      purchasePrice: Number(formData.get('purchasePrice')) || 0,
      salePrice: Number(formData.get('salePrice')) || 0,
      shippingCost: Number(formData.get('shippingCost')) || 0,
      certCost: Number(formData.get('certCost')) || 0,
      platformCost: Number(formData.get('platformCost')) || 0,
      lowRegulation: clampScore(formData.get('lowRegulation')),
      lightAsset: clampScore(formData.get('lightAsset')),
      招商: clampScore(formData.get('招商')),
      viral: clampScore(formData.get('viral')),
      aiScale: clampScore(formData.get('aiScale')),
    };

    const result = calculateProjectScore(data);

    resultBox.innerHTML = `
      <h3>${data.name || '未命名项目'}：${result.decision}</h3>
      <p>单件毛利：${result.grossProfit.toFixed(2)}</p>
      <p>销售利润率：${(result.margin * 100).toFixed(2)}%</p>
      <p>利润评分：${result.profitScore}/10</p>
      <p>综合评分：${result.totalScore.toFixed(2)}/10</p>
      <p class="decision">判断：${result.decision}</p>
    `;
  });
}
