async function loadLeads() {
  const response = await fetch('./data/sample-leads.json');
  const leads = await response.json();

  renderSummary(leads);
  renderLeads(leads);
}

function renderSummary(leads) {
  const summary = document.getElementById('lead-summary');

  const total = leads.length;
  const high = leads.filter(l => l.interestLevel === 'high').length;
  const contacted = leads.filter(l => l.status === 'contacted').length;
  const proposal = leads.filter(l => l.status === 'proposal_sent').length;

  summary.innerHTML = `
    <div>总线索<br><strong>${total}</strong></div>
    <div>高意向<br><strong>${high}</strong></div>
    <div>已联系<br><strong>${contacted}</strong></div>
    <div>已发方案<br><strong>${proposal}</strong></div>
  `;
}

function renderLeads(leads) {
  const list = document.getElementById('lead-list');

  list.innerHTML = leads.map(lead => `
    <article class="card">
      <h3>${lead.projectName}</h3>
      <p><strong>来源：</strong>${lead.sourcePlatform}</p>
      <p><strong>客户：</strong>${lead.customerType}</p>
      <p><strong>地区：</strong>${lead.country} / ${lead.city}</p>
      <p><strong>预算：</strong>${lead.budgetRange}</p>
      <p><strong>状态：</strong>${lead.status}</p>
      <p><strong>备注：</strong>${lead.notes}</p>
    </article>
  `).join('');
}

loadLeads();
