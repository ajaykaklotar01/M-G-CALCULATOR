(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const lengthInput=$("length"), widthInput=$("width"), piecesInput=$("pieces");
  const lengthFeet=$("lengthFeet"), widthFeet=$("widthFeet"), perPiece=$("perPiece");
  const totalArea=$("totalArea"), pieceCount=$("pieceCount"), error=$("error");

  // Preserve whole feet; round every remaining inch UP to the next 3-inch step.
  function inchesToFeet(inches) {
    const wholeFeet=Math.floor(inches/12);
    const remainder=inches-wholeFeet*12;
    return wholeFeet+Math.ceil(remainder/3)*0.25;
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
      lengthFeet.textContent=widthFeet.textContent="—";
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
    lengthFeet.textContent=format(lf); widthFeet.textContent=format(wf);
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
})();