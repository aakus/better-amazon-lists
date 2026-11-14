const DEFAULTS = { enabled: true, columns: 'auto', imageSize: 120, clampTitles: true, fullWidth: true };
const $ = (id) => document.getElementById(id);

chrome.storage.sync.get(DEFAULTS, (s) => {
  $('enabled').checked = s.enabled;
  $('columns').value = s.columns;
  $('imageSize').value = s.imageSize;
  $('imageSizeOut').textContent = `${s.imageSize}px`;
  $('clampTitles').checked = s.clampTitles;
  $('fullWidth').checked = s.fullWidth;
});

$('enabled').addEventListener('change', (e) => chrome.storage.sync.set({ enabled: e.target.checked }));
$('columns').addEventListener('change', (e) => chrome.storage.sync.set({ columns: e.target.value }));
$('clampTitles').addEventListener('change', (e) => chrome.storage.sync.set({ clampTitles: e.target.checked }));
$('fullWidth').addEventListener('change', (e) => chrome.storage.sync.set({ fullWidth: e.target.checked }));
$('imageSize').addEventListener('input', (e) => {
  $('imageSizeOut').textContent = `${e.target.value}px`;
});
$('imageSize').addEventListener('change', (e) => chrome.storage.sync.set({ imageSize: Number(e.target.value) }));
