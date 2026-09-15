'use strict';

(() => {
  const $ = (selector) => document.querySelector(selector);
  const aiTasks = [
    {
      level: '第 1 项 / 解释一道题',
      prompt: '面积是 13 的正方形，边长怎么求？',
      result: '<div class="sqrt-preview"><span>√13</span><strong>3.60555…</strong><p>3² &lt; 13 &lt; 4²<br />它怎样继续算出小数位？</p></div>',
      question: '边长在 3 和 4 之间。更准确的值怎么算？待会儿一起试试。'
    },
    {
      level: '第 2 项 / 整理一份数据',
      prompt: '把校园的建筑和网线长度，整理成能计算的数据。',
      result: '<table class="mission-table"><thead><tr><th>建筑 A</th><th>建筑 B</th><th>长度</th></tr></thead><tbody><tr><td>网络中心</td><td>教学楼</td><td>5 米</td></tr><tr><td>教学楼</td><td>图书馆</td><td>2 米</td></tr><tr><td>教学楼</td><td>实验楼</td><td>3 米</td></tr></tbody></table>',
      question: '用节点表示建筑，用边表示候选网线，再把长度标上去，程序就有了可以处理的数据。'
    },
    {
      level: '第 3 项 / 写一个程序',
      prompt: '把选中的网线长度交给程序，计算总长度。',
      result: '<pre class="mission-code"><code><span>// C++98 · 简短程序片段</span>\nint a[3] = {5, 2, 3};\nint s = 0;\nfor (int i = 0; i &lt; 3; i++)\n    s += a[i];\ncout &lt;&lt; s;</code></pre><div class="mission-output">这三条边合计 <b>10 米</b></div>',
      question: '这个程序能算出总长度，但还不能判断选得好不好。有没有更省网线的选法？'
    },
    {
      level: '第 4 项 / 给出一个方案',
      prompt: '让所有建筑连通，怎样让网线总长度最短？',
      result: '<div class="mission-challenge"><span>你的任务</span><strong>全部连通<br />总成本最低</strong><p>选短边就一定正确吗？<br />已经连通的建筑，还需要再加一条线吗？</p></div>',
      question: '先别急着看答案。到校园布线实验时，花两三分钟自己选一组选线。'
    }
  ];
  let aiStep = 0;
  function animatePanel(panel) {
    panel.classList.remove('is-changing');
    void panel.offsetWidth;
    panel.classList.add('is-changing');
  }
  function setAiStep(index) {
    aiStep = index;
    const task = aiTasks[index];
    $('[id="ai-level"]').textContent = task.level;
    $('#ai-prompt').textContent = task.prompt;
    $('#ai-result').innerHTML = task.result;
    $('#ai-question').textContent = task.question;
    $('#ai-progress').textContent = `示例 ${index + 1} / 4`;
    $('#ai-next').innerHTML = index === 3 ? '什么是信息学？ <span>↓</span>' : index === 0 && window.matchMedia('(max-width: 1000px)').matches ? '先看一道题 <span>↓</span>' : '看看下一项 <span>→</span>';
    $('#ai-task-panel').setAttribute('aria-labelledby', `ai-tab-${index}`);
    document.querySelectorAll('[data-ai-step]').forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    animatePanel($('#ai-task-panel'));
  }
  document.querySelectorAll('[data-ai-step]').forEach((button) => button.addEventListener('click', () => setAiStep(Number(button.dataset.aiStep))));
  $('#ai-next').addEventListener('click', () => {
    const consolePanel = $('.mission-console');
    // In a narrow preview, the task sits below the introduction. Show level 1
    // before advancing, so the four-stage story doesn't start at level 2.
    if (aiStep === 0 && window.matchMedia('(max-width: 1000px)').matches) {
      consolePanel.scrollIntoView({behavior: scrollBehavior(), block: 'start'});
      return;
    }
    if (aiStep < 3) setAiStep(aiStep + 1);
    else $('#what-is-informatics').scrollIntoView({behavior: scrollBehavior(), block: 'start'});
  });
  if (window.matchMedia('(max-width: 1000px)').matches) $('#ai-next').innerHTML = '先看一道题 <span>↓</span>';

  const growthStages = [
    ['先写出一个能运行的程序。', '从输入输出、条件和循环开始。把自己的解题方法写成代码，让它正确运行，就是学习编程的第一步。'],
    ['CSP-J：检验入门能力。', '继续学习数组、字符串、排序、模拟与基础搜索。通过笔试与上机形式检验知识和程序实现，用结果反馈下一步训练。'],
    ['CSP-S：挑战更深入的算法。', '面对更复杂的数据与关系，练习图、贪心和动态规划等方法。这里积累的算法能力，与后续 NOIP 和信奥训练持续衔接。'],
    ['NOIP：在联赛中检验方法。', '把读题、建模、算法设计和调试放到真实竞赛环境中。正式参与资格和名额按当年方案及本省规定确定。'],
    ['省队选拔与 NOI：全国舞台。', '依据本省选拔办法争取省队资格，在 NOI 全国赛面对更高水平的算法挑战。每一次进阶，都需要持续训练和符合具体规则。'],
    ['国家集训与 IOI：走向国际。', '全国赛优秀选手进入国家集训与后续选拔，最终优秀选手代表中国参加 IOI。例：NOI 2026 金牌前 50 名进入集训队，从中选拔 4 人参加 IOI 2027。']
  ];
  let growthStep = 0;
  function setGrowthStep(index) {
    growthStep = index;
    $('#growth-level').textContent = `第 ${index + 1} 站`;
    $('#growth-title').textContent = growthStages[index][0];
    $('#growth-text').textContent = growthStages[index][1];
    $('#growth-next').textContent = index === 5 ? '看看今年的真实成果 ↓' : '看看下一阶段 →';
    $('#growth-detail').setAttribute('aria-labelledby', `growth-tab-${index}`);
    document.querySelectorAll('[data-growth-step]').forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.classList.toggle('is-passed', i < index);
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    animatePanel($('#growth-detail'));
  }
  document.querySelectorAll('[data-growth-step]').forEach((button) => button.addEventListener('click', () => setGrowthStep(Number(button.dataset.growthStep))));
  $('#growth-next').addEventListener('click', () => {
    if (growthStep < 5) setGrowthStep(growthStep + 1);
    else $('#real-achievements').scrollIntoView({behavior: scrollBehavior(), block: 'start'});
  });
  // Keyboard movement within the two tab groups, without advancing algorithm playback.
  document.querySelectorAll('.mission-tabs, .growth-track').forEach((group) => {
    group.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const buttons = [...group.querySelectorAll('[role="tab"]')];
      const current = buttons.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[index].click();
      buttons[index].focus();
    });
  });

  let judgeStep = -1;
  const judgeStates = [
    ['wrong', '结果错误', '漏掉一栋建筑，方案不满足“全部连通”。'],
    ['slow', '超过时间限制', '逐一尝试太多组合，数据一大就跑不动。'],
    ['accepted', '通过测试', '有明确选择规则，结果正确且满足资源限制。']
  ];
  $('#judge-next').addEventListener('click', () => {
    judgeStep = (judgeStep + 1) % judgeStates.length;
    const [kind, title, explanation] = judgeStates[judgeStep];
    $('#judge-result').className = `judge-result ${kind}`;
    $('#judge-result').innerHTML = `<strong>${title}</strong><p>${explanation}</p>`;
    $('#judge-next').textContent = judgeStep === 2 ? '重新比较方案' : '看看下一份方案';
    animatePanel($('#judge-result'));
  });

  const motionButton = $('#motion-toggle');
  const syncHeroAnimation = createHeroNetwork();
  function scrollBehavior() {
    return document.body.classList.contains('motion-paused') || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
  motionButton.addEventListener('click', () => {
    const paused = document.body.classList.toggle('motion-paused');
    motionButton.textContent = `动态效果：${paused ? '关' : '开'}`;
    motionButton.setAttribute('aria-pressed', String(paused));
    syncHeroAnimation();
  });

  // Abstract data-flow backdrop; it is decorative, not a diagram of an AI model.
  // Stop drawing offscreen or in a hidden tab, and respect both motion controls.
  function createHeroNetwork() {
    const canvas = $('#hero-network');
    const hero = $('#mainline-hero');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return () => {};
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const points = Array.from({length: 26}, (_, i) => ({
      x: ((i * 37 + 9) % 101) / 101,
      y: ((i * 53 + 17) % 103) / 103,
      phase: i * 1.7
    }));
    let width = 1, height = 1, frame = 0, lastTime = 0, elapsed = 0;
    let visible = true;

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const positions = points.map(p => ({
        x: p.x * width + Math.sin(time * .22 + p.phase) * 24,
        y: p.y * height + Math.cos(time * .18 + p.phase) * 20
      }));
      const range = Math.min(240, Math.max(140, width * .22));
      positions.forEach((a, i) => {
        let neighbours = 0;
        for (let j = i + 1; j < positions.length && neighbours < 3; j++) {
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > range) continue;
          neighbours++;
          ctx.strokeStyle = `rgba(103,232,249,${.06 + .14 * (1 - distance / range)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if ((i + j) % 3 !== 0) continue;
          const progress = (time * .24 + i * .17 + j * .07) % 1;
          ctx.fillStyle = '#8aefff';
          ctx.shadowColor = '#67e8f9'; ctx.shadowBlur = 9;
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 2.2, 0, Math.PI * 2);
          ctx.fill(); ctx.shadowBlur = 0;
        }
        ctx.fillStyle = i % 4 === 0 ? '#b5a4ff' : '#67e8f9';
        ctx.globalAlpha = .45 + Math.sin(time * .8 + i) * .15;
        ctx.beginPath(); ctx.arc(a.x, a.y, i % 4 === 0 ? 3 : 2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function tick(now) {
      if (!lastTime) lastTime = now;
      const delta = now - lastTime;
      if (delta >= 1000 / 30) {
        elapsed += Math.min(delta, 100) / 1000;
        lastTime = now;
        draw(elapsed);
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      frame = 0; lastTime = 0;
      const paused = reducedMotion.matches || document.body.classList.contains('motion-paused');
      if (visible && !document.hidden && !paused) frame = requestAnimationFrame(tick);
      else draw(elapsed);
    }

    function resize() {
      width = hero.clientWidth; height = hero.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      draw(elapsed);
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
    else window.addEventListener('resize', resize, {passive: true});
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        sync();
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    resize(); sync();
    return sync;
  }

  const mainlineReturn = $('#return-mainline');
  function updateReturnDestination() {
    const view = $('.demo-view.is-active');
    const rect = view?.getBoundingClientRect();
    const inExperiment = rect && rect.top < window.innerHeight * .65 && rect.bottom > window.innerHeight * .35;
    const target = inExperiment ? (view.id === 'demo-newton' ? '#newton-recap' : '#lab-recap') : '#mainline-top';
    const label = inExperiment ? '回到主线 · 实验回顾' : '回到主线开头';
    mainlineReturn.href = target;
    mainlineReturn.setAttribute('aria-label', label);
    mainlineReturn.querySelector('span').textContent = label;
  }
  let scrollScheduled = false;
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => { updateReturnDestination(); scrollScheduled = false; });
  }, {passive: true});
  mainlineReturn.addEventListener('click', () => {
    // Pause any running algorithm before returning to the explanation.
    if ($('#play-label').textContent === '暂停') $('#toggle-play').click();
  });
  document.querySelectorAll('.demo-tab').forEach((button) => button.addEventListener('click', updateReturnDestination));
  document.querySelectorAll('[data-jump-demo="newton"]').forEach((link) => link.addEventListener('click', () => {
    // Align the first narrative experiment with the opening question, √13.
    $('#newton-presets .preset-button:nth-child(4)')?.click();
  }));
  updateReturnDestination();

  if ('IntersectionObserver' in window) {
    const navigation = [...document.querySelectorAll('.story-nav a')];
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      navigation.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        link.classList.toggle('is-current', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-10% 0px -60% 0px', threshold: 0});
    navigation.forEach((link) => { const section = document.querySelector(link.hash); if (section) sectionObserver.observe(section); });
  }

  const video = $('#course-video');
  const videoStatus = $('#video-status');
  const videoRetry = $('#video-retry');
  const videoPlay = $('#video-play');
  const canUseMp4 = Boolean(video.canPlayType('video/mp4; codecs="avc1.640028, mp4a.40.2"'));
  videoRetry.textContent = canUseMp4 ? '切换兼容格式' : '重新加载视频';
  let switchedFormat = false;
  videoPlay.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {
      videoStatus.textContent = '当前格式无法播放，可切换兼容格式。';
      videoRetry.hidden = false;
    });
    else video.pause();
  });
  video.addEventListener('loadeddata', () => {
    video.dataset.frameWidth = String(video.videoWidth);
    video.dataset.frameHeight = String(video.videoHeight);
    videoStatus.textContent = '画面已就绪 · 课件原视频';
    videoRetry.hidden = false;
  });
  video.addEventListener('playing', () => {
    videoStatus.textContent = '正在播放 · 课件原视频';
    videoPlay.textContent = 'Ⅱ 暂停视频';
    if ($('#play-label').textContent === '暂停') $('#toggle-play').click();
  });
  video.addEventListener('pause', () => { videoStatus.textContent = '已暂停 · 可继续播放'; videoPlay.textContent = '▶ 继续播放'; });
  video.addEventListener('ended', () => { videoStatus.textContent = '观看完成 · 你想解决什么问题？'; videoPlay.textContent = '▶ 再看一次'; });
  video.addEventListener('error', () => {
    videoStatus.textContent = '当前格式加载失败，可切换兼容格式或单独打开视频。';
    videoRetry.hidden = false;
  });
  videoRetry.addEventListener('click', () => {
    const time = video.currentTime || 0;
    const wasPlaying = !video.paused;
    switchedFormat = canUseMp4 && !switchedFormat;
    video.src = 'assets/infosci-course-pages.webm';
    videoStatus.textContent = '正在切换视频格式…';
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(time, video.duration || time);
      if (wasPlaying) video.play().catch(() => { videoStatus.textContent = '请点击播放继续观看。'; });
    }, {once: true});
    video.load();
  });
})();
