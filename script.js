// Список техник. Каждая привязана к карточке-ситуации через поле id.
// phases — фазы дыхания по очереди:
//   name    — что показать на экране,
//   seconds — сколько секунд длится,
//   kind    — для анимации: 'in' вдох (круг растёт), 'hold' задержка, 'out' выдох (круг сжимается).
const techniques = [
  {
    id: "trevoga",
    situation: "Тревога перед важным",
    title: "Бокс-дыхание (4-4-4-4)",
    basis: "Техника из практики спецслужб и спортсменов для собранности под давлением.",
    why: "Ровный ритм с равными фазами помогает мозгу переключиться с тревоги на спокойный контроль.",
    instruction: "Дыши по квадрату: вдох — задержка — выдох — задержка, каждое по 4 секунды.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Задержка", seconds: 4, kind: "hold" },
      { name: "Выдох", seconds: 4, kind: "out" },
      { name: "Задержка", seconds: 4, kind: "hold" },
    ],
  },
  {
    id: "son",
    situation: "Не могу уснуть",
    title: "Дыхание 4-7-8",
    basis: "Дыхательное упражнение, популяризированное доктором Эндрю Вейлом.",
    why: "Долгий выдох замедляет сердцебиение и мягко настраивает тело на отдых и сон.",
    instruction: "Вдох носом на 4, задержка на 7, медленный выдох ртом на 8.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Задержка", seconds: 7, kind: "hold" },
      { name: "Выдох", seconds: 8, kind: "out" },
    ],
  },
  {
    id: "zlost",
    situation: "Злюсь",
    title: "Удлинённый выдох (4-6)",
    basis: "Опирается на работу блуждающего нерва (вагуса).",
    why: "Когда выдох длиннее вдоха, включается «тормоз» нервной системы — напряжение спадает.",
    instruction: "Спокойный вдох на 4, плавный длинный выдох на 6.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Выдох", seconds: 6, kind: "out" },
    ],
  },
  {
    id: "panika",
    situation: "Паника",
    title: "Дыхание «4 — пауза 2 — выдох 6»",
    basis: "Мягкое замедляющее дыхание без долгих задержек.",
    why: "Короткая пауза и длинный выдох возвращают дыханию ровный ритм, не пугая короткой нехваткой воздуха.",
    instruction: "Вдох на 4, маленькая пауза на 2, длинный выдох на 6.",
    phases: [
      { name: "Вдох", seconds: 4, kind: "in" },
      { name: "Пауза", seconds: 2, kind: "hold" },
      { name: "Выдох", seconds: 6, kind: "out" },
    ],
  },
  {
    id: "rebenok",
    situation: "Ребёнок расстроен",
    title: "Дыхание животом «надуваем шарик»",
    basis: "Диафрагмальное дыхание в игровой подаче для детей.",
    why: "Простой понятный образ помогает ребёнку переключиться, а долгий выдох успокаивает.",
    instruction: "Вдох — животик надувается как шарик на 4, выдох — шарик медленно сдувается на 6.",
    phases: [
      { name: "Надуваем шарик (вдох)", seconds: 4, kind: "in" },
      { name: "Сдуваем шарик (выдох)", seconds: 6, kind: "out" },
    ],
  },
  {
    id: "fokus",
    situation: "Не могу сосредоточиться",
    title: "Ровное дыхание (5-5)",
    basis: "Когерентное дыхание — около 6 спокойных вдохов в минуту.",
    why: "Ровный неторопливый ритм успокаивает нервную систему и помогает вернуть внимание к делу.",
    instruction: "Спокойный вдох на 5 и такой же плавный выдох на 5, без задержек.",
    phases: [
      { name: "Вдох", seconds: 5, kind: "in" },
      { name: "Выдох", seconds: 5, kind: "out" },
    ],
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

// Техника, открытая сейчас (нужна, чтобы знать её фазы дыхания).
let currentTechnique = null;

// Показать экран техники по её id и заполнить тексты.
function openTechnique(id) {
  // Ищем технику с таким id в нашем списке.
  const tech = techniques.find((t) => t.id === id);
  if (!tech) return; // на всякий случай: если не нашли — ничего не делаем

  currentTechnique = tech;
  resetBreathing(); // на случай, если осталось от прошлого раза

  // Подставляем тексты в поля второго экрана.
  document.getElementById("tech-title").textContent = tech.title;
  document.getElementById("tech-basis").textContent = "На чём основана: " + tech.basis;
  document.getElementById("tech-instruction").textContent = tech.instruction;
  document.getElementById("tech-why").textContent = "Почему помогает: " + tech.why;

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
  const phase = currentTechnique.phases[index];

  phaseName.textContent = phase.name;

  // Масштаб круга под фазу: вдох — большой, выдох — маленький, задержка — без изменений.
  if (phase.kind === "in") {
    circle.style.transitionDuration = phase.seconds + "s";
    circle.style.transform = "scale(1)";
  } else if (phase.kind === "out") {
    circle.style.transitionDuration = phase.seconds + "s";
    circle.style.transform = "scale(0.6)";
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
    const next = (index + 1) % currentTechnique.phases.length;
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
  circle.style.transform = "scale(0.6)";
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

// Кнопка «Назад».
backButton.addEventListener("click", goBack);
