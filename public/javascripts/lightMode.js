function toDark(){
    const header = document.querySelector(".site-header");
    const nav    = document.querySelectorAll(".a__item");
    const body   = document.querySelector(".body");

    const mainH  = document.querySelector(".Main-H");
    const SubH2  = document.querySelector(".subH-2");

    const section1 = document.querySelector(".section-1");
    const sectionText = document.querySelector(".text");

    const section2 = document.querySelector(".section-2");
    const sectionText2 = document.querySelector(".text-2");

    const InImg = document.querySelectorAll(".In-img");
    const sec4String = document.querySelectorAll(".sec4-string");

 
    mainH.style.backgroundColor = "#1a1a1a";
    SubH2.style.color = "white";

    section1.style.backgroundColor = "#1a1a1a";
    sectionText.style.color = "white";

    section2.style.backgroundColor = "#1a1a1a";
    sectionText2.style.color = "white";

    body.style.backgroundColor = "#0E0D0D"; 
    header.style.backgroundColor = "#0E0D0D"; 

    for(let i=0; i<nav.length; i++){
        nav[i].style.color = "white";
    }

    for(let i=0; i<InImg.length; i++){
        InImg[i].style.backgroundColor = "#1a1a1a";
        sec4String[i].style.color = "white";
        
    }


}