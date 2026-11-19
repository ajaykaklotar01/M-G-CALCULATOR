(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const measurementList = $("measurementList");
  const grandTotal = $("grandTotal");
  const error = $("error");
  const addButton = $("addMeasurement");
  let nextMeasurementId = 1;

  // LOCKED ORIGINAL CONVERSION LOGIC — unchanged.
  // Apply the exact inclusive boundaries: 1–3, >3–6, >6–9, >9–12 inches.
  function inchesToFeet(inches) {
    const wholeFeet = Math.floor(inches / 12);
    const remainder = inches - wholeFeet * 12;
    if (remainder === 0) return wholeFeet;
    if (remainder <= 3) return wholeFeet + 0.25;
    if (remainder <= 6) return wholeFeet + 0.50;
    if (remainder <= 9) return wholeFeet + 0.75;
    return wholeFeet + 1.00;
  }
  // Standard half-up rounding for the final two-decimal display.
  function roundToTwo(value) {
    return Math.floor((value+Number.EPSILON)*100+0.5)/100;
  }
  const format=(value)=>roundToTwo(value).toFixed(2);

  function addMeasurement() {
    const id = nextMeasurementId++;
    const card = document.createElement("section");
    card.className = "measurement-card";
    card.dataset.measurementId = String(id);
    card.innerHTML = `
      <div class="measurement-card-heading"><span>INPUT ${id}</span></div>
      <div class="measurement-grid">
        <label class="field"><span>Length <small>(inches)</small></span><span class="input-wrap"><input data-field="length" type="number" inputmode="decimal" min="0" step="any" placeholder="e.g. 84"></span></label>
        <label class="field"><span>Width <small>(inches)</small></span><span class="input-wrap"><input data-field="width" type="number" inputmode="decimal" min="0" step="any" placeholder="e.g. 8"></span></label>
        <label class="field"><span>Pieces</span><span class="input-wrap"><input data-field="pieces" type="number" inputmode="numeric" min="1" step="1" value="1"></span></label>
        <div class="field row-result-field"><span>Result</span><div class="row-result-box"><strong data-field="result">— <span>sq ft</span></strong></div><p class="conversion-info" data-field="conversion-info"></p><small class="conversion-info-note">(For understanding only)</small></div>
      </div>
      <p class="row-error" data-field="error" role="alert"></p>`;
    measurementList.appendChild(card);
    card.querySelector('[data-field="length"]').focus();
    calculateAll();
  }

  function calculateAll() {
    let combinedTotal = 0;
    let completedRows = 0;
    let hasErrors = false;

    measurementList.querySelectorAll(".measurement-card").forEach((card) => {
      const lengthInput = card.querySelector('[data-field="length"]');
      const widthInput = card.querySelector('[data-field="width"]');
      const piecesInput = card.querySelector('[data-field="pieces"]');
      const result = card.querySelector('[data-field="result"]');
      const rowError = card.querySelector('[data-field="error"]');
      const conversionInfo = card.querySelector('[data-field="conversion-info"]');
      const lengthValue = lengthInput.value;
      const widthValue = widthInput.value;
      const piecesValue = piecesInput.value;

      rowError.textContent = "";
      result.innerHTML = '— <span>sq ft</span>';
      conversionInfo.textContent = "";

      if (lengthValue === "" && widthValue === "") return;
      if (lengthValue === "" || widthValue === "") {
        rowError.textContent = "Enter both length and width.";
        hasErrors = true;
        return;
      }

      const length = Number(lengthValue);
      const width = Number(widthValue);
      const pieces = Number(piecesValue);
      if (!Number.isFinite(length) || !Number.isFinite(width) || length <= 0 || width <= 0) {
        rowError.textContent = "Length and width must be greater than zero.";
        hasErrors = true;
        return;
      }
      if (!Number.isInteger(pieces) || pieces < 1) {
        rowError.textContent = "Pieces must be a whole number (at least 1).";
        hasErrors = true;
        return;
      }

      // Same original per-measurement calculation: convert each side,
      // multiply converted dimensions, then multiply by number of pieces.
      const convertedLength = inchesToFeet(length);
      const convertedWidth = inchesToFeet(width);
      const areaPerPiece = convertedLength * convertedWidth;
      const rowTotal = areaPerPiece * pieces;
      result.innerHTML = format(rowTotal) + ' <span>sq ft</span>';
      conversionInfo.textContent = `Length ${format(convertedLength)} ft × Width ${format(convertedWidth)} ft`;
      combinedTotal += rowTotal;
      completedRows++;
    });

    grandTotal.innerHTML = format(combinedTotal) + ' <span>sq ft</span>';
    error.textContent = hasErrors ? "Please complete or correct the highlighted measurement before using the total." : "";
  }

  measurementList.addEventListener("input", calculateAll);
  addButton.addEventListener("click", addMeasurement);
  $("reset").addEventListener("click", () => {
    measurementList.innerHTML = "";
    nextMeasurementId = 1;
    addMeasurement();
    grandTotal.innerHTML = '0.00 <span>sq ft</span>';
    error.textContent = "";
  });
  addMeasurement();

  // Register the offline app shell. The first visit must be online so files can be cached.
  const appStatus = $("appStatus");
  function showAppStatus() {
    if (!appStatus) return;
    const label = appStatus.lastChild;
    if (label) label.textContent = navigator.onLine ? " OFFLINE READY" : " WORKING OFFLINE";
  }
  window.addEventListener("online", showAppStatus);
  window.addEventListener("offline", showAppStatus);
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(() => showAppStatus())
        .catch(() => {
          if (appStatus && navigator.onLine) appStatus.lastChild.textContent = " USE OFFLINE AFTER INSTALL";
        });
    });
  } else if (appStatus) {
    appStatus.lastChild.textContent = " BROWSER OFFLINE SUPPORT LIMITED";
  }
  showAppStatus();
})();