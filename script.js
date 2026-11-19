(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const lengthInput=$("length"), widthInput=$("width"), piecesInput=$("pieces");
  const perPiece=$("perPiece");
  const totalArea=$("totalArea"), pieceCount=$("pieceCount"), error=$("error");

  // Exact inclusive boundaries: 1–3, >3–6, >6–9, >9–12 inches.
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

  // Existing solo calculator: its inputs, layout and behaviour remain unchanged.
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

  // Multiple measurements mode. Each row uses the exact same conversion rules.
  const list=$("measurementList");
  const multipleTotal=$("multipleTotal");
  const multipleCount=$("multipleCount");
  let nextMeasurementId=1;
  const measurements=[{id:nextMeasurementId++,length:"",width:"",quantity:"1"}];

  function rowResult(item) {
    const l=Number(item.length), w=Number(item.width), q=Number(item.quantity);
    if(item.length===""||item.width==="") return {valid:false,complete:false,total:0};
    if(!Number.isFinite(l)||!Number.isFinite(w)||l<=0||w<=0||!Number.isInteger(q)||q<1) {
      return {valid:false,complete:true,total:0};
    }
    return {valid:true,complete:true,total:inchesToFeet(l)*inchesToFeet(w)*q};
  }
  function renderMeasurements() {
    list.innerHTML="";
    let combined=0, completed=0;
    measurements.forEach((item,index)=>{
      const result=rowResult(item);
      if(result.valid){combined+=result.total;completed++;}
      const card=document.createElement("article");
      card.className="measurement-card";
      card.dataset.id=String(item.id);
      card.innerHTML=`
        <div class="measurement-card-head"><strong>Input ${index+1}</strong>${index>0?'<button class="remove-measurement" type="button" aria-label="Remove measurement" title="Remove measurement">×</button>':""}</div>
        <div class="multi-grid">
          <div class="multi-field"><label>Length (inch)</label><input class="multi-input" data-field="length" type="number" inputmode="decimal" min="0" step="any" placeholder="Length" value="${item.length}"></div>
          <div class="multi-field"><label>Width (inch)</label><input class="multi-input" data-field="width" type="number" inputmode="decimal" min="0" step="any" placeholder="Width" value="${item.width}"></div>
          <div class="multi-field"><label>Quantity</label><input class="multi-input" data-field="quantity" type="number" inputmode="numeric" min="1" step="1" value="${item.quantity}"></div>
          <div class="multi-field"><label>Result</label><div class="multi-result">${result.valid?format(result.total):"—"}<small>sq ft</small></div></div>
        </div>
        <div class="multi-error">${result.complete&&!result.valid?"Enter valid dimensions and a whole-number quantity.":""}</div>`;
      list.appendChild(card);
    });
    multipleTotal.innerHTML=format(combined)+' <small>sq ft</small>';
    multipleCount.textContent=completed+" completed "+(completed===1?"measurement":"measurements");
  }
  list.addEventListener("input",(event)=>{
    const input=event.target.closest("[data-field]");
    if(!input)return;
    const card=input.closest(".measurement-card");
    const item=measurements.find(entry=>entry.id===Number(card.dataset.id));
    if(!item)return;
    item[input.dataset.field]=input.value;
    // Update values and totals without moving focus from the active field.
    const result=rowResult(item);
    const resultBox=card.querySelector(".multi-result");
    resultBox.innerHTML=(result.valid?format(result.total):"—")+"<small>sq ft</small>";
    const errorBox=card.querySelector(".multi-error");
    errorBox.textContent=result.complete&&!result.valid?"Enter valid dimensions and a whole-number quantity.":"";
    updateMultipleTotal();
  });
  function updateMultipleTotal(){
    let combined=0,completed=0;
    measurements.forEach(item=>{const result=rowResult(item);if(result.valid){combined+=result.total;completed++;}});
    multipleTotal.innerHTML=format(combined)+' <small>sq ft</small>';
    multipleCount.textContent=completed+" completed "+(completed===1?"measurement":"measurements");
  }
  list.addEventListener("click",(event)=>{
    const remove=event.target.closest(".remove-measurement");
    if(!remove)return;
    const card=remove.closest(".measurement-card");
    const index=measurements.findIndex(item=>item.id===Number(card.dataset.id));
    if(index>=0){measurements.splice(index,1);renderMeasurements();}
  });
  $("addMeasurement").addEventListener("click",()=>{
    measurements.push({id:nextMeasurementId++,length:"",width:"",quantity:"1"});
    renderMeasurements();
    const cards=list.querySelectorAll(".measurement-card");
    const last=cards[cards.length-1];
    last.querySelector('[data-field="length"]').focus();
  });
  renderMeasurements();

  // Switch between the untouched solo calculator and the separate multiple page.
  const soloMode=$("soloMode"), multipleMode=$("multipleMode"), modeSwitch=$("modeSwitch");
  let activeMode="solo";
  modeSwitch.addEventListener("click",()=>{
    activeMode=activeMode==="solo"?"multiple":"solo";
    const isMultiple=activeMode==="multiple";
    soloMode.hidden=isMultiple;
    multipleMode.hidden=!isMultiple;
    modeSwitch.innerHTML=isMultiple?'← <span>SOLO</span>':'MULTIPLE <span>→</span>';
    modeSwitch.setAttribute("aria-label",isMultiple?"Switch to solo mode":"Switch to multiple mode");
    window.scrollTo({top:0,behavior:"smooth"});
  });

  // Register the offline app shell. First visit must be online so files can be cached.
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