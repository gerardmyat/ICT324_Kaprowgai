/**
 * Anime Data Mining Research Webpage
 * ICT324: Data Warehousing & Data Mining
 * Japanese Flat Theme & Interactive Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initSakuraEffect();
  initPredictor();
  initRulesFilter();
  initNavScroll();
});

/* ==========================================================================
   1. Sakura Floating Petals Canvas (Japanese Woodblock Flat Style)
   ========================================================================== */
function initSakuraEffect() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isRunning = true;
  let petals = [];

  const toggleBtn = document.getElementById('toggle-sakura-btn');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.1 + 0.5;
      this.speedX = Math.random() * 0.7 - 0.35;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1.2 - 0.6;
      this.opacity = Math.random() * 0.35 + 0.25;
      this.sway = Math.random() * 0.04 + 0.02;
      this.swayCount = Math.random() * Math.PI * 2;
      // Traditional Japanese flat sakura tone (桜色)
      this.color = Math.random() > 0.4 ? 'rgba(215, 120, 140, ' : 'rgba(230, 145, 160, ';
    }

    update() {
      this.swayCount += this.sway;
      this.x += Math.sin(this.swayCount) * 0.8 + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height + 20 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fillStyle = `${this.color}${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  // Subtle count for clean editorial feel
  const petalCount = Math.min(Math.floor(window.innerWidth / 40), 28);
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      if (isRunning) {
        toggleBtn.innerHTML = '🌸 <span>Petals: ON</span>';
        toggleBtn.classList.remove('paused');
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        toggleBtn.innerHTML = '🌸 <span>Petals: OFF</span>';
        toggleBtn.classList.add('paused');
      }
    });
  }
}

/* ==========================================================================
   2. Interactive "Will It Get a Season 2?" Machine Learning Simulator
   ========================================================================== */
function initPredictor() {
  const form = document.getElementById('predictor-form');
  if (!form) return;

  // Inputs
  const scoreInput = document.getElementById('input-score');
  const scoreValDisplay = document.getElementById('val-score');
  const sourceInput = document.getElementById('input-source');
  const studioInput = document.getElementById('input-studio');
  const membersInput = document.getElementById('input-members');
  const membersValDisplay = document.getElementById('val-members');
  const loyaltyInput = document.getElementById('input-loyalty');
  const retentionInput = document.getElementById('input-retention');
  const formatInput = document.getElementById('input-format');

  // Outputs
  const gaugePercent = document.getElementById('gauge-percent');
  const gaugeFill = document.getElementById('gauge-fill-bar');
  const verdictBadge = document.getElementById('verdict-badge');
  const verdictTitle = document.getElementById('verdict-title');
  const verdictDesc = document.getElementById('verdict-desc');
  const shapList = document.getElementById('shap-factors-list');

  // Sync range displays
  scoreInput.addEventListener('input', () => {
    scoreValDisplay.textContent = parseFloat(scoreInput.value).toFixed(1);
    calculatePrediction();
  });

  membersInput.addEventListener('input', () => {
    const rawVal = parseInt(membersInput.value, 10);
    membersValDisplay.textContent = rawVal >= 1000000 ? `${(rawVal / 1000000).toFixed(1)}M` : `${(rawVal / 1000).toFixed(0)}k`;
    calculatePrediction();
  });

  [sourceInput, studioInput, loyaltyInput, retentionInput, formatInput].forEach(elem => {
    elem.addEventListener('change', calculatePrediction);
  });

  // Preset Buttons
  const presetButtons = document.querySelectorAll('.preset-btn');
  const presets = {
    shonen: {
      score: 8.5,
      source: 'manga',
      studio: 'tier-s',
      members: 1200000,
      loyalty: 'high',
      retention: 'high',
      format: '24'
    },
    cult: {
      score: 8.2,
      source: 'light-novel',
      studio: 'tier-a',
      members: 750000,
      loyalty: 'med',
      retention: 'med',
      format: '12'
    },
    merch: {
      score: 6.9,
      source: 'manga',
      studio: 'tier-b',
      members: 650000,
      loyalty: 'high',
      retention: 'high',
      format: '12'
    },
    original: {
      score: 7.4,
      source: 'original',
      studio: 'tier-a',
      members: 280000,
      loyalty: 'low',
      retention: 'low',
      format: '12'
    }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      const data = presets[presetKey];
      if (!data) return;

      scoreInput.value = data.score;
      scoreValDisplay.textContent = data.score.toFixed(1);

      sourceInput.value = data.source;
      studioInput.value = data.studio;

      membersInput.value = data.members;
      membersValDisplay.textContent = data.members >= 1000000 ? `${(data.members / 1000000).toFixed(1)}M` : `${(data.members / 1000).toFixed(0)}k`;

      loyaltyInput.value = data.loyalty;
      retentionInput.value = data.retention;
      formatInput.value = data.format;

      calculatePrediction();
    });
  });

  function calculatePrediction() {
    const score = parseFloat(scoreInput.value);
    const source = sourceInput.value;
    const studio = studioInput.value;
    const members = parseInt(membersInput.value, 10);
    const loyalty = loyaltyInput.value;
    const retention = retentionInput.value;
    const format = formatInput.value;

    // Baseline historical probability (~25% in TV anime cohort)
    let logit = -1.1;
    const factors = [];

    // 1. Source Material Impact
    if (source === 'manga') {
      logit += 1.05;
      factors.push({ name: 'Manga IP (Publisher Committee Sponsor)', impact: '+21%', type: 'positive' });
    } else if (source === 'light-novel') {
      logit += 0.45;
      factors.push({ name: 'Light Novel (Promotional Boost)', impact: '+9%', type: 'positive' });
    } else if (source === 'game') {
      logit -= 0.35;
      factors.push({ name: 'Game / Mobile Tie-in (Promotional One-shot)', impact: '-7%', type: 'negative' });
    } else if (source === 'original') {
      logit -= 0.95;
      factors.push({ name: 'Original IP (High Financial Committee Risk)', impact: '-19%', type: 'negative' });
    }

    // 2. Studio Tier Impact
    if (studio === 'tier-s') {
      logit += 0.75;
      factors.push({ name: 'Tier S Studio (MAPPA / Ufotable / Bones)', impact: '+15%', type: 'positive' });
    } else if (studio === 'tier-a') {
      logit += 0.35;
      factors.push({ name: 'Tier A Studio (CloverWorks / A-1 / Madhouse)', impact: '+7%', type: 'positive' });
    } else {
      logit -= 0.2;
      factors.push({ name: 'Independent Studio Capacity', impact: '-4%', type: 'negative' });
    }

    // 3. Score Impact
    const scoreDiff = score - 7.0;
    const scoreImpact = scoreDiff * 0.45;
    logit += scoreImpact;
    if (Math.abs(scoreDiff) >= 0.3) {
      factors.push({
        name: `Mean Rating (${score.toFixed(1)} vs 7.0 baseline)`,
        impact: `${scoreImpact >= 0 ? '+' : ''}${Math.round(scoreImpact * 20)}%`,
        type: scoreImpact >= 0 ? 'positive' : 'negative'
      });
    }

    // 4. Audience Scale
    const logMembers = Math.log10(members);
    if (logMembers >= 5.8) {
      logit += 0.65;
      factors.push({ name: 'Top Tier Audience Volume (> 600k MAL)', impact: '+13%', type: 'positive' });
    } else if (logMembers < 5.0) {
      logit -= 0.65;
      factors.push({ name: 'Niche Audience Reach (< 100k MAL)', impact: '-13%', type: 'negative' });
    }

    // 5. Fan Loyalty
    if (loyalty === 'high') {
      logit += 0.7;
      factors.push({ name: 'High Fan Loyalty (Favorites/Members > 3%)', impact: '+14%', type: 'positive' });
    } else if (loyalty === 'low') {
      logit -= 0.6;
      factors.push({ name: 'Low Engagement (Favorites/Members < 1%)', impact: '-12%', type: 'negative' });
    }

    // 6. Viewer Retention
    if (retention === 'high') {
      logit += 0.55;
      factors.push({ name: 'Strong Retention (Completed/Dropped > 3.0)', impact: '+11%', type: 'positive' });
    } else if (retention === 'low') {
      logit -= 0.65;
      factors.push({ name: 'Severe Drop-off (Completed/Dropped < 1.0)', impact: '-13%', type: 'negative' });
    }

    // 7. Cour format
    if (format === '24') {
      logit += 0.25;
      factors.push({ name: '2-Cour Format (Established Pipeline)', impact: '+5%', type: 'positive' });
    }

    // Sigmoid
    const probability = 1 / (1 + Math.exp(-logit));
    const percent = Math.min(Math.max(Math.round(probability * 100), 4), 98);

    // Update UI Gauge
    gaugePercent.textContent = `${percent}%`;
    gaugeFill.style.width = `${percent}%`;

    // Flat Verdict Styling
    verdictBadge.className = 'verdict-badge';
    if (percent >= 72) {
      verdictBadge.classList.add('greenlit');
      gaugeFill.style.background = 'var(--c-matcha)';
      verdictBadge.innerHTML = '✨ GREENLIT // High Sequel Probability';
      verdictTitle.textContent = 'High Continuation Probability: Greenlit';
      verdictTitle.style.color = 'var(--c-matcha)';
      verdictDesc.textContent = 'Strong publisher sponsorship, high viewer retention, and profitable committee alignment make a Season 2 announcement highly probable within 36 months.';
    } else if (percent >= 45) {
      verdictBadge.classList.add('deliberation');
      gaugeFill.style.background = 'var(--c-yamabuki)';
      verdictBadge.innerHTML = '⚖️ DELIBERATION // Committee Deliberating';
      verdictTitle.textContent = 'Moderate Odds: Committee Deliberation';
      verdictTitle.style.color = 'var(--c-yamabuki)';
      verdictDesc.textContent = 'Borderline case. Sequel production hinges on physical merchandise, streaming licensing revenue, and whether the author/publisher has sufficient unadapted backlog.';
    } else {
      verdictBadge.classList.add('terminated');
      gaugeFill.style.background = 'var(--c-torii)';
      verdictBadge.innerHTML = '🛑 TERMINATED // Single Season Expected';
      verdictTitle.textContent = 'Low Sequel Probability: Single-Season';
      verdictTitle.style.color = 'var(--c-torii)';
      verdictDesc.textContent = 'High probability of single-season termination. Likely produced as a one-shot promotional campaign for the source material or collapsed under committee risk.';
    }

    // Update SHAP Factor Breakdown
    shapList.innerHTML = '';
    factors.slice(0, 5).forEach(f => {
      const li = document.createElement('li');
      li.className = `shap-factor ${f.type}`;
      li.innerHTML = `
        <span class="factor-name">${f.name}</span>
        <span class="factor-badge">${f.impact}</span>
      `;
      shapList.appendChild(li);
    });
  }

  // Initial calculation
  calculatePrediction();
}

/* ==========================================================================
   3. Association Rules Filter
   ========================================================================== */
function initRulesFilter() {
  const filterButtons = document.querySelectorAll('.rule-filter-btn');
  const tableRows = document.querySelectorAll('#association-rules-table tbody tr');

  if (!filterButtons.length || !tableRows.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      tableRows.forEach(row => {
        const consequence = row.getAttribute('data-consequence');
        const lift = parseFloat(row.getAttribute('data-lift') || '0');

        if (filter === 'all') {
          row.style.display = '';
        } else if (filter === 'sequel' && consequence === 'sequel') {
          row.style.display = '';
        } else if (filter === 'no-sequel' && consequence === 'no-sequel') {
          row.style.display = '';
        } else if (filter === 'high-lift' && lift >= 2.0) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Smooth Scrolling & Active Navigation Link
   ========================================================================== */
function initNavScroll() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
