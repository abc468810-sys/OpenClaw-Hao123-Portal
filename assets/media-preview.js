async function loadJson(path) {
  const response = await fetch(path);
  return response.json();
}

function renderImagePackage(pkg) {
  return `
    <article class="card">
      <div class="badge">${pkg.project}</div>
      <h3>图片素材包</h3>
      <div class="demo-media-grid">
        <div class="demo-image-card">
          <div class="demo-placeholder">${pkg.cover.size}<br/>${pkg.cover.use}</div>
          <h4>${pkg.cover.title}</h4>
          <p>${pkg.cover.prompt}</p>
        </div>
        <div class="demo-image-card">
          <div class="demo-placeholder">${pkg.longPoster.size}<br/>${pkg.longPoster.use}</div>
          <h4>${pkg.longPoster.title}</h4>
          <p>${pkg.longPoster.prompt}</p>
        </div>
        <div class="demo-image-card">
          <div class="demo-placeholder wide">${pkg.telegramBanner.size}<br/>${pkg.telegramBanner.use}</div>
          <h4>${pkg.telegramBanner.title}</h4>
          <p>${pkg.telegramBanner.prompt}</p>
        </div>
      </div>
    </article>
  `;
}

function renderVideoPackage(pkg) {
  const shortScript = pkg.shortVideo30s.map(item => `<li><strong>${item.time} ${item.role}：</strong>${item.text}</li>`).join('');
  return `
    <article class="card">
      <div class="badge">${pkg.project}</div>
      <h3>${pkg.title}</h3>
      <div class="video-placeholder">
        <div class="play-button">▶</div>
        <p>${pkg.coverTitle}</p>
      </div>
      <h4>30 秒脚本</h4>
      <ul>${shortScript}</ul>
      <h4>Sora Prompt</h4>
      <p>${pkg.prompts.sora}</p>
      <h4>Seedance Prompt</h4>
      <p>${pkg.prompts.seedance}</p>
    </article>
  `;
}

async function init() {
  const imagePackages = await loadJson('./data/image-packages.json').catch(() => []);
  const videoPackages = await loadJson('./data/video-packages.json').catch(() => []);

  const imageRoot = document.getElementById('image-preview-list');
  const videoRoot = document.getElementById('video-preview-list');

  imageRoot.innerHTML = imagePackages.slice(0, 3).map(renderImagePackage).join('') || '<p>请先运行 npm run build 生成 image-packages.json。</p>';
  videoRoot.innerHTML = videoPackages.slice(0, 3).map(renderVideoPackage).join('') || '<p>请先运行 npm run build 生成 video-packages.json。</p>';
}

init();
