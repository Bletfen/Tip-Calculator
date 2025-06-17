const billInput = document.querySelector("#bill");
const radioInput = document.querySelectorAll(`input[name = "tip"]`);
const peopleInput = document.querySelector(`input[name = "people-amount"]`);
const tipAmountDisplay = document.querySelector("#tipAmount");
const totalAmountDisplay = document.querySelector("#totalAmount");
const customRadio = document.querySelector(`input[name = "custom"]`);
const resetBtn = document.querySelector(".resetBtn");
const cantBeZero = document.querySelector(".number-input");
const cant = document.querySelector(".cant");

function calculateResult() {
  const billValue = sanitizeNumbers(billInput);
  const peopleValue = sanitizeNumbers(peopleInput);
  const customRadioValue = sanitizeNumbers(customRadio);
  const peopleValuteStr = peopleValue.toString();

  const selectedRadioValue =
    parseInt([...radioInput].find((r) => r.checked)?.value) || customRadioValue;

  const tipTotal = billValue * (selectedRadioValue / 100);
  const tipPerPerson = tipTotal / peopleValue;

  const totalPerPerson = (billValue + tipTotal) / peopleValue;

  if (peopleValue === 0) {
    tipAmountDisplay.textContent = `$0.00`;
    totalAmountDisplay.textContent = `$0.00`;
  } else {
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  if (peopleInput.value !== "" && Number(peopleInput.value) === 0) {
    peopleInput.value = "0";
    cantBeZero.classList.add("not-zero");
    cant.textContent = "Can't be zero";
    cant.style.display = "block";
  } else if (peopleValuteStr.includes(".")) {
    cantBeZero.classList.add("not-zero");
    cant.textContent = "Enter whole number";
    cant.style.display = "block";
  } else {
    cant.classList.remove("not-zero");
    cant.style.display = "none";
  }
}

function sanitizeNumbers(input) {
  let val = input.value;
  if (val === "" || isNaN(val) || Number(val) < 0) {
    input.value = "";
    return 0;
  }

  return Number(val);
}

function deleteZero(input) {
  if (input.value > 1 && input.value.startsWith("0")) {
    input.value = input.value.replace(/^0+/, "");
  }
}

billInput.addEventListener("input", () => {
  deleteZero(billInput);
  calculateResult();
  resetBtn.classList.add("active-reset");
});
radioInput.forEach((r) => {
  r.addEventListener("click", () => {
    calculateResult();
    resetBtn.classList.add("active-reset");
  });
});
peopleInput.addEventListener("input", () => {
  deleteZero(peopleInput);
  calculateResult();
  resetBtn.classList.add("active-reset");
});
customRadio.addEventListener("input", () => {
  radioInput.forEach((r) => (r.checked = false));
  deleteZero(customRadio);
  calculateResult();
  resetBtn.classList.add("active-reset");
});
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  radioInput.forEach((r) => (r.checked = false));
  customRadio.value = "";
  peopleInput.value = "";
  tipAmountDisplay.textContent = `$0.00`;
  totalAmountDisplay.textContent = `$0.00`;
  resetBtn.classList.remove("active-reset");
});
