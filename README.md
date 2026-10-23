# For Zafer, from Sumyuktha 🎀

A very cute, timed "How well do you know us?" quiz from Bangalore to Muscat. It ends by asking Zafer to a cosy WhatsApp video call tonight (Fri 23 Oct 2026, 11:00 PM Muscat / 12:30 AM Bangalore).

Plain HTML + CSS + JavaScript. No build step, no libraries. Only external resource: Google Fonts (Fredoka + Caveat).

---

## 1. Personalise

Everything personal is in the `CONFIG` and `QUESTIONS` blocks at the top of **script.js**. You never need to touch the code below them.

| CONFIG field | What it does |
|---|---|
| `from`, `to` | Sender and player names (`{from}` / `{to}` in texts) |
| `greeting`, `introText` | Small line above the title and the paragraph on the first screen |
| `me`, `them` | City, flag, IANA time zone, lat/lon. `me` = Sumyuktha (Bangalore), `them` = Zafer (Muscat). Distance and time difference are computed from these |
| `timerSeconds` | Seconds per question (20). `0` turns the timer off |
| `meterName` | Name of the score bar ("Cute-o-meter") |
| `ask` | The big question: `before` + `highlight` (handwritten font) + `after` |
| `event.date` / `time` / `tz` | When the call starts, written as wall-clock time in `tz` (`2026-10-23`, `23:00`, `Asia/Muscat`) |
| `event.durationMinutes` | 180 ("all evening"). Used for the calendar and the countdown's "happening now" state |
| `event.calendarTitle` / `calendarLocation` | What appears in the calendar file |
| `event.details` | Cards on the last screen (icon, label, value) |
| `successTitle`, `bigMessage`, `message`, `signoff` | Texts on the last screen ("Miss u 🥺", "-sumyuktha 💞") |
| `whatsapp.number` | Number that receives replies, digits only with country code. `""` hides both WhatsApp buttons |
| `whatsapp.text` | First line of the YES reply (score and answers are added automatically) |
| `whatsapp.declineLabel` / `declineText` | The small "Not tonight? Tell me honestly" link and its prefilled message |
| `ntfy` | Optional live notifications. **Off** (`enabled: false`) for this game |
| `shareNotice` | "Your answers are shared with {from}". Only shown when ntfy is on |
| `brand` | `true` shows a small "Made with Play Planet" line (off as requested) |

**Writing questions:** each item has `emoji`, `q`, `options` (4), `correct` (index from 0, or `"all"` for a trick question), `right` and `wrong` lines.
- `type: "distance"` builds options from the real distance.
- `type: "time"` asks what time it is now in `me.city`.
- `type: "eventTime"` asks what the call time is in `me.city`.

Placeholders you can use anywhere: `{from} {to} {km} {myCity} {theirCity} {myTime} {theirTime} {diff} {myEventTime} {theirEventTime} {eventDate}`.

The questions are **editable examples** written in Sumyuktha's voice. No inside jokes were given, so swap in real ones if you have them.

Playful lines live just under `QUESTIONS`: `TIMEOUT_LINES`, `FACES` (the bunny reactions), `NO_TEXTS`, `YES_TEXTS`, `HINTS`, `MAX_NO_TRIES`.

## 2. Test locally

```bash
cd sumyuktha-to-zafer
python3 -m http.server 8000
```
Open http://localhost:8000/?quiet. On a phone on the same Wi-Fi, use `http://<your-computer-ip>:8000/?quiet`. Or use desktop DevTools device mode at 360 px wide.

## 3. Push to GitHub

Create an empty repo first (no README). For a private-ish link, use a hard-to-guess name, e.g. `for-z-9f3a`.

```bash
cd sumyuktha-to-zafer
git init
git add .
git commit -m "A little something for Zafer"
git branch -M main
git remote add origin https://github.com/playplanet4all/<repo-name>.git
git push -u origin main
```

## 4. Turn on GitHub Pages

Repo → **Settings → Pages → Deploy from a branch → main, / (root)** → Save.
After about a minute the game is at `https://playplanet4all.github.io/<repo-name>/`.

## 5. After every change

Bump `?v=` on **both** lines in `index.html` (`style.css?v=1` and `script.js?v=1` → `?v=2`), then:
```bash
git add . && git commit -m "Describe the change" && git push
```
Pages updates in about a minute.

## 6. Notes

- **Time zones:** the event time is converted with IANA zones, so it shows correctly on any phone. The time difference in the feedback lines ("1½ hours ahead of you") is computed live, not typed in.
- **Timer:** 20 s per question. If it runs out, the answer counts as wrong (trick questions included) and shows as "ran out of time ⏰" in the WhatsApp reply.
- **Reduced motion:** floating hearts, sparkles and bouncing turn off. Confetti falls gently.
- **The runaway No button** is just for fun. The "Not tonight? Tell me honestly 💬" link under it always opens a WhatsApp reply, so there's always an honest way to say no.
- **Notifications** are off. To turn them on, set `ntfy.enabled: true` and subscribe in the ntfy app (+ → topic `pp-date-oct26-40af4188026a` → server ntfy.sh, display name "Date Oct 26"). Test once without `?quiet`, then always use `?quiet`. The topic is visible in the page source, so only answers to the game are sent.
- **Privacy:** the WhatsApp number is in `script.js`. Anything in a public repo is public.
