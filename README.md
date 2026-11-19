# Marble & Granite Square Feet Calculator

A lightweight, mobile-friendly marble and granite calculator with one flexible Multiple Measurements page.

## How to use

- Enter the length and width in inches for each measurement.
- Enter the quantity for that measurement.
- Each row displays its own calculated area.
- Select **ADD MORE** to add as many measurement rows as needed.
- Remove extra rows with the × control.
- The **FINAL TOTAL** automatically combines all completed measurement rows.

One measurement or many measurements use the same calculation method.

## Calculation method

Convert each dimension separately using these exact inclusive boundaries for the remaining inches:
- 1–3 inches → 0.25 ft
- More than 3 up to 6 inches → 0.50 ft
- More than 6 up to 9 inches → 0.75 ft
- More than 9 up to 12 inches → 1.00 ft

Area per piece = converted length × converted width.  
Row total = area per piece × quantity.

The final displayed area uses standard half-up rounding to 2 decimal places.

## Offline use

This project is configured as an installable Progressive Web App (PWA).

1. Open the GitHub Pages website once while connected to the internet.
2. Wait until the header says **OFFLINE READY**.
3. In Chrome, open the browser menu and choose **Install app** or **Add to Home screen**.
4. Open the installed calculator. After the first successful online load, the app shell is cached and the calculator can be used offline.

## Run locally

Open `index.html` in a modern browser. No external libraries or internet connection are required to run the calculator. Service-worker caching and app installation require the hosted HTTPS website.

## Publish with GitHub Pages

Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

Website:
https://ajaykaklotar01.github.io/MARBLE-GRANITE-CALCULATOR/
