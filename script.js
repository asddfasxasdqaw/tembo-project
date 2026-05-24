/* =========================================================
   Skillforge — landing logic
   ========================================================= */

/* ---------- skill catalog ---------- */
const APP_ICONS = {
  ui: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/960px-Figma-logo.svg.png',
  figma: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/960px-Figma-logo.svg.png',
  photoshop: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Adobe_Photoshop_CC_2026_icon.svg/1280px-Adobe_Photoshop_CC_2026_icon.svg.png',
  ae: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Adobe_After_Effects_CC_2026_icon.svg/1280px-Adobe_After_Effects_CC_2026_icon.svg.png',
  pr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Adobe_Premiere_Pro_CC_2026_icon.svg/1280px-Adobe_Premiere_Pro_CC_2026_icon.svg.png',
  '3d': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/960px-Blender_logo_no_text.svg.png',
};

const SKILLS = [
  { id: 'liquid-glass',   cat: 'ui',        file: 'liquid-glass.md',         hot: true,
    en: { title: 'Liquid Glass UI',         desc: 'Apple-grade glass surfaces — multi-layer blur, specular highlights, tinted noise, a11y fallbacks.', tags: ['CSS', 'React', 'Tailwind'] },
    ru: { title: 'Liquid Glass интерфейсы', desc: 'Стеклянные поверхности уровня Apple — многослойное размытие, блики, шум, фоллбэки доступности.', tags: ['CSS', 'React', 'Tailwind'] } },

  { id: 'gen-photoshop',  cat: 'photoshop', file: 'ps-generative-pass.md',   hot: true,
    en: { title: 'PS Generative Pass',      desc: 'Plans masks, expand fills, neural filters and export queues for the new Generative workflow.', tags: ['Generative Fill', 'Actions', 'JSX'] },
    ru: { title: 'PS Генеративный проход',  desc: 'Планирует маски, заливки, нейрофильтры и экспорт в новом генеративном пайплайне Photoshop.', tags: ['Generative Fill', 'Actions', 'JSX'] } },

  { id: 'ae-motion',      cat: 'ae',
    en: { title: 'AE Motion System',        desc: 'Builds Essential Graphics rigs with sliders, expressions and master comps that survive client revisions.', tags: ['Expressions', 'Rigs', 'EGP'] },
    ru: { title: 'AE моушн-система',        desc: 'Соберёт Essential Graphics с экспрешенами и мастер-композициями, которые выдержат правки клиента.', tags: ['Expressions', 'Rigs', 'EGP'] } },

  { id: 'pr-edit',        cat: 'pr',
    en: { title: 'Premiere Smart Edit',     desc: 'Reads your transcript, drafts the cut, picks B-roll moments and outputs an XML you can drop in.', tags: ['XML', 'Auto-cut', 'Transcript'] },
    ru: { title: 'Premiere умный монтаж',   desc: 'Читает транскрипт, рисует монтаж, выбирает B-roll и выдаёт XML, который можно сразу подгрузить.', tags: ['XML', 'Auto-cut', 'Транскрипт'] } },

  { id: 'blender-scene',  cat: '3d',        hot: true,
    en: { title: 'Blender Scene Builder',   desc: 'Sets up cameras, HDRIs, light rigs and material networks via the Python API. Cycles or Eevee.', tags: ['Python', 'Cycles', 'Materials'] },
    ru: { title: 'Blender сборка сцен',     desc: 'Расставит камеры, HDRI, свет и шейдер-граф через Python API. Cycles или Eevee.', tags: ['Python', 'Cycles', 'Материалы'] } },

  { id: 'figma-tokens',   cat: 'figma',
    en: { title: 'Figma Design Tokens',     desc: 'Audits your file, names tokens, builds variable modes for light/dark/contrast and writes the JSON.', tags: ['Tokens', 'Variables', 'Plugin'] },
    ru: { title: 'Figma дизайн-токены',     desc: 'Проверит файл, назовёт токены, соберёт режимы light/dark/контраст и выдаст JSON.', tags: ['Tokens', 'Variables', 'Plugin'] } },

  { id: 'react-section',  cat: 'ui',
    en: { title: 'React Section Composer',  desc: 'One-shot hero / feature / pricing sections with motion, accessibility and responsive baked in.', tags: ['React', 'Framer Motion', 'A11y'] },
    ru: { title: 'React-композер секций',   desc: 'Готовые hero / features / pricing секции с анимацией, доступностью и адаптивом из коробки.', tags: ['React', 'Framer Motion', 'A11y'] } },

  { id: 'ps-mockup',      cat: 'photoshop',
    en: { title: 'PS Brand Mockup',         desc: 'Generates smart-object mockup PSDs for posters, devices and apparel with proper perspective.', tags: ['Smart Objects', 'PSD', 'Mockups'] },
    ru: { title: 'PS брендовый мокап',      desc: 'Сгенерирует PSD-мокапы постеров, девайсов и мерча со смарт-объектами и правильной перспективой.', tags: ['Smart Objects', 'PSD', 'Мокапы'] } },

  { id: 'ae-logo',        cat: 'ae',        hot: true,
    en: { title: 'AE Logo Reveal',          desc: 'Cinematic logo reveal scripts with shape layers, trim paths, light wraps and sound-design cues.', tags: ['Shape Layers', 'Trim Paths', 'Sound cues'] },
    ru: { title: 'AE раскрытие лого',       desc: 'Кинематографичные раскрытия логотипа: shape-слои, trim paths, light wrap и подсказки по звуку.', tags: ['Shape Layers', 'Trim Paths', 'Звук'] } },

  { id: 'blender-product',cat: '3d',
    en: { title: 'Blender Product Shot',    desc: 'Studio lighting templates, turntables and 4K render passes ready for compositing in AE.', tags: ['Studio', 'Turntable', '4K'] },
    ru: { title: 'Blender продуктовая съёмка', desc: 'Шаблоны студийного света, поворотники и 4K-проходы под композ в AE.', tags: ['Studio', 'Turntable', '4K'] } },

  { id: 'figma-prototype',cat: 'figma',
    en: { title: 'Figma Prototype Pro',     desc: 'Builds smart animate flows, variable interactions and prototype branching from a single brief.', tags: ['Smart Animate', 'Variables', 'Branching'] },
    ru: { title: 'Figma прототипы Pro',     desc: 'Соберёт smart-animate потоки, реактивные взаимодействия и ветвление прототипа по брифу.', tags: ['Smart Animate', 'Variables', 'Branching'] } },

  { id: 'ui-marketing',   cat: 'ui',
    en: { title: 'Marketing Page in a Day', desc: 'A11y-first Next.js page with hero, social proof, pricing, FAQ — TS + Tailwind + Framer Motion.', tags: ['Next.js', 'TS', 'Tailwind'] },
    ru: { title: 'Маркетинг-лендинг за день', desc: 'Доступный Next.js лендинг: hero, соцпруф, тарифы, FAQ — TS + Tailwind + Framer Motion.', tags: ['Next.js', 'TS', 'Tailwind'] } },
];

/* ---------- i18n ---------- */
const I18N = {
  en: {
    'meta.title': 'Skillforge — AI skills for vibe-coding',
    'meta.desc':  'Beautiful .md and .txt skills that turn any AI into a production-grade designer, motion artist and 3D wizard.',
    'nav.skills': 'Skills', 'nav.models': 'Models', 'nav.apps': 'Apps', 'nav.pricing': 'Pricing', 'nav.how': 'How it works',
    'nav.browse': 'Browse skills', 'nav.cta': 'Get the pack',

    'hero.chip':   'New · 2,500+ skills, every frontier model, weekly drops',
    'hero.title1': 'Drop-in skills that turn your AI into',
    'hero.sub':    'A library of carefully crafted <code>.md</code> and <code>.txt</code> prompts — load one into Claude, Gemini, ChatGPT, Codex, Kimi <em>or whichever model you use</em> and watch it ship like a senior.',
    'hero.cta1':   'Get the full pack', 'hero.cta2': 'See the skills →',

    // metric tiles
    'metric.skills.label': 'Library size',
    'metric.skills.cap':   'skills · this page shows a small selection',
    'metric.skills.link':  'See pricing →',
    'metric.users.label':  'Community',
    'metric.users.cap':    'creators shipping with Skillforge',
    'metric.models.label': 'Works with',
    'metric.models.value': 'ANY frontier model',
    'metric.models.cap':   'Claude, GPT, Gemini, Codex, Kimi & whatever ships next',
    'metric.apps.label':   'Creative apps',
    'metric.apps.value':   'Ps · Ae · Pr · Bl · Fg',
    'metric.apps.cap':     '…and any tool with a scripting API',
    'metric.more':         '+ more',

    // rotator words
    'rot.0': 'a web designer',
    'rot.1': 'a motion artist',
    'rot.2': 'a 3D generalist',
    'rot.3': 'a brand designer',
    'rot.4': 'a video editor',
    'rot.5': 'a UI engineer',
    'rot.6': 'a recruiter',
    'rot.7': 'a copywriter',
    'rot.8': 'a product manager',

    'models.eye':    'Works with the models you already use',
    'models.title1': 'Plug into', 'models.title2': 'any frontier model',
    'models.sub':    'Every skill is tested across the major providers. Drop the file in, paste the system prompt, or wire it into your agent — same quality everywhere.',
    'models.more':   '+ many more',

    'apps.eye':    'Creative tooling, automated',
    'apps.title1': 'Skills for the', 'apps.title2': 'apps you actually ship in',
    'apps.sub':    'Photoshop generative passes, After Effects rigs, Premiere edits, Blender scenes, Figma systems — and any tool with a scripting API. Your model now speaks each one fluently.',
    'apps.more':   'and many more',

    'skills.eye':    'The library',
    'skills.title1': '2,500+ skills.', 'skills.title2': 'A sampler below.',
    'skills.sub':    'Search, filter by app, preview the prompt, copy or download. Every skill is a single file — this page shows a small selection of the full library.',
    'skills.empty':  'No skills match your search. Try a different keyword or clear the filter.',
    'skills.more':   'Showing a small selection — the full library has 2,500+ skills.',
    'skills.morecta':'See pricing →',
    'search.placeholder': "Search 2,500+ skills — try 'liquid glass', 'motion', 'mockup'…",

    'filter.all': 'All', 'filter.ui': 'UI / Web', 'filter.ps': 'Photoshop', 'filter.ae': 'After Effects', 'filter.pr': 'Premiere', 'filter.3d': 'Blender', 'filter.fg': 'Figma',

    'how.eye': 'How it works', 'how.title1': 'Three steps,', 'how.title2': 'production-grade output',
    'how.s1t': 'Pick a skill',  'how.s1p': 'Browse the library, filter by app or model. Every card shows you the system prompt before you commit.',
    'how.s2t': 'Drop the file', 'how.s2p': 'Paste it as a system prompt, attach the <code>.md</code>, or load it into your Claude / Codex / Gemini skill slot.',
    'how.s3t': 'Ship',          'how.s3p': 'The model now knows the rules, the references, the deliverables and the gotchas. Output is consistent — across sessions and across providers.',

    // pricing
    'price.eye':    'Pricing',
    'price.title1': 'Pick a tier,',
    'price.title2': 'unlock the full 2,500+ library',
    'price.sub':    'Lifetime updates on every plan. Cancel anytime. Team & studio licenses available.',
    'price.per':       '/ forever',
    'price.per.once':  '/ one-time',
    'price.starter.tag': 'Starter', 'price.starter.sub': 'Sample the library — perfect for testing the workflow.',
    'price.starter.f1': '12 sampler skills (this page)', 'price.starter.f2': 'All providers supported', 'price.starter.f3': 'Community support',
    'price.starter.cta': 'Browse free skills',
    'price.pro.tag': 'Pro', 'price.pro.badge': '★ Most popular', 'price.pro.sub': 'The full library, forever — plus every new skill we ship.',
    'price.pro.f1': '<b>2,500+</b> skills (full catalogue)', 'price.pro.f2': 'Weekly drops, lifetime updates', 'price.pro.f3': 'Works with any AI &amp; any app', 'price.pro.f4': 'Priority Discord support',
    'price.pro.cta': 'Get Pro',
    'price.studio.tag': 'Studio', 'price.studio.sub': 'Team license for agencies and product teams.',
    'price.studio.f1': 'Everything in Pro', 'price.studio.f2': 'Up to 25 seats', 'price.studio.f3': 'Custom skill on request', 'price.studio.f4': 'White-label option',
    'price.studio.cta': 'Talk to us',

    'cta.title1': 'Get the full pack —', 'cta.title2': '2,500+ skills, lifetime updates.',
    'cta.sub':    'One download. Works with every frontier model. New skills every week.',
    'cta.btn':    'Send me the pack',
    'cta.note':   'No spam. One email when the next drop ships. Unsubscribe in one click.',

    'foot.skills': 'Skills', 'foot.models': 'Models', 'foot.apps': 'Apps', 'foot.pricing': 'Pricing', 'foot.cta': 'Get the pack',
    'foot.tag': 'Built for AI vibe-coders who care how the pixels land.',

    'card.preview': 'Preview', 'card.copy': 'Copy', 'card.copied': 'Copied!',
  },

  ru: {
    'meta.title': 'Skillforge — AI-скиллы для вайбкодинга',
    'meta.desc':  'Готовые .md и .txt скиллы, которые превращают любую нейронку в продакшн-дизайнера, моушн-артиста и 3D-вижуалера.',
    'nav.skills': 'Скиллы', 'nav.models': 'Модели', 'nav.apps': 'Приложения', 'nav.pricing': 'Тарифы', 'nav.how': 'Как это работает',
    'nav.browse': 'Каталог', 'nav.cta': 'Забрать пак',

    'hero.chip':   'Новое · 2500+ скиллов, все frontier-модели, дропы каждую неделю',
    'hero.title1': 'Готовые скиллы, превращающие твою нейронку в',
    'hero.sub':    'Библиотека аккуратно собранных <code>.md</code> и <code>.txt</code> промтов — подгружаешь в Claude, Gemini, ChatGPT, Codex, Kimi <em>или любую другую модель</em> и получаешь результат уровня сеньора.',
    'hero.cta1':   'Забрать весь пак', 'hero.cta2': 'Открыть каталог →',

    'metric.skills.label': 'Размер библиотеки',
    'metric.skills.cap':   'скиллов · на этой странице — только малая часть',
    'metric.skills.link':  'Посмотреть тарифы →',
    'metric.users.label':  'Сообщество',
    'metric.users.cap':    'креаторов уже шипят со Skillforge',
    'metric.models.label': 'Работает с',
    'metric.models.value': 'ЛЮБОЙ frontier-моделью',
    'metric.models.cap':   'Claude, GPT, Gemini, Codex, Kimi — и тем, что выйдет завтра',
    'metric.apps.label':   'Креативные тулы',
    'metric.apps.value':   'Ps · Ae · Pr · Bl · Fg',
    'metric.apps.cap':     '…и любой инструмент со скриптовым API',
    'metric.more':         '+ ещё',

    'rot.0': 'веб-дизайнера',
    'rot.1': 'моушн-артиста',
    'rot.2': '3D-вижуалера',
    'rot.3': 'бренд-дизайнера',
    'rot.4': 'видеомонтажёра',
    'rot.5': 'UI-инженера',
    'rot.6': 'рекрутера',
    'rot.7': 'копирайтера',
    'rot.8': 'продакт-менеджера',

    'models.eye':    'Работает с моделями, которыми ты уже пользуешься',
    'models.title1': 'Подключай', 'models.title2': 'любую frontier-модель',
    'models.sub':    'Каждый скилл протестирован у всех основных провайдеров. Положи файл, вставь системный промт или подключи в агенте — качество одинаковое.',
    'models.more':   '+ ещё много',

    'apps.eye':    'Креативные тулы — на автомате',
    'apps.title1': 'Скиллы под', 'apps.title2': 'приложения, в которых ты реально шипишь',
    'apps.sub':    'Генеративные проходы в Photoshop, риги в After Effects, монтаж в Premiere, сцены в Blender, системы в Figma — и любой тул со скриптовым API. Модель говорит на языке каждого.',
    'apps.more':   'и много других',

    'skills.eye':    'Каталог',
    'skills.title1': '2500+ скиллов.', 'skills.title2': 'Ниже — небольшая выборка.',
    'skills.sub':    'Ищи, фильтруй по приложению, смотри промт, копируй или скачивай. Каждый скилл — один файл. На странице показана малая часть полной библиотеки.',
    'skills.empty':  'Ничего не нашлось. Попробуй другое слово или сбрось фильтр.',
    'skills.more':   'Здесь показана только выборка — в полной библиотеке 2500+ скиллов.',
    'skills.morecta':'Посмотреть тарифы →',
    'search.placeholder': 'Поиск по 2500+ скиллам — «liquid glass», «моушн», «мокап»…',

    'filter.all': 'Все', 'filter.ui': 'UI / Web', 'filter.ps': 'Photoshop', 'filter.ae': 'After Effects', 'filter.pr': 'Premiere', 'filter.3d': 'Blender', 'filter.fg': 'Figma',

    'how.eye': 'Как это работает', 'how.title1': 'Три шага,', 'how.title2': 'продакшн-результат',
    'how.s1t': 'Выбери скилл',     'how.s1p': 'Открой каталог, отфильтруй по приложению или модели. На каждой карточке виден системный промт.',
    'how.s2t': 'Подгрузи файл',    'how.s2p': 'Вставь как system prompt, прикрепи <code>.md</code> или загрузи в слот скиллов Claude / Codex / Gemini.',
    'how.s3t': 'Деплой',           'how.s3p': 'Модель знает правила, референсы, что должно быть на выходе и где обычно ломается. Стабильный результат между сессиями и провайдерами.',

    'price.eye':    'Тарифы',
    'price.title1': 'Выбери тариф,',
    'price.title2': 'разблокируй всю библиотеку 2500+ скиллов',
    'price.sub':    'На каждом плане — обновления навсегда. Отмена в любой момент. Команды и студии — отдельные лицензии.',
    'price.per':       '/ навсегда',
    'price.per.once':  '/ единоразово',
    'price.starter.tag': 'Starter', 'price.starter.sub': 'Попробуй библиотеку — идеально для проверки воркфлоу.',
    'price.starter.f1': '12 sampler-скиллов (на этой странице)', 'price.starter.f2': 'Любой провайдер', 'price.starter.f3': 'Поддержка в комьюнити',
    'price.starter.cta': 'Смотреть бесплатные',
    'price.pro.tag': 'Pro', 'price.pro.badge': '★ Популярный', 'price.pro.sub': 'Вся библиотека навсегда + все будущие дропы.',
    'price.pro.f1': '<b>2500+</b> скиллов (полный каталог)', 'price.pro.f2': 'Дропы каждую неделю, обновления навсегда', 'price.pro.f3': 'Работает с любым ИИ и любым приложением', 'price.pro.f4': 'Приоритетная поддержка в Discord',
    'price.pro.cta': 'Взять Pro',
    'price.studio.tag': 'Studio', 'price.studio.sub': 'Командная лицензия для агентств и продуктовых команд.',
    'price.studio.f1': 'Всё из Pro', 'price.studio.f2': 'До 25 пользователей', 'price.studio.f3': 'Кастомный скилл под запрос', 'price.studio.f4': 'White-label',
    'price.studio.cta': 'Связаться',

    'cta.title1': 'Забери весь пак —', 'cta.title2': '2500+ скиллов, обновления на всю жизнь.',
    'cta.sub':    'Один файл. Работает со всеми frontier-моделями. Новые скиллы каждую неделю.',
    'cta.btn':    'Прислать пак',
    'cta.note':   'Без спама. Одно письмо — когда выходит следующий дроп. Отписка в один клик.',

    'foot.skills': 'Скиллы', 'foot.models': 'Модели', 'foot.apps': 'Приложения', 'foot.pricing': 'Тарифы', 'foot.cta': 'Забрать пак',
    'foot.tag': 'Сделано для AI-вайбкодеров, которым важно, как ложатся пиксели.',

    'card.preview': 'Превью', 'card.copy': 'Копировать', 'card.copied': 'Скопировано!',
  },
};

/* ---------- render skill cards ---------- */
function renderSkills(lang) {
  const grid = document.getElementById('skillGrid');
  if (!grid) return;
  grid.innerHTML = '';

  SKILLS.forEach((s, i) => {
    const tx = s[lang] || s.en;
    const icon = APP_ICONS[s.cat] || APP_ICONS.ui;

    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.cat = s.cat;
    card.dataset.searchText = [tx.title, tx.desc, ...(tx.tags || []), s.cat, s.file || ''].join(' ');
    card.style.animationDelay = (60 + i * 35) + 'ms';

    const tagsHtml = tx.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const hotTag = s.hot
      ? `<span class="tag tag--hot">★ ${lang === 'ru' ? 'Хит' : 'Hot'}</span>`
      : '';

    card.innerHTML = `
      <div class="card__head">
        <span class="card__icon"><img alt="" src="${icon}"/></span>
        <div>
          <h3 class="card__title">${tx.title}</h3>
          <div class="card__file">${s.file || s.id + '.md'}</div>
        </div>
      </div>
      <p class="card__desc">${tx.desc}</p>
      <div class="card__tags">${hotTag}${tagsHtml}</div>
      <div class="card__foot">
        <span>${lang === 'ru' ? 'Готово к использованию' : 'Ready to drop in'}</span>
        <button class="card__copy" type="button" data-copy="${s.id}">
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M10 1H4a2 2 0 0 0-2 2v8h2V3h6V1Zm3 3H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 10H7V6h6v8Z"/></svg>
          <span>${I18N[lang]['card.copy']}</span>
        </button>
      </div>`;

    grid.appendChild(card);
  });

  // copy buttons
  grid.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-copy');
      const skill = SKILLS.find(x => x.id === id);
      const tx = skill[lang] || skill.en;
      const payload = `# ${tx.title}\n\n${tx.desc}\n\nTags: ${tx.tags.join(', ')}\n\n# Persona\nYou are a senior practitioner. Output production-ready deliverables.\n\n# Rules\n- Follow the brief literally.\n- Cite trade-offs in one line each.\n- Stop when the deliverable list is satisfied.\n`;
      navigator.clipboard?.writeText(payload).catch(()=>{});
      const label = btn.querySelector('span');
      const old = label.textContent;
      label.textContent = I18N[lang]['card.copied'];
      setTimeout(() => label.textContent = old, 1400);
    });
  });

  // cursor glow
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

/* ---------- filters + search ---------- */
const state = { filter: 'all', query: '' };

function applyGridFilter() {
  const q = state.query.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.card').forEach(c => {
    const okCat = state.filter === 'all' || c.dataset.cat === state.filter;
    const haystack = (c.dataset.searchText || '').toLowerCase();
    const okQ = q === '' || haystack.includes(q);
    const show = okCat && okQ;
    c.classList.toggle('is-hidden', !show);
    if (show) visible++;
  });
  const empty = document.getElementById('skillGridEmpty');
  if (empty) empty.hidden = visible !== 0;
  const more = document.querySelector('.grid__more');
  if (more) more.style.display = visible === 0 ? 'none' : '';
}

function bindFilters() {
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(b => b.addEventListener('click', () => {
    buttons.forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    state.filter = b.dataset.filter;
    applyGridFilter();
  }));
}

function bindSearch() {
  const input  = document.getElementById('skillSearch');
  const clear  = document.getElementById('skillSearchClear');
  if (!input) return;

  input.addEventListener('input', () => {
    state.query = input.value;
    clear.hidden = input.value.length === 0;
    applyGridFilter();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    state.query = '';
    clear.hidden = true;
    applyGridFilter();
    input.focus();
  });
  // global "/" shortcut to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.value = ''; state.query = ''; clear.hidden = true; applyGridFilter(); input.blur();
    }
  });
}

/* ---------- i18n apply ---------- */
function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  window.__lang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if (val == null) return;
    if (el.tagName === 'META') el.setAttribute('content', val);
    else el.innerHTML = val;
  });

  // attribute translations: data-i18n-attr="placeholder:search.placeholder"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      const val = dict[key];
      if (val != null) el.setAttribute(attr, val);
    });
  });

  // update flag/code in switcher
  const flag = document.querySelector('.lang__flag');
  const code = document.querySelector('[data-lang-code]');
  if (lang === 'ru') {
    flag.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/3840px-Flag_of_Russia.svg.png';
    code.textContent = 'RU';
  } else {
    flag.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/330px-Flag_of_the_United_Kingdom.svg.png';
    code.textContent = 'EN';
  }

  try { localStorage.setItem('skillforge.lang', lang); } catch (_) {}

  renderSkills(lang);
  applyGridFilter();
  startRotator(lang);
  animateCounters();
}

/* ---------- rotating word (hero) ---------- */
let _rotTimer = null;
function rotatorWords(lang) {
  const dict = I18N[lang] || I18N.en;
  const out = [];
  for (let i = 0; i < 20; i++) {
    const v = dict['rot.' + i];
    if (v) out.push(v); else break;
  }
  return out.length ? out : ['a web designer', 'a motion artist', 'a 3D generalist'];
}
function startRotator(lang) {
  const inner = document.querySelector('[data-rotator]');
  if (!inner) return;
  if (_rotTimer) { clearInterval(_rotTimer); _rotTimer = null; }
  const words = rotatorWords(lang);
  let i = 0;
  inner.innerHTML = `<span class="rotator__item">${words[0]}</span>`;
  _rotTimer = setInterval(() => {
    const current = inner.querySelector('.rotator__item:not(.is-out)');
    if (!current) return;
    current.classList.add('is-out');
    i = (i + 1) % words.length;
    const next = document.createElement('span');
    next.className = 'rotator__item';
    next.textContent = words[i];
    inner.appendChild(next);
    // remove old after its fade-out completes
    setTimeout(() => current.remove(), 380);
  }, 2400);
}

/* ---------- counter rollup ---------- */
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    if (el.dataset.counted === '1') return;
    const target = parseInt(el.dataset.counter, 10) || 0;
    const dur = 1200, start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(target * eased);
      el.textContent = v.toLocaleString(window.__lang === 'ru' ? 'ru-RU' : 'en-US');
      if (p < 1) requestAnimationFrame(tick);
      else el.dataset.counted = '1';
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- language switcher behaviour ---------- */
function bindLangSwitcher() {
  const root = document.querySelector('[data-lang-switcher]');
  if (!root) return;
  const btn = root.querySelector('.lang__btn');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    root.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', root.classList.contains('is-open'));
  });
  root.querySelectorAll('[data-set-lang]').forEach(li => {
    li.addEventListener('click', () => {
      const lang = li.getAttribute('data-set-lang');
      applyLang(lang);
      root.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      root.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      root.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- subtle parallax for ambient blobs ---------- */
function bindParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const blobs = document.querySelectorAll('.bg__blob');
  let raf = null, tx = 0, ty = 0;
  window.addEventListener('pointermove', e => {
    tx = (e.clientX / window.innerWidth  - .5) * 30;
    ty = (e.clientY / window.innerHeight - .5) * 30;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      blobs.forEach((b, i) => {
        const f = (i + 1) * 0.6;
        b.style.translate = `${tx * f}px ${ty * f}px`;
      });
      raf = null;
    });
  }, { passive: true });
}

/* ---------- reveal on scroll ---------- */
function bindReveal() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'rise .8s ease both';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section__head, .logo, .app, .step').forEach(el => {
    el.style.opacity = '0';
    io.observe(el);
  });
}

/* ---------- boot ---------- */
function boot() {
  let lang = 'en';
  try {
    const saved = localStorage.getItem('skillforge.lang');
    if (saved === 'ru' || saved === 'en') lang = saved;
    else if ((navigator.language || '').toLowerCase().startsWith('ru')) lang = 'ru';
  } catch (_) {}

  bindFilters();
  bindSearch();
  bindLangSwitcher();
  bindParallax();
  applyLang(lang);
  bindReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
