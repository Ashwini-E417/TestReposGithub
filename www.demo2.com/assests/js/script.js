let menubtn = document.getElementById("hamburger"),
    sidebar = document.getElementById("sidebar");
menubtn.addEventListener("click", () => {
    sidebar.classList.add("openSidebar");
});
let menucloseBtn = document.getElementById("sidebar-close");
menucloseBtn.addEventListener("click", () => {
    sidebar.classList.remove("openSidebar");
});
let navitem = document.querySelectorAll(".nav-item");
function closepopupform() {
    (document.querySelector(".popupform-container").style.display = "none"), (document.querySelector(".popup-overlay").style.display = "none"), body.classList.remove("noscroll");
}
function openpopupform() {
    (document.querySelector(".popupform-container").style.display = "block"), (document.querySelector(".popup-overlay").style.display = "block"), body.classList.add("noscroll");
}
navitem.forEach((e) => {
    e.addEventListener("click", (l) => {
        l.preventDefault();
        document.getElementById(e.getAttribute("href").substring(1)).scrollIntoView({ behavior: "smooth" }), sidebar.classList.remove("openSidebar");
    });
}),
    document.querySelectorAll(".downloadBrochure").forEach((e) => {
        e.addEventListener("click", (e) => {
            e.preventDefault(), sidebar.classList.remove("openSidebar");
        });
    }),
    document.querySelector(".popupform-close").addEventListener("click", () => {
        closepopupform();
    }),
    document.querySelectorAll(".popup-trigger").forEach((e) => {
        e.addEventListener("click", () => {
            (document.querySelector("#popupform-heading").innerHTML = e.getAttribute("data-heading")), openpopupform();
        });
    }),
    window.addEventListener("load", () => {
        setTimeout(() => {
            openpopupform();
        }, 4e3);
    }),
    setInterval(updateBannerCorousel, 5e3);
let bannerImage = document.querySelectorAll(".bannerImage"),
    bannerContainer = document.querySelector(".banner"),
    bannertransform = 0,
    bannercount = 0;
function updateBannerCorousel() {
    (bannerContainer.style.transform = `translateX(-${100 * bannercount}%)`), (bannercount += 1) > bannerImage.length - 1 && (bannercount = 0);
}
let readMore = document.querySelectorAll(".readMoreBtn"),
    clampText = document.querySelectorAll(".clampText");
readMore.forEach((e, l) => {
    e.addEventListener("click", (t) => {
        t.preventDefault(),
            "block" == clampText[l].style.display
                ? ((clampText[l].style.display = "-webkit-box"),
                  (clampText[l].style.webkitLineClamp = "4"),
                  (e.innerHTML = "Read More <i class='ri-arrow-right-s-fill readmoreicon'></i>"),
                  clampText[l].scrollIntoView({ behavior: "smooth" }))
                : ((clampText[l].style.display = "block"), (clampText[l].style.webkitLineClamp = "unset"), (e.innerHTML = "Read Less <i class='ri-arrow-left-s-fill readmoreicon'></i>"));
    });
});
let body = document.querySelector(".body"),
    amenitiesImg = document.querySelectorAll(".amenitiesCard img"),
    amenitiesSlide = document.querySelector(".amenitiesSlide"),
    amenitiesCount = amenitiesImg.length - 1,
    account = 0,
    amenitiesIndex = 0,
    amenitiespopupopen = !1,
    amenitiesTrans = 0,
    amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5e3);
function getStep() {
    return window.innerWidth < 769 ? 105 : 35;
}
function maxSlide() {
    return window.innerWidth < 769 ? amenitiesCount + 1 : amenitiesCount - 1;
}
function updateSlide() {
    amenitiesSlide.style.transform = `translateX(-${account * getStep()}%)`;
}
function amenitiescauroselbegin() {
    updateSlide(), (account = (account + 1) % maxSlide());
}
function resetCarousel() {
    clearInterval(amenitiesCaurosel), (amenitiesCaurosel = setInterval(amenitiescauroselbegin, 3e3));
}
amenitiesImg.forEach((e, l) => {
    e.addEventListener("mouseenter", () => clearInterval(amenitiesCaurosel)),
        e.addEventListener("mouseout", () => {
            amenitiespopupopen || (amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5e3));
        }),
        e.addEventListener("click", () => {
            (document.getElementById("amenities-overlay").style.display = "block"),
                (document.getElementById("amenities-popupimage").src = e.src),
                (amenitiespopupopen = !0),
                (amenitiesIndex = l),
                clearInterval(amenitiesCaurosel),
                body.classList.add("noscroll");
        });
}),
    document.querySelector(".amenities-popup-close").addEventListener("click", () => {
        (document.getElementById("amenities-overlay").style.display = "none"),
            (document.getElementById("amenities-popupimage").src = ""),
            (amenitiespopupopen = !1),
            (amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5e3)),
            body.classList.remove("noscroll");
    }),
    document.getElementById("amenities_prevBtn").addEventListener("click", () => {
        (amenitiesIndex = (amenitiesIndex - 1 + amenitiesImg.length) % amenitiesImg.length), (document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src);
    }),
    document.getElementById("amenities_nextBtn").addEventListener("click", () => {
        (amenitiesIndex = (amenitiesIndex + 1) % amenitiesImg.length), (document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src);
    }),
    document.querySelector(".amenities_prevBtn").addEventListener("click", () => {
        (account = (account - 1 + maxSlide()) % maxSlide()), updateSlide(), resetCarousel();
    }),
    document.querySelector(".amenities_nextBtn").addEventListener("click", () => {
        (account = (account + 1) % maxSlide()), updateSlide(), resetCarousel();
    }),
    window.addEventListener("resize", () => {
        updateSlide();
    }),
    window.addEventListener("resize", updatefloorCarousel),
    window.addEventListener("load", updatefloorCarousel);
let floorInterval = null,
    findex = 0,
    floorcount = document.querySelectorAll(".floorCard").length,
    floorWrapper = document.querySelector(".floorSlide");
function updatefloorCarousel() {
    window.innerWidth <= 768
        ? (clearInterval(floorInterval), (findex = 0), floorCarousel(), (floorInterval = setInterval(floorCarousel, 5e3)))
        : (clearInterval(floorInterval), (floorWrapper.style.transform = "translateX(0%)"));
}
function floorCarousel() {
    ++findex >= floorcount && ((findex = 0)), (floorWrapper.style.transform = `translateX(-${105 * findex}%)`);
}
document.querySelector(".floor_prevBtn").addEventListener("click", () => {
    clearInterval(floorInterval),
        0 == findex ? ((findex = floorcount - 1)) : (findex -= 1),
        (floorWrapper.style.transform = `translateX(-${105 * findex}%)`),
        (floorInterval = setInterval(floorCarousel, 5e3));
}),
    document.querySelector(".floor_nextBtn").addEventListener("click", () => {
        clearInterval(floorInterval),
            findex == floorcount - 1 ? ((findex = 0)) : (findex += 1),
            (floorWrapper.style.transform = `translateX(-${105 * findex}%)`),
            (floorInterval = setInterval(floorCarousel, 5e3));
    });
let galleryImg = document.querySelectorAll(".galleryCard img"),
    gallerySlide = document.querySelector(".gallerySlide"),
    galleryCount = galleryImg.length - 1,
    gccount = 0,
    galleryIndex = 0,
    gallerypopupopen = !1,
    galleryTrans = 0,
    galleryCaurosel = setInterval(gallerycauroselbegin, 5e3);
function getgallerystep() {
    return window.innerWidth < 769 ? 105 : 35;
}
function maxGallertSlide() {
    return window.innerWidth < 769 ? galleryCount + 1 : galleryCount - 1;
}
function updategallerySlide() {
    gallerySlide.style.transform = `translateX(-${gccount * getgallerystep()}%)`;
}
function gallerycauroselbegin() {
    updategallerySlide(), (gccount = (gccount + 1) % maxGallertSlide());
}
function resetGalleryCarousel() {
    clearInterval(galleryCaurosel), (galleryCaurosel = setInterval(gallerycauroselbegin, 3e3));
}
galleryImg.forEach((e, l) => {
    e.addEventListener("mouseenter", () => clearInterval(galleryCaurosel)),
        e.addEventListener("mouseout", () => {
            gallerypopupopen || (galleryCaurosel = setInterval(gallerycauroselbegin, 5e3));
        }),
        e.addEventListener("click", () => {
            (document.getElementById("gallery-overlay").style.display = "block"),
                (document.getElementById("gallery-popupimage").src = e.src),
                (gallerypopupopen = !0),
                (galleryIndex = l),
                clearInterval(galleryCaurosel),
                body.classList.add("noscroll");
        });
}),
    document.querySelector(".gallery-popup-close").addEventListener("click", () => {
        (document.getElementById("gallery-overlay").style.display = "none"),
            (document.getElementById("gallery-popupimage").src = ""),
            (gallerypopupopen = !1),
            (galleryCaurosel = setInterval(gallerycauroselbegin, 5e3)),
            body.classList.remove("noscroll");
    }),
    document.getElementById("gallery_prevBtn").addEventListener("click", () => {
        (galleryIndex = (galleryIndex - 1 + galleryImg.length) % galleryImg.length), (document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src);
    }),
    document.getElementById("gallery_nextBtn").addEventListener("click", () => {
        (galleryIndex = (galleryIndex + 1) % galleryImg.length), (document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src);
    }),
    document.querySelector(".gallery_prevBtn").addEventListener("click", () => {
        (gccount = (gccount - 1 + maxGallertSlide()) % maxGallertSlide()), updategallerySlide(), resetGalleryCarousel();
    }),
    document.querySelector(".gallery_nextBtn").addEventListener("click", () => {
        (gccount = (gccount + 1) % maxGallertSlide()), updategallerySlide(), resetGalleryCarousel();
    }),
    window.addEventListener("resize", () => {
        updategallerySlide();
    });
let accordionContent = document.querySelectorAll(".accordion-content"),
    accordionBtn = document.querySelectorAll(".mobile-accordionBtn"),
    spanArrow = document.querySelectorAll(".accordion-arrow");
function toogleAccordion(e) {
    if (accordionBtn[e].classList.contains("accordion-active")) {
        accordionBtn[e].classList.remove("accordion-active"), accordionContent[e].classList.remove("contentactive"), spanArrow[e].classList.remove("accordion-arrow-active");
        return;
    }
    for (let l = 0; l < accordionBtn.length; l++) accordionBtn[l].classList.remove("accordion-active"), accordionContent[l].classList.remove("contentactive"), spanArrow[l].classList.remove("accordion-arrow-active");
    accordionBtn[e].classList.contains("accordion-active") || (accordionBtn[e].classList.add("accordion-active"), accordionContent[e].classList.add("contentactive"), spanArrow[e].classList.add("accordion-arrow-active"));
}
accordionBtn.forEach((e, l) => {
    e.addEventListener("click", () => {
        toogleAccordion(l);
    });
});

document.addEventListener("keydown",(e)=>{
    if(e.key=="Escape" && document.querySelector(".popup-overlay").style.display == "block") {
        closepopupform();
    }
})

document.addEventListener("touchstart",(e)=>{
},{passive:true})