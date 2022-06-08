const btnModal = document.getElementById("btnModal");
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");
const btnClose = document.getElementById("close");
const textModal = document.getElementById("textModal");

btnModal.addEventListener("click", () => {
  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";
  modal.classList.toggle("modal-close");

  if ( localStorage.getItem("supportData") ) {
    textModal.innerHTML = localStorage.getItem("supportData");
  }
});

btnClose.addEventListener("click", () => {
  modal.classList.toggle("modal-close");
  setTimeout(function() {
    modalContainer.style.visibility = "hidden";
    modalContainer.style.opacity = "0";
  }, 800);
});