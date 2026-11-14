// Better Amazon Lists — applies the user's settings as classes / CSS variables on <html>.
// All actual styling lives in compact.css.

const DEFAULTS = {
  enabled: true,
  columns: 'auto', // 'auto' | '1' | '2' | '3' | '4'
  imageSize: 120, // px
  clampTitles: true,
  fullWidth: true,
  customOrder: true,
};

function apply(settings) {
  const s = { ...DEFAULTS, ...settings };
  const root = document.documentElement;
  root.classList.toggle('bal-on', !!s.enabled);
  root.classList.toggle('bal-clamp', !!s.clampTitles);
  root.classList.toggle('bal-wide', !!s.fullWidth);
  root.style.setProperty('--bal-img', `${Number(s.imageSize) || DEFAULTS.imageSize}px`);
  root.style.setProperty(
    '--bal-template',
    s.columns === 'auto'
      ? 'repeat(auto-fill, minmax(480px, 1fr))'
      : `repeat(${parseInt(s.columns, 10) || 1}, minmax(0, 1fr))`
  );
}

// Amazon saves drag-and-drop moves in the list's "Custom" order, but opens lists sorted by
// "Most recently added", so moves seem to vanish on reload. When no sort is chosen in the
// URL, switch to the custom order. An explicit choice from the Sort menu puts ?sort=... in
// the URL and is left alone.
function useCustomOrder(settings) {
  const s = { ...DEFAULTS, ...settings };
  if (!s.enabled || !s.customOrder) return;
  const url = new URL(location.href);
  if (url.searchParams.has('sort')) return;
  if (!/\/wishlist\/(ls|genericItemsPage)(\/|$)/.test(url.pathname)) return;
  // loop guard, in case Amazon ever strips the parameter
  const key = `bal-redirect:${url.pathname}`;
  const last = Number(sessionStorage.getItem(key) || 0);
  if (Date.now() - last < 10000) return;
  sessionStorage.setItem(key, String(Date.now()));
  url.searchParams.set('sort', 'custom');
  location.replace(url.href);
}

// Apply defaults immediately to avoid a flash of the original layout, then the stored settings.
apply(DEFAULTS);
chrome.storage.sync.get(DEFAULTS, (s) => {
  apply(s);
  useCustomOrder(s);
});
chrome.storage.onChanged.addListener((_changes, area) => {
  if (area === 'sync') chrome.storage.sync.get(DEFAULTS, apply);
});
