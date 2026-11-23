# Marble & Granite Calculator

A mobile-friendly, installable calculator for marble and granite measurements.

## How to use

- Tap **Length**, **Width**, or **Quantity** to select a field.
- Enter values using the built-in number pad; the phone keyboard stays closed.
- Tap **×** to remove the last digit from the selected field.
- Tap **ADD** to create the next measurement after completing the current inputs.
- Use the × on a measurement card to remove that entire measurement.
- **FINAL TOTAL** shows the combined square feet; **Q** shows the combined quantity.
- **RESET ALL** clears the measurements and starts again.

## Calculation method

Convert each dimension separately using the remaining inches:
- 1–3 inches → 0.25 ft
- More than 3 up to 6 inches → 0.50 ft
- More than 6 up to 9 inches → 0.75 ft
- More than 9 up to 12 inches → 1.00 ft

Area per piece = converted length × converted width.  
Row total = area per piece × quantity.

The final displayed area uses standard half-up rounding to 2 decimal places.

## Offline use

This project is an installable Progressive Web App (PWA).

1. Open the GitHub Pages website once while connected to the internet.
2. In Chrome, open the browser menu and choose **Install app** or **Add to Home screen**.
3. After the first successful online load, the calculator can be used offline.

## Run locally

Open `index.html` in a modern browser. No external libraries are required. Service-worker caching and app installation require the hosted HTTPS website.

## GitHub Pages

Configure **Settings → Pages → Deploy from a branch → main → /(root)**.

Website: https://ajaykaklotar01.github.io/MARBLE-GRANITE-CALCULATOR/
