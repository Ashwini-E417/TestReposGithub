document.addEventListener("DOMContentLoaded", () => {
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
navitem.forEach((e) => {
    e.addEventListener("click", (t) => {
        t.preventDefault();
        document.getElementById(e.getAttribute("href").substring(1)).scrollIntoView({ behavior: "smooth" }),
            sidebar.classList.remove("openSidebar");
    });
}),
    document.querySelectorAll(".downloadBrochure").forEach((e) => {
        e.addEventListener("click", () => {
            sidebar.classList.remove("openSidebar");
        });
    });
//     let bannerCarouselTimer = setInterval(updateBannerCorousel, 5e3);
// let bannerImage = document.querySelectorAll(".bannerImage"),
//     bannerContainer = document.querySelector(".banner"),
//     bannertransform = 0,
//     bannercount = 0;
// function updateBannerCorousel() {
//     (bannerContainer.style.transform = `translateX(-${100 * bannercount}%)`),
//         (bannercount += 1) > bannerImage.length - 1 && (bannercount = 0);
// }
// document.querySelector(".bannerPrev").addEventListener("click", () => {
//     (bannercount = (bannercount - 1 + bannerImage.length) % bannerImage.length),
//         (bannerContainer.style.transform = `translateX(-${100 * bannercount}%)`);
//         clearInterval(bannerCarouselTimer);
//         bannerCarouselTimer = setInterval(updateBannerCorousel, 5e3);
// }),
//     document.querySelector(".bannerNext").addEventListener("click", () => {
//         (bannercount = (bannercount + 1) % bannerImage.length),
//             (bannerContainer.style.transform = `translateX(-${100 * bannercount}%)`);
//             clearInterval(bannerCarouselTimer);
//             bannerCarouselTimer = setInterval(updateBannerCorousel, 5e3);
//     });


let readMore = document.querySelectorAll(".readMoreBtn"),
    clampText = document.querySelectorAll(".clampText");
readMore.forEach((e, t) => {
    e.addEventListener("click", (l) => {
        l.preventDefault(),
            "block" == clampText[t].style.display
                ? ((clampText[t].style.display = "-webkit-box"),
                  (clampText[t].style.webkitLineClamp = "4"),
                  (e.innerHTML = "Read More "),
                  clampText[t].scrollIntoView({ behavior: "smooth" }))
                : ((clampText[t].style.display = "block"),
                  (clampText[t].style.webkitLineClamp = "unset"),
                  (e.innerHTML = "Read Less "));
    });
});
let body = document.querySelector(".body"),
    amenitiesImg = document.querySelectorAll(".amenitiesCard img"),
    amenitiesSlide = document.querySelector(".amenitiesSlide"),
    amenitesdesc = document.querySelectorAll(".amenities-description"),
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
// amenitiesImg.forEach((e, t) => {
//     e.addEventListener("mouseenter", () => clearInterval(amenitiesCaurosel)),
//         e.addEventListener("mouseout", (e) => {
//             e.preventDefault(), amenitiespopupopen || (amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5e3));
//         }),
//         e.addEventListener("click", () => {
//             (document.getElementById("amenities-overlay").style.display = "block"),
//                 (document.getElementById("amenities-popupimage").src = e.src),
//                 (amenitiespopupopen = !0),
//                 (amenitiesIndex = t),
//                 clearInterval(amenitiesCaurosel),
//                 (document.querySelector(".amenities-popup-text").innerHTML = amenitesdesc[amenitiesIndex].innerHTML),
//                 body.classList.add("noscroll");
//         }),
//         e.addEventListener("touchstart", () => {}, { passive: !0 });
// }),
    // document.querySelector(".amenities-popup-close").addEventListener("click", (e) => {
    //     e.preventDefault(),
    //         (document.getElementById("amenities-overlay").style.display = "none"),
    //         (document.getElementById("amenities-popupimage").src = ""),
    //         (amenitiespopupopen = !1),
    //         (amenitiesCaurosel = setInterval(amenitiescauroselbegin, 5e3)),
    //         body.classList.remove("noscroll");
    // }),
    // document.getElementById("amenities_prevBtn").addEventListener("click", () => {
    //     (amenitiesIndex = (amenitiesIndex - 1 + amenitiesImg.length) % amenitiesImg.length),
    //         (document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src);
    //         (document.querySelector(".amenities-popup-text").innerHTML = amenitesdesc[amenitiesIndex].innerHTML);
    // }),
    // document.getElementById("amenities_nextBtn").addEventListener("click", () => {
    //     (amenitiesIndex = (amenitiesIndex + 1) % amenitiesImg.length),
    //         (document.getElementById("amenities-popupimage").src = amenitiesImg[amenitiesIndex].src);
    //         (document.querySelector(".amenities-popup-text").innerHTML = amenitesdesc[amenitiesIndex].innerHTML);
    // }),
    document.querySelector(".amenities_prevBtn").addEventListener("click", (e) => {
        e.preventDefault(), (account = (account - 1 + maxSlide()) % maxSlide()), updateSlide(), resetCarousel();
    }),
    document.querySelector(".amenities_nextBtn").addEventListener("click", () => {
        (account = (account + 1) % maxSlide()), updateSlide(), resetCarousel();
    }),
    window.addEventListener("resize", () => {
        updateSlide();
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
function closepopupform() {
    // (document.querySelector(".sideEnquireBtn").style.display = "block"),
        (document.querySelector(".popup-overlay").style.display = "none"),
        body.classList.remove("noscroll");
        document.querySelectorAll(".payment-table-container").forEach(table=>{
            if(table.classList.contains("show-full")) {
                table.classList.remove("show-full");
            }
        })
}
function openpopupform() {
    // (document.querySelector(".sideEnquireBtn").style.display = "none"),
        (document.querySelector(".popup-overlay").style.display = "block"),
        body.classList.add("noscroll");
}
// galleryImg.forEach((e, t) => {
//     e.addEventListener("mouseenter", () => clearInterval(galleryCaurosel)),
//         e.addEventListener("mouseout", () => {
//             gallerypopupopen || (galleryCaurosel = setInterval(gallerycauroselbegin, 5e3));
//         }),
//         e.addEventListener("click", () => {
//             (document.getElementById("gallery-overlay").style.display = "block"),
//                 (document.getElementById("gallery-popupimage").src = e.src),
//                 (gallerypopupopen = !0),
//                 (galleryIndex = t),
//                 clearInterval(galleryCaurosel),
//                 body.classList.add("noscroll");
//         });
// }),
    // document.querySelector(".gallery-popup-close").addEventListener("click", (e) => {
    //     e.preventDefault(),
    //         (document.getElementById("gallery-overlay").style.display = "none"),
    //         (document.getElementById("gallery-popupimage").src = ""),
    //         (gallerypopupopen = !1),
    //         (galleryCaurosel = setInterval(gallerycauroselbegin, 5e3)),
    //         body.classList.remove("noscroll");
    // }),
    // document.getElementById("gallery_prevBtn").addEventListener("click", () => {
    //     (galleryIndex = (galleryIndex - 1 + galleryImg.length) % galleryImg.length),
    //         (document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src);
    // }),
    // document.getElementById("gallery_nextBtn").addEventListener("click", () => {
    //     (galleryIndex = (galleryIndex + 1) % galleryImg.length),
    //         (document.getElementById("gallery-popupimage").src = galleryImg[galleryIndex].src);
    // }),
    document.querySelector(".gallery_prevBtn").addEventListener("click", (e) => {
        e.preventDefault(),
            (gccount = (gccount - 1 + maxGallertSlide()) % maxGallertSlide()),
            updategallerySlide(),
            resetGalleryCarousel();
    }),
    document.querySelector(".gallery_nextBtn").addEventListener("click", () => {
        (gccount = (gccount + 1) % maxGallertSlide()), updategallerySlide(), resetGalleryCarousel();
    }),
    window.addEventListener("resize", (e) => {
        e.preventDefault(), updategallerySlide();
    }),
    document.querySelector(".popupform-close").addEventListener("click", () => {
        closepopupform();
    }),
    document.querySelectorAll(".popup-trigger").forEach((e) => {
        e.addEventListener("click", (t) => {
            t.preventDefault(),
                (document.querySelector("#popupform-heading").innerHTML = e.getAttribute("data-heading")),
                openpopupform();
        });
    }),
    window.addEventListener("load", (e) => {
        e.preventDefault(),
            setTimeout(() => {
                openpopupform();
            }, 4e3);
    });
let accordionContent = document.querySelectorAll(".accordion-content"),
    accordionBtn = document.querySelectorAll(".mobile-accordionBtn"),
    spanArrow = document.querySelectorAll(".accordion-arrow");
function toogleAccordion(e) {
    if (accordionBtn[e].classList.contains("accordion-active")) {
        accordionBtn[e].classList.remove("accordion-active"),
            accordionContent[e].classList.remove("contentactive"),
            spanArrow[e].classList.remove("accordion-arrow-active");
        return;
    }
    for (let t = 0; t < accordionBtn.length; t++)
        accordionBtn[t].classList.remove("accordion-active"),
            accordionContent[t].classList.remove("contentactive"),
            spanArrow[t].classList.remove("accordion-arrow-active");
    accordionBtn[e].classList.contains("accordion-active") ||
        (accordionBtn[e].classList.add("accordion-active"),
        accordionContent[e].classList.add("contentactive"),
        spanArrow[e].classList.add("accordion-arrow-active"));
}
accordionBtn.forEach((e, t) => {
    e.addEventListener("click", () => {
        toogleAccordion(t);
    });
});
let floorImg = document.querySelectorAll(".floorCard img"),
    floorSlide = document.querySelector(".floorSlide"),
    floorCount = floorImg.length - 1,
    fcount = 0,
    floorCaurosel = setInterval(floorcauroselbegin, 5e3);
function getfloorstep() {
    return window.innerWidth < 768 ? 105 : 0;
}
function maxfloorSlide() {
    return window.innerWidth < 768 ? floorCount + 1 : floorCount - 1;
}
function updatefloorSlide() {
    floorSlide.style.transform = `translateX(-${fcount * getfloorstep()}%)`;
}
function floorcauroselbegin() {
    updatefloorSlide(), (fcount = (fcount + 1) % maxfloorSlide());
}
function resetfloorCarousel() {
    clearInterval(floorCaurosel), (floorCaurosel = setInterval(floorcauroselbegin, 5e3));
}
document.querySelector(".floor_prevBtn").addEventListener("click", () => {
    (fcount = (fcount - 1 + maxfloorSlide()) % maxfloorSlide()), updatefloorSlide(), resetfloorCarousel();
}),
    document.querySelector(".floor_nextBtn").addEventListener("click", () => {
        (fcount = (fcount + 1) % maxfloorSlide()), updatefloorSlide(), resetfloorCarousel();
    }),
    window.addEventListener(
        "resize",
        () => (updatefloorSlide(), window.innerWidth < 768 ? resetfloorCarousel() : clearInterval(floorCaurosel))
    );

document.querySelectorAll(".paymentEnquireBtn").forEach((element, index) => {
    element.addEventListener("click", () => {
        let target = document.querySelectorAll(".payment-table-container")[index];
        target.classList.add("show-full");
    });
});

});


function repositionWidget(){let t=document.querySelector("#launcher"),e=window.matchMedia("(max-width:768px)").matches?"60px":"0px";if(t){t.style.setProperty("bottom",e,"important"),t.style.setProperty("left","5px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("transform","none","important");let n=document.querySelector("iframe[title*='Chat']");n&&n.parentElement&&(n.parentElement.style.setProperty("bottom",e,"important"),n.parentElement.style.setProperty("left","5px","important"),n.parentElement.style.setProperty("right","auto","important"))}}function forceRepositioning(){let t=window.matchMedia("(max-width:768px)").matches?"0px":"60px";["#launcher","[data-testid='launcher']",".zEWidget-launcher","iframe[title*='Chat']"].forEach((e=>{let n=document.querySelector(e);if(n){let e=n.parentElement||n;e.style.setProperty("bottom",t,"important"),e.style.setProperty("left","5px","important"),e.style.setProperty("right","auto","important"),e.style.setProperty("transform","none","important")}}))}function loadZeSnippet(){setTimeout((function(){var t=document.createElement("script");t.id="ze-snippet",t.src="https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc",document.head.appendChild(t),t.onload=function(){var t=setInterval((function(){if("undefined"!=typeof zE&&document.querySelector("#launcher")&&(clearInterval(t),repositionWidget(),zE("webWidget:on","open",(function(){setTimeout(repositionWidget,100)})),zE("webWidget:on","close",(function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)})),zE("webWidget:on","minimize",(function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)})),zE("webWidget:on","maximize",(function(){setTimeout(repositionWidget,100)})),zE("webWidget:on","launcherClick",(function(){setTimeout(repositionWidget,100)})),setInterval(forceRepositioning,2e3),window.MutationObserver)){const t=new MutationObserver((function(t){t.forEach((function(t){"attributes"!==t.type||"style"!==t.attributeName&&"class"!==t.attributeName||setTimeout(repositionWidget,50)}))}));setTimeout((function(){let e=document.querySelector("#launcher");e&&(t.observe(e,{attributes:!0,subtree:!0}),e.parentElement&&t.observe(e.parentElement,{attributes:!0,subtree:!0}))}),1e3)}}),100)}}),4e3)}function toggleTab(t){document.querySelectorAll('.tab input[type="checkbox"]').forEach((function(e){e.id!==t&&(e.checked=!1)}))}function addPersistentCSS(){const t=document.createElement("style");t.textContent="\n        #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n\n        @media (max-width:768px) {\n            #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n        }\n    ",document.head.appendChild(t)}addPersistentCSS(),loadZeSnippet(),window.addEventListener("resize",repositionWidget)