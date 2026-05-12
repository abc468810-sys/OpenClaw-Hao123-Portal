const fs = require('fs');
const path = require('path');

const RUB_CNY = 0.078;

function toCnyFromRub(rub) {
  return Number(rub || 0) * RUB_CNY;
}

function calculateCase(item) {
  const chinaCost = Number(item.chinaPriceCNY || 0);
  const russiaSaleCny = toCnyFromRub(item.russiaPriceRUB);
  const logistics = Number(item.estimatedLogisticsCNY || 0);
  const eac = Number(item.estimatedEACCostCNY || 0);
  const totalCost = chinaCost + logistics + eac;
  const grossProfit = russiaSaleCny - totalCost;
  const margin = russiaSaleCny > 0 ? grossProfit / russiaSaleCny : 0;

  let decision = 'NO GO';
  if (margin >= 0.45) decision = 'STRONG GO';
  else if (margin >= 0.3) decision = 'GO';
  else if (margin >= 0.18) decision = 'WATCH';

  return {
    product: item.product,
    platform: item.platform,
    model: item.model,
    chinaCostCNY: Number(totalCost.toFixed(2)),
    russiaSaleCNY: Number(russiaSaleCny.toFixed(2)),
    grossProfitCNY: Number(grossProfit.toFixed(2)),
    marginPercent: Number((margin * 100).toFixed(2)),
    decision,
    analysis: item.analysis,
  };
}

function main() {
  const dataPath = path.join(__dirname, '..', 'data', 'sample-arbitrage-cases.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const items = JSON.parse(raw);
  const results = items.map(calculateCase).sort((a, b) => b.marginPercent - a.marginPercent);

  console.table(results);
}

main();
