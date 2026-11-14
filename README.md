# Better Amazon Lists

A small Chrome extension that makes Amazon wish list pages compact: items become
a multi-column grid of short cards, so many more fit on screen, while keeping the
picture, title, seller, rating, price, delivery, options, date added and all the
buttons (Add to Basket, Add a note, Move, share, delete, reorder).

Not affiliated with Amazon.

## Settings

Click the extension's toolbar icon:

- Compact layout on/off
- Columns: auto (fit width) or 1–4
- Picture size: 60–220px
- Use full page width (removes Amazon's 1366px cap on the list page)
- Shorten titles to 2 lines

## Install

1. Download or clone this repository.
2. Open `chrome://extensions` and switch on **Developer mode**.
3. Click **Load unpacked** and pick the folder.

## How it works

`compact.css` restyles the list page; everything is scoped under an `html.bal-on`
class. `content.js` reads the settings from `chrome.storage.sync` and sets that
class and a couple of CSS variables. No data is collected or sent anywhere.

It covers both the signed-in owner view and the visitor view of a list. Amazon
changes its markup from time to time, so the selectors may need updating.
