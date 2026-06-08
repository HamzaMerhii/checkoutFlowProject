const name = document.getElementById("name");
const mobileNumber = document.getElementById("mobileNumber");
const email = document.getElementById("email");
const city = document.getElementById("city");
const address = document.getElementById("address");
const onlinePaymentSection = document.getElementById("onlinePaymentSection");
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardMonth = document.getElementById("cardMonth");
const cardYear = document.getElementById("cardYear");
const cvv = document.getElementById("cvv");
const nameErrorMsg = document.getElementById("nameErrorMsg");
const mobileErrorMsg = document.getElementById("mobileErrorMsg");
const mobileInvalidMsg = document.getElementById("mobileInvalidMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cardNameErrorMsg = document.getElementById("cardNameErrorMsg");
const cardNumberErrorMsg = document.getElementById("cardNumberErrorMsg");
const cardMonthErrorMsg = document.getElementById("cardMonthErrorMsg");
const cardMonthInvalidMsg = document.getElementById("cardMonthInvalidMsg");
const cardYearErrorMsg = document.getElementById("cardYearErrorMsg");
const cardYearInvalidMsg = document.getElementById("cardYearInvalidMsg");
const cvvErrorMsg = document.getElementById("cvvErrorMsg");
const checkoutButton = document.getElementById("checkout");
const today = new Date();
let onlinePaymentSectionVisible = 0;
let cardNumberValue = [];
checkoutButton.addEventListener("click", function (event) {
  let isValid = true;
  if (name.value.length < 1) {
    nameValidation(false);
    isValid = false;
  } else {
    nameValidation(true);
  }
  if (mobileNumber.value.length == 0) {
    mobileNumberValidation(false, "missing");
    isValid = false;
  } else {
    mobileNumberValidation(true, "notMissing");
  }
  if (mobileNumber.value.length !== 8 && mobileNumber.value.length !== 0) {
    mobileNumberValidation(false, "invalid");
    isValid = false;
  } else if (mobileNumber.value.length == 8) {
    mobileNumberValidation(true, "valid");
  }
  if (email.value.length < 1) {
    emailValidation(false);
    isValid = false;
  } else {
    emailValidation(true);
  }
  if (city.value.length < 1) {
    cityValidation(false);
    isValid = false;
  } else {
    cityValidation(true);
  }
  if (address.value.length < 1) {
    addressValidation(false);
    isValid = false;
  } else {
    addressValidation(true);
  }
  if (onlinePaymentSectionVisible == 1) {
    if (cardName.value.length < 1) {
      cardNameValidation(false);
      isValid = false;
    } else {
      cardNameValidation(true);
    }
    if (cardNumberValue.length !== 16) {
      cardNumberValidation(false);
      isValid = false;
    } else {
      cardNumberValidation(true);
    }
    if (cvv.value.length !== 3) {
      cvvValidation(false);
      isValid = false;
    } else {
      cvvValidation(true);
    }
    if (cardYear.value.length !== 4) {
      cardYearValidation(false, "missing");
      isValid = false;
    } else {
      cardYearValidation(true, "notMissing");
    }
    if (cardMonth.value.length !== 2) {
      cardMonthValidation(false, "missing");
      isValid = false;
    } else if (cardMonth.value < "01" || cardMonth.value > 13) {
      cardMonthValidation(false, "invalid");
      isValid = false;
    } else if (cardYear.value < today.getFullYear()) {
      cardYearValidation(false, "invalid");
      cardMonthValidation(false, "invalid");
      isValid = false;
    } else if (cardYear.value == today.getFullYear()) {
      if (cardMonth.value < today.getMonth()) {
        cardYearValidation(true, "invalid");
        cardMonthValidation(false, "invalid");
        isValid = false;
      }
    }
  }

  if (!isValid) {
    event.preventDefault();
  } else {
    let alertTimer;
    Swal.fire({
      title: "Confirm order submission?",
      text: "Are you sure you want to confirm this order?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#B3D5F3",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Confirming order...",
          html: "Please wait, we are processing your order.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            alertTimer = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(alertTimer);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer)
            Swal.fire({
              title: "Order confirmed!",
              text: "Thank you! Your order is now confirmed.",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        });
    });
  }
});
name.addEventListener("input", function () {
  if (name.value.length >= 1) {
    nameValidation(true);
  }
});
mobileNumber.addEventListener("input", function () {
  if (mobileNumber.value.length == 8) {
    mobileNumberValidation(true, "notMissing");
    mobileNumberValidation(true, "valid");
  }
});
email.addEventListener("input", function () {
  if (email.value.length >= 1) {
    emailValidation(true);
  }
});
city.addEventListener("input", function () {
  if (city.value.length >= 1) {
    cityValidation(true);
  }
});
address.addEventListener("input", function () {
  if (address.value.length >= 1) {
    addressValidation(true);
  }
});
cardName.addEventListener("input", function () {
  if (cardName.value.length >= 1) {
    cardNameValidation(true);
  }
});
cardNumber.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    if (cardNumber.value.charAt(cardNumber.value.length - 1) !== " ") {
      cardNumberValue.pop();
    }
    if (cardNumberValue.length === 16) {
      cardNumberValidation(true);
    }
  }
});
cardNumber.addEventListener("keyup", function (event) {
  if (event.key !== "Backspace") {
    if (cardNumberValue.length === 16) {
      cardNumberValidation(true);
    }
    if (cardNumber.value.charAt(cardNumber.value.length - 1) !== " ") {
      cardNumberValue.push(cardNumber.value[cardNumber.value.length - 1]);
      if (cardNumberValue.length % 4 == 0) {
        cardNumber.value = cardNumber.value + " ";
      }
      if (cardNumberValue.length === 16) {
        cardNumberValidation(true);
      }
    }
  }
});
cvv.addEventListener("input", function () {
  if (cvv.value.length === 3) {
    cvvValidation(true);
  }
});
cardMonth.addEventListener("input", function () {
  if (cardMonth.value.length == 2) {
    cardMonthValidation(true, "notMissing");
  }
  if (cardMonth.value >= "01" || cardMonth.value <= 12) {
    cardMonthValidation(true, "valid");
  }
  if (cardYear.value == today.getFullYear()) {
    if (cardMonth.value >= today.getMonth()) {
      cardMonthValidation(true, "valid");
      cardYearValidation(true, "valid");
    }
  }
  if (cardYear.value > today.getFullYear()) {
    cardMonthValidation(true, "valid");
    cardYearValidation(true, "valid");
  }
});
cardYear.addEventListener("input", function () {
  if (cardYear.value.length === 4) {
    cardYearValidation(true, "notMissing");
  }
  if (cardYear.value >= today.getFullYear()) {
    cardYearValidation(true, "valid");
    if (cardYear.value == today.getFullYear()) {
      if (cardMonth.value >= today.getMonth()) {
        cardMonthValidation(true, "valid");
      }
    }
    if (cardYear.value > today.getFullYear()) {
      cardMonthValidation(true, "valid");
    }
  }
});
function updatePaymantSection(value) {
  if (value == 0) {
    onlinePaymentSectionVisible = 0;
    onlinePaymentSection.style.display = "none";
    cardNameValidation(true);
    cardNumberValidation(true);
    cvvValidation(true);
    cardMonthValidation(true, "notMissing");
    cardYearValidation(true, "notMissing");
    cardMonthValidation(true, "valid");
    cardYearValidation(true, "valid");
  } else if (value == 1) {
    onlinePaymentSectionVisible = 1;
    onlinePaymentSection.style.display = "flex";
  }
}
function nameValidation(status) {
  if (!status) {
    nameErrorMsg.style.display = "block";
    name.classList.remove("form-control");
    name.classList.add("form-control-error");
  } else {
    nameErrorMsg.style.display = "none";
    name.classList.add("form-control");
    name.classList.remove("form-control-error");
  }
}

function mobileNumberValidation(status, message) {
  if (!status && message == "missing") {
    mobileErrorMsg.style.display = "block";
    mobileNumber.classList.remove("form-control");
    mobileNumber.classList.add("form-control-error");
  } else if (status && message == "notMissing") {
    mobileErrorMsg.style.display = "none";
    mobileNumber.classList.add("form-control");
    mobileNumber.classList.remove("form-control-error");
  } else if (!status && message == "invalid") {
    mobileInvalidMsg.style.display = "block";
    mobileNumber.classList.remove("form-control");
    mobileNumber.classList.add("form-control-error");
  } else if (status && message == "valid") {
    mobileInvalidMsg.style.display = "none";
    mobileNumber.classList.add("form-control");
    mobileNumber.classList.remove("form-control-error");
  }
}
function emailValidation(status) {
  if (!status) {
    emailErrorMsg.style.display = "block";
    email.classList.remove("form-control");
    email.classList.add("form-control-error");
  } else {
    emailErrorMsg.style.display = "none";
    email.classList.add("form-control");
    email.classList.remove("form-control-error");
  }
}
function cityValidation(status) {
  if (!status) {
    cityErrorMsg.style.display = "block";
    city.classList.remove("form-control");
    city.classList.add("form-control-error");
  } else {
    cityErrorMsg.style.display = "none";
    city.classList.add("form-control");
    city.classList.remove("form-control-error");
  }
}

function addressValidation(status) {
  if (!status) {
    addressErrorMsg.style.display = "block";
    address.classList.remove("form-control");
    address.classList.add("form-control-error");
  } else {
    addressErrorMsg.style.display = "none";
    address.classList.add("form-control");
    address.classList.remove("form-control-error");
  }
}
function cardNameValidation(status) {
  if (!status) {
    cardNameErrorMsg.style.display = "block";
    cardName.classList.remove("form-control");
    cardName.classList.add("form-control-error");
  } else {
    cardNameErrorMsg.style.display = "none";
    cardName.classList.add("form-control");
    cardName.classList.remove("form-control-error");
  }
}
function cardNumberValidation(status) {
  if (!status) {
    cardNumberErrorMsg.style.display = "block";
    cardNumber.classList.remove("form-control");
    cardNumber.classList.add("form-control-error");
  } else {
    cardNumberErrorMsg.style.display = "none";
    cardNumber.classList.add("form-control");
    cardNumber.classList.remove("form-control-error");
  }
}
function cvvValidation(status) {
  if (!status) {
    cvvErrorMsg.style.display = "block";
    cvv.classList.remove("form-control");
    cvv.classList.add("form-control-error");
  } else {
    cvvErrorMsg.style.display = "none";
    cvv.classList.add("form-control");
    cvv.classList.remove("form-control-error");
  }
}
function cardYearValidation(status, message) {
  if (!status && message == "missing") {
    cardYearErrorMsg.style.display = "block";
    cardYear.classList.remove("form-control");
    cardYear.classList.add("form-control-error");
  } else if (status && message == "notMissing") {
    cardYearErrorMsg.style.display = "none";
    cardYear.classList.add("form-control");
    cardYear.classList.remove("form-control-error");
  } else if (!status && message == "invalid") {
    cardYearInvalidMsg.style.display = "block";
    cardYear.classList.remove("form-control");
    cardYear.classList.add("form-control-error");
  } else if (status && message == "valid") {
    cardYearInvalidMsg.style.display = "none";
    cardYear.classList.add("form-control");
    cardYear.classList.remove("form-control-error");
  }
}

function cardMonthValidation(status, message) {
  if (!status && message == "missing") {
    cardMonthErrorMsg.style.display = "block";
    cardMonth.classList.remove("form-control");
    cardMonth.classList.add("form-control-error");
  } else if (status && message == "notMissing") {
    cardMonthErrorMsg.style.display = "none";
    cardMonth.classList.add("form-control");
    cardMonth.classList.remove("form-control-error");
  } else if (!status && message == "invalid") {
    cardMonthInvalidMsg.style.display = "block";
    cardMonth.classList.remove("form-control");
    cardMonth.classList.add("form-control-error");
  } else if (status && message == "valid") {
    cardMonthInvalidMsg.style.display = "none";
    cardMonth.classList.add("form-control");
    cardMonth.classList.remove("form-control-error");
  }
}
