window.onscroll = function () {
  if (window.scrollY >= 200) {
    document.getElementById("navbar").style.backgroundColor = "#2c3333";
  } else {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
};

window.addEventListener("load", function () {
  let showMenu = document.getElementById("show-nav");
  let hideMenu = document.getElementById("hide-nav");
  let navbarMenu = document.getElementById("navbar");

  showMenu.addEventListener("click", function () {
    navbarMenu.style.right = "100%";
  });

  hideMenu.addEventListener("click", function () {
    navbarMenu.style.right = "0";
  });
});
