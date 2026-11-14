// Better Amazon Lists — applies the user's settings as classes / CSS variables on <html>.
// All actual styling lives in compact.css.

const DEFAULTS = {
  enabled: true,
  columns: 'auto', // 'auto' | '1' | '2' | '3' | '4'
  imageSize: 120, // px
  clampTitles: true,
  fullWidth: true,
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

// Apply defaults immediately to avoid a flash of the original layout, then the stored settings.
apply(DEFAULTS);
chrome.storage.sync.get(DEFAULTS, apply);
chrome.storage.onChanged.addListener((_changes, area) => {
  if (area === 'sync') chrome.storage.sync.get(DEFAULTS, apply);
});
