$(document).ready(function(){
  var menuOpenBtn = document.getElementById("menu-open-btn");
  var menucloseBtn = document.getElementById("menu-close-btn");
  var navMenu = document.getElementById("nav-menu-d");
  var nav = document.querySelector("nav");

  menuOpenBtn.addEventListener("click", function(){
    navMenu.classList.add("active");
  });

  menucloseBtn.addEventListener("click", function(){
    navMenu.classList.remove("active");
  });

  var rifleSelect = document.getElementById('rifle-select');
  var shotgunSelect = document.getElementById('shotgun-select');
  var pistolSelect = document.getElementById('piston-select');
  var nfaSelect = document.getElementById('nfa-select');

  function selectThisOption(option){
    // alert("fsfds");
    if (option == "rifle"){
      rifleSelect.classList.add("active");
      shotgunSelect.classList.remove("active");
      pistolSelect.classList.remove("active");
      nfaSelect.classList.remove("active");
    }else if (option == "shotgun"){
      rifleSelect.classList.remove("active");
      shotgunSelect.classList.add("active");
      pistolSelect.classList.remove("active");
      nfaSelect.classList.remove("active");
    }else if (option == "pistol"){
      rifleSelect.classList.remove("active");
      shotgunSelect.classList.remove("active");
      pistolSelect.classList.add("active");
      nfaSelect.classList.remove("active");
    }else if (option == "nfa"){
      rifleSelect.classList.remove("active");
      shotgunSelect.classList.remove("active");
      pistolSelect.classList.remove("active");
      nfaSelect.classList.add("active");
    }
  }

  $( window ).scroll(function() {
    if (window.scrollY>1){
      nav.classList.add("small-nav");
    }else{
      nav.classList.remove("small-nav");
    }
  })

});




