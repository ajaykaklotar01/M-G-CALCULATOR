# Marble & Granite Square Feet Calculator

A lightweight, mobile-friendly calculator for converting marble and granite dimensions from inches to square feet.

## Calculation method
Convert each dimension separately, rounding any remaining inches UP in 3-inch steps:
- 1–3 inches → 0.25 ft
- 4–6 inches → 0.50 ft
- 7–9 inches → 0.75 ft
- 10–12 inches → 1.00 ft

Area per piece = converted length × converted width.  
Total area = area per piece × number of pieces.

The final displayed area uses standard half-up rounding to 2 decimal places.

## Example
84 in × 8 in → 7 ft × 0.75 ft = **5.25 sq ft**

## Run locally
Open `index.html` in a modern browser. No external libraries or internet connection are required to run the calculator.

## Publish with GitHub Pages
Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

Once published, the site address will be:
https://ajaykaklotar01.github.io/MARBLE-GRANITE-CALCULATOR/
