const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click",toogleMenu,{passive:true});

function toogleMenu(e) {
    e.preventDefault();
    sidebar.classList.toggle("menuActive");
}

//hiding menu after clicking the link
[...document.getElementsByClassName("menu-item")].forEach(element => {
    element.addEventListener("click",toogleMenu);
});

// for smooth scrolling behaviour
document.querySelectorAll([".nav-item",".menu-item"]).forEach(element =>{
    element.addEventListener("click",function(e){
        e.preventDefault();
        const target = this.getAttribute("href").substring(1);
        let targetsection = document.getElementById(target);

        if (targetsection) {
            targetsection.scrollIntoView({
                behavior: "smooth",
            })
        }
    })
});

//banner carousel JS

let bannerslide = document.querySelectorAll(".bannerslide");
let bannerCaurosel = document.querySelector(".bannerCarousel");
let count = 0;
let tranx = 0;
    setInterval(() => {
        if (count == bannerslide.length-1) {
            bannerslide[count].style.transform = `translateX(${tranx}%)`;
            count = 0;
            tranx = 0;
            bannerslide[count].style.transform = `translateX(${tranx}%)`;
        }
        else {
            count++;
            tranx = tranx + 100;
            bannerslide[count].style.transform = `translateX(-${tranx}%)`;
            setTimeout(()=>{
                bannerslide[count-1].style.transform = `translateX(${tranx-100}%)`;
            },3000)
            
        }
    }, 5000)

//incresing the overview para
document.querySelectorAll(".readMoreBtn").forEach((element,index) =>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        let clamp = document.getElementsByClassName("clamptext")[index];
        if (clamp.style.display!="block"){
            clamp.style.display="block";
            element.innerHTML ="Read Less";
            clamp.style.webkitLineClamp = "unset";
        }
        else{
            clamp.style.display="-webkit-box";
            clamp.style.webkitLineClamp = 6;
            element.innerHTML="Read More";
            clamp.scrollIntoView({
                behavior:'smooth',
            })
        }
    })

})

//amenities JS
let amenitiesCard = document.querySelectorAll(".amenities-card");
let amenitiesCarousel = document.getElementById("amenities-carousel");
var amenitiesCount;
let index = 0;

let amen_prevBtn = document.getElementById("amenities-prevBtn");
let amen_nextBtn = document.getElementById("amenities-nextBtn");

amen_prevBtn.addEventListener("click",function(){
    if (index==0) {index = amenitiesCard.length - 1;}
    else {index = index - 1;}
    hightlighActive();
})

amen_nextBtn.addEventListener("click",function(){
    addActiveIndex();
    hightlighActive();
})

function hightlighActive() {
    amenitiesCard.forEach((element,i) => {
        element.classList.remove("highlight");
        amenitiesCount[i].classList.remove("active");
    })
    amenitiesCard[index].classList.add("highlight");
    amenitiesCount[index].classList.add("active");
    let offset;
    if (window.innerWidth<"768") {
        offset = 70;
    }
    else if (window.innerWidth<"1200"){
        offset = 150;
    }
    else {offset=180;}
    amenitiesCarousel.scrollTo({
        left: amenitiesCard[index].offsetLeft-offset,
        behavior:'smooth',
    });
}

window.addEventListener("load",function(e){
    e.preventDefault();
    let carouselTotal = this.document.getElementById("cauroselTotal");

    for(let i=0;i<amenitiesCard.length;i++){
        const newdiv = document.createElement("div");
        newdiv.classList.add("carouselCount");
        carouselTotal.appendChild(newdiv);
    }
    amenitiesCount = document.querySelectorAll(".carouselCount");
    hightlighActive();
});

setInterval(function(){
    addActiveIndex();
    hightlighActive();
},3000)

function addActiveIndex(){
    if (index==(amenitiesCard.length - 1)) {index = 0;}
    else {index = index + 1;}
}

//onclick display image
let amenitiesImage = document.querySelectorAll(".amenities-card img");
let imageHolder = document.getElementById("image-holder");
let amenitiesPopup = document.getElementById("amenities-popupModal");
let activeIndex;

amenitiesImage.forEach((element,index) => {
    element.addEventListener("click",function() {
        const path = element.src.substring();
        imageHolder.src = path;
        amenitiesPopup.style.display = "block";
        activeIndex = index;
    })
})

//popupclose 

let amenitiesClose = document.querySelector("#amenities-popupclose");
amenitiesClose.addEventListener("click",function(){
    amenitiesPopup.style.display = "none";
})


//popup navigation menu
let amenpopprev = document.querySelector("#amenities-popupprev");
let amenpopnext = document.querySelector("#amenities-popupnext");

amenpopprev.addEventListener("click",()=>{
    if (activeIndex==0) {activeIndex = amenitiesImage.length - 1;}
    else {activeIndex = activeIndex - 1;}
    imageHolder.src = amenitiesImage[activeIndex].src;
})
amenpopnext.addEventListener("click",()=>{
    if (activeIndex==(amenitiesImage.length - 1)) {activeIndex = 0;}
    else {activeIndex = activeIndex + 1;}
    imageHolder.src = amenitiesImage[activeIndex].src;
})

//location JS begin

let toggleBtn = document.querySelectorAll(".toggleBtn");
let toggletab = document.querySelectorAll(".toggleTab");
let spanArrow = document.querySelectorAll(".arrow");

toggleBtn.forEach((element,index)=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        if (toggletab[index].classList.contains('toggleActive')) {
            toggletab[index].classList.remove("toggleActive");
            spanArrow[index].innerHTML = "&#11208;";
        }
        else {
            for(let i=0;i<toggleBtn.length;i++){
                toggletab[i].classList.remove("toggleActive");
                spanArrow[i].innerHTML = "&#11208;";
            }
            toggletab[index].classList.add("toggleActive");
            spanArrow[index].innerHTML = "&#11206;";
        }
    })
});

//Gallery JS begin here
// also note - gallery and amenities section logic is same.
//only variable varies

let galleryCard = document.querySelectorAll(".gallery-card");
let galleryCarousel = document.getElementById("gallery-carousel");
var galleryCount;
let galleryindex = 0;

let galleryprevBtn = document.getElementById("gallery-prevBtn");
let gallerynextBtn = document.getElementById("gallery-nextBtn");

galleryprevBtn.addEventListener("click",function(e){
    e.preventDefault();
    if (galleryindex==0) {galleryindex = galleryCard.length - 1;}
    else {galleryindex = galleryindex - 1;}
    hightlighActivegallery();
})

gallerynextBtn.addEventListener("click",function(e){
    e.preventDefault();
    addActiveIndexgallery();
    hightlighActivegallery();
})

function hightlighActivegallery() {
    galleryCard.forEach((element,i) => {
        element.classList.remove("highlight");
        galleryCount[i].classList.remove("active");
    })
    galleryCard[galleryindex].classList.add("highlight");
    galleryCount[galleryindex].classList.add("active");
    let offset;
    if (window.innerWidth<"768") {
        offset = 70;
    }
    else if (window.innerWidth<"1200"){
        offset = 150;
    }
    else {offset=180;}
    galleryCarousel.scrollTo({
        left: galleryCard[galleryindex].offsetLeft-offset,
        behavior:'smooth',
    });
}

window.addEventListener("load",function(e){
    e.preventDefault();
    let carouselTotal = this.document.getElementById("gallery-cauroselTotal");

    for(let i=0;i<galleryCard.length;i++){
        const newdiv = document.createElement("div");
        newdiv.classList.add("gallery-carouselCount");
        carouselTotal.appendChild(newdiv);
    }
    galleryCount = document.querySelectorAll(".gallery-carouselCount");
    hightlighActivegallery();
});

setInterval(function(){
    addActiveIndexgallery();
    hightlighActivegallery();
},3000)

function addActiveIndexgallery(){
    if (galleryindex==(galleryCard.length - 1)) {galleryindex = 0;}
    else {galleryindex = galleryindex + 1;}
}

// onclick display image
let galleryImage = document.querySelectorAll(".gallery-card img");
let gimageHolder = document.getElementById("gallery-image-holder");
let galleryPopup = document.getElementById("gallery-popupModal");
let galleryActiveIndex;

galleryImage.forEach((element,index) => {
    element.addEventListener("click",function() {
        const path = element.src.substring();
        gimageHolder.src = path;
        galleryPopup.style.display = "block";
        galleryActiveIndex = index;
    })
})

//popupclose 

let galleryClose = document.querySelector("#gallery-popupclose");
galleryClose.addEventListener("click",function(){
    galleryPopup.style.display = "none";
})


//popup navigation menu

let gallerypopprev = document.querySelector("#gallery-popupprev");
let gallerypopnext = document.querySelector("#gallery-popupnext");

gallerypopprev.addEventListener("click",()=>{
    if (galleryActiveIndex==0) {galleryActiveIndex = galleryImage.length - 1;}
    else {galleryActiveIndex = galleryActiveIndex - 1;}
    gimageHolder.src = galleryImage[galleryActiveIndex].src;
});

gallerypopnext.addEventListener("click",()=>{
    if (galleryActiveIndex==(galleryImage.length - 1)) {galleryActiveIndex = 0;}
    else {galleryActiveIndex = galleryActiveIndex + 1;}
    gimageHolder.src = galleryImage[galleryActiveIndex].src;
});
