var heading = document.querySelector("#heading");
heading.onclick = function () {
  if (heading.style.color == "blue") {
    heading.style.color = "green";
  } else {
    heading.style.color = "red";
  }
};
