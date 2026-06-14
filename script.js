// Список техник. Каждая привязана к карточке-ситуации через поле id.
// phases — фазы дыхания по очереди:
//   name    — что показать на экране,
//   seconds — сколько секунд длится,
//   kind    — для анимации: 'in' вдох (круг растёт), 'hold' задержка, 'out' выдох (круг сжимается).
const techniques = [
  {
    id: "trevoga",
    situation: "Тревожно, волнуюсь",
    title: "Бокс-дыхание (4-4-4-4)",
    basis: "Техника из практики спецслужб и спортсменов для собранности под давлением.",
    why: "При тревоге дыхание сбивается и частит. Ровный счёт с равными фазами возвращает ему чёткий ритм — и тело понимает, что опасности нет, можно собраться.",
    instruction: "Дыши по квадрату: вдох — задержка — выдох — задержка, каждое по 4 секунды.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Задержка", seconds: 4, kind: "hold" },
      { name: "Выдох", seconds: 4, kind: "out" },
      { name: "Задержка", seconds: 4, kind: "hold" },
    ],
    child: {
      title: "Дыхание-квадрат",
      instruction: "Рисуй пальчиком квадрат: вдох — ведём вверх, держим — вправо, выдох — вниз, держим — влево. Каждая сторона на 4 счёта.",
      why: "Когда страшно перед чем-то важным, дыхание начинает прыгать. Ровный счёт-квадрат делает его спокойным — и тело понимает, что всё хорошо.",
      phases: [
        { name: "Вдох ↑", seconds: 4, kind: "in" },
        { name: "Держим →", seconds: 4, kind: "hold" },
        { name: "Выдох ↓", seconds: 4, kind: "out" },
        { name: "Держим ←", seconds: 4, kind: "hold" },
      ],
    },
  },
  {
    id: "son",
    situation: "Не могу уснуть",
    title: "Дыхание 4-7-8",
    basis: "Дыхательное упражнение, популяризированное доктором Эндрю Вейлом.",
    why: "Долгий выдох и задержка замедляют сердцебиение и включают «успокаивающую» часть нервной системы — тело настраивается на отдых и сон.",
    instruction: "Вдох носом на 4, задержка на 7, медленный выдох ртом на 8.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Задержка", seconds: 7, kind: "hold" },
      { name: "Выдох", seconds: 8, kind: "out" },
    ],
    child: {
      title: "Сонное дыхание",
      instruction: "Вдохни носиком на 4, тихонько подержи воздух на 7 и медленно выдохни ртом на 8, как будто дуешь на горячий чай.",
      why: "Долгий выдох успокаивает тело и говорит ему: пора отдыхать. Глазки начинают слипаться сами.",
      phases: [
        { name: "Вдох носиком", seconds: 4, kind: "in" },
        { name: "Держим", seconds: 7, kind: "hold" },
        { name: "Дуем на чай", seconds: 8, kind: "out" },
      ],
    },
  },
  {
    id: "zlost",
    situation: "Злюсь, раздражает",
    title: "Удлинённый выдох (4-6)",
    basis: "Опирается на работу блуждающего нерва (вагуса).",
    why: "Когда выдох длиннее вдоха, срабатывает естественный «тормоз» тела (через блуждающий нерв): пульс снижается, и злость теряет силу.",
    instruction: "Спокойный вдох на 4, плавный длинный выдох на 6.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Выдох", seconds: 6, kind: "out" },
    ],
    child: {
      title: "Задуваем свечку",
      instruction: "Вдохни на 4, а потом долго-долго дуй на 6, как будто задуваешь свечку на торте.",
      why: "Когда злишься, внутри как будто горит огонёк. Долгий выдох-задувание тушит его, и злость уходит.",
      phases: [
        { name: "Вдох", seconds: 4, kind: "in" },
        { name: "Задуваем свечку", seconds: 6, kind: "out" },
      ],
    },
  },
  {
    id: "panika",
    situation: "Накрывает паника",
    title: "Дыхание «4 — пауза 2 — выдох 6»",
    basis: "Мягкое замедляющее дыхание без долгих задержек.",
    why: "В панике дыхание частит, кислорода будто не хватает — и страх растёт. Спокойный вдох, короткая пауза и длинный выдох разрывают этот круг, не пугая нехваткой воздуха.",
    instruction: "Вдох на 4, маленькая пауза на 2, длинный выдох на 6.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Пауза", seconds: 2, kind: "hold" },
      { name: "Выдох", seconds: 6, kind: "out" },
    ],
    child: {
      title: "Спокойное дыхание",
      instruction: "Вдохни на 4, маленькая пауза на 2 и длинный спокойный выдох на 6. Дыши не спеша.",
      why: "Когда очень страшно, дыхание частит. Медленный длинный выдох говорит телу: воздуха хватает, можно успокоиться.",
      phases: [
        { name: "Вдох", seconds: 4, kind: "in" },
        { name: "Пауза", seconds: 2, kind: "hold" },
        { name: "Долгий выдох", seconds: 6, kind: "out" },
      ],
    },
  },
  {
    id: "grust",
    situation: "Грустно, тяжело на душе",
    title: "Дыхание животом (диафрагмальное)",
    basis: "Диафрагмальное дыхание — опора телесных практик работы с тяжёлыми состояниями.",
    why: "Когда тяжело на душе, дыхание становится поверхностным, грудным. Глубокое дыхание животом с длинным выдохом мягко успокаивает и возвращает телу опору.",
    instruction: "Положи ладонь на живот. Вдох — живот плавно поднимается на 4, медленный выдох — опускается на 6.",
    phases: [
      { name: "Вдох животом", seconds: 4, kind: "in" },
      { name: "Медленный выдох", seconds: 6, kind: "out" },
    ],
    child: {
      title: "Надуваем шарик",
      instruction: "Положи ладошки на животик. Вдох — животик надувается как шарик на 4. Выдох — шарик медленно сдувается на 6.",
      why: "Дыхание животиком-шариком успокаивает. Большой выдох уносит грусть, как будто шарик улетает в небо.",
      phases: [
        { name: "Надуваем шарик", seconds: 4, kind: "in" },
        { name: "Сдуваем шарик", seconds: 6, kind: "out" },
      ],
    },
  },
  {
    id: "fokus",
    situation: "Не могу сосредоточиться",
    title: "Ровное дыхание (5-5)",
    basis: "Когерентное дыхание — около 6 спокойных вдохов в минуту.",
    why: "Ровные вдохи и выдохи примерно по 5 секунд (около 6 дыханий в минуту) выравнивают работу сердца и нервной системы — голова проясняется, внимание возвращается к делу.",
    instruction: "Спокойный вдох на 5 и такой же плавный выдох на 5, без задержек.",
    phases: [
      { name: "Вдох", seconds: 5, kind: "in" },
      { name: "Выдох", seconds: 5, kind: "out" },
    ],
    child: {
      title: "Дыхание-качели",
      instruction: "Вдохни спокойно на 5 и так же плавно выдохни на 5, без остановок — как качели туда-сюда.",
      why: "Ровное дыхание-качели помогает голове проясниться, и легче снова взяться за дело.",
      phases: [
        { name: "Вдох", seconds: 5, kind: "in" },
        { name: "Выдох", seconds: 5, kind: "out" },
      ],
    },
  },
  {
    id: "sos",
    situation: "SOS — быстро успокоиться",
    title: "Физиологический вздох (двойной вдох — длинный выдох)",
    basis: "«Физиологический вздох» — самый быстрый способ снизить возбуждение; исследован в Стэнфорде (лаборатория Хубермана).",
    why: "Два вдоха подряд расправляют лёгкие, а длинный выдох резко сбрасывает напряжение. Успокоение наступает за несколько повторов — быстрее, чем у других техник.",
    instruction: "Вдох носом, сверху добери ещё немного воздуха — и длинный спокойный выдох ртом. Повтори 3–5 раз.",
    // scale — насколько раздуть круг в этой фазе (для двойного вдоха).
    phases: [
      { name: "Вдох", seconds: 2, kind: "in", scale: 0.9 },
      { name: "Добери воздуха", seconds: 1, kind: "in", scale: 1 },
      { name: "Долгий выдох", seconds: 5, kind: "out" },
    ],
    child: {
      title: "Дыхание-спасатель",
      instruction: "Вдохни носиком, потом ещё чуть-чуть добери воздуха сверху — и долго-долго выдохни ртом. Повтори несколько раз.",
      why: "Два вдоха и длинный выдох быстро прогоняют страх и слёзы — как будто нажал волшебную кнопку «успокоиться».",
      phases: [
        { name: "Вдох", seconds: 2, kind: "in", scale: 0.9 },
        { name: "Ещё вдох", seconds: 1, kind: "in", scale: 1 },
        { name: "Долгий выдох", seconds: 5, kind: "out" },
      ],
    },
  },
];

// Находим на странице нужные элементы (экраны и поля техники).
const screenChoice = document.getElementById("screen-choice");
const screenTechnique = document.getElementById("screen-technique");
const backButton = document.getElementById("back-button");

// Элементы зоны дыхания.
const circle = document.getElementById("breath-circle");
const phaseName = document.getElementById("phase-name");
const phaseCount = document.getElementById("phase-count");
const startButton = document.getElementById("start-button");

// Кнопки переключателя режима и вступительный текст.
const modeButtons = document.querySelectorAll(".mode-btn");
const choiceIntro = document.getElementById("choice-intro");

// Техника, открытая сейчас (нужна, чтобы знать её фазы дыхания).
let currentTechnique = null;
// Фазы дыхания текущего сеанса (зависят от режима: взрослый/детский).
let currentPhases = [];

// Режим подачи: "adult" или "child". Запоминаем выбор между заходами.
let mode = localStorage.getItem("mode") === "child" ? "child" : "adult";

// Звёздочки (геймификация детского режима).
const starsPanel = document.getElementById("stars-panel");
const starsCount = document.getElementById("stars-count");
const starsPraise = document.getElementById("stars-praise");

// Сколько всего звёздочек накоплено (хранится между заходами).
let totalStars = Number(localStorage.getItem("stars")) || 0;

// Короткие похвалы, показываем по очереди случайно после каждого круга.
const praises = ["Молодец! 🌟", "Здорово дышишь!", "Ты справляешься!", "Супер! ⭐", "Так держать!"];

// Обновить надпись со счётом и показать/спрятать панель под режим.
function updateStarsUI() {
  starsCount.textContent = totalStars;
  starsPanel.hidden = mode !== "child";
}

// Один круг дыхания завершён: даём звёздочку и хвалим (только в детском режиме).
function onCycleComplete() {
  if (mode !== "child") return;
  totalStars += 1;
  localStorage.setItem("stars", totalStars);
  updateStarsUI();

  // Случайная похвала + короткая анимация «прыжка».
  starsPraise.textContent = praises[Math.floor(Math.random() * praises.length)];
  starsPanel.classList.remove("pop");
  void starsPanel.offsetWidth; // перезапуск анимации
  starsPanel.classList.add("pop");
}

// Применить режим: подсветить нужную кнопку, переключить оформление и текст.
function applyMode() {
  document.body.classList.toggle("mode-child", mode === "child");
  modeButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.mode === mode);
  });
  choiceIntro.textContent =
    mode === "child"
      ? "Выбери картинку — и подышим вместе. Это поможет успокоиться."
      : "Выбери, что сейчас происходит — подберём короткую технику.";

  // Подписи карточек и кнопки SOS — свои для каждого режима.
  document.querySelectorAll("[data-child]").forEach((el) => {
    el.textContent = mode === "child" ? el.dataset.child : el.dataset.adult;
  });
}

// Вернуть тексты и фазы под текущий режим (в детском — детская версия, если есть).
function contentFor(tech) {
  if (mode === "child" && tech.child) {
    return {
      title: tech.child.title,
      instruction: tech.child.instruction,
      why: tech.child.why,
      phases: tech.child.phases,
    };
  }
  return {
    title: tech.title,
    instruction: tech.instruction,
    why: tech.why,
    phases: tech.phases,
  };
}

// Показать экран техники по её id и заполнить тексты.
function openTechnique(id) {
  // Ищем технику с таким id в нашем списке.
  const tech = techniques.find((t) => t.id === id);
  if (!tech) return; // на всякий случай: если не нашли — ничего не делаем

  currentTechnique = tech;
  const content = contentFor(tech); // тексты и фазы под текущий режим
  currentPhases = content.phases;
  resetBreathing(); // на случай, если осталось от прошлого раза

  // Подставляем тексты в поля второго экрана.
  document.getElementById("tech-title").textContent = content.title;
  document.getElementById("tech-instruction").textContent = content.instruction;
  document.getElementById("tech-why").textContent = content.why;

  // «На чём основана» — научная справка, нужна во взрослом режиме; в детском прячем карточку.
  const basisCard = document.getElementById("tech-basis-card");
  if (mode === "child") {
    basisCard.hidden = true;
  } else {
    basisCard.hidden = false;
    document.getElementById("tech-basis").textContent = tech.basis;
  }

  // Готовим панель звёздочек: показываем счёт, очищаем прошлую похвалу.
  starsPraise.textContent = "";
  updateStarsUI();

  // Прячем экран выбора, показываем экран техники.
  screenChoice.hidden = true;
  screenTechnique.hidden = false;
}

// Вернуться к экрану выбора.
function goBack() {
  stopBreathing(); // останавливаем дыхание, если шло
  screenTechnique.hidden = true;
  screenChoice.hidden = false;
}

// --- Логика дыхания ---

let isRunning = false; // идёт ли сейчас сеанс
let phaseTimeout = null; // таймер перехода к следующей фазе
let countInterval = null; // таймер посекундного отсчёта

// Проигрываем одну фазу, по её окончании переходим к следующей (по кругу).
function runPhase(index) {
  const phase = currentPhases[index];

  phaseName.textContent = phase.name;

  // Масштаб круга под фазу: вдох — большой, выдох — маленький, задержка — без изменений.
  if (phase.kind === "in") {
    circle.style.transitionDuration = phase.seconds + "s";
    circle.style.transform = "scale(" + (phase.scale ?? 1) + ")";
  } else if (phase.kind === "out") {
    circle.style.transitionDuration = phase.seconds + "s";
    circle.style.transform = "scale(" + (phase.scale ?? 0.7) + ")";
  }
  // для "hold" размер оставляем как есть

  // Обратный отсчёт секунд внутри фазы.
  let remaining = phase.seconds;
  phaseCount.textContent = remaining;
  countInterval = setInterval(() => {
    remaining -= 1;
    phaseCount.textContent = remaining > 0 ? remaining : "";
    if (remaining <= 0) clearInterval(countInterval);
  }, 1000);

  // Через длительность фазы — следующая фаза (зацикливаемся через остаток от деления).
  phaseTimeout = setTimeout(() => {
    const next = (index + 1) % currentPhases.length;
    if (next === 0) onCycleComplete(); // вернулись к началу — круг завершён
    runPhase(next);
  }, phase.seconds * 1000);
}

// Запустить сеанс с первой фазы.
function startBreathing() {
  if (!currentTechnique) return;
  isRunning = true;
  startButton.textContent = "Стоп";
  runPhase(0);
}

// Остановить и сбросить таймеры (но круг не трогаем).
function stopBreathing() {
  isRunning = false;
  startButton.textContent = "Начать";
  clearTimeout(phaseTimeout);
  clearInterval(countInterval);
}

// Полный сброс: остановить и вернуть круг в исходный вид.
function resetBreathing() {
  stopBreathing();
  circle.style.transitionDuration = "0.4s";
  circle.style.transform = "scale(0.7)";
  phaseName.textContent = "Готовы?";
  phaseCount.textContent = "";
}

// Кнопка «Начать»/«Стоп» переключает сеанс.
startButton.addEventListener("click", () => {
  if (isRunning) {
    resetBreathing();
  } else {
    startBreathing();
  }
});

// Включаем фонового помощника (service worker) для работы оффлайн.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

// Вешаем обработчик клика на каждую карточку.
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => openTechnique(card.dataset.id));
});

// Кнопка SOS — быстрая техника для экстренного успокоения.
document.getElementById("sos-button").addEventListener("click", () => openTechnique("sos"));

// Кнопка «Назад».
backButton.addEventListener("click", goBack);

// Переключатель режима: меняем режим, запоминаем выбор, обновляем оформление.
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    mode = btn.dataset.mode;
    localStorage.setItem("mode", mode);
    applyMode();
  });
});

// Применяем сохранённый режим при загрузке страницы.
applyMode();
