
var menuOpenBtn = document.getElementById("menu-open-btn");
var menucloseBtn = document.getElementById("menu-close-btn");
var navMenu = document.getElementById("nav-menu-d");
var nav = document.querySelector("nav");

function navChange(){
  console.log(window.scrollY);
  if (window.scrollY>1){
    nav.classList.add("small-nav");
  }else{
    nav.classList.remove("small-nav");
  }
}


menuOpenBtn.addEventListener("click", function(){
  navMenu.classList.add("active");
});

menucloseBtn.addEventListener("click", function(){
  navMenu.classList.remove("active");
});


var shopM = document.getElementById("shop-m");
var shopMBtns = document.querySelectorAll(".btns button");

if (!(shopM==null)){
  switchShopPage("collection");
}

function switchShopPage(dd){
  if (dd=="collection"){
    shopM.classList.remove("parts");
    shopM.classList.add("collection");
    shopMBtns[0].classList.add("active");
    shopMBtns[1].classList.remove("active");
  }else if(dd=="parts"){
    shopM.classList.remove("collection");
    shopM.classList.add("parts");
    shopMBtns[1].classList.add("active");
    shopMBtns[0].classList.remove("active");
  }else if(dd=="parts-mob"){
    shopM.classList.remove("collection-mob");
    shopM.classList.toggle("parts-mob");
  }else if (dd=="collection-mob"){
    shopM.classList.remove("parts-mob");
    shopM.classList.toggle("collection-mob");
  }

}


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
