// Password-protects case study pages after `astro build`.
//
// The page's <main> content is encrypted with AES-256-GCM using a key derived from the password
// (PBKDF2-SHA256, 250k iterations). The published HTML only contains the ciphertext and an unlock
// form; the browser decrypts it with the Web Crypto API once the right password is entered.
// This is real protection for the page text (not just a hidden div), because the plain content is
// never shipped. Images are separate files and stay reachable by direct URL.
//
// The password comes from the CASE_STUDY_PASSWORD environment variable (set it in Vercel under
// Project → Settings → Environment Variables). Without it the build still succeeds, but the page
// ships locked with no content, so nothing leaks by accident.
import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';

const PROTECTED = ['dist/work/canadian-tire.html'];
const ITERATIONS = 250_000;
const password = process.env.CASE_STUDY_PASSWORD;
const email = '6meganc@gmail.com';

if (!password) {
  console.warn('[protect] CASE_STUDY_PASSWORD is not set: protected pages ship locked with no content.');
}

const b64 = (buf) => Buffer.from(buf).toString('base64');

function encrypt(plain) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final(), cipher.getAuthTag()]);
  return { salt: b64(salt), iv: b64(iv), data: b64(data), iterations: ITERATIONS };
}

const lockMarkup = (payload) => `<section class="lock" data-lock>
  <div class="container lock__inner">
    <svg class="lock__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>
    <p class="eyebrow">Case study · Canadian Tire</p>
    <h1 class="lock__title">This case study is <strong>password <span class="accent">protected</span></strong></h1>
    <p class="lock__text">It includes confidential work and results. Enter the password to view it, or <a href="mailto:${email}?subject=Canadian%20Tire%20case%20study%20access">email me</a> (${email}) for access.</p>
    ${
      payload
        ? `<form class="lock__form" data-lock-form novalidate>
      <label class="lock__label" for="case-password">Password</label>
      <div class="lock__row">
        <input id="case-password" name="password" type="password" autocomplete="current-password" required class="lock__input" />
        <button type="submit" class="cta cta--primary lock__btn">Unlock <span class="cta__arrow" aria-hidden="true">→</span></button>
      </div>
      <p class="lock__error" data-lock-error role="alert" aria-live="assertive"></p>
    </form>
    <script type="application/json" data-lock-payload>${JSON.stringify(payload)}</script>`
        : `<p class="lock__text">Access is being set up. Please email me for the password.</p>`
    }
  </div>
</section>
<style>
  .lock { padding: clamp(80px, 14vw, 180px) 0; }
  .lock__inner { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
  .lock__icon { width: 40px; height: 40px; color: var(--accent); }
  .lock__title { font-size: clamp(36px, 6vw, 72px); letter-spacing: -0.03em; line-height: 1.08; max-width: 16ch; }
  .lock__text { color: var(--ink-muted); max-width: 56ch; }
  .lock__text a { color: var(--ink); }
  .lock__form { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 480px; margin-top: 8px; }
  .lock__label { font-size: 14px; font-weight: 500; }
  .lock__row { display: flex; gap: 10px; flex-wrap: wrap; }
  .lock__input { flex: 1 1 220px; min-width: 0; padding: 12px 16px; font: inherit; font-size: 16px; color: var(--ink); background: var(--bg); border: 1px solid var(--ink-muted); border-radius: 999px; }
  .lock__input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--ink); }
  .lock__input[aria-invalid="true"] { border-color: #d92d20; }
  .lock__btn { cursor: pointer; }
  .lock__btn:disabled { opacity: 0.6; cursor: progress; }
  .lock__error { min-height: 1.4em; font-size: 14px; color: #d92d20; }
  [data-mode="dark"] .lock__error { color: #ff8a80; }
  [data-mode="dark"] .lock__input[aria-invalid="true"] { border-color: #ff8a80; }
</style>
<script>
(() => {
  const root = document.querySelector('[data-lock]');
  const main = root && root.closest('main');
  const payloadEl = root && root.querySelector('[data-lock-payload]');
  if (!main || !payloadEl) return;
  const p = JSON.parse(payloadEl.textContent);
  const KEY = 'unlock:' + location.pathname.replace(/\\.html$/, '');
  const bytes = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const store = { get() { try { return sessionStorage.getItem(KEY); } catch { return null; } },
                  set(v) { try { sessionStorage.setItem(KEY, v); } catch {} } };

  async function deriveRaw(password) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: bytes(p.salt), iterations: p.iterations, hash: 'SHA-256' }, base, 256);
    return new Uint8Array(bits);
  }
  async function open(raw) {
    const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(p.iv) }, key, bytes(p.data));
    main.innerHTML = new TextDecoder().decode(plain);
    document.documentElement.scrollTop = 0;
  }

  // Unlocked earlier in this tab: reopen without asking again.
  const saved = store.get();
  if (saved) open(bytes(saved)).catch(() => {});

  const form = root.querySelector('[data-lock-form]');
  const input = form.querySelector('input');
  const error = form.querySelector('[data-lock-error]');
  const btn = form.querySelector('button');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    if (!input.value) { error.textContent = 'Enter the password to continue.'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    btn.disabled = true;
    try {
      const raw = await deriveRaw(input.value);
      await open(raw);
      store.set(btoa(String.fromCharCode(...raw)));
    } catch {
      error.textContent = 'That password isn\\'t right. Check it and try again, or email me for access.';
      input.setAttribute('aria-invalid', 'true');
      input.select();
      btn.disabled = false;
    }
  });
})();
</script>`;

for (const file of PROTECTED) {
  const html = readFileSync(file, 'utf8');
  const start = html.indexOf('<main>');
  const end = html.indexOf('</main>');
  if (start < 0 || end < 0) throw new Error(`[protect] no <main> in ${file}`);
  const inner = html.slice(start + '<main>'.length, end);
  const payload = password ? encrypt(inner) : null;
  const out = html.slice(0, start) + '<main>' + lockMarkup(payload) + html.slice(end);
  writeFileSync(file, out);
  console.log(`[protect] ${file}: ${payload ? 'encrypted' : 'locked (no password set)'}`);
}
