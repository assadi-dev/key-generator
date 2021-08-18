const generatForm = document.querySelector("#onGenerateForm");
const submitBtn = document.querySelector("#submitBtn");
const digit = document.querySelector("#digit");
const keyString = document.querySelector("#keyString");

const host = window.location.href;

const digitValueControl = () => {
  let value = parseInt(digit.value);
  if (value > 0) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  digitValueControl();
});

const showKeygen = (arg) => {
  keyString.textContent = arg;
};

const onGeneratorSubmit = (event) => {
  event.preventDefault();
  if (isNaN(event.target.digit.value)) {
    return alert("Veuillez entrez une valeur numérique");
  }
  let data = { digit: event.target.digit.value };
  fetch(host + "api/keyHex", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      showKeygen(data.keygen);
    })
    .catch((error) => {
      alert("Une erreur est survenue: " + error);
    });
};

digit.addEventListener("change", digitValueControl);
digit.addEventListener("keyup", digitValueControl);
generatForm.addEventListener("submit", onGeneratorSubmit);
