/* ==========================================================
   For Zafer, from Sumyuktha: timed quiz + the big question
   ========================================================== */

/* ==========================================================
   ✏️ CONFIG: everything personal lives here. Edit freely!
   You never need to touch anything below the content blocks.
   ========================================================== */
const CONFIG = {
  from: "Sumyuktha",                 // who made the game (shown in texts)
  to: "Zafer",                       // who plays it

  greeting: "Hey Zafer 💕",          // small line above the title
  introText:
    "{km} km between us, so I made you a tiny quiz. " +
    "Answer fast, answer cute, and there's a little question for you at the end 🎀",

  // Where we each are. "me" = the sender, "them" = the player.
  // tz must be an IANA zone so clocks are right on any phone. lat/lon are for the distance.
  me:   { city: "Bangalore", flag: "🇮🇳", tz: "Asia/Kolkata", lat: 12.9716, lon: 77.5946 },
  them: { city: "Muscat",    flag: "🇴🇲", tz: "Asia/Muscat",  lat: 23.588,  lon: 58.3829 },

  // Seconds per question. 0 turns the timer off.
  timerSeconds: 20,

  // Name of the score bar on the results screen.
  meterName: "Cute-o-meter",

  // The final question. "highlight" is shown in the curly handwritten font.
  ask: { before: "So… will you spend tonight on a", highlight: "cosy video call", after: "with me?" },

  // The event. date + time are the wall-clock time written in event.tz (any IANA zone).
  event: {
    date: "2026-10-23",              // YYYY-MM-DD
    time: "23:00",                   // 24h HH:MM
    tz: "Asia/Muscat",               // the zone that date/time is written in
    durationMinutes: 180,            // "all evening" → 3 hours (used for the calendar + countdown)
    calendarTitle: "Video-call night: Zafer & Sumyuktha 💖",
    calendarLocation: "WhatsApp video call",
    // Cards on the final screen. Placeholders like {theirEventTime} are filled in automatically.
    details: [
      { icon: "📱", label: "Where",      value: "WhatsApp video call" },
      { icon: "🌙", label: "When",       value: "All evening, from {theirEventTime} your time" },
      { icon: "🧸", label: "Plan",       value: "Just us. No plans, no agenda, talking till late" },
      { icon: "😴", label: "Dress code", value: "Cosy & cute. Pyjamas welcome" }, // editable example
    ],
  },

  successTitle: "Yaaay! It's a date 🥰",
  bigMessage: "Miss u 🥺",          // the big handwritten line on the last screen
  message: "Two screens, {km} km, zero network excuses. Keep your phone close tonight 📱💞",
  signoff: "-sumyuktha 💞",

  // WhatsApp replies go to this number: digits only, with country code. "" hides the buttons.
  whatsapp: {
    number: "916281161292",
    text: "YES! 💖 It's a date tonight.",
    declineLabel: "Not tonight? Tell me honestly 💬",   // small link under YES / No
    declineText: "Not tonight 🙈 Can we pick another night?",
  },

  // Optional live notifications to the creator's phone via ntfy.sh. Off for this game.
  // To turn on: set enabled to true, subscribe to the topic in the ntfy app first.
  ntfy: {
    enabled: false,
    server: "https://ntfy.sh",
    topic: "pp-date-oct26-40af4188026a",   // pp-<type>-<mmmyy>-<12 hex>
    label: "Date Oct 26",                   // prefixed to every title
    clickUrl: "",                           // optional: opened when the notification is tapped
    priorityOnFinish: 4,                    // 1–5, only for the final score / YES
  },
  // Shown on the intro when notifications are on. "" hides it.
  shareNotice: "Your answers are shared with {from} 💌",

  brand: false,                      // true shows a small "Made with Play Planet" line
};

/* ==========================================================
   ✏️ QUIZ QUESTIONS (editable examples, written in Sumyuktha's voice)
   correct: index of the right option (0 = first), or "all" for a trick question.
   type "distance" / "time" / "eventTime" build their options live from CONFIG.
   Placeholders: {from} {to} {km} {myCity} {theirCity} {myTime} {diff}
                 {myEventTime} {theirEventTime}
   ========================================================== */
const QUESTIONS = [
  {
    emoji: "🥺",
    q: "First things first. How much do I miss you right now?",
    options: ["A little", "A lot", "Sooo much", "More than {km} km's worth"],
    correct: 3,
    right: "Correct! Every single one of those {km} km 💞",
    wrong: "Way more than that! Try {km} km's worth of missing you 🥺",
  },
  {
    type: "distance",
    emoji: "✈️",
    q: "How far apart are we right now?",
    right: "Correct! But tonight it's going to feel like 0 km 🫶",
    wrong: "It's about {km} km… not that I'm counting. (I'm counting.)",
  },
  {
    type: "time",
    emoji: "🕰️",
    q: "Quick! What time is it for me in {myCity} right now?",
    right: "Yes! I'm {diff}… already waiting for tonight 😌",
    wrong: "It's {myTime} here. I'm {diff}, remember? 🙈",
  },
  {
    type: "eventTime",
    emoji: "🌙",
    q: "Our call starts at {theirEventTime} your time. What time is that for me?",
    right: "Yes! {myEventTime} in {myCity}. Past midnight for me… so worth it 🌙",
    wrong: "It's {myEventTime} for me! Past midnight, but I'll be wide awake 🌙",
  },
  {
    emoji: "🧸",
    q: "What's the best way to end a long day?",
    options: ["Sleep", "Food", "Netflix", "A video call with me"],
    correct: 3,
    right: "Correct answer, {to}. You're learning 😌",
    wrong: "Hmm, close… but the answer is me. It's always me 🧸",
  },
  {
    emoji: "📶",
    q: "The call drops right in the middle of something cute. What do we do?",
    options: ["Blame the Wi-Fi", "Call back in 2 seconds", "Spam \"hello??\" texts", "All of the above, obviously"],
    correct: "all",
    right: "Trick question! We do all of it, every single time 😂",
  },
  {
    emoji: "😴",
    q: "Who's falling asleep first on tonight's call?",
    options: ["Me", "You", "Both of us, mid-sentence", "Nobody. It's an all-evening thing 🌙"],
    correct: 3,
    right: "Correct! No sleeping allowed tonight 😤💕",
    wrong: "Wrong! Nobody sleeps. It's an all-evening call 😤💕",
  },
  {
    emoji: "🎁",
    q: "If I could send you one thing through the screen right now, it would be…",
    options: ["Chocolate", "A big hug", "Filter coffee from {myCity}", "My charger, so you can't say \"low battery\""],
    correct: 1,
    right: "Correct! A huge one. Consider it sent 🤗",
    wrong: "Cute guess, but it's a hug. A really long one 🤗",
  },
  {
    emoji: "🙂",
    q: "When I text \"I'm fine 🙂\", what does it actually mean?",
    options: ["I'm fine", "Call me", "Pay attention to me", "B and C, obviously"],
    correct: 3,
    right: "See? You get me 😌",
    wrong: "Classic mistake. It means call me AND pay attention to me 🙂",
  },
  {
    emoji: "💞",
    q: "Last one! Who's the lucky one here?",
    options: ["Me", "You", "Both of us", "The Wi-Fi, it gets to carry our calls"],
    correct: "all",
    right: "Trick question! Every answer is right, especially the Wi-Fi one 😂💞",
  },
];

/* ===== Playful lines ===== */
const TIMEOUT_LINES = ["⏰ Too slow, cutie! ", "⏰ Time's up! ", "⏰ Were you staring at my photo? ", "⏰ Tick tock! "];
const FACES = { idle: "🐰", right: "🥰", wrong: "🙈", timeout: "😴", trick: "😜" };
const NO_TEXTS = ["No", "Are you sure?", "Really?", "Think again!", "Network error 📶", "Nope 🙈", "Can't catch me!", "Pleeease? 🥺", "I'm pouting now 😤", "Just tap YES 😌", "Almost gone…", "bye 👋"];
const YES_TEXTS = ["YES! 💖", "YES!! 💖", "Yes please 🥰", "Obviously YES 💘", "YES YES YES 💞", "Tap me! 💖", "I'm right here 👉💖", "Say yes 🥺💖"];
const HINTS = [
  "Choose wisely… 😇",
  "Whoops! That button has bad signal 📶",
  "It hopped away. Bunnies are fast 🐰",
  "The YES button is looking extra cute now 👀",
  "'No' is not available in Muscat right now 🌏",
  "It's getting smaller… just like the distance between us 🫶",
  "Resistance is futile 💘",
  "Okay, you're persistent. I like that 🥰",
  "Pssst… the big pink one ➡️ YES!",
];
const MAX_NO_TRIES = 12; // after this many dodges the No button gives up and disappears

/* ==========================================================
   Helpers
   ========================================================== */
const $ = (id) => document.getElementById(id);
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const QUIET = new URLSearchParams(location.search).has("quiet");
const SESSION = Math.random().toString(36).slice(2, 6);

const fmt = (date, tz, opts) => new Intl.DateTimeFormat("en-US", { timeZone: tz, ...opts }).format(date);
const fmtTime = (date, tz) => fmt(date, tz, { hour: "numeric", minute: "2-digit" });
const fmtDate = (date, tz) => fmt(date, tz, { weekday: "short", day: "numeric", month: "short" });
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad = (n) => String(n).padStart(2, "0");

/** Minutes a zone is ahead of UTC at a given instant. */
function tzOffsetMin(tz, date = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(date).map((x) => [x.type, x.value])
  );
  return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - date.getTime()) / 60000);
}

/** Convert a wall-clock date+time in an IANA zone to a real Date (UTC instant). Two passes handle DST. */
function zonedToDate(dateStr, timeStr, tz) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  const wanted = Date.UTC(y, m - 1, d, hh, mm);
  let ts = wanted - tzOffsetMin(tz, new Date(wanted)) * 60000;
  ts = wanted - tzOffsetMin(tz, new Date(ts)) * 60000;
  return new Date(ts);
}

/** "1½ hours ahead of you" style text for sender vs player, computed live. */
function diffText() {
  const mins = tzOffsetMin(CONFIG.me.tz) - tzOffsetMin(CONFIG.them.tz);
  if (mins === 0) return "in the same time zone as you";
  const a = Math.abs(mins), h = Math.floor(a / 60), m = a % 60;
  let t;
  if (h === 0) t = `${m} minutes`;
  else if (m === 0) t = `${h} hour${h > 1 ? "s" : ""}`;
  else if (m === 30) t = `${h}½ hours`;
  else t = `${h} h ${m} min`;
  return `${t} ${mins > 0 ? "ahead of" : "behind"} you`;
}

function distanceKm(a, b) {
  const r = (x) => (x * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lon - a.lon) / 2) ** 2;
  return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)));
}
const KM = distanceKm(CONFIG.me, CONFIG.them);
const kmText = (n) => n.toLocaleString("en-US");

const EVENT_START = zonedToDate(CONFIG.event.date, CONFIG.event.time, CONFIG.event.tz);
const EVENT_END = new Date(EVENT_START.getTime() + CONFIG.event.durationMinutes * 60000);

function fill(text) {
  const now = new Date();
  return String(text)
    .replaceAll("{from}", CONFIG.from)
    .replaceAll("{to}", CONFIG.to)
    .replaceAll("{km}", kmText(KM))
    .replaceAll("{myCity}", CONFIG.me.city)
    .replaceAll("{theirCity}", CONFIG.them.city)
    .replaceAll("{myTime}", fmtTime(now, CONFIG.me.tz))
    .replaceAll("{theirTime}", fmtTime(now, CONFIG.them.tz))
    .replaceAll("{diff}", diffText())
    .replaceAll("{myEventTime}", fmtTime(EVENT_START, CONFIG.me.tz))
    .replaceAll("{theirEventTime}", fmtTime(EVENT_START, CONFIG.them.tz))
    .replaceAll("{eventDate}", fmtDate(EVENT_START, CONFIG.them.tz));
}

/** Fire-and-forget phone notification via ntfy (JSON body, no custom headers → no CORS preflight). */
function notify(title, message, tags = [], priority) {
  const n = CONFIG.ntfy;
  if (QUIET || !n.enabled || !n.topic) return;
  try {
    const body = { topic: n.topic, title: `[${n.label}] ${title}`, message: `${message}\n#${SESSION}`, tags };
    if (priority) body.priority = priority;
    if (n.clickUrl) body.click = n.clickUrl;
    fetch(n.server.replace(/\/$/, "") + "/", { method: "POST", body: JSON.stringify(body), keepalive: true }).catch(() => {});
  } catch (_) { /* never break the page over a notification */ }
}

function showScreen(from, to) {
  const swap = () => {
    from.hidden = true;
    from.classList.remove("leaving");
    to.hidden = false;
    to.scrollTop = 0;
  };
  if (REDUCED) return swap();
  from.classList.add("leaving");
  setTimeout(swap, 340);
}

/* ===== Background hearts, bows & sparkles ===== */
(function makeFloaters() {
  if (REDUCED) return;
  const box = $("bgFloat");
  const emojis = ["💗", "🎀", "💕", "✨", "💜", "🌸", "💞", "🤍", "🫧"];
  const count = window.innerWidth < 600 ? 13 : 22;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 14 + Math.random() * 20 + "px";
    s.style.animationDuration = 11 + Math.random() * 14 + "s";
    s.style.animationDelay = -Math.random() * 20 + "s";
    box.appendChild(s);
  }
})();

/** Small hearts popping out of an element (correct answers, YES). */
function sparkleFrom(el, n = 8) {
  if (REDUCED || !el) return;
  const r = el.getBoundingClientRect();
  const icons = ["💖", "💜", "✨", "💕"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = icons[i % icons.length];
    s.style.left = r.left + r.width * (0.2 + Math.random() * 0.6) + "px";
    s.style.top = r.top + r.height / 2 - 10 + "px";
    const ang = (Math.PI * 2 * i) / n;
    s.style.setProperty("--dx", Math.cos(ang) * (40 + Math.random() * 30) + "px");
    s.style.setProperty("--dy", Math.sin(ang) * (30 + Math.random() * 25) - 20 + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
}

/* ==========================================================
   1. INTRO
   ========================================================== */
document.title = `For ${CONFIG.to} 💌`;
$("greeting").textContent = fill(CONFIG.greeting);
$("introText").textContent = fill(CONFIG.introText);
$("introSmall").textContent =
  `${QUESTIONS.length} questions` +
  (CONFIG.timerSeconds > 0 ? ` · ${CONFIG.timerSeconds} seconds each` : " · no pressure") +
  " · maybe a trick question or two 😏";
if (CONFIG.ntfy.enabled && CONFIG.shareNotice) {
  $("shareNotice").textContent = fill(CONFIG.shareNotice);
  $("shareNotice").hidden = false;
}
$("myCity").textContent = $("tMyCity").textContent = CONFIG.me.city;
$("theirCity").textContent = $("tTheirCity").textContent = CONFIG.them.city;
$("myFlag").textContent = $("tMyFlag").textContent = CONFIG.me.flag;
$("theirFlag").textContent = $("tTheirFlag").textContent = CONFIG.them.flag;
$("distance").textContent = kmText(KM) + " km apart";
$("meterName").textContent = CONFIG.meterName;
$("brand").hidden = !CONFIG.brand;

function tickClocks() {
  const now = new Date();
  $("myClock").textContent = fmtTime(now, CONFIG.me.tz);
  $("theirClock").textContent = fmtTime(now, CONFIG.them.tz);
}
tickClocks();
setInterval(tickClocks, 15000);

notify(`👀 ${CONFIG.to} opened the page`, `${fmtTime(new Date(), CONFIG.them.tz)} his time.`, ["eyes"]);

$("startBtn").addEventListener("click", () => {
  showScreen($("introScreen"), $("quizScreen"));
  setTimeout(renderQuestion, REDUCED ? 0 : 340);
});

/* ==========================================================
   2. QUIZ (with per-question timer)
   ========================================================== */
let qIndex = 0;
let score = 0;
let answered = false;
let timerRaf = null;
let deadline = 0;
const picked = []; // chosen answer text per question (for the WhatsApp reply)

/** Plausible wrong times around a correct instant, all different from the right one. */
function timeOptions(instant, tz, extra) {
  const right = fmtTime(instant, tz);
  const set = new Set([right]);
  for (const min of shuffle([90, -90, 60, -60, 150, -30, 30])) {
    if (set.size >= 3) break;
    set.add(fmtTime(new Date(instant.getTime() + min * 60000), tz));
  }
  const opts = shuffle([...set]);
  opts.push(extra);
  return { options: opts, correct: opts.indexOf(right) };
}

/** Build options for the live "distance", "time" and "eventTime" questions. */
function buildDynamic(item) {
  if (item.type === "distance") {
    const right = kmText(KM) + " km";
    const opts = shuffle([right, kmText(Math.round((KM * 0.45) / 10) * 10) + " km", kmText(Math.round((KM * 2.3) / 10) * 10) + " km", "Too far 😢"]);
    return { options: opts, correct: opts.indexOf(right) };
  }
  if (item.type === "time") return timeOptions(new Date(), CONFIG.me.tz, "Time stops when I'm talking to you ⏳");
  if (item.type === "eventTime") return timeOptions(EVENT_START, CONFIG.me.tz, "Who cares, I'll be awake 🌙");
  return { options: item.options.map(fill), correct: item.correct };
}

function setFace(kind) {
  const f = $("qFace");
  f.textContent = FACES[kind] || FACES.idle;
  f.classList.remove("react");
  void f.offsetWidth;
  if (kind !== "idle") f.classList.add("react");
}

function renderQuestion() {
  const item = QUESTIONS[qIndex];
  const { options, correct } = buildDynamic(item);
  item._live = { options, correct };
  answered = false;

  $("qCount").textContent = `Question ${qIndex + 1} of ${QUESTIONS.length}`;
  $("qScore").textContent = `💖 ${score}`;
  $("qProgress").style.width = (qIndex / QUESTIONS.length) * 100 + "%";
  $("qEmoji").textContent = item.emoji || "💭";
  $("qText").textContent = fill(item.q);
  $("qFeedback").textContent = "";
  $("qFeedback").className = "feedback";
  setFace("idle");
  $("nextBtn").hidden = true;

  const box = $("qOptions");
  box.textContent = "";
  options.forEach((text, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option";
    const badge = document.createElement("b");
    badge.textContent = "ABCD"[i] || String(i + 1);
    const span = document.createElement("span");
    span.textContent = text;
    b.append(badge, span);
    b.addEventListener("click", () => answer(i, b));
    box.appendChild(b);
  });

  const body = $("qBody");
  body.classList.remove("swap");
  void body.offsetWidth;
  body.classList.add("swap");

  startTimer();
}

function startTimer() {
  stopTimer();
  const secs = CONFIG.timerSeconds;
  $("qTimer").hidden = $("qTimebar").hidden = !(secs > 0);
  if (!(secs > 0)) return;
  deadline = Date.now() + secs * 1000;
  const tick = () => {
    const left = Math.max(0, deadline - Date.now());
    const s = Math.ceil(left / 1000);
    $("qTimerNum").textContent = s;
    $("qTimebarFill").style.width = (left / (secs * 1000)) * 100 + "%";
    const low = s <= 5;
    $("qTimer").classList.toggle("low", low);
    $("qTimebar").classList.toggle("low", low);
    if (left <= 0) { timerRaf = null; return timeUp(); }
    timerRaf = requestAnimationFrame(tick);
  };
  tick();
}
function stopTimer() {
  if (timerRaf) cancelAnimationFrame(timerRaf);
  timerRaf = null;
  $("qTimer").classList.remove("low");
  $("qTimebar").classList.remove("low");
}

function timeUp() {
  if (answered) return;
  answered = true;
  const item = QUESTIONS[qIndex];
  const { correct } = item._live;
  const isTrick = correct === "all";
  picked[qIndex] = "(ran out of time ⏰)";
  [...$("qOptions").children].forEach((b, j) => {
    b.disabled = true;
    b.classList.add(isTrick || j === correct ? "correct" : "dim");
  });
  const line = TIMEOUT_LINES[qIndex % TIMEOUT_LINES.length];
  $("qFeedback").textContent = line + fill(isTrick ? item.right : item.wrong || item.right);
  $("qFeedback").className = "feedback meh";
  setFace("timeout");
  notify(`Q${qIndex + 1} ⏰ timed out`, fill(item.q), ["alarm_clock"]);
  afterAnswer();
}

function answer(i, btn) {
  if (answered) return;
  answered = true;
  stopTimer();
  const item = QUESTIONS[qIndex];
  const { options, correct } = item._live;
  const isTrick = correct === "all";
  const ok = isTrick || i === correct;
  if (ok) score++;
  picked[qIndex] = options[i];

  [...$("qOptions").children].forEach((b, j) => {
    b.disabled = true;
    if (isTrick || j === correct) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
    else b.classList.add("dim");
  });

  const fb = $("qFeedback");
  fb.textContent = fill(ok ? item.right : item.wrong || item.right);
  fb.className = "feedback " + (ok ? "good" : "meh");
  setFace(isTrick ? "trick" : ok ? "right" : "wrong");
  if (ok) sparkleFrom(btn);

  notify(`Q${qIndex + 1} ${isTrick ? "🎭 trick" : ok ? "✅" : "❌"}`, `${fill(item.q)}\n→ ${options[i]}`, [ok ? "white_check_mark" : "x"]);
  afterAnswer();
}

function afterAnswer() {
  $("qScore").textContent = `💖 ${score}`;
  $("qProgress").style.width = ((qIndex + 1) / QUESTIONS.length) * 100 + "%";
  const last = qIndex === QUESTIONS.length - 1;
  $("nextBtn").textContent = last ? "See my results 💌" : "Next →";
  $("nextBtn").hidden = false;
  $("nextBtn").focus({ preventScroll: true });
}

$("nextBtn").addEventListener("click", () => {
  qIndex++;
  if (qIndex < QUESTIONS.length) return renderQuestion();
  showResults();
});

/* ==========================================================
   3. RESULTS + THE BIG QUESTION
   ========================================================== */
let noTries = 0;
let finalScore = 0;

const waLink = (text) => `https://wa.me/${CONFIG.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

function showResults() {
  stopTimer();
  finalScore = score;
  const pct = Math.round((score / QUESTIONS.length) * 100);
  const note =
    pct === 100 ? "Perfect score! You know us by heart 🥹💖"
    : pct >= 70 ? "Certified expert in us. Very impressive (and very cute) 😍"
    : pct >= 40 ? "Not bad! We'll revise together on the call 📚💕"
    : "Hmm… sounds like we need more calls to practise 😏";
  notify(`📊 Final score: ${score}/${QUESTIONS.length}`, note, ["bar_chart"], CONFIG.ntfy.priorityOnFinish);

  showScreen($("quizScreen"), $("askScreen"));
  const q = $("askQ");
  q.textContent = "";
  q.append(fill(CONFIG.ask.before) + " ");
  const s = document.createElement("span");
  s.className = "script";
  s.textContent = fill(CONFIG.ask.highlight);
  q.append(s, " " + fill(CONFIG.ask.after));
  $("hint").textContent = HINTS[0];
  $("meterNote").textContent = note;

  // an honest way out, always available
  if (CONFIG.whatsapp.number && CONFIG.whatsapp.declineLabel) {
    const d = $("declineLink");
    d.textContent = CONFIG.whatsapp.declineLabel;
    d.href = waLink(fill(CONFIG.whatsapp.declineText) + `\n(Quiz score: ${score}/${QUESTIONS.length})`);
    d.hidden = false;
    d.addEventListener("click", () => notify("💬 Tapped 'Not tonight'", "Opened WhatsApp to reply honestly.", ["speech_balloon"], CONFIG.ntfy.priorityOnFinish), { once: true });
  }

  // count the meter up
  setTimeout(() => {
    $("meterFill").style.width = pct + "%";
    if (REDUCED) { $("meterPct").textContent = pct + "%"; return; }
    let n = 0;
    const step = () => {
      n = Math.min(pct, n + Math.max(1, Math.round(pct / 40)));
      $("meterPct").textContent = n + "%";
      if (n < pct) requestAnimationFrame(step);
    };
    step();
  }, 450);
}

const noBtn = $("noBtn");
const yesBtn = $("yesBtn");

let lastDodge = 0;
function dodge(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  // one physical tap fires pointerdown + touchstart + click; count it once
  const now = Date.now();
  if (now - lastDodge < 350) return;
  lastDodge = now;
  noTries++;
  if (noTries === 1) notify("🙈 He tried to press No!", "First attempt. The button hopped away 🐰", ["see_no_evil"]);

  if (noTries >= MAX_NO_TRIES) {
    noBtn.hidden = true;
    $("hint").textContent = "The No button gave up 🏳️ (the honest-reply link is still there 💬)";
    yesBtn.style.setProperty("--yes-scale", 1.9);
    return;
  }

  noBtn.textContent = NO_TEXTS[Math.min(noTries, NO_TEXTS.length - 1)];
  yesBtn.textContent = YES_TEXTS[noTries % YES_TEXTS.length];
  $("hint").textContent = HINTS[Math.min(noTries, HINTS.length - 1)];
  noBtn.style.setProperty("--no-scale", Math.max(0.4, 1 - noTries * 0.07));
  yesBtn.style.setProperty("--yes-scale", Math.min(1.9, 1 + noTries * 0.09));

  // Jump somewhere on screen that isn't under the YES button.
  // Move it to <body> first: the glassy card's backdrop-filter would otherwise
  // make position:fixed relative to the card instead of the screen.
  if (noBtn.parentElement !== document.body) document.body.appendChild(noBtn);
  noBtn.classList.add("runaway");
  const vw = window.innerWidth, vh = window.innerHeight;
  const bw = noBtn.offsetWidth, bh = noBtn.offsetHeight;
  const yr = yesBtn.getBoundingClientRect();
  let x, y, tries = 0;
  do {
    x = 12 + Math.random() * Math.max(1, vw - bw - 24);
    y = 12 + Math.random() * Math.max(1, vh - bh - 24);
    tries++;
  } while (tries < 40 && x < yr.right + 16 && x + bw > yr.left - 16 && y < yr.bottom + 16 && y + bh > yr.top - 16);
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") dodge(e); });
noBtn.addEventListener("pointerdown", dodge);
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", dodge);

yesBtn.addEventListener("click", () => {
  notify(`💖 ${CONFIG.to} said YES!`, `${noTries ? `After ${noTries} "No" attempt${noTries > 1 ? "s" : ""}. ` : "Straight away! "}Score ${finalScore}/${QUESTIONS.length}. It's a date 🎉`, ["tada", "heart"], CONFIG.ntfy.priorityOnFinish);
  sparkleFrom(yesBtn, 12);
  noBtn.hidden = true;
  showScreen($("askScreen"), $("successScreen"));
  renderSuccess();
  setTimeout(confettiBurst, REDUCED ? 0 : 250);
});

/* ==========================================================
   4. SUCCESS
   ========================================================== */
let cdTimer = null;

function renderSuccess() {
  $("successTitle").textContent = fill(CONFIG.successTitle);
  $("bigMessage").textContent = fill(CONFIG.bigMessage);
  $("message").textContent = fill(CONFIG.message);
  $("signoff").textContent = fill(CONFIG.signoff);

  $("tMyTime").textContent = fmtTime(EVENT_START, CONFIG.me.tz);
  $("tMyDate").textContent = fmtDate(EVENT_START, CONFIG.me.tz) + " · my time";
  $("tTheirTime").textContent = fmtTime(EVENT_START, CONFIG.them.tz);
  $("tTheirDate").textContent = fmtDate(EVENT_START, CONFIG.them.tz) + " · your time";

  const ul = $("details");
  ul.textContent = "";
  CONFIG.event.details.forEach((d) => {
    const li = document.createElement("li");
    const icon = document.createElement("span");
    icon.textContent = d.icon;
    const wrap = document.createElement("div");
    const small = document.createElement("small");
    small.textContent = fill(d.label);
    const strong = document.createElement("strong");
    strong.textContent = fill(d.value);
    wrap.append(small, strong);
    li.append(icon, wrap);
    ul.appendChild(li);
  });

  $("tries").textContent = noTries
    ? `(It only took ${noTries} attempt${noTries > 1 ? "s" : ""} at "No" 😏)`
    : "(Straight to YES. I knew it 😌)";

  if (CONFIG.whatsapp.number) {
    const reply = [
      fill(CONFIG.whatsapp.text),
      `My quiz score: ${finalScore}/${QUESTIONS.length}`,
      ...picked.map((a, n) => `${n + 1}. ${a}`),
    ].join("\n");
    $("waBtn").href = waLink(reply);
    $("waBtn").hidden = false;
  }

  tickCountdown();
  if (!cdTimer) cdTimer = setInterval(tickCountdown, 1000);
}

function tickCountdown() {
  const now = Date.now();
  const cd = $("countdown");
  const digits = cd.querySelector(".countdown__digits");
  if (now >= EVENT_END.getTime()) {
    $("cdLabel").textContent = "That was our night. Thank you for saying yes 🥰";
    digits.hidden = true;
    cd.classList.remove("live");
    return;
  }
  if (now >= EVENT_START.getTime()) {
    $("cdLabel").textContent = "It's happening right now! Pick up your phone 📱💖";
    digits.hidden = true;
    cd.classList.add("live");
    return;
  }
  $("cdLabel").textContent = "Starts in";
  digits.hidden = false;
  let s = Math.floor((EVENT_START.getTime() - now) / 1000);
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  $("cdD").textContent = d;
  $("cdH").textContent = pad(h);
  $("cdM").textContent = pad(m);
  $("cdS").textContent = pad(s);
}

/* ----- .ics calendar file with a 15-minute reminder ----- */
const icsDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsEscape = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function buildIcs() {
  const desc = [fill(CONFIG.bigMessage), fill(CONFIG.message), "", ...CONFIG.event.details.map((d) => `${fill(d.label)}: ${fill(d.value)}`)].join("\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Play Planet//Date//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${icsDate(EVENT_START)}-${CONFIG.ntfy.topic || "date"}@playplanet`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(EVENT_START)}`,
    `DTEND:${icsDate(EVENT_END)}`,
    `SUMMARY:${icsEscape(CONFIG.event.calendarTitle)}`,
    `LOCATION:${icsEscape(CONFIG.event.calendarLocation)}`,
    `DESCRIPTION:${icsEscape(desc)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Video call in 15 minutes 💖",
    "TRIGGER:-PT15M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

$("calendarBtn").addEventListener("click", () => {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "our-video-call.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
});

$("againBtn").addEventListener("click", confettiBurst);

/* ==========================================================
   Confetti: plain canvas, no libraries (hearts + ribbons)
   ========================================================== */
const canvas = $("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let raf = null;

function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", sizeCanvas);
sizeCanvas();

function confettiBurst() {
  const colors = ["#ff7eb0", "#e8558f", "#b8a2ff", "#7d5fe6", "#ffd6e7", "#ece4ff"];
  const n = REDUCED ? 40 : innerWidth < 600 ? 160 : 260;
  for (let i = 0; i < n; i++) {
    const fromLeft = i % 2 === 0;
    pieces.push({
      x: REDUCED ? Math.random() * innerWidth : fromLeft ? -10 : innerWidth + 10,
      y: REDUCED ? -20 - Math.random() * innerHeight * 0.5 : innerHeight * (0.55 + Math.random() * 0.3),
      vx: REDUCED ? 0 : (fromLeft ? 1 : -1) * (4 + Math.random() * 8),
      vy: REDUCED ? 2 + Math.random() * 2 : -(9 + Math.random() * 10),
      w: 6 + Math.random() * 7,
      h: 8 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: REDUCED ? 0 : (Math.random() - 0.5) * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
      heart: Math.random() < 0.35,
      life: 0,
    });
  }
  if (!raf) raf = requestAnimationFrame(drawConfetti);
}

function drawHeart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s, 0, -s * 0.35);
  ctx.bezierCurveTo(s * 0.4, -s, s, -s * 0.4, 0, s * 0.3);
  ctx.fill();
}

function drawConfetti() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces = pieces.filter((p) => p.y < innerHeight + 40 && p.life < 600);
  for (const p of pieces) {
    p.life++;
    p.vy += REDUCED ? 0 : 0.25;
    p.vx *= 0.985;
    p.x += p.vx;
    p.y += Math.min(p.vy, 7);
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.heart) drawHeart(p.w * 0.9);
    else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.life / 8)) + 2);
    ctx.restore();
  }
  raf = pieces.length ? requestAnimationFrame(drawConfetti) : null;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}
