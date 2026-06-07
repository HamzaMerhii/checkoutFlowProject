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
    nameErrorMsg.style.display = "block";
    name.classList.remove("form-control");
    name.classList.add("form-control-error");
    isValid = false;
  } else {
    nameErrorMsg.style.display = "none";
    name.classList.add("form-control");
    name.classList.remove("form-control-error");
  }
  if (mobileNumber.value.length == 0) {
    mobileErrorMsg.style.display = "block";
    mobileNumber.classList.remove("form-control");
    mobileNumber.classList.add("form-control-error");
    isValid = false;
  } else {
    mobileErrorMsg.style.display = "none";
    mobileNumber.classList.add("form-control");
    mobileNumber.classList.remove("form-control-error");
  }
  if (mobileNumber.value.length !== 8 && mobileNumber.value.length !== 0) {
    mobileInvalidMsg.style.display = "block";
    mobileNumber.classList.remove("form-control");
    mobileNumber.classList.add("form-control-error");
    isValid = false;
  } else {
    mobileInvalidMsg.style.display = "none";
    mobileNumber.classList.add("form-control");
    mobileNumber.classList.remove("form-control-error");
  }
  if (email.value.length < 1) {
    emailErrorMsg.style.display = "block";
    email.classList.remove("form-control");
    email.classList.add("form-control-error");
    isValid = false;
  } else {
    emailErrorMsg.style.display = "none";
    email.classList.add("form-control");
    email.classList.remove("form-control-error");
  }
  if (city.value.length < 1) {
    cityErrorMsg.style.display = "block";
    city.classList.remove("form-control");
    city.classList.add("form-control-error");
    isValid = false;
  } else {
    cityErrorMsg.style.display = "none";
    city.classList.add("form-control");
    city.classList.remove("form-control-error");
  }
  if (address.value.length < 1) {
    addressErrorMsg.style.display = "block";
    address.classList.remove("form-control");
    address.classList.add("form-control-error");
    isValid = false;
  } else {
    addressErrorMsg.style.display = "none";
    address.classList.add("form-control");
    address.classList.remove("form-control-error");
  }
  if (onlinePaymentSectionVisible == 1) {
    console.log(cardNumberValue);
    if (cardName.value.length < 1) {
      cardNameErrorMsg.style.display = "block";
      cardName.classList.remove("form-control");
      cardName.classList.add("form-control-error");
      isValid = false;
    } else {
      cardNameErrorMsg.style.display = "none";
      cardName.classList.add("form-control");
      cardName.classList.remove("form-control-error");
    }
    if (cardNumberValue.length !== 16) {
      cardNumberErrorMsg.style.display = "block";
      cardNumber.classList.remove("form-control");
      cardNumber.classList.add("form-control-error");
      isValid = false;
    } else {
      cardNumberErrorMsg.style.display = "none";
      cardNumber.classList.add("form-control");
      cardNumber.classList.remove("form-control-error");
    }
    if (cvv.value.length !== 3) {
      cvvErrorMsg.style.display = "block";
      cvv.classList.remove("form-control");
      cvv.classList.add("form-control-error");
    } else {
      cvvErrorMsg.style.display = "none";
      cvv.classList.add("form-control");
      cvv.classList.remove("form-control-error");
    }
    if (cardYear.value.length < 4) {
      cardYearErrorMsg.style.display = "block";
      cardYear.classList.remove("form-control");
      cardYear.classList.add("form-control-error");
      isValid = false;
    } else {
      cardYearErrorMsg.style.display = "none";
      cardYear.classList.add("form-control");
      cardYear.classList.remove("form-control-error");
    }
    if (cardMonth.value.length < 2) {
      cardMonthErrorMsg.style.display = "block";
      cardMonth.classList.remove("form-control");
      cardMonth.classList.add("form-control-error");
      isValid = false;
    } else if (cardMonth.value < "01" || cardMonth.value > 13) {
      cardMonthInvalidMsg.style.display = "block";
      cardMonth.classList.remove("form-control");
      cardMonth.classList.add("form-control-error");
      isValid = false;
    } else if (cardYear.value < today.getFullYear()) {
      cardYearInvalidMsg.style.display = "block";
      cardMonthInvalidMsg.style.display = "block";
      cardMonth.classList.remove("form-control");
      cardMonth.classList.add("form-control-error");
      cardYear.classList.remove("form-control");
      cardYear.classList.add("form-control-error");
      isValid = false;
    } else if (cardYear.value == today.getFullYear()) {
      if (cardMonth.value < today.getMonth()) {
        cardMonthInvalidMsg.style.display = "block";
        cardYearInvalidMsg.style.display = "block";
        cardMonth.classList.remove("form-control");
        cardMonth.classList.add("form-control-error");
        cardYear.classList.remove("form-control");
        cardYear.classList.add("form-control-error");
        isValid = false;
      }
    }
  }
  isValid = true;
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
      customClass: {
        htmlContainer: "", // Apply custom text class
      },
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
          /* Read more about handling dismissals below */
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
    nameErrorMsg.style.display = "none";
    name.classList.add("form-control");
    name.classList.remove("form-control-error");
  }
});
mobileNumber.addEventListener("input", function () {
  if (mobileNumber.value.length == 11) {
    mobileErrorMsg.style.display = "none";
    mobileNumber.classList.add("form-control");
    mobileNumber.classList.remove("form-control-error");
  }
});
email.addEventListener("input", function () {
  if (email.value.length >= 1) {
    emailErrorMsg.style.display = "none";
    email.classList.add("form-control");
    email.classList.remove("form-control-error");
  }
});
city.addEventListener("input", function () {
  if (city.value.length >= 1) {
    cityErrorMsg.style.display = "none";
    city.classList.add("form-control");
    city.classList.remove("form-control-error");
  }
});
address.addEventListener("input", function () {
  if (address.value.length >= 1) {
    addressErrorMsg.style.display = "none";
    address.classList.add("form-control");
    address.classList.remove("form-control-error");
  }
});
cardName.addEventListener("input", function () {
  if (cardName.value.length >= 1) {
    cardNameErrorMsg.style.display = "none";
    cardName.classList.add("form-control");
    cardName.classList.remove("form-control-error");
  }
});
cardNumber.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    if (cardNumber.value.charAt(cardNumber.value.length - 1) !== " ") {
      cardNumberValue.pop();
      console.log(cardNumberValue);
    }
  }
});
cardNumber.addEventListener("keyup", function (event) {
  if (event.key !== "Backspace") {
    if (cardNumberValue.length === 16) {
      cardNumberErrorMsg.style.display = "none";
      cardNumber.classList.add("form-control");
      cardNumber.classList.remove("form-control-error");
    }
    if (cardNumber.value.charAt(cardNumber.value.length - 1) !== " ") {
      cardNumberValue.push(cardNumber.value[cardNumber.value.length - 1]);
      if (cardNumberValue.length % 4 == 0) {
        cardNumber.value = cardNumber.value + " ";
      }
    }
  }
});
cvv.addEventListener("input", function () {
  if (cvv.value.length === 3) {
    cvvErrorMsg.style.display = "none";
    cvv.classList.add("form-control");
    cvv.classList.remove("form-control-error");
  }
});
cardMonth.addEventListener("input", function () {
  if (cardMonth.value.length >= 2) {
    cardMonthErrorMsg.style.display = "none";
    cardMonth.classList.add("form-control");
    cardMonth.classList.remove("form-control-error");
  }
  if (cardMonth.value >= "01" || cardMonth.value <= 12) {
    cardMonthInvalidMsg.style.display = "none";
    cardMonth.classList.add("form-control");
    cardMonth.classList.remove("form-control-error");
  }
  if (cardYear.value == today.getFullYear()) {
    if (cardMonth.value >= today.getMonth()) {
      cardMonthInvalidMsg.style.display = "none";
      cardYearInvalidMsg.style.display = "none";
      cardMonth.classList.add("form-control");
      cardMonth.classList.remove("form-control-error");
      cardYear.classList.add("form-control");
      cardYear.classList.remove("form-control-error");
    }
  }
  if (cardYear.value > today.getFullYear()) {
    cardMonthInvalidMsg.style.display = "none";
    cardYearInvalidMsg.style.display = "none";
    cardMonth.classList.add("form-control");
    cardMonth.classList.remove("form-control-error");
    cardYear.classList.add("form-control");
    cardYear.classList.remove("form-control-error");
  }
});
cardYear.addEventListener("input", function () {
  if (cardYear.value.length >= 2) {
    cardYearErrorMsg.style.display = "none";
    cardYear.classList.add("form-control");
    cardYear.classList.remove("form-control-error");
  }
  if (cardYear.value >= today.getFullYear()) {
    cardYearInvalidMsg.style.display = "none";
    cardYear.classList.add("form-control");
    cardYear.classList.remove("form-control-error");
    if (cardYear.value == today.getFullYear()) {
      if (cardMonth.value >= today.getMonth()) {
        cardMonthInvalidMsg.style.display = "none";
        cardMonth.classList.add("form-control");
        cardMonth.classList.remove("form-control-error");
      }
    }
    if (cardYear.value > today.getFullYear()) {
      cardMonthInvalidMsg.style.display = "none";
      cardMonth.classList.add("form-control");
      cardMonth.classList.remove("form-control-error");
    }
  }
});
function updatePaymantSection(value) {
  if (value == 0) {
    onlinePaymentSectionVisible = 0;
    onlinePaymentSection.style.display = "none";
  } else if (value == 1) {
    onlinePaymentSectionVisible = 1;
    onlinePaymentSection.style.display = "flex";
  }
}
