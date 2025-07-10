
function openPopup() {
  window.open("ex.html", "width=400,height=400");
}



var myButton = document.getElementById("myButton");
var myModal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];

myButton.onclick = function() {
  myModal.style.display = "block";
}

closeButton.onclick = function() {
  myModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}


