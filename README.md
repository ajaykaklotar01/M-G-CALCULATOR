# Marble & Granite Square Feet Calculator

A lightweight, mobile-friendly marble and granite calculator with Solo and Multiple measurement modes.

## Calculation method

Convert each dimension separately using these exact inclusive boundaries for the remaining inches:
- 1–3 inches → 0.25 ft
- More than 3 up to 6 inches → 0.50 ft
- More than 6 up to 9 inches → 0.75 ft
- More than 9 up to 12 inches → 1.00 ft

Area per piece = converted length × converted width.  
Total area = area per piece × quantity.

The final displayed area uses standard half-up rounding to 2 decimal places.

## Modes

- **Solo:** The original single-measurement calculator.
- **Multiple:** Add separate measurement rows, enter length, width and quantity for each, see each row's total, remove rows, and automatically combine completed rows into one final total.

Both modes use the same measurement conversion rules.

## Offline use

This project is also configured as an installable Progressive Web App (PWA).

1. Open the GitHub Pages website once while connected to the internet.
2. Wait until the header says **OFFLINE READY**.
3. In Chrome, open the browser menu and choose **Install app** or **Add to Home screen**.
4. Open the installed calculator. After the first successful online load, the app shell is cached and both Solo and Multiple modes can be used offline.

## Run locally

Open `index.html` in a modern browser. No external libraries or internet connection are required to run the calculator. Service-worker caching and app installation require the hosted HTTPS website.

## Publish with GitHub Pages

Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

Website:
https://ajaykaklotar01.github.io/MARBLE-GRANITE-CALCULATOR/