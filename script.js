(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const lengthInput=$("length"), widthInput=$("width"), piecesInput=$("pieces");
  const perPiece=$("perPiece");
  const totalArea=$("totalArea"), pieceCount=$("pieceCount"), error=$("error");

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

  function calculate() {
    const l=Number(lengthInput.value), w=Number(widthInput.value), p=Number(piecesInput.value);
    error.textContent="";
    if(lengthInput.value===""||widthInput.value==="") {
      perPiece.textContent="— sq ft"; totalArea.innerHTML='0.00 <span>sq ft</span>';
      pieceCount.textContent=piecesInput.value||"1"; return;
    }
    if(!Number.isFinite(l)||!Number.isFinite(w)||l<=0||w<=0) {
      error.textContent="Please enter a length and width greater than zero."; return;
    }
    if(!Number.isInteger(p)||p<1) {
      error.textContent="Number of pieces must be a whole number (at least 1)."; return;
    }
    const lf=inchesToFeet(l), wf=inchesToFeet(w), each=lf*wf, total=each*p;
    perPiece.textContent=format(each)+" sq ft";
    totalArea.innerHTML=format(total)+' <span>sq ft</span>';
    pieceCount.textContent=String(p);
  }
  [lengthInput,widthInput,piecesInput].forEach(el=>el.addEventListener("input",calculate));
  $("reset").addEventListener("click",()=>{
    lengthInput.value=""; widthInput.value=""; piecesInput.value="1";
    calculate(); lengthInput.focus();
  });
  calculate();

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