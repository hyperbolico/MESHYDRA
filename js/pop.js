function openPopup() {
  window.open(
    "ex.html",
    "popupHydra",
    "width=400,height=400,resizable=yes,scrollbars=yes"
  );
}

// ⚠️ Bloque legacy: hacía referencia a #myButton, #myModal y .close,
// elementos que NO existen en el index.html actual.
// Se comenta para evitar el error "Cannot set properties of null".
/*
var myButton = document.getElementById("myButton");
var myModal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];

myButton.onclick = function() {
  myModal.style.display = "block";
};

closeButton.onclick = function() {
  myModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
};
*/
