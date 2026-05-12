const { execSync } = require('child_process');

const steps = [
  'node scripts/arbitrage-calculator.js',
  'node scripts/content-package-generator.js',
  'node scripts/video-script-generator.js',
  'node scripts/image-prompt-generator.js',
  'node scripts/h5-page-generator.js'
];

for (const step of steps) {
  console.log(`\n>>> ${step}`);
  execSync(step, { stdio: 'inherit' });
}

console.log('\nBuild complete. Generated arbitrage analysis, content packages, video packages, image packages and H5 pages.');
