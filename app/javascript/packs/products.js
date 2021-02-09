$(document).ready(function(){
    var shopM = document.getElementById("shop-m");
    var shopMBtns = document.querySelectorAll(".btns button");

    if (!(shopM==null)){
      switchShopPage("collection");
    }

    function switchShopPage(dd, element){
      var dd = dd ||= element.data('collection')
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

    $('.switch-shop-page').on('click', function(){
      switchShopPage('', $(this));
    })
})