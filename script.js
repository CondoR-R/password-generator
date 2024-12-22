// DOM-элементы
const passwordBox = document.querySelector(".password"),
  generateBtn = document.querySelector(".generate"),
  copyBtn = document.querySelector(".copy"),
  lengthNumberInput = document.querySelector("input[type='number']"),
  lengthRangeInput = document.querySelector("input[type='range']"),
  numberInput = document.querySelector("#number"),
  symbolInput = document.querySelector("#symbol");

// pass для передачи пароля в функцию копирования
let pass,
  // passLength для запоминания длины
  passLength = lengthNumberInput.value,
  // активен ли чекбокс цифр/символов
  isNumber = false,
  isSymbol = false;

// символы, кт могут быть в пароле
const wordsUpperCase = "QWERTYUIOPASDFGHJKLZXCVBNM",
  wordsLowerCase = "qwertyuiopasdfghjklzxcvbnm",
  numbers = "1234567890",
  symbols = "!@#$%^&*()",
  // массив симолов
  passSymbols = [wordsLowerCase, wordsUpperCase, numbers, symbols],
  // доп массив символов, если выбрано только со спец символами
  onlySymbols = [wordsLowerCase, wordsUpperCase, symbols];

// функция генерации пароля
function generatePassword(len) {
  // перемнная, в кт будет записан пароль
  let password = "";
  for (let i = 1; i <= len; i++) {
    // получаем индекс для типа символа (буква, буква в верхнем регистре, число или спец сивол)
    let randIndexType;
    // если и символы и цифры допом
    if (isNumber && isSymbol)
      randIndexType = Math.round(Math.random() * (passSymbols.length - 1));
    // если только цифры допом
    else if (isNumber)
      randIndexType = Math.round(Math.random() * (passSymbols.length - 2));
    // если только символы допом
    else if (isSymbol)
      randIndexType = Math.round(Math.random() * (onlySymbols.length - 1));
    // если без символов и цифр
    else randIndexType = Math.round(Math.random() * (passSymbols.length - 3));

    if (
      (!isSymbol && isNumber) ||
      (!isSymbol && !isNumber) ||
      (isSymbol && isNumber)
    ) {
      // получаем индекс элемента соответвующего типа
      const randIndexSymbol = Math.round(
        Math.random() * (passSymbols[randIndexType].length - 1)
      );
      // генерация пароля
      password += passSymbols[randIndexType][randIndexSymbol];
    } else {
      const randIndexSymbol = Math.round(
        Math.random() * (onlySymbols[randIndexType].length - 1)
      );
      // генерация пароля
      password += onlySymbols[randIndexType][randIndexSymbol];
    }
  }
  return password;
}

// функция копирования в буфер обмена
function copy(pass) {
  if (pass === undefined) pass = "";
  // если API поддерживается
  if (navigator.clipboard) {
    navigator.clipboard.writeText(pass).then(() => {
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => copyBtn.classList.remove("copied"), 1000);
    }, error);
  } else error();
}

// анимация при ошибке копирования
function error() {
  copyBtn.textContent = "Error!";
  copyBtn.classList.add("error");
  setTimeout(() => {
    copyBtn.classList.remove("error");
  }, 400);
}

// обработка клика копировать
copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  copy(pass);
  pass = "";
});

// обработка клика на кнопку генерации пароля
generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const password = generatePassword(passLength);
  passwordBox.textContent = password;

  // для копирования
  pass = password;
});

// текстовый инпут длины, получаем значение
lengthNumberInput.addEventListener("change", () => {
  passLength = lengthRangeInput.value = +lengthNumberInput.value;
});

// инпут ползунок длины, получаем значение
lengthRangeInput.addEventListener("change", () => {
  passLength = lengthNumberInput.value = +lengthRangeInput.value;
});

// чекбокс добавить цифры
numberInput.addEventListener("change", () => (isNumber = !isNumber));

// чекбокс добавить символы
symbolInput.addEventListener("change", () => (isSymbol = !isSymbol));
