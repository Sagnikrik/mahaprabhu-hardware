window.addEventListener("scroll",function(){

const nav=document.querySelector(".navbar");

if(window.scrollY>50){

nav.style.background="rgba(0,0,0,.75)";
nav.style.position="fixed";

}else{

nav.style.background="transparent";
nav.style.position="absolute";

}

});